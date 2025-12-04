const throwErr = (err) => {
  throw new Error(err || "Something went wrong");
};

const checkRole = (user, allowedRoles) => {
  if(!user ||  !allowedRoles.includes(user.role)|| !user.emailVerified) {
    throw new Error(`Unauthorized: only ${allowedRoles.join(" or ")} can access this action.`);
  }
}

function isTeacher(user) {
  checkRole(user, ["teacher"]);
}

function isStudent(user) {
  checkRole(user, ["student"]);
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

module.exports = {
  throwErr,
  isTeacher,
  isStudent,
  checkRole,
  addDays
};
