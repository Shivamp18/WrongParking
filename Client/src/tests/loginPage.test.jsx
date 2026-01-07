
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { loginUser } from "../api/Api";


jest.mock("../api/Api", () => ({
  loginUser: jest.fn()
}));

describe("Login Page behaviour", () => {

  beforeEach(() => {
    
    jest.clearAllMocks();

    
    jest.spyOn(window, "alert").mockImplementation(() => {});

    
    localStorage.clear();
  });

  test("renders login form fields correctly", () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    
    expect( screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();

    
    expect(
      screen.getByPlaceholderText("Enter your mobile number")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Enter your password")
    ).toBeInTheDocument();
  });

  test("shows error message when login API returns error", async () => {
    
    loginUser.mockResolvedValue({
      data: { error: "Invalid credentials" }
    });

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    
    fireEvent.change(
      screen.getByPlaceholderText("Enter your mobile number"),
      { target: { value: "+911234567890" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter your password"),
      { target: { value: "wrongpass" } }
    );

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    
    await waitFor(() => {
      expect(
        screen.getByText("Invalid credentials")
      ).toBeInTheDocument();
    });
  });

  test("logs in successfully and saves token to localStorage", async () => {
    
    loginUser.mockResolvedValue({
      data: { token: "fake-jwt-token" }
    });

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    
    fireEvent.change(
      screen.getByPlaceholderText("Enter your mobile number"),
      { target: { value: "+911234567890" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter your password"),
      { target: { value: "123456" } }
    );

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      
      expect(loginUser).toHaveBeenCalledTimes(1);

      
      expect(localStorage.getItem("token")).toBe("fake-jwt-token");
    });
  });

});
