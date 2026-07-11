/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import http from "http";
import path from "path";
import { WebSocketServer, WebSocket } from "ws";
import { createServer as createViteServer } from "vite";

interface ClientInfo {
  ws: WebSocket;
  id: string;
  username: string;
  avatar: string;
}

interface ChatMessage {
  id: string;
  username: string;
  avatar: string;
  text: string;
  timestamp: string;
  type: 'chat' | 'system';
  reaction?: string;
}

interface MovieState {
  movieId: string;
  isPlaying: boolean;
  progress: number; // in seconds
  lastUpdated: number; // unix timestamp
  updatedBy: string;
}

interface SharedPhoto {
  id: string;
  url: string;
  title: string;
  caption: string;
  author: string;
  likes: number;
  comments: { author: string; text: string; date: string }[];
  date: string;
}

// In-memory data structures
const messagesHistory: ChatMessage[] = [
  {
    id: "sys-1",
    username: "System",
    avatar: "👑",
    text: "Welcome to the SK Premium Park Social Hub! Enjoy movies together, chat, and share gallery moments.",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    type: "system"
  }
];

const movieState: MovieState = {
  movieId: "hotel-intro",
  isPlaying: false,
  progress: 0,
  lastUpdated: Date.now(),
  updatedBy: "System"
};

