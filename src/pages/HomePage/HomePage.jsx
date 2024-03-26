import React from "react";
import "./HomePageCls.scss";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <section>
      <div className="container">
        <div className="mainBox">
          <div className="potentialBox">
            <h1 className="mainTitle">
              Unlock your potential with the best{" "}
              <span className="language">language</span> tutors
            </h1>
            <p className="desrPar">
              Embark on an Exciting Language Journey with Expert Language
              Tutors: Elevate your language proficiency to new heights by
              connecting with highly qualified and experienced tutors.
            </p>
            <Link to={`/teachers`} className="getStarted">
              Get started
            </Link>
          </div>
          <div className="laptop"></div>
        </div>
        <ul className="numberList">
          <li className="numberItems">
            <h3 className="numbers">32,000 +</h3>
            <p className="advantages">Experienced tutors</p>
          </li>
          <li className="numberItems">
            <h3 className="numbers">300,000 +</h3>
            <p className="advantages">5-star tutor reviews</p>
          </li>
          <li className="numberItems">
            <h3 className="numbers">120 +</h3>
            <p className="advantages">Subjects taught</p>
          </li>
          <li className="numberItems">
            <h3 className="numbers">200 +</h3>
            <p className="advantages">Tutor nationalities</p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default HomePage;
