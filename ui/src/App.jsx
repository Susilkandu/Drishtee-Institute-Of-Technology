import { Route, Routes } from "react-router-dom"
import Footer from "./Components/Footer/Footer"
import Header from "./Components/Header/Header"
// Homepage start
import PageNotFound from "./Components/HomePage/pages/PageNotFound"
import Home from "./Components/HomePage/Home"
import About from './Components/HomePage/pages/About/About'
import OurCourses from "./Components/HomePage/pages/Course/OurCourses"
import Branch from "./Components/HomePage/pages/Branch/Branch"
import Gallery from "./Components/HomePage/pages/Gallery"
import AdmissionForm from "./Components/HomePage/pages/AdmissionForm"
import Verification from "./Components/HomePage/pages/Verification/Verification"
import QueryForm from "./Components/HomePage/pages/QueryFrom"
// Homepage end


import AdminPannel from "./Components/Admin/MainAdminPage/AdminPannel"
import StudentHomePage from "./Components/StudentComponent/StudentHomePage"

export default function App() {
  return (
    <div >
    <Header/>
    <div style={{marginTop:'3.8rem'}}>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/About" element={<About/>}></Route>
            <Route path="/Our-Courses" element={<OurCourses/>}></Route>
            <Route path="/Branch" element={<Branch/>}></Route>
            <Route path="/Gallery" element={<Gallery/>}></Route>
            <Route path="/AdmissionForm" element={<AdmissionForm/>}></Route>
            <Route path="/Download-Certificate" element={<Verification />} />
            <Route path="/Contact-us" element={<QueryForm/>} />
            <Route path="Student-Portal/*" element={<StudentHomePage/>}></Route>
            <Route path="/Admin-Pannel/*" element={<AdminPannel/>}></Route>
            <Route path="*" element={<PageNotFound/>}></Route>
        </Routes>
    </div>
    <Footer/>
    </div>
    )
}