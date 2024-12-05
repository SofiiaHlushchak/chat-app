// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import * as chatController from "./controllers/chatController.js";
import { configureSocketIO } from "./sockets/socketConfig.js"; // Імпортуємо конфігурацію сокетів
import { socketIOMiddleware } from "./middleware/socketIO.js"; // Імпортуємо middleware для io

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected");
        chatController.createPredefinedChats(); // Створюємо чати при запуску
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

const corsOptions = {
    origin: process.env.CLIENT_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const io = configureSocketIO(server);

app.use(socketIOMiddleware(io));

app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

export default app;
