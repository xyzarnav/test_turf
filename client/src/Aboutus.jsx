import React from "react";
import Navbar from "./Navbar"; // Import the Navbar component
import Footer from "./Footer";
import "./Aboutus.css"; // Import the separate CSS file

const AboutUs = () => {
  return (
    <div className="about-container">
      <Navbar /> {/* Add Navbar component */}
      <div className="about-content">
        <div id="main">
          <div className="about-box">
            <div id="cont-1" className="text-center">
              <h2 className="about-title">TurfIT</h2>
              <p className="about-description">
                <b>
                  TurfIT is your ultimate destination for hassle-free turf
                  booking.
                </b>
              </p>
            </div>
            <div className="image-container">
              <div className="stat">
                <img src="https://i.pinimg.com/564x/9f/2c/b5/9f2cb53594dcbad61134849d3d69b629.jpg" />
                <h3 className="stat-number">12+</h3>
                <p className="stat-text">Cities Covered</p>
              </div>
              <div className="stat">
                <img src="https://i.pinimg.com/564x/a0/ba/53/a0ba535463e29cd8286454698bc60932.jpg" />
                <h3 className="stat-number">10+</h3>
                <p className="stat-text">Turf Partners</p>
              </div>
              <div className="stat">
                <img src="https://i.pinimg.com/564x/50/3f/31/503f317fbb7e7959b4bec6e414b41c10.jpg" />
                <h3 className="stat-number">4834+</h3>
                <p className="stat-text">Games Booked</p>
              </div>
            </div>
          </div>

          <div class="about-us-slide">
            <div class="about-us-text">
              <h3>
                One Stop <span class="spa">Solution to ...</span>
              </h3>
              <h4> All Sports Activities</h4>
            </div>
            <div class="about-us-slider">
              <div class="about-us-item">
                <p>Football</p>
                <div class="about-us-item-img">
                  <img src="https://www.playspots.in/wp-content/themes/playspots/assets/images/about-page/football.png" />
                </div>
              </div>
              <div class="about-us-item">
                <p>Cricket</p>
                <div class="about-us-item-img">
                  <img src="https://www.playspots.in/wp-content/themes/playspots/assets/images/about-page/cricket.png" />
                </div>
              </div>

              <div class="about-us-item">
                <p>Badminton</p>
                <div class="about-us-item-img">
                  <img src="https://www.playspots.in/wp-content/themes/playspots/assets/images/about-page/badminton.png" />
                </div>
              </div>

              <div class="about-us-item">
                <p>VollyBall</p>
                <div class="about-us-item-img">
                  <img src="https://www.playspots.in/wp-content/themes/playspots/assets/images/about-page/volley-ball.png" />
                </div>
              </div>
              <div class="about-us-item">
                <p>Basket Ball</p>
                <div class="about-us-item-img">
                  <img src="https://www.playspots.in/wp-content/themes/playspots/assets/images/about-page/basket-ball.png" />
                </div>
              </div>
              <div class="about-us-item">
                <p>Tennis</p>
                <div class="about-us-item-img">
                  <img src="https://www.playspots.in/wp-content/themes/playspots/assets/images/about-page/tennis.png" />
                </div>
              </div>

              <div class="about-us-item">
                <p>Hockey</p>
                <div class="about-us-item-img">
                  <img src="	https://www.playspots.in/wp-content/themes/playspots/assets/images/about-page/hockey.png" />
                </div>
              </div>

              <div class="about-us-item">
                <p>Table Tennis</p>
                <div class="about-us-item-img">
                  <img src="	https://www.playspots.in/wp-content/themes/playspots/assets/images/about-page/table-tennis.png" />
                </div>
              </div>

              <div class="about-us-item">
                <p>Carroms</p>
                <div class="about-us-item-img">
                  <img src="	https://www.playspots.in/wp-content/themes/playspots/assets/images/about-page/carrom.png" />
                </div>
              </div>

              <div class="about-us-item">
                <p>Snooker</p>
                <div class="about-us-item-img">
                  <img src="https://www.playspots.in/wp-content/themes/playspots/assets/images/about-page/snook.png" />
                </div>
              </div>

              <div class="about-us-item">
                <p>Others 30+ games</p>
                <div class="about-us-item-img">
                  <img src="https://www.playspots.in/wp-content/themes/playspots/assets/images/about-page/game-collage.png" />
                </div>
              </div>
            </div>
          </div>

          <div className="about-us-story">
            <h2 className="about-journey-title">OUR JOURNEY</h2>
            <p className="about-journey-text">
              <b>
                <span>Our mission</span> is making it easier for everyone to
                play sports and increasing the utilisation of facilities as a
                result
              </b>
            </p>
            <p className="about-journey-text">
              <b>
                Our journey led us to create a platform where turf booking is
                simplified, fast, and enjoyable.Sports play a pivotal role in
                bringing people together, sharing moments and enhancing the
                well-being are reasons that form the essence of PlaySpots.
              </b>
            </p>
            <p className="about-journey-text">
              <b>
                Today, <span>TurfIt </span>stands as a trusted name in turf
                booking, offering a user-friendly interface
              </b>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
