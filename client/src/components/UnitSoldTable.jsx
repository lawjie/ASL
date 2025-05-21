

import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, defaults } from 'chart.js/auto'
import { Doughnut } from 'react-chartjs-2'
import { getSalesHistory } from '../api'

// defaults.maintainAspectRatio = false;
// defaults.responsive = true;

  defaults.plugins.title.display = false;
  defaults.plugins.title.align = "start";
  defaults.plugins.title.font.size = 20;
  defaults.plugins.title.color = "black";

export default function UnitSoldTable(){
  const [sales, setSales] = useState([]);

  //PROFIT
  const [monthlySales1, setMonthlySales1] = useState({
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

  //TOTAL PRICE
  const [monthlySales2, setMonthlySales2] = useState({
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

  const [monthlySales3, setMonthlySales3] = useState({
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

  useEffect(() => {
    const profitmargin = {
    Jan : (monthlySales1.Jan / monthlySales2.Jan)*100,
    Feb : (monthlySales1.Feb / monthlySales2.Feb)*100,
    Mar : (monthlySales1.Mar / monthlySales2.Mar)*100,
    Apr : (monthlySales1.Apr / monthlySales2.Apr)*100,
    May : (monthlySales1.May / monthlySales2.May)*100,
    Jun : (monthlySales1.Jun / monthlySales2.Jun)*100,
    Jul : (monthlySales1.Jul / monthlySales2.Jul)*100,
    Aug : (monthlySales1.Aug / monthlySales2.Aug)*100,
    Sep : (monthlySales1.Sep / monthlySales2.Sep)*100,
    Oct : (monthlySales1.Oct / monthlySales2.Oct)*100,
    Nov : (monthlySales1.Nov / monthlySales2.Nov)*100,
    Dec : (monthlySales1.Dec / monthlySales2.Dec)*100,}

    console.log(profitmargin)

    setMonthlySales3(profitmargin);
  }, [monthlySales2])
  
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

  //Loading And Selecting the latest Year
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

  //CHART VALUES LOADING
  async function loadChartValues() {
    const monthlyTotals1 = {
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
  
    //PROFIT
    sales.forEach((sale) => {
      const checkYear = new Date(sale.DateSold).toISOString().split('T')[0].slice(0, 4); // ex.(2025)
      const checkMonth = new Date(sale.DateSold).toISOString().split('T')[0].slice(5, 7); // ex.(02) Month Feb
  
      if(checkYear == selectedYear){
        switch (checkMonth) {
          case "01":
            monthlyTotals1.Jan += 1;
            break;
          case "02":
            monthlyTotals1.Feb += 1;
            break;
          case "03":
            monthlyTotals1.Mar += 1;
            break;
          case "04":
            monthlyTotals1.Apr += 1;
            break;
          case "05":
            monthlyTotals1.May += 1;
            break;
          case "06":
            monthlyTotals1.Jun += 1;
            break;
          case "07":
            monthlyTotals1.Jul += 1;
            break;
          case "08":
            monthlyTotals1.Aug += 1;
            break;
          case "09":
            monthlyTotals1.Sep += 1;
            break;
          case "10":
            monthlyTotals1.Oct += 1;
            break;
          case "11":
            monthlyTotals1.Nov += 1;
            break;
          case "12":
            monthlyTotals1.Dec += 1;
            break;
          default:
            break;
        }
      }
    });
    setMonthlySales1(monthlyTotals1);
  }

  



  const sourceData1 = [
    { "month": "Jan", "value": monthlySales1.Jan },
    { "month": "Feb", "value": monthlySales1.Feb },
    { "month": "Mar", "value": monthlySales1.Mar },
    { "month": "Apr", "value": monthlySales1.Apr },
    { "month": "May", "value": monthlySales1.May },
    { "month": "Jun", "value": monthlySales1.Jun },
    { "month": "Jul", "value": monthlySales1.Jul },
    { "month": "Aug", "value": monthlySales1.Aug },
    { "month": "Sep", "value": monthlySales1.Sep },
    { "month": "Oct", "value": monthlySales1.Oct },
    { "month": "Nov", "value": monthlySales1.Nov },
    { "month": "Dec", "value": monthlySales1.Dec },
  ];
  
  const chartStyle = 'flex flex-col justify-center items-center bg-white p-4 h-full border-2 border-blue-900 shadow-lg shadow-blue-900/50 rounded-3xl text-[#001f3e]'
  return (
    // MAIN DIV
    <div className={`${chartStyle} `}>
      {/* CONTENTS */}


      <div className='flex flex-col justify-center items-center w-full pb-3'>
        <h1 className='text-2xl mb-1'>Monthly Units Sold</h1>
        <div className='text-xl'>
          <label>Choose a Year: &nbsp;</label>
          <select name="yearList" id="yearList" className='border' onChange={(e) => setSelectedYear(e.target.value)}>
            {years.map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>
      
        <div>
        <table className='text-center text-xl w-full border-2'>
          <thead>
            <tr>
              {sourceData1.map((data) => (
                <th className='py-2 px-3 border text-md bg-green-300'>{data.month}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {sourceData1.map((data) => (
                <td className={`py-2 px-2 border text-md`}>{data.value}</td>
              ))}
            </tr>
          </tbody>
            </table>
      </div>
    </div>

  )
}

