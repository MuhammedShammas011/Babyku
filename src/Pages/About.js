import React from "react";
import CountUp from "react-countup";
import "./pageStyle/About.css";
import about_img from "../Components/assets/about_img.jpeg";
import Footer from "./Footer";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-background">
        <section className="about-header">
          <img
            src="https://websitedemos.net/baby-store-04/wp-content/uploads/sites/750/2020/12/baby-store-logo.svg"
            alt="Logo"
          />
          <h1 className="main-heading"> Your Favourite Baby Store</h1>
        </section>

        <section className="about-content">
          <p className="left-highlight">
            Et luctus porttitor justo pellentesque rhoncus
          </p>
          <p className="right-text">
            Dictum sit volutpat nibh egestas velit pharetra risus aliquam nulla
            in blandit urna, rhoncus commodo metus adipiscing suscipit. Suscipit
            eu sed aliquam viverra sit feugiat risus augue eget integer
            vulputate gravida feugiat.
          </p>
        </section>

        
        <section className="about-stats">
          <div className="baby-image">
            <img src={about_img} alt="Baby" />
          </div>
          <div className="stats">
            <div className="stat">
              <h2>
                <CountUp start={1} end={1000} duration={5} separator="," />+
              </h2>
              <p>Unique products</p>
            </div>
            <div className="stat">
              <h2>
                <CountUp start={1} end={40} duration={5} />
              </h2>
              <p>Brands</p>
            </div>
            <div className="stat">
              <h2>
                <CountUp start={1} end={20} duration={5} />
              </h2>
              <p>Stores</p>
            </div>
          </div>
        </section>

       
        <section className="about-history">
          <h2 className="history-heading">Our Story</h2>
          <p className="history-text">
            BabyKu was founded with the mission of providing parents with the
            best baby products in the market. Over the years, we have expanded
            our offerings to include a wide variety of items, ensuring quality
            and safety for all our little customers. Our dedication to
            excellence has made us a trusted name in the industry, and we are
            proud to have served thousands of happy families.
          </p>
          <div className="rise-timeline">
            <h3 className="rise-heading">Our Rise</h3>
            <ul>
              <li>
                <i
                  style={{
                    fontSize: " 13px",
                    lineHeight: " 1.25em",
                    fontFamily: "'Sriracha', handwriting",
                  }}
                >
                  2010:
                </i>&nbsp;&nbsp;
                BabyKu was founded
              </li>
              <li>
                <i  style={{
                    fontSize: " 13px",
                    lineHeight: " 1.25em",
                    fontFamily: "'Sriracha', handwriting",
                  }}
                  >
                    2015:</i> &nbsp;&nbsp;
                    Expanded product range
              </li>
              <li>
                <i  style={{
                    fontSize: " 13px",
                    lineHeight: " 1.25em",
                    fontFamily: "'Sriracha', handwriting",
                  }}
                  >
                    2018:</i> &nbsp;&nbsp;
                    Launched online store
              </li>
              <li>
                <i   style={{
                    fontSize: " 13px",
                    lineHeight: " 1.25em",
                    fontFamily: "'Sriracha', handwriting",
                  }}
                  >
                    2021:</i> 
                    &nbsp;&nbsp;
                    Reached 10K unique products
              </li>
              <li>
                <i  style={{
                    fontSize: " 13px",
                    lineHeight: " 1.25em",
                    fontFamily: "'Sriracha', handwriting",
                  }}>
                    2023:</i> &nbsp;&nbsp;
                    Celebrated 20 stores
              </li>
            </ul>
          </div>
         
        </section>
        <Footer />
      </div>
     
    </div>
  );
};

export default About;
