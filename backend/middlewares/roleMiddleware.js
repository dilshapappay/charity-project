const roleMiddleware = (requiredRoles) => {
    return (req, res, next) => {
      const userRole = req.user.RoleId;
  
      if (!requiredRoles.includes(userRole)) {
        return res.status(403).json({ message: 'Forbidden: You do not have the required role to access this resource' });
      }
  
      next();
    };
  };
  
  module.exports = roleMiddleware;