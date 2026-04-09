import React from "react";

const coverageAreas = [
  "Sitio Troso",
  "Sitio Bulaklak",
  "Sitio Centro",
  "Sitio Queensborough",
  "Sitio Tramo",
  "Sitio Sto. Niño",
  "Sitio Paz Ville",
  "Sitio Paroba",
];

const CoverageSection = () => {
  return (
    <section className="mt-20">
      <div className="flex flex-col items-center">
        <h2 className="mb-8 text-3xl font-bold text-gray-700">Coverage Area</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coverageAreas.map((area) => (
            <div
              key={area}
              className="rounded-2xl border border-gray-200 bg-white/80 px-6 py-7 text-lg text-center font-medium text-slate-800 shadow-sm backdrop-blur-sm transition hover:bg-[#dce6f0]/20 hover:shadow-md"
            >
              {area}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoverageSection;
