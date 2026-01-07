
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import { registerUser } from "../api/Api";


jest.mock("../api/Api", () => ({
  registerUser: jest.fn()
}));

describe("Register Page", () => {

  beforeEach(() => {
    
    jest.clearAllMocks();

    
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  it("shows validation alert when first name is missing", () => {
    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );

    
    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    
    expect(window.alert).toHaveBeenCalled();
  });

 it("shows validation alert when last name is missing", () => {
    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter your first name"), {
  target: { value: "Shivam" }
});

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    
    expect(window.alert).toHaveBeenCalledWith("Last name can't be empty");
    
  });

 it("shows validation alert when vehicle number is invalid", () => {
    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );

  fireEvent.change(screen.getByPlaceholderText("Enter your first name"), {
  target: { value: "Shivam" }
});

  fireEvent.change(screen.getByPlaceholderText("Enter your last name"), {
  target: { value: "Shiva" }
});

    fireEvent.change(screen.getByPlaceholderText("e.g., KA01AB1234"), {
  target: { value: "1234" }
});

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    
    expect(window.alert).toHaveBeenCalledWith("Please enter a valid vehicle number");
    
  });

 it("shows validation alert when vehicle number is invalid", () => {
    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );

  fireEvent.change(screen.getByPlaceholderText("Enter your first name"), {
  target: { value: "Shivam" }
});

  fireEvent.change(screen.getByPlaceholderText("Enter your last name"), {
  target: { value: "Shiva" }
});

   fireEvent.change(screen.getByPlaceholderText("e.g., KA01AB1234"), {
  target: { value: "AB32A1234" }
});

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    
    expect(window.alert).toHaveBeenCalledWith("Please enter a valid vehicle number");
    
  });

   it("shows validation alert when vehicle number is invalid", () => {
    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );

  fireEvent.change(screen.getByPlaceholderText("Enter your first name"), {
  target: { value: "Shivam" }
});

  fireEvent.change(screen.getByPlaceholderText("Enter your last name"), {
  target: { value: "Shiva" }
});

   fireEvent.change(screen.getByPlaceholderText("e.g., KA01AB1234"), {
  target: { value: "ab32ab1234" }
});

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    
    expect(window.alert).toHaveBeenCalledWith("Please enter a valid vehicle number");
    
  });

  it("shows validation alert when mobile number is invalid", () => {
    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );

  fireEvent.change(screen.getByPlaceholderText("Enter your first name"), {
  target: { value: "Shivam" }
});

  fireEvent.change(screen.getByPlaceholderText("Enter your last name"), {
  target: { value: "Shiva" }
});

   fireEvent.change(screen.getByPlaceholderText("e.g., KA01AB1234"), {
  target: { value: "AB32AB1234" }
});

  fireEvent.change(screen.getByPlaceholderText("+91XXXXXXXXXX"), {
  target: { value: "+911234" }
});

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    
    expect(window.alert).toHaveBeenCalledWith("Please enter a valid mobile number");
    
  });

  it("shows validation alert when email is invalid", () => {
    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );

  fireEvent.change(screen.getByPlaceholderText("Enter your first name"), {
  target: { value: "Shivam" }
});

  fireEvent.change(screen.getByPlaceholderText("Enter your last name"), {
  target: { value: "Shiva" }
});

   fireEvent.change(screen.getByPlaceholderText("e.g., KA01AB1234"), {
  target: { value: "AB32AB1234" }
});

  fireEvent.change(screen.getByPlaceholderText("+91XXXXXXXXXX"), {
  target: { value: "+911234567890" }
});

  fireEvent.change(screen.getByPlaceholderText("abcd@gmail.com"), {
  target: { value: "abcd@" }
});

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    
    expect(window.alert).toHaveBeenCalledWith("Please enter a valid email");
    
  });

  it("shows validation alert when email is invalid", () => {
    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );

  fireEvent.change(screen.getByPlaceholderText("Enter your first name"), {
  target: { value: "Shivam" }
});

  fireEvent.change(screen.getByPlaceholderText("Enter your last name"), {
  target: { value: "Shiva" }
});

   fireEvent.change(screen.getByPlaceholderText("e.g., KA01AB1234"), {
  target: { value: "AB32AB1234" }
});

  fireEvent.change(screen.getByPlaceholderText("+91XXXXXXXXXX"), {
  target: { value: "+911234567890" }
});

  fireEvent.change(screen.getByPlaceholderText("abcd@gmail.com"), {
  target: { value: "abcdgmail.com" }
});

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    
    expect(window.alert).toHaveBeenCalledWith("Please enter a valid email");
    
  });

 it("calls register API with correct payload", async () => {
    
    registerUser.mockResolvedValue({
      data: { message: "User registered successfully!" }
    });

    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );

    
    fireEvent.change(screen.getByPlaceholderText("Enter your first name"), {
      target: { value: "abc" }
    });

    fireEvent.change(screen.getByPlaceholderText("Enter your last name"), {
      target: { value: "xyz" }
    });

    fireEvent.change(screen.getByPlaceholderText("e.g., KA01AB1234"), {
      target: { value: "AB32AB1234" }
    });

    fireEvent.change(screen.getByPlaceholderText("+91XXXXXXXXXX"), {
      target: { value: "+911234567890" }
    });

    fireEvent.change(screen.getByPlaceholderText("abcd@gmail.com"), {
      target: { value: "abc@test.com" }
    });

    fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
      target: { value: "123456" }
    });

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    
    expect(registerUser).toHaveBeenCalledWith({
       first_name: "abc",
    last_name: "xyz",
    email: "abc@test.com",
    password: "123456",
    vehicle_number: "AB32AB1234",
    mobile: "+911234567890"
    });
  });

});
