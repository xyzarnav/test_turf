import React, { useState } from "react";
import "./Register.css"; // Import your custom CSS file
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
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
  const [wallet, setWallet] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const handleRegister = async (e) => {
    e.preventDefault();

    const registrationResponse = await fetch("http://localhost:3001/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, dateOfBirth, gender }),
    }).then((res) => res.json());

    console.log("Registration response:", registrationResponse);

    if (registrationResponse.message === "User registered successfully") {
      alert("Registration successful!");

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
          alert("Payment successful!");

          console.log("Sending wallet update request...", {
            user_id: registrationResponse.user_id, // Ensure user_id is logged here
            amount: wallet,
          });

          // Update the wallet balance
          await fetch("http://localhost:3001/update-wallet", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: registrationResponse.user_id, // Send user_id from registration response
              amount: wallet,
            }),
          });

          navigate("/");
        }
      }
    } else {
      setErrorMessage("Registration failed.");
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

          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="wallet">Wallet (Add Money)</label>
          <input
            type="number"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            min="100"
            step="10"
            required
          />

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

          {/* Stripe Card Element */}
          <label htmlFor="card">Card Details</label>
          <CardElement />

          {/* Submit button */}
          <button type="submit">Register & Pay</button>

          {/* Error message */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
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
