export const resetTokenExpiresAt = () => {
  return Date.now() + 1 * 60 * 60 * 1000;
};
