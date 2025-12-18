import { Router } from "express";
import authRoutes from "./auth.js";
import coffeeRoutes from "./coffees.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

router.use("/auth", authRoutes);
router.use("/coffees", coffeeRoutes);

router.get("/protected", authMiddleware, (req, res) => {
    res.json({
        message: "Protected route works",
        user: req.user,
    });
});

export default router;
