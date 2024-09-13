import { useState, useEffect } from "react";
import { adminProfile } from "../../../../../api/adminApi/api";

export default function Profile() {
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const response = await adminProfile();
        if (response.ackbool === 1) {
          setAdminData(response.message);
        }
      } catch (error) {
        console.error("Error fetching admin profile:", error);
      }
    };

    fetchAdminProfile();
  }, []);

  if (!adminData) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded " id="AdminProfile" >
      <div className="container my-4">
        <div className="row">
          <div className="col-12 bg-white shadow-sm p-4 rounded">
            <div className="row">
              {/* Profile Details */}
              <div className="col-md-8">
                <h1 className="fw-bolder text-primary">{adminData.name}</h1>
                <hr />
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Birthday</label>
                      <p>{adminData.dob}</p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Address</label>
                      <p>{adminData.address}</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label fw-semibold">E-mail</label>
                      <p>{adminData.email}</p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Profession</label>
                      <p>{adminData.profession}</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Profile Picture */}
              <div className="col-md-4 text-center">
                <img
                  src={adminData.profilePic}
                  alt={adminData.name}
                  className="img-fluid rounded-circle shadow-sm"
                />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="fw-bolder text-warning">About Me</h3>
              <p className="text-muted">{adminData.about}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
