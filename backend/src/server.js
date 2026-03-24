import express from "express";

const app = express();

// Request Logger (Development only)
if (process.env.NODE_ENV === "development") {
  app.use((req, _res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

app.get("/", (_req, res) => {
  ApiResponseUtil.success(
    res,
    {
      status: "live",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
    },
    "🚀 Synkro - Real Time Chat App Server is Live!"
  );
});

app.get("/api/health", (_req, res) => {
  ApiResponseUtil.success(
    res,
    {
      status: "healthy",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    },
    "Server is healthy"
  );
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("\n🚀 ========================================");
  console.log(`✅ Server is running on port ${port}`);
  console.log(`🌐 http://localhost:${port}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log("========================================\n");
});

// ── Graceful Shutdown ─────────────────────────────────────────────────────────

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM received. Shutting down gracefully...");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("\n👋 SIGINT received. Shutting down gracefully...");
  process.exit(0);
});
