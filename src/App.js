import Table from "./components/Table";
import Form from "./components/Form";
import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [data, setData] = useState(null);
  const [newData, setNewData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3002/employee");
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false); // Set loading to false after fetch
      }
    };

    fetchData();
  }, [newData]); // Assuming newData triggers the effect

  if (error) {
    console.log(error);
    return <p>Error loading data: {error}</p>; // Display error message
  }

  if (isLoading) {
    return <p>Loading ...</p>; // Show loading message
  }

  if (!data) {
    return <p>Empty Data</p>; // If there's no data after loading, return null
  }

  return (
    <>
      <div className="container">
        <h2 className="title">Employee Portal</h2>
        <div className="role-image-container">
          <h4 className="title">Admin</h4>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV2X-3p5kycV3EhWaZVUd5ev-nNKfMeuoUelGbEtvv_JRmG3VB"
            alt=""
            className="circle-image "
          />
        </div>
      </div>
      <div className="form-container">
        <Form setNewData={setNewData} />
        <Table employee={data} setNewData={setNewData} />
      </div>
    </>
  );
};

export default App;
