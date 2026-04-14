import React from "react";
import { Check, FileText, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

const ReportSuccessPage = () => {
  const navigate = useNavigate();

  const trackingNumber = "RPT-004";

  return (
    <div className="min-h-screen bg-[#f3f4f6] px-4 py-10">
      <div className="mx-auto w-full max-w-2xl rounded-2xl border border-gray-200 bg-white px-6 py-10 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border-4 border-green-600">
              <Check className="h-6 w-6 text-green-600" />
            </div>
          </div>

          <h1 className="mt-6 text-3xl font-bold text-[#0f172a]">Thank You!</h1>

          <p className="mt-3 text-md text-gray-600">
            Your incident report has been successfully submitted
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 px-6 py-7 text-center">
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <FileText className="h-4 w-4" />
            <span className="text-base">Tracking Number</span>
          </div>

          <p className="mt-3 text-3xl font-extrabold tracking-wide text-blue-600">
            {trackingNumber}
          </p>

          <p className="mt-3 text-sm text-gray-600">
            Please save this tracking number for your records
          </p>
        </div>

        <div className="mt-7 rounded-2xl bg-gray-50 px-6 py-6">
          <h2 className="text-xl font-bold text-[#0f172a]">
            What happens next?
          </h2>

          <ul className="mt-5 space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-blue-600" />
              <span>
                Your report will be reviewed by Barangay Lagundi authorities
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-blue-600" />
              <span>
                You will be contacted at the phone number you provided for
                updates
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-blue-600" />
              <span>
                Emergency reports receive priority response from our team
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-blue-600" />
              <span>
                Use your tracking number ({trackingNumber}) for any inquiries
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-10 text-center">
          <p className="text-md text-gray-600">
            For urgent concerns, you may contact:
          </p>
          <p className="mt-3 text-lg font-bold text-[#0f172a]">
            Barangay Lagundi Emergency Hotline: +63 912 345 6789
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Button
            type="button"
            variant="secondary"
            className="flex h-12 items-center justify-center gap-2 text-base"
            onClick={() => navigate("/")}
          >
            <Home className="h-5 w-5" />
            Return to Home
          </Button>

          <Button
            type="button"
            variant="primary"
            className="h-12 text-base"
            onClick={() => navigate("/ReportForm")}
          >
            Submit Another Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportSuccessPage;
