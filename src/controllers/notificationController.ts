import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import {
  getNotificationsByUser,
  markNotificationAsRead,
} from "../models/notificationModel";

// Get all notifications for the logged-in user
export const getMyNotifications = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const notifications = await getNotificationsByUser(userId);
    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

// Mark a notification as read
export const markAsRead = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const notificationId = req.params.id;

    const notification = await markNotificationAsRead(notificationId, userId);

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.json({ message: "Notification marked as read", notification });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ error: "Failed to mark notification as read" });
  }
};
