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

module.exports = {
  throwErr,
  isTeacher,
  isStudent,
  checkRole
};
