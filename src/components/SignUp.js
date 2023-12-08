import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiService, GetApiService } from "./Apis/ApiService";
import { useAuth } from "./auth/Auth";
import { Alert } from "react-bootstrap";
import { Snackbar } from "@mui/material";

const SignUp = () => {

    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const [fname, setFname] = useState("");
    const [mname, setMname] = useState("");
    const [lname, setLname] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");
    const [userinfo, setUserInfo] = useState({
        languages: [],
        response: [],
    });

    const { flashMsg1, flash } = useAuth();
    const [flag, setFlag] = useState(false);
    const [flashMsg, setFlashMsg] = useState("");



    useEffect(() => {
        fetchUserRoles('/ProjectApis/v1/getUserRoles');
    }, []);

    const fetchUserRoles = async (url) => {

        try {

            await GetApiService(url).then((data) => {
                setRoles(data.roles);
                console.log(data.roles)
            });
        } catch (error) {
            console.log(error.message);
        }
    }

    const SubmitSignUp = async (e) => {
        e.preventDefault();

        let array = userinfo.response;
        let skills = array.map((str) => `${str}`).join(',');
        console.log(skills);

        const url = '/ProjectApis/v1/user_sign_up';
        const body = JSON.stringify({
            fName: fname,
            mname: mname,
            lname: lname,
            email: email,
            userName: userName,
            password: password,
            mobileNo: phone,
            gender: gender,
            dob: dob,
            address: address,
            role_id: role,
            skills: skills
        });

        await ApiService(url, body).then((data) => {
            if (data.status === 1) {
                console.log(data)
                navigate('/');
                setFlag(true);
                flashMsg1(data.message);
                setFlashMsg(data.message);

            } else {
                navigate('/signup');
                flashMsg1(data.message);

            }
        })

        console.log(body);
    }

    const handleChange = (e) => {

        console.log("values ", e.target.value)
        // Destructuring
        const { value, checked } = e.target;
        const { languages } = userinfo;

        // Case 1 : The user checks the box
        if (checked) {
            setUserInfo({
                languages: [...languages, value],
                response: [...languages, value],
            });
        }
        // Case 2  : The user unchecks the box
        else {
            setUserInfo({
                languages: languages.filter(
                    (e) => e !== value
                ),
                response: languages.filter(
                    (e) => e !== value
                ),
            });
        }

        console.log('Skills are : ', userinfo.response);

    }

    const handleClose = () => {
        setFlag(false);
    }

    return (
        <>
            <script src="https://use.fontawesome.com/f59bcd8580.js"></script>

            {
                flag && (
                    <Snackbar open={flag} autoHideDuration={3000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                            {
                                flashMsg
                            }
                        </Alert>
                    </Snackbar>
                )
            }

            <div className="container">
                <div className="card sign-card">
                    <div className="card-body">
                        <form method="POST" onSubmit={SubmitSignUp}>
                            <div style={{ width: "100%", height: "7vh", backgroundColor: "#ddd", marginBottom: "18px" }}>
                                <h4 style={{ position: "relative", top: "5px" }}>Sign Up Form</h4>
                            </div>

                            <div className="row p-3">
                                <div className="col-2">
                                    <label className="form-label">Full Name</label>
                                </div>
                                <div className="col-3">
                                    <input type="text" className="form-control" placeholder="First Name"
                                        value={fname}
                                        onChange={(e) => setFname(e.target.value)} />
                                </div>
                                <div className="col-3">
                                    <input type="text" className="form-control" placeholder="Middle Name" onChange={(e) => setMname(e.target.value)} />
                                </div>
                                <div className="col-3">
                                    <input type="text" className="form-control" placeholder="Last Name" onChange={(e) => setLname(e.target.value)} />
                                </div>
                            </div>
                            <div className="row p-3">
                                <div className="col-2">
                                    <label>Email</label>
                                </div>
                                <div className="col-5">
                                    <input type="email" className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>
                            <div className="row p-3">
                                <div className="col-2">
                                    <label className="form-label">Credentionls</label>
                                </div>
                                <div className="col-4">
                                    <input type="text" className="form-control" placeholder="User Name" onChange={(e) => setUserName(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <input type="password" className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                </div>

                            </div>
                            <div className="row p-3">
                                <div className="col-2">
                                    <label>Mobile No.</label>
                                </div>
                                <div className="col-5">
                                    <input type="text" className="form-control" placeholder="Mobile No." onChange={(e) => setPhone(e.target.value)} />
                                </div>
                            </div>
                            <div className="row p-3">
                                <div className="col-2">
                                    <label>Gender</label>
                                </div>

                                <div className="col-3">
                                    <label className="form-check-label">Male</label>
                                    <input className="form-check-input" type="radio" name="gender" id="inlineRadio1" value="1" onChange={(e) => setGender(e.target.value)} />
                                </div>
                                <div className="col-3">
                                    <label className="form-check-label">Female</label>
                                    <input className="form-check-input" type="radio" name="gender" id="inlineRadio1" value="2" onChange={(e) => setGender(e.target.value)} />
                                </div>
                                <div className="col-3">
                                    <label className="form-check-label">Transgender</label>
                                    <input className="form-check-input" type="radio" name="gender" id="inlineRadio1" value="3" onChange={(e) => setGender(e.target.value)} />
                                </div>

                            </div>
                            <div className="row p-3">
                                <div className="col-2">
                                    <label>DOB</label>
                                </div>
                                <div className="col-5">
                                    <input type="date" className="form-control" placeholder="dd-mm-yy" style={{ marginLeft: "40px" }} onChange={(e) => setDob(e.target.value)} />
                                </div>
                            </div>
                            <div className="row p-3">
                                <div className="col-2">
                                    <label>Address</label>
                                </div>
                                <div className="col-8" style={{ display: "flex", marginLeft: "35px" }}>
                                    <textarea className="form-control" rows="4" cols="8" placeholder="Address" onChange={(e) => setAddress(e.target.value)}></textarea>
                                </div>
                            </div>
                            <div className="row p-3">
                                <div className="col-2">
                                    <label>Role</label>
                                </div>
                                <div className="col-4" style={{ display: "flex", marginLeft: "35px" }}>
                                    <select className="form-control" name="role" onChange={(e) => setRole(e.target.value)}>
                                        <option>--Select--</option>
                                        {
                                            roles.map((role) => (
                                                <option value={role.id}>{role.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="row p-3">
                                <div className="col-2">
                                    <label>Skills</label>
                                </div>
                                <div className="col-10" style={{ position: 'relative', right: "13vh" }}>
                                    <input className="form-check-input" type="checkbox" name="languages" value="PHP" onChange={handleChange} />
                                    <label className="form-check-label">PHP</label>
                                    <input className="form-check-input" type="checkbox" name="languages" value="React" onChange={handleChange} />
                                    <label className="form-check-label">React</label>
                                    <input className="form-check-input" type="checkbox" name="languages" value="Flutter" onChange={handleChange} />
                                    <label className="form-check-label">Flutter</label>
                                    <input className="form-check-input" type="checkbox" name="languages" value="JavaScript" onChange={handleChange} />
                                    <label className="form-check-label">JavaScript</label>
                                    <input className="form-check-input" type="checkbox" name="languages" value="Mysql" onChange={handleChange} />
                                    <label className="form-check-label">Mysql</label>
                                </div>
                                {/* <div className="col-2">
                                    
                                </div>
                                <div className="col-2">
                                    
                                </div>
                                <div className="col-2">
                                    
                                </div>
                                <div className="col-2">
                                    
                                </div> */}

                            </div>

                            <div className="row p-2">

                                <div className="col-3" style={{ display: "flex", gap: "10px", marginLeft: "20%" }}>
                                    <button type="submit" className="btn btn-primary btn-signup">Signup</button>
                                    <button type="button" className="btn btn-secondary btn-signup" onClick={() => { navigate('/', { replace: true }) }}>Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </>
    );
};

export default SignUp;