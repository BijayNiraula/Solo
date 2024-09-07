import dotenv from "dotenv";
import cors from "cors";

// Load environment variables
dotenv.config();

// CORS options
const corsOptions = {
  methods: ["PUT", "GET", "POST", "DELETE"],
  origin: (origin, callback) => {
    // Allow all origins
    callback(null, true);
  },
  credentials: true, // Allow credentials
  allowedHeaders: ["Content-Type", "Authorization"], // Optional: specify allowed headers
};

// Create CORS middleware
const corsMiddleware = cors(corsOptions);

// Export CORS middleware
export default corsMiddleware;
