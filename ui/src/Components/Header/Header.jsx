import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { setCourses } from '../../store/reduxStore/student/studentSlice';
import '../../App.css';
import { Link } from "react-router-dom";

import { getCourseList } from '../../api/adminApi/api';

import { loginAdmin, sendOtpForRPsd as sendOtpForRPsdAdmin } from '../../api/adminApi/api';
import { verifyOtpAndUpdatePsd as verifyOtpAndUpdatePsdAdmin } from '../../api/adminApi/api';

import { loginStudent, sendOtpForRPsd as sendOtpForRspStudent } from '../../api/studentApi/api';
import { verifyOtpAndUpdatePsd as verifyOtpAndUpdatePsdStudent } from '../../api/studentApi/api';
function Header() {
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [regNum, setRegNum] = useState("");
    const [time, setTime] = useState(120);
    const [fEmail, setFEmail] = useState("");
    const [nPsd, setNPsd] = useState("");
    const [tOtp, setTOtp] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [EnabledSendOtpBtn, setEnabledSendOtpBtn] = useState(true);
    const [otpStatus, setOtpStatus] = useState(false);
    const navigate = useNavigate();
    const startCountDown = (() => {
        const intervalId = setInterval(() => {
            setTime((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(intervalId);
                    setEnabledSendOtpBtn(true);
                    setOtpStatus(false);
                    return 120;
                }
                return prevTime - 1;
            }
            )
        }, 1000);
    });
    const fetchCourses = (async () => {
        const rspns = await getCourseList();
        if (rspns.ackbool == 1) {
            dispatch(setCourses(rspns.message));
        }
    });
    const fetchLogin = (async (func) => {
        const id = isAdmin ? email : regNum;
        if (id && password) {
            try {
                const rspns = await func(id, password);
                if (rspns.ackbool == 1) {
                    if (isAdmin) {
                        localStorage.setItem('aToken', rspns.token);
                        navigate('/Admin-Pannel');
                    } else {
                        localStorage.setItem('sToken', rspns.token);
                        navigate('/Student-Portal');
                    }
                    toast.success('Logged In')
                }
            } catch (error) {
                console.log('An Error occured while feching login admin profile ' + error)
            }

        } else {
            toast.error('Please fill the email and Password field');
        }
    })
    const sendOtpHandler = (async (func) => {
        try {
            setEnabledSendOtpBtn(false);
            const rspns = await func(fEmail);
            if (rspns.ackbool == 1) {
                toast.success(rspns.message);
                setEnabledSendOtpBtn(false);
                setOtpStatus(true)
                startCountDown();
            }else{
                setEnabledSendOtpBtn(true);
                otpStatus(false);
            }
        } catch (error) {
            console.log(error)
            setEnabledSendOtpBtn(true);
            setOtpStatus(false);
        }
    })
    const updatePsd = (async (func) => {
        const rspns = await func(fEmail, tOtp, nPsd);
        if (rspns.ackbool == 1) {
            setOtpStatus(false)
            setEnabledSendOtpBtn(true);
            toast.success(rspns.message);
        }
    })

    const [isVisible, setIsVisible] = useState(false);
    const [islogin, setIslogin] = useState(false);
    const handleToggleVisibility = () => {
        setIsVisible(!isVisible);
        setIslogin(!islogin);
    };
    const [isShowerify, setShowerify] = useState(false);
    const Showerify = () => {
        setShowerify(!isShowerify);
    };
    const [isDarkMode, setIsDarkMode] = useState(false);
    // Start nav Link
    const courses = [
        { path: "/Diploma", name: "All Computer Course" },
        { path: "/Ceritificate", name: "Computer Certificate" },
        { path: "/ComputerLanguage", name: "Computer Language" },
        { path: "/GraphicsDesign", name: "Graphics Design" },
        { path: "/WebDevelopment", name: "Web Development" },
        { path: "/ComputerRepairing", name: "Computer Repairing" },
        { path: "/NielitCourse", name: "NIELIT/DEEOACC Courses" },
        { path: "/Banking", name: "Banking Course" }
    ];
    const studentZoneItems = [
        { path: "/AdmissionForm", name: "New Admission" },
        { path: "/Download-Certificate", name: "Download Certificate" }
    ];
    return (
        <>
            <nav
                className="navbar navbar-expand-lg fixed-top py-0 my-0 d-flex justify-content-center align-items-center"
                style={{
                    background: 'var(--mainBgColor)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)', // For Safari support
                    zIndex: 1030, // Ensures the navbar stays on top
                    height: '70px', // Adjust the height as needed
                }} id="TopNavBar">
                <div className="container-fluid fw-medium text-uppercase" id="ToperNav">
                    <Link className="navbar-brand p-0 d-md-inline-block d-lg-none" to="/">
                        <img src="images/icon/logo.png" className="img-fluid" width={30} alt="DIIT" />
                    </Link>
                    <button className="navbar-toggler small p-1 m-0 border-0" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false">
                        <span className="bi bi-three-dots-vertical small fs-6 text-light p-0 m-0"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav m-auto w-100 py-0 my-0 d-flex justify-content-between align-items-center px-4">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/About" className="nav-link">About</Link>
                            </li>
                            <li className="nav-item" onClick={fetchCourses}>
                                <Link to="/Our-Courses" className="nav-link">Our Courses</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Branch" className="nav-link">Branch</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Gallery" className="nav-link">Gallery</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/StudentZone" role="button" data-bs-toggle="dropdown">Student Zone</Link>
                                <ul className="dropdown-menu" id="studentZoneNav">
                                    {studentZoneItems.map((item, index) => (
                                        <li key={index}>
                                            <Link className="dropdown-item" to={item.path}>{item.name}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link to="/Contact-us" className="nav-link">Contact-us</Link>
                            </li>
                            <li className="nav-item" onClick={() => {
                                if (localStorage.getItem('sToken')) {
                                    navigate('/Student-Portal')
                                }
                                setIsAdmin(false);
                            }}>
                                <button className="btn btn-small btn-outline-primary px-1 rounded-0 p-0 border-0 myDisplayflexRow flex-column text-white" type="button"
                                    data-bs-toggle="offcanvas" data-bs-target="#loginSideBar" aria-controls="offcanvasScrollingRight">Student Login</button>
                            </li>
                            <li className="nav-item" onClick={() => {
                                if (localStorage.getItem('aToken')) {
                                    navigate('/Admin-Pannel')
                                }
                                setIsAdmin(true);
                            }
                            }>
                                <button className="btn btn-small btn-outline-primary px-1 rounded-0 p-0 border-0 myDisplayflexRow flex-column text-white" type="button"
                                    data-bs-toggle="offcanvas" data-bs-target="#loginSideBar" aria-controls="offcanvasScrollingRight">Login</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="offcanvas offcanvas-end shadow p-0" data-bs-backdrop="false" tabIndex="-1"
                id="loginSideBar" aria-labelledby="offcanvasScrollingLabel">
                <div className="offcanvas-body card myshadow shadow p-0 m-0 fbcolor">
                    <div className="row mx-0 ">
                        <div className="col-3  mt-5">
                            <button type="button" className="btn btn-sm " data-bs-dismiss="offcanvas" aria-label="Close">
                                <i className="bi bi-arrow-left fw-bolder fs-3"></i></button>
                        </div>
                        <div className="col-12 pt-5" style={{ height: '100vh' }}>
                            <div className='d-flex align-content-center justify-content-center flex-column logincard w-100'>
                                <h2 className="text-center fw-bolder text-primary"><b>{isAdmin ? 'Admin' : 'Student'}</b></h2>
                                {
                                    !islogin && (
                                        <>
                                            <div className="mb-2">
                                                <input type={isAdmin ? 'email' : 'text'} value={isAdmin ? email : regNum} className="form-control rounded-4" placeholder={isAdmin ? 'Enter your id' : 'Enter your registration id'} aria-describedby="emailHelp"
                                                    onChange={(e) => { isAdmin ? setEmail(e.target.value) : setRegNum(e.target.value) }} />
                                            </div>
                                            <div className="mb-2">
                                                <input type="text" value={password} className="form-control rounded-4" placeholder='password'
                                                    onChange={(event) => { setPassword(event.target.value) }} />
                                            </div>
                                            <button type="button" className="btn bg-primary text-white fw-bold my-1 rounded rounded-pill mt-3" onClick={() => {
                                                isAdmin ? fetchLogin(loginAdmin) : fetchLogin(loginStudent);
                                            }}>
                                                Log in
                                            </button>
                                        </>
                                    )
                                }

                                <button
                                    type="button"
                                    className="btn border-0 my-1"
                                    onClick={handleToggleVisibility}
                                >
                                    Forget Password?
                                </button>
                                <div className='container'>

                                    {isVisible && (
                                        <div className="forgot-password-container">
                                            <input type="email" value={fEmail} className="form-control" placeholder='Enter Your Email-id'
                                                onChange={(event) => setFEmail(event.target.value)} />
                                            {
                                                EnabledSendOtpBtn ? <button type="button" className="btn bg-warning btn-sm fw-bold my-1" onClick={() => {
                                                    isAdmin ? sendOtpHandler(sendOtpForRPsdAdmin) : sendOtpHandler(sendOtpForRspStudent);
                                                }}>Send OTP</button> :
                                                    <center>{time}</center>
                                            }
                                            {otpStatus &&
                                                <div>
                                                    <input
                                                        type="text"
                                                        className='form-control mt-3'
                                                        autoFocus
                                                        value={tOtp}
                                                        onChange={(e) => { setTOtp(e.target.value) }}
                                                        placeholder='Enter OTP' />
                                                    <div className="text-center">
                                                        <div className="forgot-password-container">
                                                            <input type="password" className='form-control my-2' onChange={(e) => { setNPsd(e.target.value) }} placeholder='New password' />
                                                            <button type="button" className="btn bg-primary text-white rounded-pill px-4 btn-sm my-1" onClick={() => {
                                                                isAdmin ? updatePsd(verifyOtpAndUpdatePsdAdmin) : updatePsd(verifyOtpAndUpdatePsdStudent);
                                                            }}>Verify OTP and Update Password</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
