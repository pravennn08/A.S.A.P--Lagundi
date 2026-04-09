import { useMemo, useState, useEffect } from "react";
import { CalendarDays, Check } from "lucide-react";
import Button from "../../components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/Card";
import { useScheduleStore } from "../../store/useScheduleStore";
import Spinner from "../../utils/Spinner";

export default function ScheduleManagement() {
  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const {
    counts,
    tanods,
    fetchOverview,
    toggleTanod,
    selectAll,
    clearAll,
    saveSchedule,
    isLoading,
  } = useScheduleStore();

  const [selectedDay, setSelectedDay] = useState("Monday");
  useEffect(() => {
    fetchOverview(selectedDay);
  }, [selectedDay]);
  const tanodsForDay = tanods;

  if (isLoading) return <Spinner />;
  return (
    <div className="min-h-screen  p-4 md:p-6">
      <div className="mx-auto max-w-8xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-700">Scheduling</h1>
          <p className=" text-sm text-slate-600">
            Assign barangay tanods to daily duty schedules
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-xl border border-gray-200 p-2">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <CardTitle>Select Day</CardTitle>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              {dayNames.map((day) => {
                const count = counts[day] || 0;
                const active = selectedDay === day;

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                      active
                        ? "border-blue-900 bg-blue-50 text-blue-900"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <span className="font-medium">{day}</span>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                      {count} tanod{count !== 1 ? "s" : ""}
                    </span>
                  </button>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Assign Tanods - {selectedDay}</CardTitle>
                  <CardDescription>
                    Select tanods for duty assignment
                  </CardDescription>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={selectAll}>
                    Select All
                  </Button>
                  <Button variant="outline" onClick={clearAll}>
                    Clear All
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                {tanodsForDay.map((tanod) => (
                  <button
                    key={tanod.id}
                    onClick={() => toggleTanod(tanod.id)}
                    className={`flex items-start justify-between rounded-xl border-2 px-4 py-4 text-left transition ${
                      tanod.assigned
                        ? "border-blue-900 bg-blue-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-gray-900">
                        {tanod.fullName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {tanod.contactNumber || "No Contact"}
                      </p>
                    </div>

                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full ${
                        tanod.assigned
                          ? "bg-blue-900 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      <Check className="h-4 w-4" />
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 flex justify-end gap-3 border-t border-gray-200 pt-4">
                <Button onClick={saveSchedule}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
