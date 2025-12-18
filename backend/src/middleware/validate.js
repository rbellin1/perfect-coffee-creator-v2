export const validate =
    (schema) =>
        (req, res, next) => {
            try {
                req.body = schema.parse(req.body);
                next();
            } catch (err) {
                // Zod error handling (v4 compatible)
                const issues = err.issues || [];

                return res.status(400).json({
                    message: "Validation failed",
                    errors: issues.map((issue) => ({
                        field: issue.path.join("."),
                        message: issue.message,
                    })),
                });
            }
        };
