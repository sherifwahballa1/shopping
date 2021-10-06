const http = require("http");

const app = require("./app.js");

/**
 * Get port from environment and store in Express.
 */
const PORT = normalizePort(process.env.PORT || "9000");

// set port
app.set("port", PORT);

const server = http.createServer(app).listen(PORT, () => {
  console.log(`Server started`);
});

// server events on errors or running
server.on("error", onError);
server.on("listening", onListening);

// meaning that app is in an undefined state
process.on("uncaughtException", (err, origin) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log("✗ ", err.name, err.message);
//   process.exit(1);
});

// Graceful shutdown means when all your requests to the server is respond and not any data processing work left.
// check if there's no requests from users not respond and handle all these requests
// The SIGTERM signal is a generic signal used to cause program termination. Unlike SIGKILL, this signal can be blocked, handled, and ignored. It is the normal way to politely ask a program to terminate
process.on("SIGTERM", gracefulShutdown);

// 'SIGINT' generated with <Ctrl>+C in the terminal.
process.on("SIGINT", gracefulShutdown);

process.on("exit", (code) => {
  console.log("Process exit event with code: ", code);
});

process.on("warning", (warning) => {
  console.warn(warning.name); // Print the warning name
  console.warn(warning.message); // Print the warning message
  console.warn(warning.stack); // Print the stack trace
});

// Handle process kill signal
// Stop new requests from client
// Close all data process
// Exit from process
function gracefulShutdown() {
  // Handle process kill signal
  console.info("👋 SIGTERM RECEIVED. Shutting down gracefully");
  console.log("Closing http server.");

  // Stop new requests from client
  server.close(() => {
    console.log("Http server closed.");
    // boolean means [force], see in mongoose doc
    // Close all data process
    process.exit(1);
  });
}

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  let addr = server.address();
  let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log(`################## running on ${bind} ##################`);
}

module.exports = server;
