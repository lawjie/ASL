

import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, defaults } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import { getSalesHistory } from '../api'

// defaults.maintainAspectRatio = false;
// defaults.responsive = true;

  defaults.plugins.title.display = false;
  defaults.plugins.title.align = "start";
  defaults.plugins.title.font.size = 20;
  defaults.plugins.title.color = "black";

export default function RevenueMonthlySales(){
  const [sales, setSales] = useState([]);
  const [monthlySales, setMonthlySales] = useState({
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  });
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState();

  useEffect(() => {
    loadAllSalesHistory();
  }, []);

  async function loadAllSalesHistory() {
    try {
      const data = await getSalesHistory();
      if (data) {
        setSales(data);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }

  useEffect(() => {
    loadChartValues();
    loadChartYears();

  }, [sales]);

  useEffect(() => {
    loadChartValues();
  }, [selectedYear])

  //Gets the total sum with the same months
  async function loadAllSalesHistory() {
    try {
      const data = await getSalesHistory();
      if (data) {
        setSales(data);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }


  async function loadChartYears(){
    const years = [];

    sales.forEach((sale) => {
      const checkYear = new Date(sale.DateSold).toISOString().split('T')[0].slice(0, 4); // Year ex.(2025)
      if(!years.includes(checkYear)){
        years.push(checkYear)
      }
      });
    years.sort()
    years.reverse()
    setYears(years);
    setSelectedYear(years[0]);

  }

  async function loadChartValues() {
    const monthlyTotals = {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0,
    };
    
  
    sales.forEach((sale) => {
      const checkYear = new Date(sale.DateSold).toISOString().split('T')[0].slice(0, 4); // ex.(2025)
      const checkMonth = new Date(sale.DateSold).toISOString().split('T')[0].slice(5, 7); // ex.(02) Month Feb
      const totalSellingPrice = parseInt(sale.SellingPrice);
  
      if(checkYear == selectedYear){
        switch (checkMonth) {
          case "01":
            monthlyTotals.Jan += totalSellingPrice;
            break;
          case "02":
            monthlyTotals.Feb += totalSellingPrice;
            break;
          case "03":
            monthlyTotals.Mar += totalSellingPrice;
            break;
          case "04":
            monthlyTotals.Apr += totalSellingPrice;
            break;
          case "05":
            monthlyTotals.May += totalSellingPrice;
            break;
          case "06":
            monthlyTotals.Jun += totalSellingPrice;
            break;
          case "07":
            monthlyTotals.Jul += totalSellingPrice;
            break;
          case "08":
            monthlyTotals.Aug += totalSellingPrice;
            break;
          case "09":
            monthlyTotals.Sep += totalSellingPrice;
            break;
          case "10":
            monthlyTotals.Oct += totalSellingPrice;
            break;
          case "11":
            monthlyTotals.Nov += totalSellingPrice;
            break;
          case "12":
            monthlyTotals.Dec += totalSellingPrice;
            break;
          default:
            break;
        }
      }
    });
    setMonthlySales(monthlyTotals);
  }

  const sourceData = [
    { "month": "Jan", "value": monthlySales.Jan },
    { "month": "Feb", "value": monthlySales.Feb },
    { "month": "Mar", "value": monthlySales.Mar },
    { "month": "Apr", "value": monthlySales.Apr },
    { "month": "May", "value": monthlySales.May },
    { "month": "Jun", "value": monthlySales.Jun },
    { "month": "Jul", "value": monthlySales.Jul },
    { "month": "Aug", "value": monthlySales.Aug },
    { "month": "Sep", "value": monthlySales.Sep },
    { "month": "Oct", "value": monthlySales.Oct },
    { "month": "Nov", "value": monthlySales.Nov },
    { "month": "Dec", "value": monthlySales.Dec },
  ];

  
  const chartStyle = 'flex flex-col justify-center items-center bg-white p-4 h-full w-full border-2 border-blue-900 shadow-lg shadow-blue-900/50 rounded-3xl text-[#001f3e]'
  return (
    // MAIN DIV
    <div className={`${chartStyle} `}>
      {/* CONTENTS */}


      <div className='flex flex-col justify-center items-center w-full '>
        <h1 className='text-2xl mb-1'>Revenue Monthly Sales</h1>
        <div>
          <label>Choose a Year: &nbsp;</label>
          <select name="yearList" id="yearList" className='border' onChange={(e) => setSelectedYear(e.target.value)}>
            {years.map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>
      <Bar
        data={{
          labels: sourceData.map((data) => data.month), // x value or ilalim
          datasets: [
            {
              label: "Revenue Sales",
              data: sourceData.map((data) => data.value), // y values or pataas na bar
              borderRadius: 10,
              backgroundColor: [
                      'rgba(0, 31, 62, 0.6)',
                      'rgba(40, 106, 157, 0.6)',
                      'rgba(37, 56, 71, 0.6)',
                      'rgba(241, 150, 85, 0.6)',
                      'rgba(16, 129, 219, 0.6)  ' /* Orchid */
              ]
            },
          ], 
        }}

        options={{
          plugins: {
            elements:{
              line:{
                tension:0.5,
              }
            },
            title: {
              text: ""
            },
            legend: {
              position: 'bottom',
              align: 'middle'
            }
          }
        }}
      >
      </Bar>
    </div>
  )
}

