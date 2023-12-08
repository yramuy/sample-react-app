import React, { useState } from "react";
import { Alert, Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Snackbar, TextField } from '@mui/material';
import UserImg from '../images/user1.jpg';
import { NavLink, useNavigate } from 'react-router-dom';
import { usersObj } from "../json/users";
import { ApiService } from "./Apis/ApiService";
import { useSession } from "./auth/SessionContext";

const Login = () => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [users, setUsers] = useState(usersObj);
    const [showMsg, setShowMsg] = useState(false);

    const {sessionData, setSession } = useSession();


    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            const url = '/ProjectApis/v1/loginWithMobNumOrUsrname';
            const body = JSON.stringify({
                mobnumber: "",
                username: userName,
                password: password,
            });

            await ApiService(url, body).then((data) => {
                // console.log("response ", data);
                if (data.status === 1) {

                    const userData = data.userDetails;
                    sessionStorage.setItem("userId", userData.user_id);
                    sessionStorage.setItem("userName", userData.user_name);
                    sessionStorage.setItem("userRoleId", userData.user_role_id);
                    sessionStorage.setItem("userRole", userData.role_name);
                    sessionStorage.setItem("userImg", userData.image);
                    sessionStorage.setItem("empName", userData.emp_name);
                    sessionStorage.setItem("empNumber", userData.emp_number);
                    setSession(userData,userData.user_id);

                    setShowMsg(false);
                    navigate('/home', { replace: true });
                } else {
                    setShowMsg(true);
                    navigate('/', { replace: true });
                }
            });

        } catch (error) {
            console.log(error.message)
        }



    }

    const handleClose = () => {
        setShowMsg(false);
    }

    return (
        <>
            <script src="https://use.fontawesome.com/f59bcd8580.js"></script>
            <div className="container">
                <div className="row m-5 no-gutters shadow-lg">
                    <div className="col-md-6 d-none d-md-block">
                        <img src="https://images.unsplash.com/photo-1566888596782-c7f41cc184c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80" className="img-fluid" style={{height: '509px', width: '495px' }} />
                    </div>
                    <div className="col-md-6 bg-white p-5">
                    <img src={UserImg} alt="Avator" style={{height: '117px'}}/>
                        <div className="form-style">
                            <form>
                                <div className="form-group pb-3">
                                    <input type="email"
                                        placeholder="Email or Username"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)} />
                                </div>
                                <div className="form-group pb-3">
                                    <input type="password"
                                        placeholder="Password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center"><input name="" type="checkbox" value="" /> <span className="pl-2 font-weight-bold">Remember Me</span></div>
                                    <div><a href="#">Forget Password?</a></div>
                                </div>
                                <div className="pb-2">
                                    <button type="submit" className="btn btn-dark w-100 font-weight-bold mt-2" onClick={handleLogin}>Login</button>
                                </div>
                            </form>
                            {/* <div className="sideline">OR</div>
                            <div>
                                <button type="submit" className="btn btn-primary w-100 font-weight-bold mt-2"><i className="fa fa-facebook" aria-hidden="true"></i> Login With Facebook</button>
                            </div> */}
                            <div className="pt-4 text-center">
                                Get Members Benefit. <NavLink to="/signup">Sign Up</NavLink>
                                {/* <a href="#">Sign Up</a> */}
                            </div>
                        </div>

                    </div>
                </div>
                {
                    showMsg && (
                        <Snackbar open={showMsg} autoHideDuration={3000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                                Invalid Username or Password!
                            </Alert>
                        </Snackbar>
                    )
                }
            </div>
        </>
    );
};

export default Login;