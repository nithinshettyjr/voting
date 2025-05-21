
import "./SignUtils/CSS/Sign.css";
import signupimage from "./SignUtils/images/signup-image.jpg"
import { Link } from 'react-router-dom';
import "./SignUtils/CSS/style.css.map"
import Nav_bar from "../Navbar/Navbar";
import { useState } from "react";
import axios from "axios"
import { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../../helper";
import { useNavigate } from 'react-router-dom';



export default function Signup() {
    const navigate = useNavigate();

    const signSuccess = () => toast.success("Voter Created Successfully \n Redirecting You To Login Page", {
        // position: toast.POSITION.TOP_CENTER,
        className: "toast-message",
    });
    const signFailed = (msg) => toast.error(`${msg}`, {
        // position: toast.POSITION.TOP_CENTER,
        className: "toast-message",
    });
    const [loading, setLoading] = useState(false);
    const [age, setAge] = useState();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        age: '',
        dob: '',
        voterid: '',
        phone: '',
        image: null,
        email: '',
        pass: '',
        re_pass: ''
    });

    function calculateAge(dateOfBirth) {
        const dob = new Date(dateOfBirth);
        const today = new Date();

        let age = today.getFullYear() - dob.getFullYear();
        const monthDifference = today.getMonth() - dob.getMonth();
        const dayDifference = today.getDate() - dob.getDate();

        // Adjust age if the birthdate hasn't occurred yet this year
        if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
            age--;
        }

        return age;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'dob') {
            const age = calculateAge(value);
            setFormData({
                ...formData,
                [name]: value,
                age: age
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        console.log("Form data after changing",formData);
        }
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0]
        });
    };

    const logFormData = (formData) => {
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
    };

    const handleSubmit = async (e) => {
      setLoading(true);
      e.preventDefault();

      if (formData.pass !== formData.re_pass) {
        alert("Passwords do not match");
        setLoading(false);
        return;
      }

      const age = calculateAge(formData.dob);
      if (age < 18 && age >= 1) {
        alert("You are not eligible to register");
        setLoading(false);
        return;
      }

      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      logFormData(formDataToSend); // Log the FormData contents

      try {
        const response = await axios.post(
          `${BASE_URL}/createVoter`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.success) {
          signSuccess();
          setTimeout(() => {
            navigate("/Login");
          }, 2000);
        } else {
          signFailed("Invalid Details");
        }
      } catch (error) {
        console.error("Error response:", error.response);
        signFailed(error.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };




    return (
        <div className="Sign-Container" >
            <Nav_bar />
            <section className="signup">
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Registration</h2>
                            <form method="POST" enctype="multipart/form-data" className="register-form" id="register-form">
                                <ToastContainer />
                                <div className="form-group">
                                    <label for="firstName"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} placeholder="Your First Name" required />
                                </div>
                                <div className="form-group">
                                    <label for="lastName"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} placeholder="Your Last Name" required />
                                </div>

                                <div className="form-group">
                                    <label for="dob"><i className="zmdi zmdi-calendar-account material-icons-name"></i></label>
                                    <input type="date" name="dob" id="dob" value={formData.dob} onChange={handleChange} placeholder="Your Date of Birth" required />
                                </div>
                                <div className="form-group">
                                    <label for="voterid"><i className="zmdi zmdi-file-text material-icons-name"></i></label>
                                    <input type="number" name="voterid" id="voterid" value={formData.voterid} onChange={handleChange} placeholder="Your Voter ID" required />
                                </div>
                                <div className="form-group">
                                    <label for="phone"><i className="zmdi zmdi-local-phone material-icons-name"></i></label>
                                    <input type="number" name="phone" id="phone" value={formData.phone} onChange={handleChange} placeholder="Your Phone Number" required />
                                </div>
                                <div className="form-group">
                                    <label for="image"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="file" name="image" id="image" onChange={handleFileChange} placeholder="Upload Your Photo" required />
                                </div>
                                <div className="form-group">
                                    <label for="email"><i className="zmdi zmdi-email"></i></label>
                                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required />
                                </div>
                                <div className="form-group">
                                    <label for="pass"><i className="zmdi zmdi-lock"></i></label>
                                    <input type="password" name="pass" id="pass" value={formData.pass} onChange={handleChange} placeholder="Password" required />
                                </div>
                                <div className="form-group">
                                    <label for="re-pass"><i className="zmdi zmdi-lock-outline"></i></label>
                                    <input type="password" name="re_pass" id="re_pass" value={formData.re_pass} onChange={handleChange} placeholder="Repeat your password" required />
                                </div>
                                <div className="form-group form-button">
                                    {/* <input type="submit" name="signup" id="signup" className="form-submit" value="Submit" /> */}
                                    <button onClick={handleSubmit} disabled={loading}>{loading ? <div className="spinner"></div> : 'Register'}</button>
                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure><img src={signupimage} alt="sing up image" /></figure>
                            <Link to='/Login' className="signup-image-link">I am already member</Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )

}
