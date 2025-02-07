import { User } from "../model/user_sch.js";
import { catcherr } from "./catcherr.js";
import ErrorHandler from "./errmiddleware.js";
import jwt from "jsonwebtoken";

export const isAdminAuthenticated = catcherr(
    async (req, res, next) => {
      const token = req.cookies.adminToken;
      if (!token) {
        return next(
          new ErrorHandler("Dashboard User is not authenticated!", 400)
        );
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      if (req.user.role !== "Admin") {
        return next(
          new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403)
        );
      }
      next();
    }
  );
  
  // Middleware to authenticate frontend users
  export const isPatientAuthenticated = catcherr(
    async (req, res, next) => {
      const token = req.cookies.patientToken;
      if (!token) {
        return next(new ErrorHandler("User is not authenticated!", 400));
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      if (req.user.role !== "Patient") {
        return next(
          new ErrorHandler(`${req.user.role} not authorized for this resource!`, 403)
        );
      }
      next();
    }
  );
  
  export const isAuthorized = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorHandler(
            `${req.user.role} not allowed to access this resource!`
          )
        );
      }
      next();
    };
  };