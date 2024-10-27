import { useState } from "react";
import { v4 as uuid } from "uuid";

const Form = (props) => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    position: "Another",
    department: "Another",
    hireDate: "",
    salary: "",
    isActive: "",
    address: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => {
      let department = prevData.department;
      if (name === "input-position") {
        if (value === "Backend Developer" || value === "Frontend Developer") {
          department = "Development";
        } else if (value === "UI/UX Designer") {
          department = "Design";
        } else if (value === "Product Manager") {
          department = "Product";
        }
      }

      return {
        ...prevData,
        [name]: value,
        department: department,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const employeeData = {
      id: uuid(),
      fullname: formData.fullname,
      email: formData.email,
      phone: formData.phone,
      position: formData.position,
      department: formData.department,
      isActive: formData.isActive,
      address: formData.address,
    };

    fetch("http://localhost:3002/employee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);

        props.setNewData(data);
        setFormData({
          fullname: "",
          email: "",
          phone: "",
          position: "",
          department: "Another",
          isActive: "Another",
          address: "",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <>
      <form id="form-employee" onSubmit={handleSubmit}>
        <div className="form">
          <div className="name-input">
            <label htmlFor="input-name">Fullname</label>
            <input
              required
              className="form-input"
              name="fullname"
              type="text"
              id="input-name"
              onChange={handleChange}
              value={formData.fullname}
              data-testid="name"
            />
          </div>
          <div className="name-input">
            <label htmlFor="input-email">Email</label>
            <input
              required
              className="form-input"
              name="email"
              type="email"
              id="input-email"
              onChange={handleChange}
              value={formData.email}
              data-testid="email"
            />
          </div>

          <div className="name-input">
            <label htmlFor="input-phone">Phone</label>
            <input
              required
              className="form-input"
              name="phone"
              type="tel"
              id="input-phone"
              onChange={handleChange}
              value={formData.phone}
              data-testid="phone"
            />
          </div>

          <div className="name-input">
            <label htmlFor="position">Posisiton</label>
            <select
              required
              className="form-input"
              name="position"
              id="input-position"
              onChange={handleChange}
              value={formData.phone}
              data-testid="position"
            >
              <option selected>Position</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
              <option value="Product Manager">Product Manager</option>
            </select>
          </div>

          <div className="name-input">
            <select
              required
              className="form-input"
              name="is-active"
              id="input-is-active"
              onChange={handleChange}
              value={formData.isActive}
              data-testid="is-active"
            >
              <option selected>Status</option>
              <option value="active">Active</option>
              <option value="inactive">In Active</option>
            </select>
          </div>

          <div className="name-input">
            <label htmlFor="input-address">Address</label>
            <input
              required
              className="form-input"
              type="text"
              id="input-address"
              name="address"
              onChange={handleChange}
              value={formData.address}
              data-testid="address"
            ></input>
          </div>

          <input
            className="add-employee-button"
            type="submit"
            value="Add Employee"
            id="add-btn"
            data-testid="submit"
          />
        </div>
      </form>
    </>
  );
};

export default Form;
