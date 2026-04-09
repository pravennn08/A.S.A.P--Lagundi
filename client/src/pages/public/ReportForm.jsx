import React, { useMemo, useRef, useState } from "react";
import { ChevronDown, Upload, X } from "lucide-react";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/landing/Navbar";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import { useReportStore } from "../../store/useReportStore.js";

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

const incidentTypes = [
  "Fire Incident",
  "Medical Emergency",
  "Crime / Theft",
  "Vehicular Accident",
  "Flooding",
  "Noise Complaint",
  "Domestic Concern",
  "Others",
];

const urgencyLevels = ["Low", "Medium", "High", "Emergency"];

const ReportForm = () => {
  const navigate = useNavigate();
  const { isLoading, createReport } = useReportStore();
  const fileInputRef = useRef(null);

  const [fullName, setFullName] = useState("");
  const [selectedSitio, setSelectedSitio] = useState("");
  const [selectedSubLocation, setSelectedSubLocation] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [exactLocation, setExactLocation] = useState("");
  const [incidentType, setIncidentType] = useState("");
  const [urgencyLevel, setUrgencyLevel] = useState("");
  const [description, setDescription] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const subLocationOptions = useMemo(() => {
    return selectedSitio ? sitioOptions[selectedSitio] || [] : [];
  }, [selectedSitio]);

  const formattedDateTime = useMemo(() => {
    return new Date().toLocaleString("en-PH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }, []);

  const handleSitioChange = (e) => {
    setSelectedSitio(e.target.value);
    setSelectedSubLocation("");
  };

  const handleContactChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length === 1 && value !== "0") {
      value = "0";
    }

    if (value.length >= 2 && !value.startsWith("09")) {
      value = "09";
    }

    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    setContactNumber(value);
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedImageTypes = ["image/png", "image/jpeg", "image/jpg"];
    const allowedVideoTypes = ["video/mp4"];

    const maxImageSize = 5 * 1024 * 1024; // 5MB
    const maxVideoSize = 10 * 1024 * 1024; // 10MB

    if (![...allowedImageTypes, ...allowedVideoTypes].includes(file.type)) {
      toast.error("Only PNG, JPG, JPEG, and MP4 files are allowed.");
      e.target.value = "";
      return;
    }

    if (allowedImageTypes.includes(file.type) && file.size > maxImageSize) {
      toast.error("Image size must be 5MB or less.");
      e.target.value = "";
      return;
    }

    if (allowedVideoTypes.includes(file.type) && file.size > maxVideoSize) {
      toast.error("Video size must be 10MB or less.");
      e.target.value = "";
      return;
    }

    setSelectedFile(file);
    toast.success("File uploaded successfully.");
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.success("File removed.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      toast.error("Full name is required.");
      return;
    }

    if (contactNumber.length !== 11) {
      toast.error("Enter a valid 11-digit contact number.");
      return;
    }

    if (!selectedSitio) {
      toast.error("Please select a sitio.");
      return;
    }

    if (!selectedSubLocation) {
      toast.error("Please select a sub-location.");
      return;
    }

    if (!incidentType) {
      toast.error("Please select an incident type.");
      return;
    }

    if (!urgencyLevel) {
      toast.error("Please select an urgency level.");
      return;
    }

    if (!description.trim()) {
      toast.error("Please describe the incident.");
      return;
    }

    if (!agreed) {
      toast.error("You must agree to the terms and conditions.");
      return;
    }
    const formattedUrgency = urgencyLevel.toLowerCase();
    const formData = {
      fullName,
      contactNumber,
      sitio: selectedSitio,
      subLocation: selectedSubLocation,
      exactLocation,
      incidentType,
      urgencyLevel: formattedUrgency,
      description,
      evidence: selectedFile,
    };
    await createReport(formData);
    console.log("Submitted Report:", formData);
    toast.success("Report submitted successfully.");

    setFullName("");
    setContactNumber("");
    setSelectedSitio("");
    setSelectedSubLocation("");
    setExactLocation("");
    setIncidentType("");
    setUrgencyLevel("");
    setDescription("");
    setAgreed(false);
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-gray-900">
      <Navbar
        showBackButton={true}
        backLabel="Back to Home"
        icon={ArrowLeft}
        onBack={() => navigate("/")}
      />

      <main className="mx-auto flex max-w-5xl justify-center px-4 py-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl rounded-xl border border-gray-200 bg-white px-5 py-6 shadow-sm"
        >
          <h1 className="text-xl font-semibold">Incident Report Form</h1>
          <p className="mt-1 text-xs text-gray-600">
            Please fill out all required fields accurately.
          </p>

          <section className="mt-6">
            <h2 className="text-base font-semibold">Personal Information</h2>
            <div className="mt-3 space-y-4 border-t border-gray-300 pt-4">
              <div>
                <label className="text-xs font-medium text-gray-800">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1 h-10 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm outline-none transition focus:border-blue-400"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-800">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={contactNumber}
                  onChange={handleContactChange}
                  className="mt-1 h-10 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm outline-none transition focus:border-blue-400"
                  placeholder="09XXXXXXXXX"
                  inputMode="numeric"
                />
              </div>
            </div>
          </section>

          <section className="mt-6">
            <h2 className="text-base font-semibold">Incident Details</h2>
            <div className="mt-3 space-y-4 border-t border-gray-300 pt-4">
              <div>
                <label className="text-xs font-medium text-gray-800">
                  Sitio <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1">
                  <select
                    value={selectedSitio}
                    onChange={handleSitioChange}
                    className="h-10 w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-3 pr-8 text-sm outline-none transition focus:border-blue-400"
                  >
                    <option value="">Select Sitio</option>
                    {Object.keys(sitioOptions).map((sitio) => (
                      <option key={sitio} value={sitio}>
                        {sitio}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-800">
                  Sub-Location / Area <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1">
                  <select
                    value={selectedSubLocation}
                    onChange={(e) => setSelectedSubLocation(e.target.value)}
                    disabled={!selectedSitio}
                    className="h-10 w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-3 pr-8 text-sm outline-none transition focus:border-blue-400 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                  >
                    <option value="">
                      {selectedSitio
                        ? "Select Sub-Location / Area"
                        : "Select Sitio first"}
                    </option>
                    {subLocationOptions.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-800">
                  Location
                </label>
                <input
                  type="text"
                  value={exactLocation}
                  onChange={(e) => setExactLocation(e.target.value)}
                  className="mt-1 h-10 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm outline-none transition focus:border-blue-400"
                  placeholder="Enter exact address or landmark (optional)"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-800">
                  Type of Incident <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1">
                  <select
                    value={incidentType}
                    onChange={(e) => setIncidentType(e.target.value)}
                    className="h-10 w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-3 pr-8 text-sm outline-none transition focus:border-blue-400"
                  >
                    <option value="">Select incident type</option>
                    {incidentTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-800">
                  Date & Time of Incident
                </label>
                <input
                  type="text"
                  value={formattedDateTime}
                  readOnly
                  className="mt-1 h-10 w-full rounded-lg border border-gray-200 bg-gray-100 px-3 text-xs text-gray-600 outline-none"
                />
                <p className="mt-1 text-[11px] text-gray-500">Auto-filled</p>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-800">
                  Urgency Level <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1">
                  <select
                    value={urgencyLevel}
                    onChange={(e) => setUrgencyLevel(e.target.value)}
                    className="h-10 w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-3 pr-8 text-sm outline-none transition focus:border-blue-400"
                  >
                    <option value="">Select urgency level</option>
                    {urgencyLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
          </section>

          <section className="mt-6">
            <h2 className="text-base font-semibold">Description</h2>
            <div className="mt-3 border-t border-gray-300 pt-4">
              <label className="text-xs font-medium text-gray-800">
                Main Concern <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition focus:border-blue-400"
                rows={4}
                placeholder="Describe the incident in detail"
              />
            </div>
          </section>

          <section className="mt-6">
            <h2 className="text-base font-semibold">Upload Evidence</h2>
            <div className="mt-3 border-t border-gray-300 pt-4">
              <label className="text-xs font-medium text-gray-800">
                Upload Image/Video (Optional)
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,video/mp4"
                onChange={handleFileChange}
                className="hidden"
              />

              <div
                onClick={handleFileClick}
                className="mt-2 flex h-28 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 text-center text-xs text-gray-500 transition hover:border-blue-300 hover:bg-blue-50/40"
              >
                <Upload className="mb-2 h-5 w-5" />
                <span className="font-medium text-gray-700">
                  Click to upload image or video
                </span>
                <span className="mt-1 text-[11px]">
                  Images: PNG, JPG, JPEG up to 5MB | Video: MP4 up to 10MB
                </span>
              </div>

              {selectedFile && (
                <div className="mt-3 flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-800">
                      {selectedFile.name}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="ml-3 rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </section>

          <section className="mt-6">
            <h2 className="text-base font-semibold">Terms and Condition</h2>
            <div className="mt-3 border-t border-gray-300 pt-4">
              <label className="flex items-start gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs leading-5 text-gray-700">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5"
                />
                <span>
                  The information you provide will be used solely for incident
                  reporting, verification, and emergency response by authorized
                  barangay officials.
                  <span className="text-red-500"> *</span>
                </span>
              </label>
            </div>
          </section>

          <div className="mt-6 flex gap-3">
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="w-full">
              Submit Report
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ReportForm;
