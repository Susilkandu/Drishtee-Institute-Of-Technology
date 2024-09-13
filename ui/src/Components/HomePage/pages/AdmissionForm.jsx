import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registrateStudent ,uploadPhoto} from "../../../api/studentApi/api";
import { getCourseList } from '../../../api/adminApi/api';


const AdmissionForm = () => {
  const initialFormData = {
    name: "",
    fatherName: "",
    motherName: "",
    gender: "",
    aadhaar: "",
    email: "",
    address: "",
    mobileNumber: "",
    dob: "",
    course: "",
    category: "",
    otherCategory: "",
    photo: "",
    checkboxChecked: false,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [error, setError] = useState("");
  const [courseList, setCourseList] = useState([]);
  const [photoUploaded,setPhotoUploaded] = useState(false);


  useEffect(() => {
    async function getCourseListHandler() {
      const rspns = await getCourseList();
      if (rspns.ackbool == 1) {
        setCourseList(rspns.message);
      }
    }
    getCourseListHandler();
  }, []);

  useEffect(() => {
    const { name, fatherName, motherName, gender, aadhaar, email, address, mobileNumber, dob, course, category, checkboxChecked } = formData;
    setSubmitEnabled(
      name && fatherName && motherName && gender && aadhaar.length === 12 && /^[0-9]{12}$/.test(aadhaar) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && /^[6-9]\d{9}$/.test(mobileNumber) && address && dob && course && category && checkboxChecked
    );
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value === 'checkbox' ? true : value
    }));
  };
  const handlePhotoChange = async(e) => {
    const image = e.target.files[0];
    if (image) {
      const rspns = await uploadPhoto(image);
      if(rspns.url){
        setPhotoUploaded(true);
        setFormData(prevData=>({
          ...prevData,
          photo:rspns.url
        }));
      }  
    }else{
      toast.error('please Select Profile Photo');
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const rspns = await registrateStudent(formData);
      if (rspns.ackbool == 1) {
        toast.success(rspns.message);
        resetForm();
      }
    } catch (error) {
      setError("Registration failed");
    }
  };
  function resetForm() {
    setFormData(initialFormData);
    setUploadStatus(false);
    setError("");

  };

  return (
    <form onSubmit={handleSubmit} className="admission-form shadow p-4 mt-5 rounded" style={{ background: "#ebf2fa" }}>
      <h2 className="mb-4 text-center">Admission Form</h2>
      <div className="row">
        <div className="form-group col-md-6 mb-3">
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" placeholder="Name" required />
        </div>
        <div className="form-group col-md-6 mb-3">
          <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} className="form-control" placeholder="Father's Name" required />
        </div>
      </div>
      <div className="row">
        <div className="form-group col-md-6 mb-3">
          <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} className="form-control" placeholder="Mother's Name" required />
        </div>
        <div className="form-group col-md-6 mb-3">
          <select name="gender" value={formData.gender} onChange={handleChange} className="form-select" required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="form-group col-md-6 mb-3">
          <input type="text" name="aadhaar" minLength={12} maxLength={12} value={formData.aadhaar} onChange={handleChange} className="form-control" placeholder="Aadhaar Number (12 digits)" required />
        </div>
        <div className="form-group col-md-6 mb-3">
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="Email" required />
        </div>
      </div>
      <div className="row">
        <div className="form-group col-md-6 mb-3">
          <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className="form-control" placeholder="Mobile Number (10 digits)" required />
        </div>
        <div className="form-group col-md-6 mb-3">
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="form-control" placeholder="Date of Birth" required />
        </div>
      </div>
      <div className="row">
        <div className="form-group col-md-6 mb-3">
          <select name="course" value={formData.course} onChange={handleChange} className="form-select" required>
            <option value="">Select Course</option>
            {courseList.map(course => (
              <option key={course._id} value={course.name}>{course.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group col-md-6 mb-3">
          <select name="category" value={formData.category} onChange={handleChange} className="form-select" required>
            <option value="">Select Category</option>
            <option value="General">General</option>
            <option value="OBC">OBC</option>
            <option value="SC/ST">SC/ST</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="form-group col-md-12 mb-3">
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder='Address' className="form-control" required />
        </div>
        <div className="form-group col-md-12 mb-3">
        {photoUploaded?<span className='bg-success text-light'>uploaded</span>:<input type="file" name="photo" onChange={handlePhotoChange} placeholder='Choose Passport Size Photo' className="form-control" required />}
        </div>
      </div>
      <div className="form-group form-check mb-4">
        <input type="checkbox" name="checkboxChecked" checked={formData.checkboxChecked} onChange={handleChange} className="form-check-input" required />
        <label className="form-check-label">I agree to the terms and conditions</label>
      </div>
      <div className="d-flex justify-content-evenly">
        <button type="button" onClick={resetForm} className="btn btn-secondary btn-lg bg-danger">
          Reset
        </button>
        <button type="submit"  disabled={!submitEnabled} className="btn btn-primary btn-lg">
          Submit
        </button>
      </div>
      {error && <p className="text-danger text-center mt-3">{error}</p>}
    </form>
  );
};
export default AdmissionForm;
