import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import {  useSelector } from 'react-redux';
export default function OurCourses() {
    const [searchQuery, setSearchQuery] = useState("");
    const [courses, setCourses] = useState([]);
    const crs = useSelector(state=>state.courses);
    useEffect(() => {
        if(crs[0]){
            setCourses(crs);
        }
    }, []);
    const handleSearchQueryChange = (query) => {
        setSearchQuery(query);
    };
    return (
        <>
            <div className="container-fluid mt-5 diplomaTable">
                <div className="container-fluid row text-center px-0 mx-0 my-3 py-2 border bg-white border-secondary-subtle myshadow" id="mainDiplomaContainer">
                    <h1 className="fw-bolder py-1">
                        All Computer <font color="red"> Course </font>
                    </h1>
                    <div className="col-md-12 mx-0 px-0 d-flex justify-content-between">
                        <div>
                            <small className="d-flex px-2">
                                <Link to="/" className="nav-link">
                                    <i className="fa fa-home"></i> /
                                </Link>&nbsp;All Computer Courses
                            </small>
                        </div>
                        <div>
                            <SearchBox searchQuery={searchQuery} setSearchQuery={handleSearchQueryChange} />
                        </div>
                    </div>
                </div>
                {courses.length < 0 ? (
                    <div className="my-2 p-2 bg-white">
                        <p><span className="text-danger">Dear student.....!</span> No courses found. Please try again with a different search query.</p>
                    </div>
                ) : (
                    courses.map((course, index) => (
                        <div key={index} className="my-2 p-2 bg-white">
                            <table className="table table-bordered bg-transparent">
                                <thead>
                                    <tr className="text-center h4">
                                        <th colSpan={4}>{course.name} ({course.description})</th>
                                    </tr>
                                    <tr className="text-start">
                                        <th colSpan={3}>Course Contents</th>
                                        <th className="text-end">Duration {course.duration}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...Array(Math.ceil(course.subjects.length / 4))].map((_, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {[...Array(4)].map((_, colIndex) => (
                                                <td key={colIndex} className="border border-primary">
                                                    {course.subjects[rowIndex * 4 + colIndex]?.name}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div>
                                <Link to="/AdmissionForm" className="btn btn-primary btn-sm">Apply</Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

