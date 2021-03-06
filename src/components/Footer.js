import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="text-center">
          <h5>Quick Links</h5>
        </div>

        <div className="footeritem col-lg-4 col-md-8 justify-content-between">
          <li>
            <Link to="/privacy">Help Center</Link>
          </li>
          <li>
            <Link to="/privacy">Privacy</Link>
          </li>
          <li>
            <Link to="/privacy">Terms of Service</Link>
          </li>
        </div>

        <div className="row justify-content-center mt-2">
          <div className="col-auto">
            <p>© Copyright 2021 Shahriar Nafee</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
