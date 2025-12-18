import { z } from "zod";

export const createCoffeeSchema = z.object({
    name: z.string().min(1, "Name is required"),
    origin: z.string().min(1, "Origin is required"),
    roast: z.string().min(1, "Roast is required"),
});

export const updateCoffeeSchema = z.object({
    name: z.string().min(1).optional(),
    origin: z.string().min(1).optional(),
    roast: z.string().min(1).optional(),
});
