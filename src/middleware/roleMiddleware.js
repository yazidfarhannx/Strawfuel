module.exports = (allowedRoles = []) => {
  return (req, res, next) => {
    try {
      // cek user login
      if (!req.user) {
        return res.status(401).json({
          message: 'Unauthorized',
        });
      }

      // cek role user
      if (
        !allowedRoles.includes(req.user.role)
      ) {
        return res.status(403).json({
          message: 'Access denied',
        });
      }

      next();
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };
};