import React from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faXTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className=" text-white py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0">
        <div
          className="w-full lg:w-1/3 text-left mb-4 lg:mb-0"
          style={{ marginLeft: "30px" }}
        >
          <div className="flex items-center mb-4">
            <img
              src="/assets/icon/Findyfy-Icon.png"
              alt="Logo"
              className="h-9 w-9"
            />
            <h2 className="text-3xl font-bold ml-2 text-[#00df9a]">Findyfy</h2>
          </div>
          <p className="text-gray-300 mb-4">
            “Every thing you love is very likely to be lost, but in the end,
            love will return in a different way.”
          </p>
          <p className="text-gray-300 italic">-Franz Kafka</p>
          <p className="text-gray-300">
            Kafka's Selected Stories: A Norton Critical Edition
          </p>
        </div>

        <div className="md:w-1/3 px-10">
          <h3 className="text-lg font-bold mb-4 text-[#00df9a]">Connections</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a href="#" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Submit Lost Item
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Submit Found Item
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="md:w-1/3">
          <h3 className="text-lg font-bold mb-4 text-[#00df9a]">
            GET IN TOUCH
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center space-x-2">
              <span>🏠</span>
              <span>Satkhira,BD</span>
            </li>
            <li className="flex items-center space-x-2">
              <span>📧</span>
              <span>
                <a
                  href="mailto:hello@liffhappens.com"
                  className="hover:text-white"
                >
                  nahidniyaz185@gmail.com
                </a>
              </span>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Terms of Service & Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Do Not Sell My Personal Information
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-300 px-6">
          &copy; {new Date().getFullYear()} Findyfy. All Rights Reserved.
        </p>
        <div className="flex justify-start space-x-4 mt-4 md:mt-0 px-24">
          <FontAwesomeIcon icon={faFacebookF} />
          <FontAwesomeIcon icon={faXTwitter} />
          <FontAwesomeIcon icon={faInstagram} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
