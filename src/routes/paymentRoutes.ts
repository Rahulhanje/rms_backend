import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware, ROLES } from "../middlewares/roleMiddleware";
import { payChallan, getMyPayments } from "../controllers/paymentController";

const router = Router();

// Citizen only routes
router.post("/payments/pay/:challanId", authMiddleware, roleMiddleware([ROLES.CITIZEN]), payChallan);
router.get("/payments/my", authMiddleware, roleMiddleware([ROLES.CITIZEN]), getMyPayments);

export default router;
