import React from "react";
import ReactLogo from "../../assets/chat.svg";
import "./footer.css";
import {
  FacebookOutlined,
  GoogleOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
export default function Footer() {
  let date = new Date().getFullYear();
  return (
    <footer className="page-footer">
      <div className="wrapper">
        <div className="footer-col">
          <h3>About</h3>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>News</li>
            <li>Events</li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>Get Involved</h3>
          <ul>
            <li>Work with Us</li>
            <li>Subscribe for Newsletter</li>
            <li>Forum</li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>Help Center</h3>
          <ul>
            <li>FAQs</li>
            <li>Contact Us</li>
            <li>How to Start a Challenge</li>
          </ul>
        </div>
        <div className="footer-col social">
          <h3>Social</h3>
          <ul>
            <li>
              <a href="#" className="fb">
                <FacebookOutlined style={{ fontSize: "19px", color: "lime" }} />
              </a>
            </li>
            <li>
              <a href="#" className="tw">
                <TwitterOutlined style={{ fontSize: "19px", color: "lime" }} />
              </a>
            </li>
            <li>
              <a href="#" className="gp">
                <GoogleOutlined style={{ fontSize: "19px", color: "lime" }} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div
        className="copy"
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#111",
          margin: 10,
        }}
      >
        <p> &copy; {date}. Developer: Ali Ezadkhaha - All Rights Reserved</p>
        <p>
          <button
            className="float-right text-info"
            style={{ borderRadius: 5, display: "inline" }}
          >
            Live chat <img src={ReactLogo} alt="React Logo" />
          </button>
        </p>
      </div>
    </footer>
  );
}
