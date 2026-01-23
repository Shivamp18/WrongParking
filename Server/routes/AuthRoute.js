
import express from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password, mobile, vehicle_number } = req.body;


    const userExists = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.json({ error: "User already exists!" });
    }

    const vehicleExists = await pool.query(
      "SELECT id FROM users WHERE vehicle_number = $1",
      [vehicle_number]
    );

    if (vehicleExists.rows.length > 0) {
      return res.json({ error: "User already exists with same Vehicle Number!" });
    }

    const mobileExists = await pool.query(
      "SELECT id FROM users WHERE mobile = $1",
      [mobile]
    );

    if (mobileExists.rows.length > 0) {
      return res.json({ error: "User already exists with same Mobile Number!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `
        INSERT INTO users (first_name, last_name, email, password, mobile, vehicle_number)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id;
      `,
      [first_name, last_name, email, hashedPassword, mobile, vehicle_number]
    );

    return res.json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ error: "Something went wrong on the server" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { mobile, password } = req.body;


    const user = await pool.query(
      "SELECT * FROM users WHERE mobile = $1",
      [mobile]
    );

    if (user.rows.length === 0) {
      return res.json({ error: "User not found" });
    }

    const storedUser = user.rows[0];


    const validPassword = await bcrypt.compare(password, storedUser.password);

    if (!validPassword) {
      return res.json({ error: "Incorrect password" });
    }


    const token = jwt.sign(
      { id: storedUser.id },
      process.env.JWT_SECRET || "test-secret",
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user.rows[0].id,
        first_name: user.rows[0].first_name,
        last_name: user.rows[0].last_name,
        email: user.rows[0].email,
        mobile: user.rows[0].mobile,
        vehicle_number: user.rows[0].vehicle_number
      }
    });

  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "Server error, please try again later" });
  }
});

router.put("/update", async (req, res) => {
  try {
    console.log("Update request body:", req.body);
    const { first_name, last_name, email, vehicle_number, userId, profile_image } = req.body;

    
    const emailExists = await pool.query(
      "SELECT id FROM users WHERE email = $1 AND id != $2",
      [email, userId]
    );

    if (emailExists.rows.length > 0) {
      return res.json({ error: "User already exists!" });
    }

    
    const vehicleExists = await pool.query(
      "SELECT id FROM users WHERE vehicle_number = $1 AND id != $2",
      [vehicle_number, userId]
    );

    if (vehicleExists.rows.length > 0) {
      return res.json({ error: "User already exists with same Vehicle Number!" });
    }

    
    await pool.query(
      `
      UPDATE users
      SET first_name = $1,
          last_name = $2,
          email = $3,
          vehicle_number = $4,
          profile_image = $6
      WHERE id = $5
      `,
      [first_name, last_name, email, vehicle_number, userId, profile_image]
    );

    res.json({ message: "User updated successfully!" });

  } catch (error) {
    console.error("Update error:", error.message);
    res.status(500).json({ error: "Something went wrong on the server" });
  }
});



export default router;
