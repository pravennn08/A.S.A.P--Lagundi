import { Card } from "../../components/ui/Card";

const sitioOptions = {
  Bulaklak: ["Bulaklak", "Bulaklak Gubat"],
  Centro: ["Centro", "Jasa Main Road", "Beverly Place", "El Grande"],
  Queensborough: ["Queensborough"],
  Paroba: ["Paroba", "Parobang Gubat"],
  "Paz Ville": ["Paz Ville"],
  "Sto. Niño": ["Sto. Niño"],
  Tramo: ["Tramo"],
  Troso: ["Looban", "Riverside", "Vista Roma", "The Belle Enclaves"],
};

const DashboardFilters = ({
  selectedSitio,
  setSelectedSitio,
  selectedSubLocation,
  setSelectedSubLocation,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  clearFilters,
}) => {
  const availableSubLocations = selectedSitio
    ? sitioOptions[selectedSitio] || []
    : [];

  return (
    <Card className="bg-white rounded-2xl shadow-sm p-5">
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-700">
            Dashboard Filters
          </h2>
          <p className="text-sm text-gray-500">
            Filter incidents by sitio, sub-location, and date
          </p>
        </div>

        <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 flex-1">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Sitio
              </label>
              <select
                value={selectedSitio}
                onChange={(e) => {
                  setSelectedSitio(e.target.value);
                  setSelectedSubLocation("");
                }}
                className="w-full h-11 border border-gray-200 rounded-lg px-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Sitios</option>
                {Object.keys(sitioOptions).map((sitio) => (
                  <option key={sitio} value={sitio}>
                    {sitio}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Sub-location
              </label>
              <select
                value={selectedSubLocation}
                onChange={(e) => setSelectedSubLocation(e.target.value)}
                disabled={!selectedSitio}
                className="w-full h-11 border border-gray-200 rounded-lg px-3 bg-white outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400"
              >
                <option value="">All Sub-locations</option>
                {availableSubLocations.map((place) => (
                  <option key={place} value={place}>
                    {place}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Date From
              </label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full h-11 border border-gray-200 rounded-lg px-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Date To
              </label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full h-11 border border-gray-200 rounded-lg px-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="w-full xl:w-auto">
            <button
              onClick={clearFilters}
              className="w-full xl:w-[140px] h-11 border border-gray-200 rounded-lg px-4 text-gray-700 hover:bg-gray-50 transition"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DashboardFilters;
