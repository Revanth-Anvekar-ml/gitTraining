function getProfile(user) {
  return {
    displayName: user.name,
    role: user.role || "intern",
  };
}

module.exports = { getProfile };