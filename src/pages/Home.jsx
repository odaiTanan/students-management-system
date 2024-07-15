import React from "react";
import Nav from "../components/Nav";
import card from "../assets/card.jpg";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="home">
      {" "}
      <Nav />
      <div className="land-continer">
        <swiper-container
          class="mySwiper"
          pagination="true"
          effect="coverflow"
          grab-cursor="true"
          centered-slides="true"
          slides-per-view="auto"
          coverflow-effect-rotate="50"
          coverflow-effect-stretch="0"
          coverflow-effect-depth="100"
          coverflow-effect-modifier="1"
          coverflow-effect-slide-shadows="true"
        >
          <swiper-slide>
            <div className="sc sc1">
              <h1>Student Attendance Management</h1>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div className="sc sc2">
              <h1>you can check attendance</h1>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div className="sc sc3">
              <h1>you can add,update,delete students</h1>
            </div>
          </swiper-slide>
        </swiper-container>
      </div>
      <div id="circles">
        {" "}
        <Link to="/add">
          {" "}
          <div className="card card1">
            {" "}
            <i class="fa-solid fa-plus"></i>
            <h1>add student</h1>
          </div>
        </Link>
        <Link to="/show">
          <div className="card card2">
            <i class="fa-solid fa-eye"></i>
            <h1>show all students</h1>
          </div>{" "}
        </Link>
        <Link to="/check">
          <div className="card card3">
            <i class="fa-solid fa-clipboard-user"></i>
            <h1>check attendance</h1>
          </div>{" "}
        </Link>
      </div>
    </div>
  );
};
/*          <div className="swiper-card">
            <i class="fa-solid fa-plus"></i>
          </div>
          <div swiper-card>
            <i class="fa-solid fa-eye"></i>
          </div>
          <div swiper-card>
            <i class="fa-solid fa-clipboard-user"></i>
          </div>*/
export default Home;
