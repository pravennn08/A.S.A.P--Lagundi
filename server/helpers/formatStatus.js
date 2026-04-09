export const formatStatus = (status) => {
  if (status === "pending") return "Pending";
  if (status === "in_progress") return "In Progress";
  if (status === "resolved") return "Resolved";
  return status;
};
