import {
  ClipboardList,
  CircleCheckBig,
  Clock3,
  AlertCircle,
} from "lucide-react";

export const stats = [
  {
    label: "Total Reports",
    value: 3,
    caption: "All time incidents",
    icon: ClipboardList,
    iconWrap: "bg-blue-100 text-blue-600",
  },
  {
    label: "Responded",
    value: 2,
    caption: "In progress or resolved",
    icon: CircleCheckBig,
    iconWrap: "bg-green-100 text-green-600",
  },
  {
    label: "Pending",
    value: 1,
    caption: "Awaiting response",
    icon: Clock3,
    iconWrap: "bg-amber-100 text-amber-600",
  },
  {
    label: "Resolved",
    value: 1,
    caption: "Completed cases",
    icon: AlertCircle,
    iconWrap: "bg-violet-100 text-violet-600",
  },
];

export const incidents = [
  {
    id: "RPT-001",

    dateTime: "Apr 6, 11:00 AM",
    fullDateTime: "Monday, April 6, 2026 at 11:00 AM",
    sitio: "Centro",
    subLocation: "Jasa Main Road",
    exactLocation: "Near the main intersection",
    incidentType: "Road Accident",
    reporterName: "Juan Dela Cruz",
    contactNumber: "09171234567",
    responseNotes: "Emergency responders dispatched",
    respondedBy: "Tanod Rodriguez",

    status: "In Progress",
    statusTone: "bg-blue-100 text-blue-700",
    dot: "bg-orange-500",
    location: "Centro - Jasa Main Road",
    incident: "Road Accident",
    urgency: "High",
    time: "02:57 PM",
    description:
      "Vehicle collision involving motorcycle and car. Minor injuries reported.",
  },

  {
    id: "RPT-002",

    dateTime: "Apr 6, 08:00 AM",
    fullDateTime: "Monday, April 6, 2026 at 08:00 AM",
    sitio: "Troso",
    subLocation: "Riverside",
    exactLocation: "Near the riverbank houses",
    incidentType: "Medical Emergency",
    reporterName: "Maria Santos",
    contactNumber: "09181234567",
    responseNotes: "Patient transported to nearby health center",
    respondedBy: "Tanod Ramirez",

    status: "Resolved",
    statusTone: "bg-green-100 text-green-700",
    extraTag: "EMERGENCY",
    extraTagTone: "bg-red-500 text-white",
    dot: "bg-red-500",
    location: "Troso - Riverside",
    incident: "Medical Emergency",
    urgency: "Emergency",
    time: "11:57 AM",
    description:
      "Elderly resident experiencing chest pain and difficulty breathing.",
  },

  {
    id: "RPT-003",

    dateTime: "Apr 6, 12:00 PM",
    fullDateTime: "Monday, April 6, 2026 at 12:00 PM",
    sitio: "Bulaklak",
    subLocation: "Bulaklak",
    exactLocation: "Near the drainage area",
    incidentType: "Flooding",
    reporterName: "Pedro Reyes",
    contactNumber: "09192345678",
    responseNotes: "Awaiting maintenance team response",
    respondedBy: "Tanod Dela Torre",

    status: "Pending",
    statusTone: "bg-amber-100 text-amber-700",
    dot: "bg-yellow-500",
    location: "Bulaklak - Bulaklak",
    incident: "Flooding",
    urgency: "Medium",
    time: "03:57 PM",
    description: "Street flooding due to clogged drainage. Water level rising.",
  },
];
