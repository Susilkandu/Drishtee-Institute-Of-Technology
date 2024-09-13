import {
  Routes,
  Route,
} from "react-router-dom";
import { useState, Suspense, lazy } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./Components/HomePage/Home";
import "./App.css";
import "./MediaQuery.css";
import { UniversalContext } from "./context/universal";
import { adminContext } from "./context/admin"
const Admin = lazy(() => import("./Components/Admin/MainAdminPage/AdminPannel"));
import Header from "./Components/Header/Header";
import About from "./Components/HomePage/pages/About";
import Branch from "./Components/Branch/Branch";
import AdmissionForm from "./Components/HomePage/pages/AdmissionForm";
import Verification from "./Components/Verification/Verification";
import Errors from "./Components/HomePage/pages/PageNotFound";
import QueryForm from "./Components/HomePage/QueryFrom";

{/* ------------------Start Course---------------------- */ }
import Diploma from "./Components/Course/Diploma";
import Certificate from "./Components/Course/Certificate";
import ComputerLanguage from "./Components/Course/ComputerLanguage";
import GraphicsDesign from "./Components/Course/GraphicsDesign";
import WebDevelopment from "./Components/Course/WebDevelopment";
import ComputerRepairing from "./Components/Course/ComputeeRepairing";
import NielitCourse from "./Components/Course/NielitCourse";
{/* ------------------End Course---------------------- */ }
import StudentChart from "./Components/Admin/Charts/Chart";
import OffersCard from "./Components/HomePage/OffersCard";
import Footer from "./Components/Footer/Footer";
import ToastCard from "./Components/HomePage/Toast/ToastCard";
import DeleteNoticeComponent from "./Components/Admin/SendOffer/DeleteOffer";
import Banking from "./Components/Course/Banking";
import Title from "./Title";
import Description from "./Components/HomePage/Discription/Discription";
import Ceritificate from "./Components/Course/Certificate";

import AllDiploma from "./Components/Course/Diploma";
import PhotoGallery from "./Components/HomePage/Gallery";
// ______________ Start Student Database   __________________
import StudentLogin from "./Components/HomePage/StudentLogin";
import StudentHomePage from "./Components/StudentComponent/StudentHomePage";
import FillFormStd from "./Components/StudentComponent/FillFormStd";
import ExamPaper from "./Components/StudentComponent/ExamPaper";
import IssueExamForm from "./Components/StudentComponent/IssueExamForm";
import ExamPortal from "./Components/StudentComponent/ExamPortal";
import StudentGreat from "./Components/StudentComponent/StudentGreat";
import Captcha from "./Components/Captcha/Captcha";
// ______________ End Student Database   ____________________

function App() {
  const [confermModal, setConfermModal] = useState(false);
  const [adminLogin, setAdminLogin] = useState(false);
  const [allStudent, setAllStudent] = useState([]);
  return (
    <>
      <UniversalContext.Provider value={{ confermModal, setConfermModal, adminLogin, setAdminLogin }}>
        <Title />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* ------------------Start Course---------------------- */}
          <Route path="/diploma" element={<AllDiploma />} />
          <Route path="/ceritificate" element={<Ceritificate />} />
          <Route path="/ComputerLanguage" element={<ComputerLanguage />} />
          <Route path="/GraphicsDesign" element={<GraphicsDesign />} />
          <Route path="/WebDevelopment" element={<WebDevelopment />} />
          <Route path="/ComputerRepairing" element={<ComputerRepairing />} />
          <Route path="/NielitCourse" element={<NielitCourse />} />
          <Route path="/StudentChart" element={<StudentChart />} />
          <Route path="/DeleteNoticeComponent" element={<DeleteNoticeComponent />} />
          <Route path="/Banking" element={<Banking />} />
          <Route path="/about" element={<About />} />
          <Route path="/branch" element={<Branch />} />
          <Route path="/gallary" element={<PhotoGallery />} />
          <Route path="/admissionForm" element={<AdmissionForm />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/contact" element={<QueryForm/>} />
          <Route path="/offer" element={<OffersCard />} />
          <Route path="/ToastCard" element={<ToastCard />} />
          <Route path="/Description" element={<Description />} />
          {/* ______________ Start Student Database   __________________ */}
          <Route path="/StudentLogin" element={<StudentLogin />} />
          <Route path="/StudentHomePage" element={<StudentHomePage />} />
          <Route path="/FillFormStd" element={<FillFormStd />} />
          <Route path="/ExamPaper" element={<ExamPaper />} />
          <Route path="/issueExamForm" element={<IssueExamForm />} />
          <Route path="/ExamPortal" element={<ExamPortal />} />
          <Route path="/StudentGreat" element={<StudentGreat />} />
          <Route path="/Captcha" element={<Captcha />} />
                      
          {/* ______________ End Student Database   ____________________ */}
          <Route exact path="*" Component={Errors} />
          <Route path="/admin" element={<adminContext.Provider value={{ setAllStudent, allStudent }}><Suspense fallback={<center className="my-5">Loading...</center>}><Admin /></Suspense></adminContext.Provider>} />
        </Routes>
        <ToastContainer />
      </UniversalContext.Provider>
    </>
  );
}
export default App;
