import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Check, Sun, Moon, Clock3 } from "lucide-react";
import Button from "../../components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/Card";
import Spinner from "../../utils/Spinner";
import ShiftTimeModal from "../../components/users/ShiftTimeModal";
import { toast } from "react-toastify";
// I disrigarded the state management for now since marami revisions na ginawa sa scheduling. nag local state na lang muna ako para to check the UI and the flow.
// added the set shift time modal

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

  const allTanods = [
    {
      id: 1,
      fullName: "Tanod A",
      contactNumber: "09077995951",
    },
    {
      id: 2,
      fullName: "Tanod B",
      contactNumber: "09077995952",
    },
    {
      id: 3,
      fullName: "Tanod C",
      contactNumber: "09077996911",
    },
    {
      id: 4,
      fullName: "Tanod D",
      contactNumber: "09077996951",
    },
    {
      id: 5,
      fullName: "Tanod E",
      contactNumber: "09263862231",
    },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedShift, setSelectedShift] = useState("AM");
  const [isShiftModalOpen, setIsShiftModalOpen] = useState(false);

  const [shiftTimes, setShiftTimes] = useState({
    AM: {
      start: "08:00",
      end: "12:00",
    },
    PM: {
      start: "13:00",
      end: "17:00",
    },
  });

  const [schedule, setSchedule] = useState({
    Monday: { AM: [], PM: [] },
    Tuesday: { AM: [], PM: [] },
    Wednesday: { AM: [], PM: [] },
    Thursday: { AM: [], PM: [] },
    Friday: { AM: [], PM: [] },
    Saturday: { AM: [], PM: [] },
    Sunday: { AM: [], PM: [] },
  });

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [selectedDay, selectedShift]);

  const counts = useMemo(() => {
    const result = {};

    for (const day of dayNames) {
      result[day] = {
        AM: schedule[day]?.AM?.length || 0,
        PM: schedule[day]?.PM?.length || 0,
      };
    }

    return result;
  }, [schedule, dayNames]);

  const assignedIds = schedule[selectedDay]?.[selectedShift] || [];

  const tanods = allTanods.map((tanod) => ({
    ...tanod,
    assigned: assignedIds.includes(tanod.id),
  }));

  const handleSelectDay = (day) => {
    setSelectedDay(day);
    setSelectedShift("AM");
  };

  const handleSelectShift = (shift) => {
    setSelectedShift(shift);
  };

  const toggleTanod = (tanodId) => {
    setSchedule((prev) => {
      const currentAssigned = prev[selectedDay][selectedShift];
      const isAssigned = currentAssigned.includes(tanodId);

      return {
        ...prev,
        [selectedDay]: {
          ...prev[selectedDay],
          [selectedShift]: isAssigned
            ? currentAssigned.filter((id) => id !== tanodId)
            : [...currentAssigned, tanodId],
        },
      };
    });
  };

  const selectAll = () => {
    setSchedule((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [selectedShift]: allTanods.map((tanod) => tanod.id),
      },
    }));
  };

  const clearAll = () => {
    setSchedule((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [selectedShift]: [],
      },
    }));
  };

  const saveSchedule = () => {
    console.log("Saved schedule:", {
      day: selectedDay,
      shift: selectedShift,
      shiftTime: shiftTimes[selectedShift],
      assignedTanods: schedule[selectedDay][selectedShift],
      fullSchedule: schedule,
    });

    toast.success("Schedule saved successfully!");
  };

  const handleSaveShiftTimes = (newTimes) => {
    setShiftTimes(newTimes);
    console.log("Updated shift times:", newTimes);
  };

  return (
    <>
      <div className="min-h-screen p-4 md:p-6">
        <div className="mx-auto max-w-8xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-700">Scheduling</h1>
            <p className="text-sm text-slate-600">
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
                  const active = selectedDay === day;
                  const amCount = counts?.[day]?.AM || 0;
                  const pmCount = counts?.[day]?.PM || 0;
                  const totalCount = amCount + pmCount;

                  return (
                    <div
                      key={day}
                      className={`rounded-xl border transition ${
                        active
                          ? "border-green-900 bg-green-50"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <button
                        onClick={() => handleSelectDay(day)}
                        className="flex w-full items-center justify-between px-4 py-3 text-left"
                      >
                        <span
                          className={`font-medium ${
                            active ? "text-green-900" : "text-gray-800"
                          }`}
                        >
                          {day}
                        </span>

                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                          {totalCount} tanod{totalCount !== 1 ? "s" : ""}
                        </span>
                      </button>

                      {active && (
                        <div className="space-y-2 border-t border-green-100 px-4 pb-4 pt-3">
                          <button
                            onClick={() => handleSelectShift("AM")}
                            className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-sm transition ${
                              selectedShift === "AM"
                                ? "border-green-900 bg-white text-green-900"
                                : "border-gray-200 bg-gray-50 text-gray-700"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <Sun className="h-4 w-4" />
                              AM Shift
                            </span>
                            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold">
                              {amCount} tanod{amCount !== 1 ? "s" : ""}
                            </span>
                          </button>

                          <button
                            onClick={() => handleSelectShift("PM")}
                            className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-sm transition ${
                              selectedShift === "PM"
                                ? "border-green-900 bg-white text-green-900"
                                : "border-gray-200 bg-gray-50 text-gray-700"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <Moon className="h-4 w-4" />
                              PM Shift
                            </span>
                            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold">
                              {pmCount} tanod{pmCount !== 1 ? "s" : ""}
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <CardTitle>
                      Assign Tanods - {selectedDay} ({selectedShift} Shift)
                    </CardTitle>
                    <CardDescription>
                      Select tanods for duty assignment
                    </CardDescription>

                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                      <Clock3 className="h-4 w-4" />
                      <span>
                        Time: {shiftTimes[selectedShift].start} -{" "}
                        {shiftTimes[selectedShift].end}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsShiftModalOpen(true)}
                    >
                      Set Shift Time
                    </Button>
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
                  {tanods.map((tanod) => (
                    <button
                      key={tanod.id}
                      onClick={() => toggleTanod(tanod.id)}
                      className={`flex items-start justify-between rounded-xl border-2 px-4 py-4 text-left transition ${
                        tanod.assigned
                          ? "border-green-900 bg-green-50"
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
                            ? "bg-green-900 text-white"
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

      <ShiftTimeModal
        open={isShiftModalOpen}
        onClose={() => setIsShiftModalOpen(false)}
        shiftTimes={shiftTimes}
        onSave={handleSaveShiftTimes}
      />
    </>
  );
}
