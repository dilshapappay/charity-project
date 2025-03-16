const Role = Object.freeze({
  Master: 1,
  "Camp Admin": 2,
  "Normal User": 3,
  "Volunteer": 4
});

const getRoleName = (roleId) => {
  for (const [key, value] of Object.entries(Role)) {
    if (value === roleId) {
      return key;
    }
  }
  return 'Unknown Role';
};

module.exports = { Role, getRoleName };