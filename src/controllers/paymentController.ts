import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { createPayment, getPaymentsByUser } from "../models/paymentModel";
import { getChallanById, updateChallanStatus } from "../models/challanModel";

// Pay a challan (citizen only)
export const payChallan = async (req: AuthRequest, res: Response) => {
  try {
    const { challanId } = req.params;
    const user_id = req.user?.id;

    if (!user_id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Get the challan
    const challan = await getChallanById(challanId);

    if (!challan) {
      return res.status(404).json({ message: "Challan not found" });
    }

    // Check if already paid
    if (challan.status === "PAID") {
      return res.status(400).json({ message: "Challan already paid" });
    }

    // Create payment record
    const payment = await createPayment(challanId, user_id, challan.amount);

    // Update challan status to PAID
    await updateChallanStatus(challanId, "PAID");

    res.status(201).json({ message: "Payment successful", payment });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ message: "Failed to process payment" });
  }
};

// Get payments for authenticated user
export const getMyPayments = async (req: AuthRequest, res: Response) => {
  try {
    const user_id = req.user?.id;

    if (!user_id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const payments = await getPaymentsByUser(user_id);
    res.json({ payments });
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ message: "Failed to fetch payments" });
  }
};
