import React, { useState, useEffect, useRef } from "react";
import "./BookingPage.css"; // Ensure you have any custom CSS if needed
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Card, DatePicker } from "antd";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";

const BookingPage = () => {
  const [turf, setTurf] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [selectedTime, setSelectedTime] = useState("");
  const [paymentProof, setPaymentProof] = useState(null);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [playerFinder, setPlayerFinder] = useState(0);
  const [methodOfBooking, setMethodOfBooking] = useState("online");
  const [contact, setContact] = useState("");
  const [showContactDiv, setShowContactDiv] = useState(false);
  const [userId, setUserId] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);

  useEffect(() => {
    const storedUserId = localStorage.UserID;
    if (storedUserId) {
      setUserId(storedUserId);
      fetchWalletBalance(storedUserId);
    } else {
      console.error("UserId not found in local storage.");
    }
  }, []);

  const fetchWalletBalance = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/wallet/${userId}`
      );
      setWalletBalance(response.data.wallet_balance);
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
    }
  };

  const toastShownRef = useRef(false);

  useEffect(() => {
    const turfId = localStorage.getItem("selectedTurfId");
    if (!turfId) {
      console.error("No turf ID provided");
      return;
    }

    axios
      .get(`http://localhost:3001/turfs/${turfId}`)
      .then((response) => {
        setTurf(response.data);
      })
      .catch((error) => console.error("Error fetching turf:", error));
  }, []);

  useEffect(() => {
    if (!turf || !date) {
      return;
    }

    axios
      .get(`http://localhost:3001/turfs/${turf.id}/availability?date=${date}`)
      .then((response) => {
        setBookedSlots(response.data);
      })
      .catch((error) => console.error("Error fetching availability:", error));
  }, [turf, date]);

  useEffect(() => {
    if (playerFinder !== 0 && !toastShownRef.current) {
      toast.info(
        "If you are using the player finder feature, you are required to enter your contact number.",
        {
          className: "custom-toast",
          bodyClassName: "custom-toast-body",
        }
      );
      setShowContactDiv(true);
      toastShownRef.current = true;
    } else if (playerFinder === 0) {
      setShowContactDiv(false);
      toastShownRef.current = false;
    }
  }, [playerFinder]);

    const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (methodOfBooking !== "in_person" && !paymentProof) {
      console.error("Please select payment proof");
      return;
    }
  
    if (walletBalance < turf.price) {
      toast.error("Insufficient wallet balance to book the turf.");
      return;
    }
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("date", date);
    formData.append("time_slot", selectedTime);
    formData.append("paymentProof", paymentProof);
    formData.append("numberOfPeople", numberOfPeople);
    formData.append("turfId", turf.id);
    formData.append("method_of_booking", methodOfBooking);
    formData.append("player_finder", playerFinder);
    formData.append("contact", contact);
    formData.append("user_id", userId);
  
    try {
      const bookingResponse = await axios.post("http://localhost:3001/bookings", formData);
      console.log("Booking successful:", bookingResponse.data);
  
      // Deduct balance after successful booking
     
     if (methodOfBooking !== "in_person"){
       try {
         const deductResponse = await axios.post(
           "http://localhost:3001/deduct-balance",
           {
             userId: userId,
             amount: turf.price,
           }
         );
         console.log("Balance deducted successfully:", deductResponse.data);

         // Update wallet balance in the state
         setWalletBalance(walletBalance - turf.price);

         // Reset form
         setName("");
         setEmail("");
         setDate(moment().format("YYYY-MM-DD"));
         setSelectedTime("");
         setPaymentProof(null);
         setNumberOfPeople(1);
         setPlayerFinder(0);
         setMethodOfBooking("online");
         setContact("");
         toast.success("Turf booked successfully!");
       } catch (deductError) {
         console.error("Error deducting balance:", deductError);
         toast.error("Booking successful, but failed to deduct balance.");
       }
      }
  
      setBookedSlots([...bookedSlots, parseInt(selectedTime)]);
    } catch (bookingError) {
      console.error("Error making booking:", bookingError);
      toast.error("Failed to book the turf.");
    }
  };

  const handlePaymentProofChange = (event) => {
    const file = event.target.files[0];
    setPaymentProof(file);
  };

  const handleMethodOfBookingChange = (e) => {
    setMethodOfBooking(e.target.value); // Update to set single value
  };

  const renderAvailabilityGrid = () => {
    return (
      <Card title="6 AM to 12 AM Availability" className="shadow-lg rounded-lg">
        <div className="grid grid-cols-4 gap-2">
          {[...Array(18)].map((_, index) => {
            const timeSlot = index + 6;
            const isBooked = bookedSlots.includes(timeSlot);
            return (
              <div
                key={index}
                className={`p-4 text-center rounded-lg transition-colors duration-300 ${
                  isBooked
                    ? "bg-red-600 cursor-not-allowed"
                    : "bg-green-600 cursor-pointer hover:bg-green-500"
                }`}
                onClick={() => !isBooked && setSelectedTime(timeSlot)}
              >
                {timeSlot}:00 - {timeSlot + 1}:00
              </div>
            );
          })}
        </div>
      </Card>
    );
  };

  if (!turf) {
    return <div className="text-center text-black">Loading...</div>;
  }

  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-4">
          <div className="relative">
            <img
              src={turf.imageURL}
              alt={turf.name}
              className="w-full h-60 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-4">
              <h2 className="text-2xl font-bold text-white">{turf.name}</h2>
              <p className="text-white">{turf.detailed_info}</p>
              <p className="text-white">Price: {turf.price}</p>
              <p className="text-white">Area: {turf.area}</p>
              <p className="text-white">
                Sports: {turf.cricket && "Cricket"}{" "}
                {turf.football && "Football"} {turf.badminton && "Badminton"}
              </p>
            </div>
            {renderAvailabilityGrid()}
          </div>
        </div>
        <div className="md:w-1/2 p-4">
          <div className="bg-gray-100 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Book Now</h3>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <label htmlFor="name" className="font-semibold">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 rounded border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <label htmlFor="date" className="font-semibold">
                Date:
              </label>
              <DatePicker
                id="date"
                name="date"
                value={date ? moment(date, "YYYY-MM-DD") : null}
                onChange={(date, dateString) => setDate(dateString)}
                className="p-2 rounded border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                format="YYYY-MM-DD"
              />

              <label htmlFor="selectedTime" className="font-semibold">
                Select Time:
              </label>
              <select
                id="selectedTime"
                name="selectedTime"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="p-2 rounded border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Time</option>
                {[...Array(18)].map((_, index) => {
                  const timeSlot = index + 6;
                  return !bookedSlots.includes(timeSlot) ? (
                    <option key={timeSlot} value={timeSlot}>
                      {timeSlot}:00 - {timeSlot + 1}:00
                    </option>
                  ) : null;
                })}
              </select>

              <div className="mt-4">
                <label className="font-semibold">Method of Booking:</label>
                <div>
                  <input
                    type="radio"
                    id="online"
                    name="method_of_booking"
                    value="online"
                    checked={methodOfBooking === "online"}
                    onChange={(e) => setMethodOfBooking(e.target.value)}
                  />
                  <label htmlFor="online" className="ml-2">
                    Online-Wallet
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="in_person"
                    name="method_of_booking"
                    value="in_person"
                    checked={methodOfBooking === "in_person"}
                    onChange={(e) => setMethodOfBooking(e.target.value)}
                  />
                  <label htmlFor="in_person" className="ml-2">
                    In-Person
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="combine"
                    name="method_of_booking"
                    value="combine"
                    checked={methodOfBooking === "combine"}
                    onChange={(e) => setMethodOfBooking(e.target.value)}
                  />
                  <label htmlFor="combine" className="ml-2">
                    Combine
                  </label>
                </div>
              </div>

              <label htmlFor="paymentProof" className="font-semibold">
                Identity Proof (Masked Adhar Card):
              </label>
              <input
                type="file"
                id="paymentProof"
                name="paymentProof"
                onChange={handlePaymentProofChange}
                className="p-2 rounded border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={methodOfBooking !== "in_person"}
                accept="image/*"
              />

              <label htmlFor="numberOfPeople" className="font-semibold">
                Number of People:
              </label>
              <input
                type="number"
                id="numberOfPeople"
                name="numberOfPeople"
                value={numberOfPeople}
                onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
                className="p-2 rounded border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {showContactDiv && (
                <div>
                  <label htmlFor="contact" className="font-semibold mt-4">
                    Contact(+91):
                  </label>
                  <input
                    type="tel"
                    id="contact"
                    name="contact"
                    value={contact}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,10}$/.test(value)) {
                        setContact(value);
                      }
                    }}
                    className="p-2 rounded border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength="10"
                    pattern="\d{10}"
                    required
                  />
                </div>
              )}
              <div className="flex items-center space-x-2">
                <label
                  htmlFor="playerFinder"
                  className="text-gray-700 font-semibold"
                >
                  Player Finder (Default No)
                </label>
                <input
                  type="number"
                  id="playerFinder"
                  name="player_finder"
                  value={playerFinder}
                  onChange={(e) =>
                    setPlayerFinder(parseInt(e.target.value, 10) || 0)
                  }
                  defaultValue={0}
                  className="form-input h-5 w-20 text-blue-600"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingPage;
