import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

// TEMP secret for rebuild (we'll move to env later)
const JWT_SECRET = "rebuild-secret";

router.post("/login", (req, res) => {
    const { email } = req.body;

    // fake user for now
    const token = jwt.sign(
        { email, role: "roaster" },
        JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.json({ token });
});

router.post("/register", (req, res) => {
    res.json({ message: "register placeholder" });
});

export default router;

