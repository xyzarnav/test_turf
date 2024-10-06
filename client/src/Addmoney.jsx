import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { BookOutlined, DollarOutlined } from "@ant-design/icons";
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

const AddMoneyPage = () => {
  const [wallet, setWallet] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleAddMoney = async (e) => {
    e.preventDefault();
    setModalIsOpen(true);
  };

  const handlePayment = async () => {
    toast.info("Processing payment...", { autoClose: 950 });

    if (stripe && elements) {
      const { clientSecret } = await fetch(
        "http://localhost:3001/create-payment-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: wallet * 100 }), // Stripe expects amount in cents
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
        toast.success("Payment successful!", { autoClose: 1000 });

        await fetch("http://localhost:3001/update-wallet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: 1, // Replace with actual user ID from your app's state
            amount: wallet,
          }),
        });

        toast.success("Wallet updated successfully!");
        setModalIsOpen(false);
        navigate("/profile"); // Redirect after payment success
      }
    }
  };

  return (
    <div className="add-money-page flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="add-money-form bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add Money to Wallet
        </h2>
        <form onSubmit={handleAddMoney} className="space-y-4">
          <div>
            <label
              htmlFor="wallet"
              className="block text-sm font-medium text-gray-700"
            >
              Amount to Add (in ₹)
            </label>
            <input
              type="number"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              min="100"
              step="10"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Proceed to Pay
          </button>
        </form>
        <div className="flex justify-center space-x-4 pt-5">
          <Link to="/view-bookings">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 ease-in-out flex items-center">
              <BookOutlined className="mr-2" />
              View Bookings
            </button>
          </Link>
          <Link to="/Profile">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 ease-in-out flex items-center">
              
             Profile
            </button>
          </Link>
        </div>
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
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "10px",
            padding: "20px",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <h2 className="text-xl font-bold mb-4">Payment Details</h2>

        <div className="payment-section w-full">
          <label
            htmlFor="card-element"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Credit or Debit Card
          </label>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": { color: "#aab7c4" },
                },
                invalid: { color: "#9e2146" },
              },
            }}
            className="bg-gray-100 p-3 rounded w-full"
          />
        </div>

        <div className="button-section w-full mt-4 flex justify-between">
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
        <p className="text-center text-gray-500 text-sm mt-4">
          Payment processing by Stripe
        </p>
      </Modal>
    </div>
  );
};

const AddMoneyWrapper = () => (
  <Elements stripe={stripePromise}>
    <AddMoneyPage />
  </Elements>
);

export default AddMoneyWrapper;