

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

export default function ProfitMarginChart(){
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

    const monthlyTotals2 = {
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
      const totalProfit = parseInt(sale.Profit);    
  
      if(checkYear == selectedYear){
        switch (checkMonth) {
          case "01":
            monthlyTotals1.Jan += totalProfit;
            break;
          case "02":
            monthlyTotals1.Feb += totalProfit;
            break;
          case "03":
            monthlyTotals1.Mar += totalProfit;
            break;
          case "04":
            monthlyTotals1.Apr += totalProfit;
            break;
          case "05":
            monthlyTotals1.May += totalProfit;
            break;
          case "06":
            monthlyTotals1.Jun += totalProfit;
            break;
          case "07":
            monthlyTotals1.Jul += totalProfit;
            break;
          case "08":
            monthlyTotals1.Aug += totalProfit;
            break;
          case "09":
            monthlyTotals1.Sep += totalProfit;
            break;
          case "10":
            monthlyTotals1.Oct += totalProfit;
            break;
          case "11":
            monthlyTotals1.Nov += totalProfit;
            break;
          case "12":
            monthlyTotals1.Dec += totalProfit;
            break;
          default:
            break;
        }
      }
    });
    setMonthlySales1(monthlyTotals1);


    // MONTHLY TOTALS FOR SELLING PRICE PER MONTH
    sales.forEach((sale) => {
        const checkYear = new Date(sale.DateSold).toISOString().split('T')[0].slice(0, 4); // ex.(2025)
        const checkMonth = new Date(sale.DateSold).toISOString().split('T')[0].slice(5, 7); // ex.(02) Month Feb
        const totalSellingPrice = parseFloat(sale.SellingPrice);    

        
        if(checkYear == selectedYear){
          switch (checkMonth) {
            case "01":
              monthlyTotals2.Jan += totalSellingPrice;
              break;
            case "02":
              monthlyTotals2.Feb += totalSellingPrice;
              break;
            case "03":
              monthlyTotals2.Mar += totalSellingPrice;
              break;
            case "04":
              monthlyTotals2.Apr += totalSellingPrice;
              break;
            case "05":
              monthlyTotals2.May += totalSellingPrice;
              break;
            case "06":
              monthlyTotals2.Jun += totalSellingPrice;
              break;
            case "07":
              monthlyTotals2.Jul += totalSellingPrice;
              break;
            case "08":
              monthlyTotals2.Aug += totalSellingPrice;
              break;
            case "09":
              monthlyTotals2.Sep += totalSellingPrice;
              break;
            case "10":
              monthlyTotals2.Oct += totalSellingPrice;
              break;
            case "11":
              monthlyTotals2.Nov += totalSellingPrice;
              break;
            case "12":
              monthlyTotals2.Dec += totalSellingPrice;
              break;
            default:
              break;
          }
        }
    });
    setMonthlySales2(monthlyTotals2);

    


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

  const sourceData3 = [
    { "month": "Jan", "value": monthlySales3.Jan },
    { "month": "Feb", "value": monthlySales3.Feb },
    { "month": "Mar", "value": monthlySales3.Mar },
    { "month": "Apr", "value": monthlySales3.Apr },
    { "month": "May", "value": monthlySales3.May },
    { "month": "Jun", "value": monthlySales3.Jun },
    { "month": "Jul", "value": monthlySales3.Jul },
    { "month": "Aug", "value": monthlySales3.Aug },
    { "month": "Sep", "value": monthlySales3.Sep },
    { "month": "Oct", "value": monthlySales3.Oct },
    { "month": "Nov", "value": monthlySales3.Nov },
    { "month": "Dec", "value": monthlySales3.Dec },
  ];

  

  
  const chartStyle = 'flex flex-col justify-center items-center bg-white p-4 h-full w-full border-2 border-blue-900 shadow-lg shadow-blue-900/50 rounded-3xl text-[#001f3e]'
  return (
    // MAIN DIV
    <div className={`${chartStyle} `}>
      {/* CONTENTS */}


      <div className='flex flex-col justify-center items-center w-full '>
        <h1 className='text-2xl mb-1'>Profit Monthly Sales</h1>
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
          labels: sourceData1.map((data) => data.month), // x value or ilalim
          datasets: [
            {
              label: "Profit",
              data: sourceData1.map((data) => data.value), // y values or pataas na bar
              borderRadius: 10,
backgroundColor: [
  'rgba(199, 183, 153, 0.7)', // Light Khaki
  'rgba(214, 204, 192, 0.7)', // Almond
  'rgba(189, 169, 143, 0.7)', // Dark Khaki
  'rgba(166, 128, 105, 0.7)', // Sienna
  'rgba(101, 67, 33, 0.7)',   // Chocolate
  'rgba(139, 69, 19, 0.7)'    // SaddleBrown
],
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

