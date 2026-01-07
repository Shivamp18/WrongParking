
import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UserDashboard from "../pages/UserDashboard";
import axios from "axios";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


jest.mock("axios");


const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate
}));

describe("UserDashboard Page", () => {

  beforeEach(() => {
    jest.clearAllMocks();


    jest.spyOn(window, "alert").mockImplementation(() => { });


    localStorage.setItem("token", "fake-token");
  });

  test("loads and displays user details after API call", async () => {
    axios.get.mockResolvedValue({
      data: {
        user: {
          mobile: "+911234567890",
          first_name: "abc",
          last_name: "xyz",
          email: "abc@test.com",
          vehicle_number: "AB32AB1234"
        }
      }
    });

    render(
      <BrowserRouter>
        <UserDashboard />
      </BrowserRouter>
    );


    await waitFor(() => {
      expect(screen.getByText("abc")).toBeInTheDocument();
      expect(screen.getByText("xyz")).toBeInTheDocument();
      expect(screen.getByText("abc@test.com")).toBeInTheDocument();
      expect(screen.getByText("AB32AB1234")).toBeInTheDocument();
      expect(screen.getByText("+911234567890")).toBeInTheDocument();
    });
  });

  test("shows alert when dashboard API fails", async () => {
    axios.get.mockRejectedValue(new Error("Unauthorized"));

    render(
      <BrowserRouter>
        <UserDashboard />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "Unauthorized or session expired"
      );
    });
  });

  test("redirects to edit profile page when edit icon is clicked", async () => {
    axios.get.mockResolvedValue({
      data: {
        mobile: "+911234567890"
      }
    });

    render(
      <BrowserRouter>
        <UserDashboard />
      </BrowserRouter>
    );

    await sleep(1000);
    const editIcon = await screen.getByRole("button", { name: /edit-profile/i });
    fireEvent.click(editIcon);

    expect(mockNavigate).toHaveBeenCalledWith("/edit-profile");
  });

});
