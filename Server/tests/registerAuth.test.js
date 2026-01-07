
import request from "supertest";
import app from "../app.js";
import pool from "../db.js";

describe("Auth API - User Registration", () => {

  
  beforeAll(async () => {
    await pool.query("DELETE FROM users");
  });

  test("registers a new user successfully", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        first_name: "Shivam",
        last_name: "Pandey",
        email: "shivam@test.com",
        password: "123456",
        mobile: "+911234567890",
        vehicle_number: "AB32AB1234"
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("User registered successfully!");
  });

  test("prevents registration with an existing email", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        first_name: "Shivam",
        last_name: "Pandey",
        email: "shivam@test.com", 
        password: "123456",
        mobile: "+911234567891",
        vehicle_number: "AB32AB1235"
      });

    expect(response.body.error).toBe("User already exists!");
  });

   test("prevents registration with an existing vehicle number", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        first_name: "Shivam",
        last_name: "Pandey",
        email: "shiv@test.com",
        password: "123456",
        mobile: "+911234567891",
        vehicle_number: "AB32AB1234"
      });

    expect(response.body.error).toBe("User already exists with same Vehicle Number!");
  });

    test("prevents registration with an existing mobile number", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        first_name: "Shivam",
        last_name: "Pandey",
        email: "sh@test.com",
        password: "123456",
        mobile: "+911234567890",
        vehicle_number: "AB32AB1236"
      });

    expect(response.body.error).toBe("User already exists with same Mobile Number!");
  });

});
