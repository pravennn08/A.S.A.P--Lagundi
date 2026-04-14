import { useEffect, useState } from "react";
import Button from "../ui/Button";

export default function ShiftTimeModal({ open, onClose, shiftTimes, onSave }) {
  const [form, setForm] = useState({
    AM: {
      start: "08:00",
      end: "12:00",
    },
    PM: {
      start: "13:00",
      end: "17:00",
    },
  });

  useEffect(() => {
    if (shiftTimes) {
      setForm(shiftTimes);
    }
  }, [shiftTimes]);

  if (!open) return null;

  const handleChange = (shift, field, value) => {
    setForm((prev) => ({
      ...prev,
      [shift]: {
        ...prev[shift],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-bold text-gray-900">Set Shift Times</h2>
          <p className="text-sm text-gray-500">
            Update the time range for AM and PM shifts
          </p>
        </div>

        <div className="space-y-6 px-6 py-5">
          <div className="rounded-xl border border-gray-200 p-4">
            <h3 className="mb-3 font-semibold text-gray-900">AM Shift</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Start Time
                </label>
                <input
                  type="time"
                  value={form.AM.start}
                  onChange={(e) => handleChange("AM", "start", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-900"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  End Time
                </label>
                <input
                  type="time"
                  value={form.AM.end}
                  onChange={(e) => handleChange("AM", "end", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-900"
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 p-4">
            <h3 className="mb-3 font-semibold text-gray-900">PM Shift</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Start Time
                </label>
                <input
                  type="time"
                  value={form.PM.start}
                  onChange={(e) => handleChange("PM", "start", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-900"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  End Time
                </label>
                <input
                  type="time"
                  value={form.PM.end}
                  onChange={(e) => handleChange("PM", "end", e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-900"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Shift Times</Button>
        </div>
      </div>
    </div>
  );
}
