import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const Aptform = () => {
  
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [Uid, setUid] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [department, setDepartment] = useState("Pediatrics");
    const [doctorFirstName, setDoctorFirstName] = useState("");
    const [doctorLastName, setDoctorLastName] = useState("");
    const [address, setAddress] = useState("");
    const [hasVisited, setHasVisited] = useState(false);
  
    const departmentsArray = [
      "Pediatrics",
      "Orthopedics",
      "Cardiology",
      "Neurology",
      "Oncology",
      "Radiology",
      "Physical Therapy",
      "Dermatology",
      "ENT",
    ];
  
    const [doctors, setDoctors] = useState([]);
    useEffect(() => {
      const fetchDoctors = async () => {
        const { data } = await axios.get(
          "http://localhost:4000/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
        console.log(data.doctors);
      };
      fetchDoctors();
    }, []);


    const handleAppointment = async (e) => {
      e.preventDefault();
      try {
        const hasVisitedBool = Boolean(hasVisited);
        const { data } = await axios.post(
          "http://localhost:4000/appoint/post",
          {
            firstName,
            lastName,
            email,
            phone,
            Uid,
            dob,
            gender,
            appointment_date: appointmentDate,
            department,
            doctor_firstName: doctorFirstName,
            doctor_lastName: doctorLastName,
            hasVisited: hasVisitedBool,
            address,
          },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        toast.success(data.message);
        setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setUid("");
          setDob("");
          setGender("");
          setAppointmentDate("");
          setDepartment("");
          setDoctorFirstName("");
          setDoctorLastName("");
          setHasVisited("");
          setAddress("");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
  
    return (
      <>
        <div className="container form-component appointment-form">
          <h2>Appointment</h2>
          <form onSubmit={handleAppointment}>
            <div>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="number"
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Uid"
                value={Uid}
                onChange={(e) => setUid(e.target.value)}
              />
              <input
                type="date"
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <div>
              <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Other</option>
              </select>
              <input
                type="date"
                placeholder="Appointment Date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
              />
            </div>
            <div>
              <select
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                  setDoctorFirstName("");
                  setDoctorLastName("");
                }}
              >
                {departmentsArray.map((depart, index) => {
                  return (
                    <option value={depart} key={index}>
                      {depart}
                    </option>
                  );
                })}
              </select>
              <select
                value={`${doctorFirstName} ${doctorLastName}`}
                onChange={(e) => {
                  const [firstName, lastName] = e.target.value.split(" ");
                  setDoctorFirstName(firstName);
                  setDoctorLastName(lastName);
                }}
                disabled={!department}
              >
                <option value="">Select Doctor</option>
                {doctors
                  .filter((Doctor) => Doctor.doctorDepartment === department)
                  .map((Doctor, index) => (
                    <option
                      value={`${Doctor.firstName} ${Doctor.lastName}`}
                      key={index}
                    >
                      {Doctor.firstName} {Doctor.lastName}
                    </option>
                  ))}
              </select>
            </div>
            <textarea
              rows="10"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
            <div
              style={{
                gap: "10px",
                justifyContent: "flex-end",
                flexDirection: "row",
              }}
            >
              <p style={{ marginBottom: 0 }}>Have you visited before?</p>
              <input
                type="checkbox"
                checked={hasVisited}
                onChange={(e) => setHasVisited(e.target.checked)}
                style={{ flex: "none", width: "25px" }}
              />
            </div>
            <button style={{ margin: "0 auto" }}>GET APPOINTMENT</button>
          </form>
        </div>
      </>
  )
}

export default Aptform
