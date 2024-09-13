import { Modal, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getStudentList, deleteStudentRegistrationForm, takeNewAdmission, generateCertificate } from '../../../../../api/adminApi/api';

export default function AdmissionStatus() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [studentId, setStudentId] = useState('');
  const [indexNum, setIndexNum] = useState('');
  const [percentage, setPercentage] = useState('');
  const [issueDate, setIssueDate] = useState(new Date());
  const [allStudent, setAllStudent] = useState([]);
  const [fullName, setFullName] = useState('');
  const [regNum, setRegNum] = useState('');

  const getStudentListHandler = async () => {
    const rspns = await getStudentList({ name: fullName, regNum });
    setAllStudent(rspns.message);
  };

  const handleAction = async () => {
    if (modalType === 'delete') {
      const rspns = await deleteStudentRegistrationForm(studentId);
      rspns.ackbool === 1 && toast.success(rspns.message);
    } else if (modalType === 'admission') {
      const rspns = await takeNewAdmission(studentId, indexNum);
      rspns.ackbool === 1 && toast.success(rspns.message);
    } else if (modalType === 'certificate') {
      const rspns = await generateCertificate(studentId, percentage, issueDate);
      rspns.ackbool === 1 && toast.success(rspns.message);
    }
    setShowModal(false);
    getStudentListHandler();
  };

  useEffect(() => {
    getStudentListHandler();
  }, []);

  return (
    <div className="StudentList">
      <div className="row border-bottom m-0 px-0 bg-primary myshadow w-100">
        <div className="col-12 py-2 mx-0 px-0 d-flex justify-content-around align-items-center">
          <div className="h2 fw-bold text-white text-uppercase px-2">All Students</div>
          <div className="myFlex2">
            <button className="btn btn-primary rounded-0 d-flex align-items-center">
              <i className="fa fa-plus-circle" aria-hidden="true"></i>
              <Link to="Admission-Form" className="nav-link">&nbsp; Add New</Link>
            </button>
          </div>
        </div>
      </div>
      <div className="row mx-0 px-0 bg-white text-primary pb-5">
        <div className="col-12 m-0 py-2 fw-medium d-flex justify-content-between align-items-center bg-primary bg-gradient">
          <div className="w-100 d-flex align-items-center mx-0 px-0">
            <input type="text" className="form-control rounded-0 w-50" placeholder="Full name" onChange={(e) => setFullName(e.target.value)} value={fullName} />
            <input type="text" className="form-control rounded-0 w-50" placeholder="Reg No." onChange={(e) => setRegNum(e.target.value)} value={regNum} />
            <button className='w-25 my-1 btn btn-light rounded-0 text-dark searchStudent fw-bolder' onClick={getStudentListHandler}>
              <i className="bi bi-search text-dark"></i>
            </button>
          </div>
        </div>
        <table className="table table-hover table-responsive table-sm small table-bordered border-primary stdStatus">
          <thead className='table-dark small'>
            <tr>
              <th className='text-center'>Photo</th>
              <th className='text-center'>Reg. No</th>
              <th className='text-center'>Name</th>
              <th className='text-center'>Address</th>
              <th className='text-center'>Mobile</th>
              <th className='text-center'>Admission Date</th>
              <th className='text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {allStudent.map(student => (
              <tr key={student._id}>
                <td className="text-center">
                  <img className={`rounded-circle m-auto ${student.gnCertificate ? 'rounded' : ''}`} src={student.photo} width="30" alt="Pic" />
                </td>
                <td className="fw-medium small text-uppercase text-center">
                  {student.regNum ? student.regNum.split('/').slice(1).join('/') : <span className="text-warning">Pending</span>}
                </td>
                <td className="text-center">{student.name}</td>
                <td className="text-center">{student.address}</td>
                <td className="text-center">{student.mobileNumber}</td>
                <td className="text-center">{new Date(student.dob).toLocaleDateString()}</td>
                <td className="text-center">
                  {!student.regNum && <button className="btn btn-sm bg-primary text-white m-1" title='Take Admission' onClick={() => { setModalType('admission'); setStudentId(student._id); setShowModal(true); }}><i className="fa fa-pencil-square" aria-hidden="true"></i></button>}
                  {student.regNum && <button className='btn btn-primary btn-sm' title='Generate Certificate' onClick={() => { setModalType('certificate'); setStudentId(student._id); setShowModal(true); }}><i className="bi bi-person-check-fill"></i></button>}
                  {!student.regNum && <button className="btn btn-sm text-white m-1" title='Delete Registration' onClick={() => { setModalType('delete'); setStudentId(student._id); setShowModal(true); }}><i className="bi bi-trash-fill text-danger"></i></button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal show={showModal} onHide={() => setShowModal(false)} animation={false}>
          <Modal.Header className='bg-primary' closeButton>
            <Modal.Title className="text-white text-uppercase">{modalType === 'delete' ? "Delete Student's" : modalType === 'admission' ? 'Take Admission' : "Generate Certificate"}</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            {modalType === 'delete' && <Button variant="danger" onClick={handleAction}>Delete</Button>}
            {modalType === 'admission' && <>
              <input type="number" className='form-control' placeholder="Give unique registration Number" onChange={(e) => setIndexNum(e.target.value)} />
              <Button variant='primary' onClick={handleAction}><i className="bi bi-check2-circle"></i> Done</Button>
            </>}
            {modalType === 'certificate' && <>
              <input type="number" className='form-control' placeholder='Enter Percentage' onChange={(e) => setPercentage(e.target.value)} />
              <input type="date" className='form-control' onChange={(e) => setIssueDate(e.target.value)} />
              <Button variant="secondary" onClick={() => setShowModal(false)}><i className="bi bi-trash"></i></Button>
              <Button variant='primary' onClick={handleAction}><i className="fa fa-paper-plane"></i></Button>
            </>}
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
