import React, { useState } from "react";
import { IoMdCall } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoCallOutline } from "react-icons/io5";
import { FaGlobe, FaFacebook, FaEnvelope } from "react-icons/fa";

const localHotlines = {
  "MDRRMC (Municipal Disaster Risk Reduction & Management Council)": [
    "(045) 435-4405",
    "0970-824-8622",
    "0905-918-7574",
  ],
  "Mexico Police Station": ["(045) 435-2048", "0998-598-5462"],
  "Mexico Fire Department": ["(045) 966-3292", "0942-060-4042"],
  "MSWDO (Municipal Social Welfare & Development Office)": [
    "(045) 435-2048",
    "(045) 435-2751",
  ],
};

const nationalHotlines = "911";

export const hospitalsHotlines = [
  {
    name: "Green City Medical Center",
    website: "https://greencitymedicalcenter.com/",
    facebook: "https://www.facebook.com/greencitymedicalcenter/",
    email: "inquiry@greencitymedicalcenter.com",
  },
  {
    name: "VL Makabali Hospital",
    website: "https://vlmakabalihospital.com.ph/",
    facebook: "https://www.facebook.com/vlmmhi/",
    email: "makabali_hospital@yahoo.com",
  },
  {
    name: "Jose B. Lingad Memorial General Hospital",
    website: "https://jlmgh.doh.gov.ph/",
    facebook: "https://www.facebook.com/jblmghpageofficial/",
    email: "mcc@jblmgh.com.ph",
  },
  {
    name: "San Fernando Hospital Inc.",
    website: null,
    facebook:
      "https://www.facebook.com/p/San-Fernandino-Hospital-Inc-100043407895900/",
    email: "sfhosp@yahoo.com",
  },
  {
    name: "Calcutta Medical Center",
    website: "https://calcuttamed.com.ph/",
    facebook: "https://www.facebook.com/ITCMedicalCenterOfficial/",
    email: "customer.relations@calcuttamed.com.ph",
  },
  {
    name: "Pampanga Premier Medical Center",
    website: "https://www.ppmc.com.ph/",
    facebook: "https://www.facebook.com/ppmc.ph/",
    email: "ppmcinform@gmail.com",
  },
  {
    name: "St. Raphael Medical Center",
    website: "https://straphaelmc.com/",
    facebook: "https://www.facebook.com/StRaphaelMC/",
    email: "info@straphaelmc.com",
  },
  {
    name: "Pampanga Medical Specialist Hospital",
    website: null,
    facebook: "https://www.facebook.com/PMSHOfficial/",
    email: "info@pmsh.com.ph",
  },
  {
    name: "AUF Medical Center",
    website: "https://aufmc.com.ph/",
    facebook: "https://www.facebook.com/AUFMedicalCenter/",
    email: "info@aufmc.com.ph",
  },
  {
    name: "The Medical City Clark",
    website: "https://www.themedicalcityclark.com/",
    facebook: "https://www.facebook.com/TheMedicalCityClark/",
    email: "tmcclark@themedicalcity.com",
  },
  {
    name: "OFW Hospital",
    website: null,
    facebook: "https://www.facebook.com/OFWHospital/",
    email: "ofwhospital@dmw.gov.ph",
  },
  {
    name: "RMC Guagua",
    website: null,
    facebook: "https://www.facebook.com/RMCguagua/",
    email: null,
  },
  {
    name: "PRI Medical Center",
    website: null,
    facebook: "https://www.facebook.com/PRIMedicalCenter/",
    email: "primedctr10@yahoo.com",
  },
  {
    name: "Apalit Doctors Hospital",
    website: "https://apalitdoctorshospital.com.ph/",
    facebook: "https://www.facebook.com/apalitdoctors/",
    email: "info@apalitdoctorshospital.com",
  },
  {
    name: "Delgado Medical Clinic",
    website: null,
    facebook: "https://www.facebook.com/dalgmchospital/",
    email: "garcia1971@dalgmci.com",
  },
  {
    name: "Angeles Medical Center",
    website: "https://www.angelesmed.com/",
    facebook: "https://www.facebook.com/AMCOfficialPage/",
    email: "marketing@angelesmed.com",
  },
  {
    name: "ASCOM Hospital",
    website: null,
    facebook: "https://www.facebook.com/ASCOM/",
    email: "ascomdiosuhospital@yahoo.com",
  },
  {
    name: "Sacred Heart Medical Center",
    website: null,
    facebook: "https://www.facebook.com/acshmcofficial/",
    email: "sacredheartmedicalcenter@yahoo.com",
  },
  {
    name: "San Fernando Medical Center",
    website: null,
    facebook: "https://www.facebook.com/scafmc.philippines/",
    email: "scafmc.philippines@gmail.com",
  },
  {
    name: "Arayat Doctors Hospital",
    website: null,
    facebook:
      "https://www.facebook.com/p/Arayat-Doctors-Hospital-100081915485548/",
    email: null,
  },
  {
    name: "DHL Hospital Pampanga",
    website: null,
    facebook: "https://www.facebook.com/FDHlp/",
    email: "fdhpampanga@yahoo.com",
  },
  {
    name: "Mt. Carmel Medical Center",
    website: null,
    facebook: "https://www.facebook.com/mtcarmelclark/",
    email: "patientrelations.clark@olmc.com",
  },
  {
    name: "Holy Trinity Medical Center",
    website: "https://holytrinitymedicalcenter.com.ph/home",
    facebook: "https://www.facebook.com/HolyTrinityArayat/",
    email: "patientsupport@holytrinitymedicalcenter.com.ph",
  },
];

