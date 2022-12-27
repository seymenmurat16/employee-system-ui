import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

const UpdateEmployee = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    id: id,
    firstName: "",
    lastName: "",
    emailId: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setEmployee({ ...employee, [e.target.name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EmployeeService.getEmployeeById(id);
        setEmployee(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const updateEmployee = (e) => {
    e.preventDefault();
    EmployeeService.updateEmployee(employee, id)
      .then((res) => {
        console.log(res);
        navigate("/employeeList");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex max-w-2xl shadow border mx-auto my-4">
      <div className="px-8 py-8">
        <div className="font-thin text-2xl">
          <h1>Update Employee</h1>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-semibold">
            First Name
          </label>
          <input
            type="name"
            name="firstName"
            value={employee.firstName}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-semibold">
            Last Name
          </label>
          <input
            type="name"
            name="lastName"
            value={employee.lastName}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-semibold">
            Email
          </label>
          <input
            type="email"
            name="emailId"
            value={employee.emailId}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-4 pt-2 space-x-2">
          <button
            className="rounded bg-green-400 text-white py-2 px-6 hover:bg-green-700 font-semibold"
            onClick={updateEmployee}
          >
            Update
          </button>
          <button
            className="rounded bg-red-400 text-white py-2 px-6 hover:bg-red-700 font-semibold"
            onClick={() => navigate("/employeeList")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployee;
