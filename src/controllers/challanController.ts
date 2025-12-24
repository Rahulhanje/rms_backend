import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { createChallan, getChallansByVehicle, getChallansByUser } from "../models/challanModel";

// Issue a challan (police only)
export const issueChallan = async (req: AuthRequest, res: Response) => {
  try {
    const { vehicle_id, violation_type, amount } = req.body;

    if (!vehicle_id || !violation_type || !amount) {
      return res.status(400).json({ message: "vehicle_id, violation_type, and amount are required" });
    }

    // Get issued_by from authenticated police user
    const issued_by = req.user?.id;

    if (!issued_by) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const challan = await createChallan(vehicle_id, issued_by, violation_type, amount);
    res.status(201).json({ message: "Challan issued", challan });
  } catch (error) {
    console.error("Error issuing challan:", error);
    res.status(500).json({ message: "Failed to issue challan" });
  }
};

// Get challans by vehicle id
export const getVehicleChallans = async (req: AuthRequest, res: Response) => {
  try {
    const { vehicleId } = req.params;

    if (!vehicleId) {
      return res.status(400).json({ message: "Vehicle ID is required" });
    }

    const challans = await getChallansByVehicle(vehicleId);
    res.json({ challans });
  } catch (error) {
    console.error("Error fetching vehicle challans:", error);
    res.status(500).json({ message: "Failed to fetch challans" });
  }
};

// Get challans for authenticated user's vehicles
export const getMyChallans = async (req: AuthRequest, res: Response) => {
  try {
    const user_id = req.user?.id;

    if (!user_id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const challans = await getChallansByUser(user_id);
    res.json({ challans });
  } catch (error) {
    console.error("Error fetching user challans:", error);
    res.status(500).json({ message: "Failed to fetch challans" });
  }
};
