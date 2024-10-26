const Table = (props) => {
  function deleteEmployee(id) {
    fetch(`http://localhost:3002/employee/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => props.setNewData(data))
      .catch((error) => console.log(error.message));
  }

  const trows_employee = (props.employee || []).map((employee, index) => {
    return (
      <tr key={index} className="employee-data-row">
        <td>{employee.id}</td>
        <td>{employee.fullname}</td>
        <td>{employee.email}</td>
        <td>{employee.phone}</td>
        <td>{employee.position}</td>
        <td>{employee.department}</td>
        <td>{employee.hireDate}</td>
        <td>{employee.salary}</td>
        <td>{employee.isActive}</td>
        <td>{employee.address}</td>
        <td>
          <button
            type="button"
            className="delete-btn delete-employee-info"
            onClick={() => deleteEmployee(employee.id)}
            data-testid={`delete-${employee.id}`}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <table className="table-employee-info" id="table-employee">
        <thead>
          <tr>
            <th>No</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Position</th>
            <th>Department</th>
            <th>Hire Date</th>
            <th>Salary</th>
            <th>Employee Status</th>
            <th>Address</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>{trows_employee}</tbody>
      </table>
    </>
  );
};

export default Table;
