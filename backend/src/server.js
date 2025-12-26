/**
 * Server Entry Point
 * Starts the Express server
 */

import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Start the server
 */
const startServer = () => {
  try {
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log('');
      console.log('╔═══════════════════════════════════════════════════╗');
      console.log('║                                                   ║');
      console.log('║    🍽️  Food Tasting Competition API Server      ║');
      console.log('║                                                   ║');
      console.log('╚═══════════════════════════════════════════════════╝');
      console.log('');
      console.log(`📍 Environment: ${NODE_ENV}`);
      console.log(`🌐 Server running on: http://localhost:${PORT}`);
      console.log(`📱 Network access: http://192.168.139.130:${PORT}`);
      console.log(`🔧 API Base URL: http://192.168.139.130:${PORT}/api`);
      console.log(`💚 Health Check: http://192.168.139.130:${PORT}/api/health`);
      console.log('');
      console.log('📚 Available Routes:');
      console.log('   GET    /api/health');
      console.log('   GET    /api/participants');
      console.log('   GET    /api/scores');
      console.log('   POST   /api/vote');
      console.log('   GET    /api/votes');
      console.log('   POST   /api/reset');
      console.log('');
      console.log('✨ Server is ready to accept requests!');
      console.log('');
    });

    // Graceful shutdown
    const gracefulShutdown = () => {
      console.log('\n🛑 Shutting down gracefully...');
      server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
