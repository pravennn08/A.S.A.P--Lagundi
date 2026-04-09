import React from "react";
import Button from "../ui/Button";
import { Card } from "../ui/Card";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <main
      className="py-16 text-center px-6 lg:px-12 bg-cover bg-center bg-no-repeat min-h-screen flex items-center"
      style={{
        backgroundImage: "url('/bg/bg2.png')",
      }}
    >
      <div className="w-full  mx-auto -mt-10 flex flex-col items-center gap-10  ">
        <div>
          <h1 className="text-3xl  sm:text-5xl font-extralight tracking-wide max-w-[900px] ">
            Streamlining{" "}
            <span className="text-red-600  font-bold">incident reporting</span>{" "}
            and{" "}
            <span className="text-brand-green font-bold">
              emergency response
            </span>{" "}
            for a safer, more connected community.
          </h1>

          <p className="text-xs sm:text-sm tracking-widest text-gray-400 mt-2">
            BARANGAY LAGUNDI <span className="mx-2">|</span> DIGITAL RESPONSE
          </p>
        </div>

        <Card className="max-w-2xl mx-auto text-center rounded-2xl shadow-md">
          <p className="text-base lg:text-lg text-gray-600 leading-relaxed mb-8">
            A digital platform developed to streamline incident reporting and
            emergency response within Barangay Lagundi. It allows residents to
            submit reports quickly and efficiently while enabling barangay
            authorities to respond in a timely and organized manner.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 mb-10">
            <span>• 24/7 Emergency Support</span>
            <span>• Real-time Updates</span>
            <span>• Direct to Authorities</span>
          </div>

          <div>
            <p className="mb-4 text-gray-400 text-sm font-semibold">
              Need to report an incident?
            </p>

            <Button
              className="px-8 py-3 rounded-full shadow-md"
              onClick={() => navigate("/ReportForm")}
            >
              + File a Report
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default HeroSection;
