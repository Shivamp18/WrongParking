
import request from "supertest";
import app from "../app.js";
import pool from "../db.js";

describe("Auth API - User Updation", () => {

  let user1Id;
  let user2Id;

  beforeAll(async () => {
    await pool.query("DELETE FROM users");
    const res1 = await pool.query(
      `INSERT INTO users (first_name,last_name,email,password,mobile,vehicle_number)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING id`,
      ["Shivam","Pandey","shivam@test.com","hash","+911234567890","AB32AB1234"]
    );
    user1Id = res1.rows[0].id;

    const res2 = await pool.query(
      `INSERT INTO users (first_name,last_name,email,password,mobile,vehicle_number)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING id`,
      ["Other","User","other@test.com","hash","+911234567891","AB32AB9999"]
    );
    user2Id = res2.rows[0].id;
  });

  test("updates a user successfully", async () => {
    const response = await request(app)
      .post("/api/auth/update")
      .send({
        first_name: "Shivam",
        last_name: "Pandey",
        email: "shivam@test.com",
        vehicle_number: "AB32AB1234",
        userId: user1Id
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("User updated successfully!");
  });

  test("prevents registration with an existing email", async () => {
    const response = await request(app)
      .post("/api/auth/update")
      .send({
        first_name: "Other",
        last_name: "User",
        email: "shivam@test.com",
        vehicle_number: "AB32AB1235",
        userId: user2Id
      });

    expect(response.body.error).toBe("User already exists!");
  });

   test("prevents registration with an existing vehicle number", async () => {
    const response = await request(app)
      .post("/api/auth/update")
      .send({
        first_name: "Other",
        last_name: "User",
        email: "unique@test.com",
        vehicle_number: "AB32AB1234",
        userId: user2Id
      });

    expect(response.body.error).toBe("User already exists with same Vehicle Number!");
  });


});
