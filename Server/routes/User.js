
import express from "express";
import authMiddleware from "../middleware/AuthMiddleware.js";
import pool from "../db.js";

const router = express.Router();


router.get("/dashboard", authMiddleware, async (req, res) => {
  const user = await pool.query(
    "SELECT id, first_name, last_name, email, mobile, vehicle_number, profile_image FROM users WHERE id = $1",
    [req.user.id,]
  );
  res.json({
    message: "Welcome to dashboard",
    userId: req.user.id,
     user: {
        id: user.rows[0].id,
        first_name: user.rows[0].first_name,
        last_name: user.rows[0].last_name,
        email: user.rows[0].email,
        mobile: user.rows[0].mobile,
        vehicle_number: user.rows[0].vehicle_number,
        profile_image: user.rows[0].profile_image
      }
  });
});

export default router;
