import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import {
    createCoffeeSchema,
    updateCoffeeSchema,
} from "../validation/coffeeSchema.js";



const router = Router();

// In-memory store (temporary)
let coffees = [];
let idCounter = 1;

// CREATE
router.post(
    "/",
    authMiddleware,
    validate(createCoffeeSchema),
    (req, res) => {
        const coffee = {
            id: idCounter++,
            ...req.body,
            roaster: req.user.email,
        };

        coffees.push(coffee);
        res.status(201).json(coffee);
    });

// READ ALL
router.get("/", authMiddleware, (req, res) => {
    res.json(coffees);
});



// READ ONE
router.get("/:id", authMiddleware, (req, res) => {
    const coffee = coffees.find(c => c.id === Number(req.params.id));
    if (!coffee) {
        return res.status(404).json({ message: "Coffee not found" });
    }
    res.json(coffee);
});

// UPDATE
router.put(
    "/:id",
    authMiddleware,
    validate(updateCoffeeSchema),
    (req, res) => {

        const index = coffees.findIndex(c => c.id === Number(req.params.id));
        if (index === -1) {
            return res.status(404).json({ message: "Coffee not found" });
        }

        coffees[index] = { ...coffees[index], ...req.body };
        res.json(coffees[index]);
    });

// DELETE
router.delete("/:id", authMiddleware, (req, res) => {
    coffees = coffees.filter(c => c.id !== Number(req.params.id));
    res.json({ message: "Coffee deleted" });
});

export default router;