const Hotlines = () => {
  const [showEmergency, setShowEmergency] = useState(false);
  const [showHospitals, setShowHospitals] = useState(false);

  return (
    <section className="mt-20 flex flex-col items-center px-4">
      <h2 className="mb-8 text-3xl font-bold text-gray-700">Hotlines</h2>

      <div className="w-full max-w-7xl space-y-6">
        {/* Emergency Hotlines */}
        <div className="bg-gray-50 rounded-xl shadow-md p-5">
          <button
            onClick={() => setShowEmergency(!showEmergency)}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3">
              <IoMdCall className="bg-red-400 text-white h-10 w-10 rounded-full p-2" />
              <h1 className="text-lg font-semibold text-gray-700">
                Emergency Hotlines
              </h1>
            </div>
            <RiArrowDropDownLine
              className={`text-4xl text-gray-600 transition-transform duration-300 ${
                showEmergency ? "rotate-180" : ""
              }`}
            />
          </button>

          {showEmergency && (
            <div className="mt-4">
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  National Emergency Hotline
                </h3>
                <div className="bg-red-50 border border-red-100 rounded-xl p-3 hover:bg-red-100 transition">
                  <div className="flex items-center gap-3">
                    <IoCallOutline className="w-7 h-7 text-red-700" />
                    <h2 className="text-3xl font-semibold text-gray-800">
                      {nationalHotlines}
                    </h2>
                  </div>
                  <p className="text-gray-400">
                    All emergencies (Police, Fire, Medical)
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-600 mb-3">
                  Local Emergency Hotline
                </h3>
                {Object.entries(localHotlines).map(([key, numbers]) => (
                  <div
                    key={key}
                    className=" bg-white shadow text-lg rounded-xl p-3 mb-3 hover:bg-blue-50 transition"
                  >
                    <h4 className="text-md font-semibold text-gray-700 mb-1">
                      {key}
                    </h4>
                    {numbers.map((number, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <IoCallOutline className="w-5 h-5 text-blue-700" />
                        <p className="text-gray-800">{number}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Hospital Hotlines */}
        <div className="bg-gray-50 rounded-xl shadow-md p-5">
          <button
            onClick={() => setShowHospitals(!showHospitals)}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3">
              <IoMdCall className="bg-blue-400 text-white h-10 w-10 rounded-full p-2" />
              <h1 className="text-lg font-semibold text-gray-700">
                Hospital Hotlines
              </h1>
            </div>
            <RiArrowDropDownLine
              className={`text-4xl text-gray-600 transition-transform duration-300 ${
                showHospitals ? "rotate-180" : ""
              }`}
            />
          </button>

          {showHospitals && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {hospitalsHotlines.map((hospital, index) => (
                <div
                  key={index}
                  className="bg-white shadow rounded-xl p-4 hover:bg-blue-50 transition"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {hospital.name}
                  </h3>

                  <div className="space-y-2 text-sm text-gray-700">
                    {hospital.website && (
                      <a
                        href={hospital.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-blue-700"
                      >
                        <FaGlobe className="text-blue-700" />
                        <span className="break-all">{hospital.website}</span>
                      </a>
                    )}

                    {hospital.facebook && (
                      <a
                        href={hospital.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-blue-700"
                      >
                        <FaFacebook className="text-blue-700" />
                        <span className="break-all">{hospital.facebook}</span>
                      </a>
                    )}

                    {hospital.email && (
                      <a
                        href={`mailto:${hospital.email}`}
                        className="flex items-center gap-2 hover:text-blue-700"
                      >
                        <FaEnvelope className="text-blue-700" />
                        <span className="break-all">{hospital.email}</span>
                      </a>
                    )}

                    {!hospital.website &&
                      !hospital.facebook &&
                      !hospital.email && (
                        <p className="text-gray-500">
                          No contact details available.
                        </p>
                      )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hotlines;