// Seed gallery photos with the real hotel photos
const galleryPhotos: SharedPhoto[] = [
  {
    id: "pic-1",
    url: "/src/assets/images/hotel_lobby_hero_1783684903613.jpg",
    title: "The Grand Lobby",
    caption: "A magnificent reception styled with premium marbles, velvet armchairs, and glowing gold light panels.",
    author: "SK Premium Park Official",
    likes: 42,
    comments: [
      { author: "Deepak Sharma", text: "Truly a 5-star feel! Exceptionally maintained.", date: "July 8, 2026" },
      { author: "Ananya Goel", text: "Check-in was so smooth here.", date: "July 9, 2026" }
    ],
    date: "July 5, 2026"
  },
  {
    id: "pic-2",
    url: "/src/assets/images/hotel_luxury_suite_1783684915983.jpg",
    title: "Executive Suite Bed",
    caption: "Ultimate orthopedic luxury bed with panoramic city views from full-glass ceiling windows.",
    author: "SK Premium Park Official",
    likes: 38,
    comments: [
      { author: "Vikram Rathore", text: "The mattress is insanely comfortable.", date: "July 7, 2026" }
    ],
    date: "July 5, 2026"
  },
  {
    id: "pic-3",
    url: "/src/assets/images/hotel_dining_buffet_1783684927904.jpg",
    title: "Premium Dining Hall",
    caption: "Deep green velvet buttoned-booth seating with majestic marble tables and candle lighting.",
    author: "SK Premium Park Official",
    likes: 56,
    comments: [
      { author: "Rahul Verma", text: "Loved the classic Rogan Josh here!", date: "July 6, 2026" },
      { author: "Sanjay Gupta", text: "Saffron Rasmalai was stellar too.", date: "July 8, 2026" }
    ],
    date: "July 5, 2026"
  },
  {
    id: "pic-4",
    url: "/src/assets/images/hotel_banquet_hall_1783684939997.jpg",
    title: "Three-Part Banquet Hall",
    caption: "Spacious layout beautifully organized with modular partitions, crystal chandeliers, and carpets.",
    author: "SK Premium Park Official",
    likes: 49,
    comments: [],
    date: "July 5, 2026"
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '20mb' }));

  // API endpoints
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/gallery", (req, res) => {
    res.json(galleryPhotos);
  });

  app.post("/api/gallery/upload", (req, res) => {
    const { url, title, caption, author } = req.body;
    if (!url || !title) {
      return res.status(400).json({ error: "Missing image data or title" });
    }
    const newPhoto: SharedPhoto = {
      id: "pic-" + Date.now(),
      url,
      title,
      caption: caption || "",
      author: author || "Guest User",
      likes: 0,
      comments: [],
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
    galleryPhotos.unshift(newPhoto);
    
    // Broadcast upload event to active sockets
    broadcastToAll({
      type: "gallery_update",
      payload: galleryPhotos
    });

    res.json({ success: true, photo: newPhoto });
  });

  app.post("/api/gallery/like", (req, res) => {
    const { id } = req.body;
    const photo = galleryPhotos.find(p => p.id === id);
    if (photo) {
      photo.likes += 1;
      broadcastToAll({
        type: "gallery_update",
        payload: galleryPhotos
      });
      return res.json({ success: true, likes: photo.likes });
    }
    res.status(444).json({ error: "Photo not found" });
  });

  app.post("/api/gallery/comment", (req, res) => {
    const { id, author, text } = req.body;
    const photo = galleryPhotos.find(p => p.id === id);
    if (photo && author && text) {
      photo.comments.push({
        author,
        text,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      });
      broadcastToAll({
        type: "gallery_update",
        payload: galleryPhotos
      });
      return res.json({ success: true, comments: photo.comments });
    }
    res.status(400).json({ error: "Invalid parameters" });
  });

  const server = http.createServer(app);
  const wss = new WebSocketServer({ server });

  const clientsMap = new Map<string, ClientInfo>();

  function broadcastToAll(messageObj: any) {
    const payload = JSON.stringify(messageObj);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    });
  }

  function getOnlineUsersList() {
    return Array.from(clientsMap.values()).map(c => ({
      id: c.id,
      username: c.username,
      avatar: c.avatar
    }));
  }

  wss.on("connection", (ws) => {
    const clientId = "client_" + Math.random().toString(36).substring(2, 9);
    
    // Default metadata until client registers
    const clientInfo: ClientInfo = {
      ws,
      id: clientId,
      username: "Guest_" + clientId.substring(7),
      avatar: "🏨"
    };
    
    clientsMap.set(clientId, clientInfo);

    // Send initial handshake state
    ws.send(JSON.stringify({
      type: "handshake",
      payload: {
        clientId,
        messagesHistory: messagesHistory.slice(-50), // last 50
        movieState,
        onlineUsers: getOnlineUsersList(),
        galleryPhotos
      }
    }));

    ws.on("message", (messageStr) => {
      try {
        const data = JSON.parse(messageStr.toString());
        
        switch (data.type) {
          case "register": {
            const info = clientsMap.get(clientId);
            if (info) {
              info.username = data.payload.username || info.username;
              info.avatar = data.payload.avatar || info.avatar;
              
              // Broadcast join system message
              const sysMsg: ChatMessage = {
                id: "sys-" + Date.now(),
                username: "System",
                avatar: "🔔",
                text: `${info.username} joined the Premium Lounge!`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                type: 'system'
              };
              messagesHistory.push(sysMsg);
              
              broadcastToAll({
                type: "user_joined",
                payload: {
                  user: { id: info.id, username: info.username, avatar: info.avatar },
                  onlineUsers: getOnlineUsersList(),
                  systemMessage: sysMsg
                }
              });
            }
            break;
          }

          case "chat_message": {
            const info = clientsMap.get(clientId);
            if (info) {
              const newMsg: ChatMessage = {
                id: "msg-" + Date.now() + "-" + Math.random().toString(36).substring(2, 5),
                username: info.username,
                avatar: info.avatar,
                text: data.payload.text,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                type: 'chat'
              };
              messagesHistory.push(newMsg);
              if (messagesHistory.length > 200) messagesHistory.shift();

              broadcastToAll({
                type: "chat_message",
                payload: newMsg
              });
            }
            break;
          }

          case "react_message": {
            const { messageId, reaction } = data.payload;
            const msg = messagesHistory.find(m => m.id === messageId);
            if (msg) {
              msg.reaction = reaction;
              broadcastToAll({
                type: "message_reaction",
                payload: { messageId, reaction }
              });
            }
            break;
          }

          case "sync_movie": {
            const info = clientsMap.get(clientId);
            const { isPlaying, progress, movieId } = data.payload;
            
            movieState.movieId = movieId || movieState.movieId;
            movieState.isPlaying = isPlaying;
            movieState.progress = progress;
            movieState.lastUpdated = Date.now();
            movieState.updatedBy = info ? info.username : "System";

            broadcastToAll({
              type: "movie_state_update",
              payload: movieState
            });
            break;
          }

          case "request_movie_sync": {
            ws.send(JSON.stringify({
              type: "movie_state_update",
              payload: movieState
            }));
            break;
          }
        }
      } catch (err) {
        console.error("Error processing websocket message:", err);
      }
    });

    ws.on("close", () => {
      const info = clientsMap.get(clientId);
      if (info) {
        clientsMap.delete(clientId);
        
        const sysMsg: ChatMessage = {
          id: "sys-" + Date.now(),
          username: "System",
          avatar: "💤",
          text: `${info.username} left the Lounge.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'system'
        };
        messagesHistory.push(sysMsg);

        broadcastToAll({
          type: "user_left",
          payload: {
            userId: clientId,
            onlineUsers: getOnlineUsersList(),
            systemMessage: sysMsg
          }
        });
      }
    });
  });

  // Vite Integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`[SK PREMIUM SERVER] Server running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start full-stack server:", err);
});
