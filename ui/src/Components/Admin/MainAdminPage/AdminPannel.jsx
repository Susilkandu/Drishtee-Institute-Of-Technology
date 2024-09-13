import { Link, useNavigate, Routes, Route } from 'react-router-dom';
import React from 'react';

import Analysis from './pages/Analysis';
import AdmissionStatus from './pages/students/AdmissionStatus';
import StudentDataBs from '../../Admission/StudentDataBs';
import Profile from './pages/Admin/Profile';
import AddAdmin from './pages/Admin/AddAdmin';
import AdminList from './pages/Admin/AdminList';
import AdmissionForm from '../../HomePage/pages/AdmissionForm';
import CreateNewCourse from './pages/Course/CreateNewCourse';
import CourseList from './pages/Course/CourseList';

import NoticeForm from './pages/Notice/NoticeForm';
import AllNotice from './pages/Notice/AllNotice';

import AppliedExamForms from './pages/Exam/AppliedExamForms';
import IssuedExamsForms from './pages/Exam/IssuedExamsForms';
import IssueExamForm from './pages/Exam/IssueExamForm';

import ProgramPictures from './pages/Gallery/ProgramPictures';
import SendProgramPicture from './pages/Gallery/SendProgramPicture'

export default function AdminPanel() {
  let navigate = useNavigate();

  return (
    <div className="admin-panel" style={{ background: '#white', overflowX: 'hidden' }}>
      <div className="row mx-0 px-0">
        <aside className="col-md-2 px-0 shadow-sm" style={{ backgroundColor: `#5b0e95bf !important` }}>
          <nav className="nav flex-column nav-pills">
            <div className="accordion" id="adminAccordion">
              {/* Students Section */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button bg-primary text-light" type="button" data-bs-toggle="collapse" data-bs-target="#studentsSection">
                    <i className="fa fa-graduation-cap me-2"></i> Students
                  </button>
                </h2>
                <div id="studentsSection" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <Link className="nav-link text-light bg-primary" to="">Students Board</Link>
                    <Link className="nav-link text-light bg-primary" to="Admission-Form">Add Students</Link>
                    <Link className="nav-link text-light bg-primary" to="Admission-Status">Admission Status</Link>
                    <Link className="nav-link text-light bg-primary" to="Student-Data-Bs">Verified Students</Link>
                  </div>
                </div>
              </div>

              {/* Admin Section */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button bg-primary text-light" type="button" data-bs-toggle="collapse" data-bs-target="#adminSection">
                    <i className="fa fa-user-circle me-2"></i> Admin
                  </button>
                </h2>
                <div id="adminSection" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <Link className="nav-link text-light bg-primary" to="Profile">Profile</Link>
                    <Link className="nav-link text-light bg-primary" to="Add-Admin">Create an account</Link>
                    <Link className="nav-link text-light bg-primary" to="Admin-List">Admin List</Link>
                    <button className="btn btn-danger mt-2" onClick={() => {
                      navigate('/');
                      localStorage.removeItem('aToken');
                    }}>Log Out</button>
                  </div>
                </div>
              </div>

              {/* Courses Section */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button bg-primary text-light" type="button" data-bs-toggle="collapse" data-bs-target="#coursesSection">
                    <i className="fa fa-book me-2"></i> Courses
                  </button>
                </h2>
                <div id="coursesSection" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <Link className="nav-link text-light bg-primary" to="Create-Course">Create New Course</Link>
                    <Link className="nav-link text-light bg-primary" to="Course-List">Course List</Link>
                  </div>
                </div>
              </div>

              {/* Notice Section */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button bg-primary text-light" type="button" data-bs-toggle="collapse" data-bs-target="#NoticeSection">
                    <i className="fa fa-bell me-2"></i> Notice
                  </button>
                </h2>
                <div id="NoticeSection" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <Link className="nav-link text-light bg-primary" to="Notice-Form">Push New Notice</Link>
                    <Link className="nav-link text-light bg-primary" to="All-Notice">All Notice</Link>
                  </div>
                </div>
              </div>

              {/* Exam Section */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button bg-primary text-light" type="button" data-bs-toggle="collapse" data-bs-target="#ExamSection">
                    <i className="fa fa-book me-2"></i> Exam
                  </button>
                </h2>
                <div id="ExamSection" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <Link className="nav-link text-light bg-primary" to="Applied-Exam-Forms">Applied Forms</Link>
                    <Link className="nav-link text-light bg-primary" to="Issued-Exam-Forms">Issued Forms</Link>
                    <Link className="nav-link text-light bg-primary" to="Issue-Exam-Form">Issue New Form</Link>
                  </div>
                </div>
              </div>

              {/* Gallery Section */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button bg-primary text-light" type="button" data-bs-toggle="collapse" data-bs-target="#Gallery">
                    <i className="fa fa-images me-2"></i> Gallery
                  </button>
                </h2>
                <div id="Gallery" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    <Link className="nav-link text-light bg-primary" to="Program-Pictures">Program's Pictures</Link>
                    <Link className="nav-link text-light bg-primary" to="Upload-New-Picture">New Image</Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </aside>


        <main className="col-md-10 p-0" style={{ height: "80vw" }}>
          <div className="tab-content mx-1 px-0 bg-light" id="adminTabContent">
            <Routes>
              <Route path="/" element={<Analysis />} />
              <Route path="Admission-Form" element={<AdmissionForm />} />
              <Route path="Admission-Status" element={<AdmissionStatus />} />
              <Route path="Student-Data-Bs" element={<StudentDataBs />} />

              <Route path="Profile" element={<Profile />} />
              <Route path="Add-Admin" element={<AddAdmin />} />
              <Route path="Admin-List" element={<AdminList />} />

              <Route path="Create-Course" element={<CreateNewCourse />} />
              <Route path="Course-List" element={<CourseList />} />

              <Route path="Notice-Form" element={<NoticeForm />} />
              <Route path='All-Notice' element={<AllNotice />}></Route>

              <Route path="Applied-Exam-Forms" element={<AppliedExamForms />} />
              <Route path="Issued-Exam-Forms" element={<IssuedExamsForms />} />
              <Route path="Issue-Exam-Form" element={<IssueExamForm />} />

              <Route path='Program-Pictures' element={<ProgramPictures />}></Route>
              <Route path="Upload-New-Picture" element={<SendProgramPicture />} />

            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
