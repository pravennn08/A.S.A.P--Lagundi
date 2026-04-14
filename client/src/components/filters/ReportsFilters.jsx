import { Search, Filter, ChevronDown, MapPin, Calendar } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/Card";

const statusOptions = ["All Status", "Pending", "In Progress", "Resolved"];

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

const ReportsFilters = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  sitioFilter,
  setSitioFilter,
  subLocationFilter,
  setSubLocationFilter,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  clearFilters,
}) => {
  const availableSubLocations =
    sitioFilter !== "All Sitios" ? sitioOptions[sitioFilter] || [] : [];

  return (
    <Card className="mb-6 rounded-2xl border border-gray-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Filters</CardTitle>
        <CardDescription>
          Search and narrow down reports by status, sitio, sub-location, and
          date
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap xl:flex-nowrap items-end gap-4">
          <div className="flex flex-col w-full xl:w-[260px]">
            <label className="mb-1 text-sm font-medium text-gray-600 flex items-center gap-2">
              <Search size={16} />
              Search
            </label>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col w-full xl:w-[160px]">
            <label className="mb-1 text-sm font-medium text-gray-600 flex items-center gap-2">
              <Filter size={16} />
              Status
            </label>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-10 w-full appearance-none rounded-lg border border-gray-200 px-3 pr-10 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          <div className="flex flex-col w-full xl:w-[160px]">
            <label className="mb-1 text-sm font-medium text-gray-600 flex items-center gap-2">
              <MapPin size={16} />
              Sitio
            </label>
            <div className="relative">
              <select
                value={sitioFilter}
                onChange={(e) => {
                  setSitioFilter(e.target.value);
                  setSubLocationFilter("All Sub-locations");
                }}
                className="h-10 w-full appearance-none rounded-lg border border-gray-200 px-3 pr-10 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="All Sitios">All Sitios</option>
                {Object.keys(sitioOptions).map((sitio) => (
                  <option key={sitio} value={sitio}>
                    {sitio}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          <div className="flex flex-col w-full xl:w-[180px]">
            <label className="mb-1 text-sm font-medium text-gray-600">
              Sub-location
            </label>
            <div className="relative">
              <select
                value={subLocationFilter}
                onChange={(e) => setSubLocationFilter(e.target.value)}
                disabled={sitioFilter === "All Sitios"}
                className="h-10 w-full appearance-none rounded-lg border border-gray-200 px-3 pr-10 text-sm focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100 disabled:text-gray-400"
              >
                <option value="All Sub-locations">All Sub-locations</option>
                {availableSubLocations.map((subLocation) => (
                  <option key={subLocation} value={subLocation}>
                    {subLocation}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          <div className="flex flex-col w-full xl:w-[150px]">
            <label className="mb-1 text-sm font-medium text-gray-600 flex items-center gap-2">
              <Calendar size={16} />
              From
            </label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col w-full xl:w-[150px]">
            <label className="mb-1 text-sm font-medium text-gray-600 flex items-center gap-2">
              <Calendar size={16} />
              To
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex items-end w-full xl:w-auto">
            <button
              onClick={clearFilters}
              className="h-10 px-4 rounded-lg border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 w-full xl:w-auto"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportsFilters;
