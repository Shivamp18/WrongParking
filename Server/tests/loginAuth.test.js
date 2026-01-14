
import request from "supertest";
import app from "../app";
import pool from "../db.js";
import bcrypt from "bcrypt";

describe("POST /api/login", () => {
  beforeAll(async () => {
    await pool.query("DELETE FROM users");
    const hashed = await bcrypt.hash("123456", 10);
    await pool.query(
      `INSERT INTO users (first_name, last_name, email, password, mobile, vehicle_number)
       VALUES ($1,$2,$3,$4,$5,$6)`,
      ["Test","User","test@test.com",hashed,"+911234567890","AB32AB1234"]
    );
  });

  it("logs in user with correct credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        mobile: "+911234567890",
        password: "123456"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
