import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getMyNotifications, markAsRead } from "../controllers/notificationController";

const router = Router();

// Get all notifications for logged-in user
router.get("/notifications", authMiddleware, getMyNotifications);

// Mark a notification as read
router.put("/notifications/:id/read", authMiddleware, markAsRead);

export default router;
