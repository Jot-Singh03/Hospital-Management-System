import {catcherr} from "../middlewares/catcherr.js";
import  ErrorHandler  from "../middlewares/errmiddleware.js";
import { Appointment } from "../model/app_sch.js";
import { User } from "../model/user_sch.js";


export const postAppointment = catcherr(async (req, res, next) => {
    const {
      firstName,
      lastName,
      email,
      phone,
      Uid,
      dob,
      gender,
      appointment_date,
      department,
      doctor_firstName,
      doctor_lastName,
      hasVisited,
      address,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !Uid ||
      !dob ||
      !gender ||
      !appointment_date ||
      !department ||
      !doctor_firstName ||
      !doctor_lastName ||
      !address
    ) {
      return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
    const isConflict = await User.find({
      firstName: doctor_firstName,
      lastName: doctor_lastName,
      role: "Doctor",
      doctorDepartment: department,
    });
    if (isConflict.length === 0) {
      return next(new ErrorHandler("Doctor not found", 404));
    }
  
    if (isConflict.length > 1) {
      return next(
        new ErrorHandler(
          "Doctors Conflict! Please Contact Through Email Or Phone!",
          400
        )
      );
    }
    const doctorId = isConflict[0]._id;
    const patientId = req.user._id;
    const appointment = await Appointment.create({
      firstName,
      lastName,
      email,
      phone,
      Uid,
      dob,
      gender,
      appointment_date,
      department,
      doctor: {
        firstName: doctor_firstName,
        lastName: doctor_lastName,
      },
      hasVisited,
      address,
      doctorId,
      patientId,
    });
    res.status(200).json({
      success: true,
      appointment,
      message: "Appointment Send!",
    });
  });
  
  export const getAllAppointments = catcherr(async (req, res, next) => {
    const appointments = await Appointment.find();
    res.status(200).json({
      success: true,
      appointments,
    });
  });
  export const updateAppointmentStatus = catcherr(
    async (req, res, next) => {
      const { id } = req.params;
      let appointment = await Appointment.findById(id);
      if (!appointment) {
        return next(new ErrorHandler("Appointment not found!", 404));
      }
      appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
      res.status(200).json({
        success: true,
        message: "Appointment Status Updated!",
      });
    }
  );
  export const deleteAppointment = catcherr(async (req, res, next) => {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return next(new ErrorHandler("Appointment Not Found!", 404));
    }
    await appointment.deleteOne();
    res.status(200).json({
      success: true,
      message: "Appointment Deleted!",
    });
  });