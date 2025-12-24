import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware, ROLES } from "../middlewares/roleMiddleware";
import { issueChallan, getVehicleChallans, getMyChallans } from "../controllers/challanController";

const router = Router();

// POST - Police only
router.post("/challans", authMiddleware, roleMiddleware([ROLES.POLICE]), issueChallan);

// GET - Authenticated users can view challans by vehicle
router.get("/challans/vehicle/:vehicleId", authMiddleware, getVehicleChallans);

// GET - Citizens can view their own challans
router.get("/challans/my", authMiddleware, getMyChallans);

export default router;
