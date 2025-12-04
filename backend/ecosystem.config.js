module.exports = {
  apps: [
    {
      name: "stream-backend",
      script: "server.js",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
        MONGODB_URL: "mongodb+srv://admin:StreamWhere2025@streamwhere.v5jgow3.mongodb.net/?retryWrites=true&w=majority",
        JWT_SECRET: "superclaveultrasecreta123"
      }
    }
  ]
};
