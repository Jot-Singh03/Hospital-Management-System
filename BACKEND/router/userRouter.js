import express from "express"
import { patientRegister,login,Newadmin, getAllDoctors, getUserDetails,logoutAdmin,logoutPatient, addNewDoctor } from "../controller/usercont.js";
import { isAdminAuthenticated,isPatientAuthenticated } from "../middlewares/Auth.js";

const router =express.Router()

router.post("/patient/reg", patientRegister);

router.post("/login", login);

router.post("/Newadmin",isAdminAuthenticated,Newadmin);

router.get("/doctors", getAllDoctors);

router.get("/AUsers",isAdminAuthenticated, getUserDetails);

router.get("/me",isPatientAuthenticated, getUserDetails);

router.get("/Adminlogout",isAdminAuthenticated,logoutAdmin);

router.get("/Patientlogout",isPatientAuthenticated,logoutPatient);

router.post("/doctor/add", isAdminAuthenticated,addNewDoctor);


export default router;