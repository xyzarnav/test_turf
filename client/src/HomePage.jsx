import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Carousel from "./Carousel";
import TurfCard from "./TurfCard";
import Footer from "./Footer";
import axios from "axios";
import { Row, Col, Select, Button } from "antd";
import video from "./assets/media/beachsoccer.mp4";
import india from "./assets/media/india-map.png";
import search from "./assets/media/search.png";
import book from "./assets/media/book.png";
import play from "./assets/media/play.png";
import meetPal from "./assets/media/meet-pals.png"; // Ensure the video file name is correct
import "./Homepage.css";
import page2left from "./assets/media/page2-left.png";
import card2 from "./assets/media/card2.png";
import gsap from "gsap";

const { Option } = Select;

const HomePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedPriceOrder, setSelectedPriceOrder] = useState("");
  const [areas, setAreas] = useState([]);
  const crsr = useRef(null);
  const blur = useRef(null);

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
        console.error("Fetch error:", error);
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
  // let crsr = document.querySelector("#cursor");
  // let blur = document.querySelector("#cursor-blur");
  // document.addEventListener("mousemove", function (dets) {
  //   crsr.style.left = dets.x + "px";
  //   crsr.style.top = dets.y + "px";
  // });
  // document.addEventListener("mousemove", function (dets) {
  //   blur.style.left = dets.x - 100 + "px";
  //   blur.style.top = dets.y - 100 + "px";
  //   console.log(crsr); // Check the value before usage
  // });
  useEffect(() => {
    fetchAreas();
    fetchTurfs();

    const handleMouseMove = (event) => {
      let crsr = document.querySelector("#cursor");
      let blur = document.querySelector("#cursor-blur");
      if (crsr) {
        crsr.style.left = event.clientX + "px";
        crsr.style.top = event.clientY + "px";
      }
      if (blur) {
        blur.style.left = event.clientX - 50 + "px"; // Adjust as needed
        blur.style.top = event.clientY - 50 + "px"; // Adjust as needed
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div id="main" className="app-container h-full bg-gray-900 text-white">
        <div id="cursor"></div>
        <div id="cursor-blur"></div>
        <div className="app-container h-full bg-black-900 text-white">
          <Navbar />

          {/* Video Background Section */}
          <div id="page1" className="relative h-screen overflow-hidden">
            <video
              src={video}
              loop
              autoPlay
              muted
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div id="page1-con" className="relative ">
              <h1 className="">BOOK. PLAY. REPEAT</h1>
              <h2 className="">Find Your Perfect Turf</h2>
              <p>
                TurfIt is your go-to platform for booking top-quality sports
                turfs across India. We make playing sports accessible and
                enjoyable, whether for friendly matches or events. With TurfIt,
                you can easily connect to well-maintained venues and create
                unforgettable moments on the field!
              </p>
            </div>
          </div>
        </div>

        <div id="about-us">
          <div id="scroller">
            <div id="scroller-in-1">
              <h4>SEARCH </h4>
              <h4>BOOK </h4>
              <h4>PLAY </h4>
              <h4>MEET </h4>
              <h4>PLAY </h4>
              <h4>REPEAT </h4>
            </div>

            <div id="scroller-in-1">
              <h4>SEARCH </h4>
              <h4>BOOK </h4>
              <h4>PLAY </h4>
              <h4>MEET </h4>
              <h4>PLAY </h4>
              <h4>REPEAT </h4>
            </div>
          </div>
          <div id="about-us-con">
            <img src={page2left} />
            <div id="about-us-in">
              <h3>ABOUT US</h3>
              <p>
                Our mission is making it easier for everyone to play sports and
                increasing the utilisation of facilities as a result. Sports
                play a pivotal role in bringing people together, sharing moments
                and enhancing the well-being are reasons that form the essence
                of PlaySpots. Our Goal is making the sports simple
                #LetTheWorldPlay
              </p>
            </div>
            <img src={page2left} />
          </div>
        </div>

        <div id="card-container">
          <div class="card" id="card1">
            <img src={card2} />
            <div class="overlays">
              <h4>Search</h4>
              <p>
                lorem20lkmn knvndnvlnflkvnlkdrnvlknnvkndvlknvl,l vll fl l
                lnfvlknlnvfknvlkdnvlkndvlkn
              </p>
            </div>
          </div>

          <div class="card" id="card1">
            <img src={card2} />
            <div class="overlays">
              <h4>Calender</h4>
              <p>
                lorem20lkmn knvndnvlnflkvnlkdrnvlknnvkndvlknvl,l vll fl l
                lnfvlknlnvfknvlkdnvlkndvlkn
              </p>
            </div>
          </div>

          <div class="card" id="card1">
            <img src={card2} />
            <div class="overlays">
              <h4>Wallet</h4>
              <p>
                lorem20lkmn knvndnvlnflkvnlkdrnvlknnvkndvlknvl,l vll fl l
                lnfvlknlnvfknvlkdnvlkndvlkn
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row border-t-2 border-green-600 bg-slate-900 ">
          <div className="w-full md:w-1/2">
            <img src={india} className="w-full md:h-full object-cover" alt="" />
          </div>
          <div className="bg-gradient-to-r from-green-400 to-yellow-300 p-4 md:w-1/2">
            <h3 className="text-2xl md:text-5xl font-medium mt-4 md:mt-10">
              WE ARE GROWING !!!
            </h3>
            <h1 className="text-3xl md:text-7xl lg:text-8xl font-bold text-white mt-2 md:mt-5">
              EXPANDING OUR PRESENCE IN CITIES ACROSS INDIA
            </h1>
            <h6 className="text-sm md:text-xl font-normal mt-2 md:mt-5">
              JOIN US AS WE BUILD ONE OF THE LARGEST SPORTS GROUND MANAGEMENT
              SOLUTIONS
            </h6>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-2 justify-around p-10">
          <div className="text-center md:w-1/3 mt-10 md:px-10">
            <img
              className="w-14 mx-auto filter invert"
              src={search}
              alt="Search Icon"
            />
            <h1 className="mt-2 text-2xl">Search</h1>
            <p className="mt-2 text-sm font-light md:text-base">
              Are you looking to play after work, organize your Sunday Five's
              football match? Explore the largest network of sports facilities
              all over India
            </p>
          </div>
          <div className="text-center md:w-1/3 mt-10 md:px-10">
            <img className="w-14 mx-auto filter invert" src={book} alt="Logo" />
            <h1 className="mt-2 text-2xl">Book</h1>
            <p className="mt-2 text-sm font-light md:text-base">
              Once you’ve found the perfect ground, court, or gym, connect with
              the venue through the "Book Now" button to make an online booking
              and secure easier payment.
            </p>
          </div>
          <div className="text-center md:w-1/3 mt-10 md:px-10">
            <img
              className="w-14 mx-auto filter invert"
              src={play}
              alt="Play Icon"
            />
            <h1 className="mt-2 text-2xl">Play</h1>
            <p className="mt-2 text-sm font-light md:text-base">
              You’re the hero. You’ve found a stunning turf or court, booked
              with ease, and now it's time to play. The scene is set for your
              epic match.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row bg-gray-900 py-5">
          <div className="md:hidden p-10 text-center">
            <img className="w-14 mx-auto" src={play} alt="" />
          </div>
          <div className="text-center md:w-1/2 md:p-10 md:mt-5">
            <h1 className="text-green-600 text-3xl md:text-4xl">
              MEET YOUR PALS OVER GAME
            </h1>
            <p className="text-white px-16 mt-5 font-light md:text-lg">
              Looking for a game?
              <br />
              But can't find an opponent?
              <br />
              You can invite a team or join a pre scheduled match through TurfIt
            </p>
          </div>
          <div className="hidden md:flex md:w-1/2">
            <img
              src={meetPal}
              className="w-96 object-cover px-10 mx-auto"
              alt=""
            />
          </div>
        </div>

        <div className="carousel-container mb-7">
          <Carousel />
        </div>

        {/* <div className="cards-background bg-gray-800 rounded-lg shadow-md p-5">
        <div className="filter-section mb-5">
          <h2 className="filter-title text-xl font-semibold mb-3">Filters</h2>
          <div className="filter-options flex flex-wrap justify-between items-center">
            <div className="filter-option mb-3 sm:mb-0 sm:mr-3">
              <label htmlFor="area" className="block text-sm font-medium">
                Search Area:
              </label>
              <Select
                value={selectedArea}
                onChange={handleAreaChange}
                className="select-area w-full sm:w-48"
              >
                <Option value="">All Areas</Option>
                {areas.map((area) => (
                  <Option key={area} value={area}>
                    {area}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="filter-option mb-3 sm:mb-0 sm:mr-3">
              <label htmlFor="priceOrder" className="block text-sm font-medium">
                Price Order:
              </label>
              <Select
                value={selectedPriceOrder}
                onChange={handlePriceOrderChange}
                className="select-price-order w-full sm:w-48"
              >
                <Option value="">Select price order</Option>
                <Option value="highToLow">Price High to Low</Option>
                <Option value="lowToHigh">Price Low to High</Option>
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
         </div> */}
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
