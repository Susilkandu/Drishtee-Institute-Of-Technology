import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { sendQuery } from "../../../api/studentApi/api";
function QueryForm() {
    const [fullName, setFullName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const clrqury = () => {
        setFullName('');
        setMobile('');
        setEmail('');
        setTitle('');
        setQuery('');
    }
    const pushMyQuery = async () => {
        if (fullName && mobile && email && title && query) {
            const rspns = await sendQuery({ fullName, mobile, email, title, query });
            if (rspns.ackbool == 1) {
                toast.success(rspns.message);
                const audio = new Audio("/audio/ring.mp3");
                audio.play();
                clrqury();
            }
        }
        else {
            toast.error("Please fill All Details")
        }
    }
    useEffect(() => {
        const aToken = localStorage.getItem('aJwt');
        if (aToken) {
            navigate('/Admin');
        }
    }, [])
    return (
        <div className="container mt-5 pt-4">
            <h1 className="p-4 fw-bolder text-center text-uppercase" id="signUpNow" style={{ color: '#00beff' }} >
                Enquiry Now
            </h1>
            <form>
                <div className="row">
                    <div className="col-md-6 my-2">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Full Name*"
                                value={fullName}
                                onChange={(event) => setFullName(event.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="col-md-6 my-2">
                        <div className="input-group">
                            <input
                                type="tel"
                                className="form-control"
                                placeholder="Enter Your Mobile*"
                                value={mobile}
                                onChange={(event) => setMobile(event.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 my-2">
                        <div className="input-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter Your E-mail*"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="col-md-6 my-2">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Title*"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 my-2">
                        <textarea
                            className="form-control"
                            rows="3"
                            placeholder="Type Your Enquiry*"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            required
                        ></textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-center my-3">
                        <button
                            className="btn fw-medium text-black mx-2"
                            style={{ background: '#00beff' }}
                            onClick={pushMyQuery}
                            type="button"
                        >
                            <i className="bi bi-send-fill"></i> Send
                        </button>
                        <button
                            className="btn  fw-medium text-light mx-2 bg-danger"
                            onClick={() => clrqury()}
                            type="button"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </form>
        </div>

    );
}
export default QueryForm;
