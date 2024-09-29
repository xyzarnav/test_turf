import React from "react";
import { Card, Button } from "antd";
import { Link } from "react-router-dom";
import {
  DollarOutlined,
  EnvironmentOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

const TurfCard = ({ turf }) => {
  const handleBookNow = (turfId) => {
    localStorage.setItem("selectedTurfId", turfId); // Store turf ID in local storage
  };

  // Debugging: Log the turf object to check its properties
  console.log(turf);

  return (
    <Link
      to="/bookingpage"
      className="block transform transition duration-300 hover:scale-105"
    >
      <Card
        hoverable
        className="rounded-lg shadow-lg overflow-hidden"
        cover={
          <img
            alt={turf.name}
            src={turf.imageUrl}
            className="w-full h-48 object-cover"
          />
        }
      >
        <Meta
          title={<span className="text-lg font-semibold">{turf.name}</span>}
          description={
            <div className="text-gray-900">
              <p>
                <DollarOutlined style={{ color: "black" }} /> Price:{" "}
                {turf.price}
              </p>
              <p>
                <EnvironmentOutlined style={{ color: "black" }} /> Area:{" "}
                {turf.area}
              </p>
              <p>
                <AppstoreOutlined style={{ color: "black" }} /> Dimension:{" "}
                {turf.Dimension} sq-meters
              </p>
            </div>
          }
        />
        <Button
          className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-700 transition"
          type="primary"
          onClick={() => handleBookNow(turf.id)}
        >
          Book Now
        </Button>
      </Card>
    </Link>
  );
};

export default TurfCard;
