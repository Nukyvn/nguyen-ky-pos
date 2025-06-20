import express from "express";
import cors from "cors";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "https://app.nuky.cloud",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// API Routes (mock for now)
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Auth routes
app.post("/api/auth/login", (req, res) => {
  const { identifier, password } = req.body;

  // Mock login - replace with real auth
  if (identifier === "admin" && password === "admin123") {
    req.session.user = { id: 1, username: "admin", role: "admin" };
    res.json({ success: true, user: req.session.user });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

app.post("/api/auth/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Logout error" });
    }
    res.json({ success: true });
  });
});

app.get("/api/auth/check", (req, res) => {
  if (req.session.user) {
    res.json({ success: true, isAuthenticated: true, user: req.session.user });
  } else {
    res.json({ success: true, isAuthenticated: false });
  }
});

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, "../dist")));

// Handle React Router - send all non-API requests to index.html
app.get("*", (req, res) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.join(__dirname, "../dist/index.html"));
  } else {
    res.status(404).json({ error: "API endpoint not found" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV}`);
  console.log(`🌐 CORS Origin: ${process.env.CORS_ORIGIN}`);
});
