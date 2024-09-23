// BookingPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Select, Button } from "antd";
import TurfCard from "./TurfCard"; // Import your TurfCard component
import Footer from "./Footer"; // Import your Footer component
import Navbar from "./Navbar";

const { Option } = Select;

const BookingPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedPriceOrder, setSelectedPriceOrder] = useState("");
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    fetchAreas();
    fetchTurfs();
  }, []);

  const fetchTurfs = (filters = {}) => {
    setLoading(true);
    axios
      .get("http://localhost:3001/turfs", { params: filters })
      .then((response) => {
        setData(response.data);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        setError("Failed to fetch turfs");
        setLoading(false);
      });
  };

  const fetchAreas = () => {
    axios
      .get("http://localhost:3001/areas")
      .then((response) => {
        setAreas(response.data);
      })
      .catch((error) => {
        console.error("Fetch areas error:", error);
      });
  };

  const handleApplyFilters = () => {
    const filters = {
      area: selectedArea,
      priceOrder: selectedPriceOrder,
    };
    fetchTurfs(filters);
  };

  const handleAreaChange = (value) => {
    setSelectedArea(value);
  };

  const handlePriceOrderChange = (value) => {
    setSelectedPriceOrder(value);
  };

  return (
    <>
      <Navbar />
      <div className="cards-background bg-black rounded-lg shadow-md p-5">
        <div className="filter-section mb-5">
          <h2 className="filter-title text-xl font-semibold mb-3 text-white">
            Filters
          </h2>
          <div className="filter-options flex flex-wrap justify-between items-center">
            <div className="filter-option mb-3 sm:mb-0 sm:mr-3">
              <label
                htmlFor="area"
                className="block text-sm font-medium text-gray-300"
              >
                Search Area:
              </label>
              <Select
                value={selectedArea}
                onChange={handleAreaChange}
                className="select-area w-full sm:w-48 bg-gray-700 text-white"
              >
                <Option value="">All Areas</Option>
                {areas.map((area) => (
                  <Option key={area} value={area} className="text-black">
                    {area}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="filter-option mb-3 sm:mb-0 sm:mr-3">
              <label
                htmlFor="priceOrder"
                className="block text-sm font-medium text-gray-300"
              >
                Price Order:
              </label>
              <Select
                value={selectedPriceOrder}
                onChange={handlePriceOrderChange}
                className="select-price-order w-full sm:w-48 bg-gray-700 text-white"
              >
                <Option value="">Select price order</Option>
                <Option value="highToLow" className="text-black">
                  Price High to Low
                </Option>
                <Option value="lowToHigh" className="text-black">
                  Price Low to High
                </Option>
              </Select>
            </div>
            <Button
              onClick={handleApplyFilters}
              type="primary"
              className="apply-button bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Apply
            </Button>
          </div>
        </div>
        <div className="card-container">
          <Row gutter={[16, 16]}>
            {data.map((turf) => (
              <Col key={turf.id} xs={24} sm={12} md={8}>
                <TurfCard turf={turf} />
              </Col>
            ))}
          </Row>
        </div>
        <Footer />
         </div>
    </>
  );
};

export default BookingPage;
