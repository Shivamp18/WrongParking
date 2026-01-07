
import request from "supertest";
import app from "../app.js";
import pool from "../db.js";

describe("Auth API - User Updation", () => {

  
  beforeAll(async () => {
    await pool.query("DELETE FROM users");
  });

  test("updates a user successfully", async () => {
    const response = await request(app)
      .post("/api/auth/update")
      .send({
        first_name: "Shivam",
        last_name: "Pandey",
        email: "shivam@test.com",
        vehicle_number: "AB32AB1234",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("User updated successfully!");
  });

  test("prevents registration with an existing email", async () => {
    const response = await request(app)
      .post("/api/auth/update")
      .send({
        first_name: "Shivam",
        last_name: "Pandey",
        email: "shivam@test.com",
        vehicle_number: "AB32AB1235"
      });

    expect(response.body.error).toBe("User already exists!");
  });

   test("prevents registration with an existing vehicle number", async () => {
    const response = await request(app)
      .post("/api/auth/update")
      .send({
        first_name: "Shivam",
        last_name: "Pandey",
        email: "shiv@test.com",
        vehicle_number: "AB32AB1234"
      });

    expect(response.body.error).toBe("User already exists with same Vehicle Number!");
  });


});
