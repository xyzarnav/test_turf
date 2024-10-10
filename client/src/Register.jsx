import React, { useState } from "react";
import "./Register.css"; // Import your custom CSS file
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Form, Input, Button, Select, DatePicker, InputNumber } from "antd";
// import {
//   PhoneOutlined,
//   MailOutlined,
//   UserOutlined,
//   LockOutlined,
//   WalletOutlined,
// } from "@ant-design/icons";
// import "antd/dist/antd.css";

import Modal from "react-modal";

import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Initialize Stripe
const stripePromise = loadStripe(
  "pk_test_51Q3JV201cMS3vICJOLyDFs0E2ePeOqoN0IzyFQqlzrbR7ln2BZDkirQW3Jp8Xc6gRmX0r4unuD4pIqPuBpclhgfV00y9FZEUE4"
);

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [userId, setUserId] = useState(null); // New state for user_id
  const [wallet, setWallet] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [contact, setContact] = useState("");
  const [passwordError, setPasswordError] = useState("");
    const [contactError, setContactError] = useState("");


    const validateContact = (contact) => {
      const regex = /^\d{10}$/;
      if (!regex.test(contact)) {
        setContactError("Contact number must be exactly 10 digits long.");
      } else {
        setContactError("");
      }
    };

    const handleContactChange = (e) => {
      const newContact = e.target.value;
      setContact(newContact);
      validateContact(newContact);
    };

  const navigate = useNavigate();
  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
    } else {
      setPasswordError("");
    }
  };

   const handlePasswordChange = (e) => {
     const newPassword = e.target.value;
     setPassword(newPassword);
     validatePassword(newPassword);
   };


  const stripe = useStripe();
  const elements = useElements();

  const handleRegister = async (e) => {
    e.preventDefault();

    const registrationResponse = await fetch("http://localhost:3001/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        dateOfBirth,
        gender,
        contact,
      }),
    }).then((res) => res.json());

    console.log("Registration response:", registrationResponse);

    if (registrationResponse.message === "User registered successfully") {
      setUserId(registrationResponse.user_id); // Store user_id in state
      setModalIsOpen(true); // Open the modal for payment input
    } else {
      toast.error("Registration failed. Please try again.");
    }
  };

  const handlePayment = async () => {
    toast.info("Payment processing...", { autoClose: 800 });
    if (stripe && elements) {
      const { clientSecret } = await fetch(
        "http://localhost:3001/create-payment-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: wallet }),
        }
      ).then((res) => res.json());

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        setErrorMessage(error.message);
      } else if (paymentIntent.status === "succeeded") {
        // Payment succeeded
        toast.success("Payment successful!", { autoClose: 1000 });

        // Now update the wallet balance using the userId from state
        await fetch("http://localhost:3001/update-wallet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId, // Use user_id from state
            amount: wallet,
          }),
        });

        // Now that both registration and payment are complete, show the success toast for registration
        toast.success("Registration and payment complete!");
        navigate("/");
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register-form">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          {/* Existing registration fields */}
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div>
            <label htmlFor="contact">Contact</label>
            <input
              type="number"
              value={contact}
              onChange={handleContactChange}
              placeholder="+91"
              required
            />
            {contactError && <p style={{ color: "red" }}>{contactError}</p>}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}

            <label htmlFor="wallet">Wallet (Add Money)</label>
            <input
              type="number"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              min="100"
              step="10"
              required
            />
          </div>

          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />

          <label htmlFor="gender">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          {/* Submit button */}
          <button type="submit">Register & Pay</button>

          {/* Error message */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            width: "350px",
            height: "450px",
            margin: "auto",
            backgroundColor: "white",
            color: "black",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Adds a subtle shadow
            padding: "20px",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim the background
          },
        }}
      >
        {/* Payment Logo Section */}
        <div
          className="flex justify-center items-center mb-4 p-4"
          style={{
            border: "2px solid black", // Border around the logos
            borderRadius: "10px", // Rounded corners
            backgroundColor: "rgba(0, 0, 0, 0.08)", // Slight background for contrast
          }}
        >
          <img
            src="https://logos-world.net/wp-content/uploads/2021/03/Stripe-Logo.png"
            alt="Stripe Logo"
            style={{ width: "100px", marginRight: "40px" }}
          />
          <img
            src="https://www.urbantool.com/wp-content/uploads/2016/12/paypal-logo-png-416x111.png"
            alt="PayPal Logo"
            style={{ width: "130px" }}
          />
        </div>

        {/* Card Input */}
        <div className="w-full mb-6">
          <label
            htmlFor="card-element"
            className="block text-sm font-medium text-gray-700"
          >
            Credit or Debit Card
          </label>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
            className="bg-gray-100 p-3 rounded"
          />
        </div>

        {/* Buttons Section */}
        <div className="w-full flex justify-between">
          <button
            onClick={handlePayment}
            className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Pay Now
          </button>
          <button
            onClick={() => setModalIsOpen(false)}
            className="bg-red-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-700 transition-colors"
          >
            Close
          </button>
        </div>
        <div className="text-center text-gray-500 text-sm mt-4">
          <p>&copy; 2023 Your Company Name. All rights reserved.</p>
          <p>Payment processing provided by Stripe and PayPal.</p>
        </div>
      </Modal>
    </div>
  );
};

// Wrap the component in Elements for Stripe
const RegisterPageWrapper = () => (
  <Elements stripe={stripePromise}>
    <RegisterPage />
  </Elements>
);

export default RegisterPageWrapper;
