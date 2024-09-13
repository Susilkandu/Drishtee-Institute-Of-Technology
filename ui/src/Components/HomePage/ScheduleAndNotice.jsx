import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Marquee from '../HelperCmp/PauseMarquee/Marquee';
import { getAllNotice } from "../../api/adminApi/api";
export default function ScheduleAndNotice() {
    const [notice, setNotice] = useState([]);
    const marqueeItems = [
        { text: "[1]. Course certified by Microsoft.", imgSrc: "images/icon/gifPic.gif" },
        { text: "[2]. CCC free on ADCA course", imgSrc: "images/icon/gifPic.gif" },
        { text: "[5]. Free English Speaking & Personality Development classNames", imgSrc: "images/icon/gifPic.gif" },
        { text: "[6]. प्रत्येक पाठ्यक्रम के पूरा होने पर नि: शुल्क प्रमाण पत्र।", imgSrc: "images/icon/gifPic.gif", className: "HindiFont" },
        { text: "[7]. GOVT. recognized institute", imgSrc: "images/icon/gifPic.gif" }
    ];
    const fetchNotice = async () => {
        try {
            const rspns = await getAllNotice();
            if (rspns.ackbool == 1) {
                setNotice(rspns.message);
            }
        } catch (error) {
            throw error;
        }
    }
    useEffect(() => {
        fetchNotice();
    }, [])
  return (
    <div className="container-fluid py-5 text-center " id="">
                <h2 className="py-4 text-" style={{ color: '#00beff' }} data-aos="fade-up" data-aos-duration="1500">
                    Features And Updates
                </h2>
                <center className="hideFont fw-medium" id="FeatureTextOne">
                    <span id="element"></span>
                </center>
                <p align="center" className="showFont text-light"  id="FeatureTextTwo">“ <b style={{ color: '#00beff' }}>Drishtee </b>
                envisions a world where empowered communities collaborate to create shared prosperity.  "
                </p>
                <div className="container-fluid pt-0">
                    <div className="row">
                        <div className="col-md-6 my-1 p-0 px-1 ">
                            <div className="card cardBoxShadow border-0" style={{ background: 'white' }} id="openingHour">
                                <div className="card-header h4 text-white text-uppercase text-start" style={{ background: 'var(--cardHeadColor)' }}>
                                    <div data-aos="fade-right"><i className="fa fa-line-chart text-warning"></i> Opening hours</div>
                                </div>
                                <div className="card-body cardBoxShadow" id="FeaturesTableColor">
                                    <table className="table table-borderless">
                                        <tbody className="fw-normal text-start">
                                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(
                                                (day, index) => (
                                                    <tr key={index} className="align-middle">
                                                        <td style={{ color: '#2C3E50', fontWeight: '500', fontSize: '16px' }}>
                                                            {day}:
                                                        </td>
                                                        <td className="text-end" style={{ color: '#6C757D', fontWeight: '400', fontSize: '15px' }}>
                                                            07:00 AM - 07:00 PM
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 my-1 p-0 px-1">
                            <div
                                className="card border-0 cardBoxShadow"
                                style={{
                                    borderRadius: '10px',
                                    overflow: 'hidden',
                                    backgroundColor: '#f9f9f9',
                                }}
                            >
                                <div
                                    className="card-header h4 text-white text-start"
                                    style={{
                                        background: 'var(--cardHeadColor)',
                                        borderRadius: '10px 10px 0 0',
                                        padding: '15px',
                                    }}
                                >
                                    <div data-aos="fade-right">
                                        <i className="bi bi-bell-fill text-warning me-2"></i>
                                        Notice Board
                                    </div>
                                </div>
                                <div
                                    className="card-body fw-normal FeatureCard2 my-0 py-2"
                                    id="tableData"
                                    style={{ backgroundColor: '#ffffff', padding: '20px' }}
                                >
                                    <Marquee direction="up" scrollamount="3" behavior="scroll">
                                        {marqueeItems.map((item, index) => (
                                            <div key={index} className="d-flex align-items-center my-2">
                                                <small className={item.className || ''} style={{ color: '#2C3E50' }}>
                                                    {item.text}
                                                </small>
                                                <img
                                                    src={item.imgSrc}
                                                    className="img-fluid ms-3"
                                                    width="30px"
                                                    alt=""
                                                    style={{ borderRadius: '50%' }}
                                                />
                                                <hr style={{ width: '90%', borderTop: '1px solid #e9ecef' }} />
                                            </div>
                                        ))}
                                    </Marquee>
                                </div>
                                <Marquee
                                    className="py-2"
                                    behavior="scroll"
                                    direction="left"
                                    id="LinkData"
                                    style={{ backgroundColor: '#2C3E50', color: '#ffffff', padding: '10px' }}
                                >
                                    <Link to="/Verification" className="blink text-white">
                                        <b>Click here to know your certificate status</b>
                                    </Link>
                                </Marquee>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="container-fluid">
                <div className="row">
                    <div className="col-12" id="RegistrationContainer">
                        <div className="row my-4">
                            <div className="col-md-8 d-flex justify-content-center align-content-center m-auto p-2 text-white" >
                                <div className="row">
                                    <div className="col-12">
                                        {
                                            notice.map((data) => {
                                                return (
                                                    <div key={data._id} className="fw-bolder w-100 my-3 p-2" data-aos="fade-right" data-aos-duration="1500" id={data._id}>
                                                        <h1 className="fw-bolder  px-5">
                                                            <font color="red"><img src="/images/icon/arrow.png" alt="" /> {data.title}</font>
                                                        </h1>
                                                        <div className="container text-white ps-2 mx-3">
                                                            {data.nMessage}
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
  )
}
