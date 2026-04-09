export const logger = (req, res, next) => {
  const methodColors = {
    GET: "green",
    POST: "yellow",
    PUT: "blue",
    DELETE: "red",
    PATCH: "magenta",
  };
  const color = methodColors[req.method] || "white";
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`[
      color
    ],
  );
  next();
};
