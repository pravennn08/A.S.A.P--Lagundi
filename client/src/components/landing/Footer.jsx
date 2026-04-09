import React from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-gray-200 bg-white pt-10 pb-6 text-sm text-gray-400">
      <div className="max-w-6xl mx-auto p-10 sm:px-4">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="flex gap-4">
            <img
              src="/logo/lagundi.png"
              alt="Barangay Lagundi Logo"
              className="w-17 h-17 rounded-full object-cover"
            />
            <div>
              <img
                src="/logo/logo.png"
                alt="A.S.A.P LAGUNDI"
                className="w-50"
              />
              <p className="text-xs text-gray-400 leading-relaxed italic">
                Automated Safety and Action Platform for Barangay Lagundi,
                Mexico, Pampanga
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-medium  text-gray-400 mb-3">
              CONTACT INFORMATION
            </h3>

            <div className="space-y-3">
              <p className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-1" />
                Brgy. Lagundi, Mexico, Pampanga, Philippines
              </p>

              <p className="flex items-center gap-2">
                <FaPhone />
                <a href="tel:+639123456789" className="hover:underline">
                  +63 912 345 6789
                </a>
              </p>

              <p className="flex items-center gap-2">
                <FaEnvelope />
                <a
                  href="mailto:asap@lagundi.gov.ph"
                  className="hover:underline"
                >
                  asap@lagundi.gov.ph
                </a>
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-400 mb-3">CONNECT WITH US</h3>

            <div className="flex gap-4 mb-2">
              <a href="#" className="hover:text-blue-600 transition">
                <FaFacebookF />
              </a>

              <a href="#" className="hover:text-pink-500 transition">
                <FaInstagram />
              </a>
            </div>

            <p className="text-xs text-gray-400">
              Follow us for updates and announcements
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
