/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./AdminStyle/DashBoard.css";
import  Chart  from "chart.js/auto";

const Dashboard = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [error, setError] = useState(null);

  const chartRef = useRef(null);
  let newChart = null;

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        const users = response.data;
        setUsersCount(users.length);

      })
      .catch(() => {
        setError("Error fetching users data. Please try again.");
      });


    axios
      .get("http://localhost:5000/Product")
      .then((response) => {
        setProductsCount(response.data.length);
      })
      .catch(() => {
        setError("Error fetching products data. Please try again.");
      });
  }, []);

  useEffect(() => {
    if (usersCount === 0 && productsCount === 0) return;


    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (newChart) {
        newChart.destroy();
      }

      
      newChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Users", "Products"],
          datasets: [
            {
              label: "Dashboard Overview",
              data: [usersCount, productsCount], 
              backgroundColor: ["#f39c12", "#3498db"],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    return () => {
      if (newChart) {
        newChart.destroy();
      }
    };
  }, [usersCount, productsCount]);

  return (
    <div className="dashboard-container">
      <h1 style={{ textAlign: "center" }}>Dashboard</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="grid-cards">
        <div className="card">
          <h3>Total Users</h3>
          <p>{usersCount}</p>
        </div>

        <div className="card">
          <h3>Total Products</h3>
          <p>{productsCount}</p>
        </div>
      </div>
      <div className="chart-section">
        <canvas ref={chartRef} id="revenueChart"></canvas>
      </div>
    </div>
  );
};

export default Dashboard;
