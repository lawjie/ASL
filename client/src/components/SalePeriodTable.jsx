

import React, { useState, useEffect } from 'react'
import { getSalesHistory } from '../api'


export default function SalePeriodTable(){
const [sales, setSales] = useState([]);

const [normalDay, setNormalDay] = useState({
    TotalRevenue: 0,
    TotalProfit: 0,
    ProfitMargin: 0,
    UnitSold: 0,
})

const [megaSale, setMegaSale] = useState({
    TotalRevenue: 0,
    TotalProfit: 0,
    ProfitMargin: 0,
    UnitSold: 0,
})

const [endOfMonth, setEndOfMonth] = useState({
    TotalRevenue: 0,
    TotalProfit: 0,
    ProfitMargin: 0,
    UnitSold: 0,
})

const [paydaySale, setPaydaySale] = useState({
    TotalRevenue: 0,
    TotalProfit: 0,
    ProfitMargin: 0,
    UnitSold: 0,
})

const [eleven2, setEleven2] = useState({
    TotalRevenue: 0,
    TotalProfit: 0,
    ProfitMargin: 0,
    UnitSold: 0,
})

const [twelve2, setTwelve2] = useState({
    TotalRevenue: 0,
    TotalProfit: 0,
    ProfitMargin: 0,
    UnitSold: 0,
})
const [otherPeriod, setOtherPeriod] = useState({
    TotalRevenue: 0,
    TotalProfit: 0,
    ProfitMargin: 0,
    UnitSold: 0,
})

const [years, setYears] = useState([])
const [selectedYear, setSelectedYear] = useState()

useEffect(() => {
    loadAllSalesHistory()
}, []) // loads up every refresh or loads up once

useEffect(() => {
    loadChartYears();
    settingNormalDay();
}, [sales])

useEffect(() => {
    settingNormalDay();
    settingMegaSale();
    settingEndOfMonth();
    settingPayDaySale();
    settingElevenEleven();
    settingTwelveTwelve();
    settingOtherPeriod();
}, [selectedYear])  //updates the table values depending if selectedYear is changed


async function loadAllSalesHistory(){
    const data = await getSalesHistory();
    try {
        if(data){
            setSales(data)
        }
    } catch (error){
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

async function settingNormalDay(){
    const normalDayTotals = {
        TotalRevenue: 0,
        TotalProfit: 0,
        ProfitMargin: 0,
        UnitSold: 0,
    }

    let profitMarginSum = 0;
    let lengthCounter = 0;
    sales.forEach((sale) => {
        const string = "Normal Day"
        const checkSoldDuring = sale.SoldDuring
        const checkYear = new Date(sale.DateSold).toISOString().split('T')[0].slice(0, 4); // ex.(2025)
        const cTotalRevenue = parseInt(sale.SellingPrice);
        const cProfit = parseFloat(sale.Profit)
        const cLoss = parseFloat(sale.Loss)
        const cProfitMargin = parseFloat(sale.ProfitMargin)
        if (checkYear == selectedYear && checkSoldDuring == string){
            normalDayTotals.TotalRevenue += cTotalRevenue
            normalDayTotals.TotalProfit += cProfit
            normalDayTotals.TotalProfit += cLoss
            profitMarginSum += cProfitMargin
            lengthCounter++
            normalDayTotals.UnitSold += 1
        }
    })

    let profitmarginave = parseFloat((profitMarginSum/lengthCounter).toFixed(2))
    normalDayTotals.ProfitMargin += profitmarginave
    setNormalDay(normalDayTotals)
}

async function settingMegaSale(){
    const megaSaleTotals = {
        TotalRevenue: 0,
        TotalProfit: 0,
        ProfitMargin: 0,
        UnitSold: 0,
    }

    let profitMarginSum = 0;
    let lengthCounter = 0;
    sales.forEach((sale) => {
        const string = "Mega Sale"
        const checkSoldDuring = sale.SoldDuring
        const checkYear = new Date(sale.DateSold).toISOString().split('T')[0].slice(0, 4);
        const cTotalRevenue = parseInt(sale.SellingPrice);
        const cProfit = parseFloat(sale.Profit)
        const cLoss = parseFloat(sale.Loss)
        const cProfitMargin = parseFloat(sale.ProfitMargin)

        if (checkYear == selectedYear && checkSoldDuring == string){
            megaSaleTotals.TotalRevenue += cTotalRevenue
            megaSaleTotals.TotalProfit += cProfit
            megaSaleTotals.TotalProfit += cLoss
            profitMarginSum += cProfitMargin
            lengthCounter++
            megaSaleTotals.UnitSold += 1
        }
    })

    let profitmarginave = parseFloat((profitMarginSum/lengthCounter).toFixed(2))
    megaSaleTotals.ProfitMargin += profitmarginave
    setMegaSale(megaSaleTotals)
}

async function settingEndOfMonth(){
    const endOfMonthTotals = {
        TotalRevenue: 0,
        TotalProfit: 0,
        ProfitMargin: 0,
        UnitSold: 0,
    }

    let profitMarginSum = 0;
    let lengthCounter = 0;
    sales.forEach((sale) => {
        const string = "End of Month Sale"
        const checkSoldDuring = sale.SoldDuring
        const checkYear = new Date(sale.DateSold).toISOString().split('T')[0].slice(0, 4);
        const cTotalRevenue = parseInt(sale.SellingPrice);
        const cProfit = parseFloat(sale.Profit)
        const cLoss = parseFloat(sale.Loss)
        const cProfitMargin = parseFloat(sale.ProfitMargin)

        if (checkYear == selectedYear && checkSoldDuring == string){
            endOfMonthTotals.TotalRevenue += cTotalRevenue
            endOfMonthTotals.TotalProfit += cProfit
            endOfMonthTotals.TotalProfit += cLoss
            profitMarginSum += cProfitMargin
            lengthCounter++
            endOfMonthTotals.UnitSold += 1
        }
    })

    let profitmarginave = parseFloat((profitMarginSum/lengthCounter).toFixed(2))
    endOfMonthTotals.ProfitMargin += profitmarginave
    setEndOfMonth(endOfMonthTotals)
}

async function settingPayDaySale(){
    const paydaySaleTotals = {
        TotalRevenue: 0,
        TotalProfit: 0,
        ProfitMargin: 0,
        UnitSold: 0,
    }

    let profitMarginSum = 0;
    let lengthCounter = 0;
    sales.forEach((sale) => {
        const string = "Payday Sale"
        const checkSoldDuring = sale.SoldDuring
        const checkYear = new Date(sale.DateSold).toISOString().split('T')[0].slice(0, 4);
        const cTotalRevenue = parseInt(sale.SellingPrice);
        const cProfit = parseFloat(sale.Profit)
        const cLoss = parseFloat(sale.Loss)
        const cProfitMargin = parseFloat(sale.ProfitMargin)

        if (checkYear == selectedYear && checkSoldDuring == string){
            paydaySaleTotals.TotalRevenue += cTotalRevenue
            paydaySaleTotals.TotalProfit += cProfit
            paydaySaleTotals.TotalProfit += cLoss
            profitMarginSum += cProfitMargin
            lengthCounter++
            paydaySaleTotals.UnitSold += 1
        }
    })

    let profitmarginave = parseFloat((profitMarginSum/lengthCounter).toFixed(2))
    paydaySaleTotals.ProfitMargin += profitmarginave
    setPaydaySale(paydaySaleTotals)
}

async function settingElevenEleven(){
    const elevenElevenTotals = {
        TotalRevenue: 0,
        TotalProfit: 0,
        ProfitMargin: 0,
        UnitSold: 0,
    }

    let profitMarginSum = 0;
    let lengthCounter = 0;
    sales.forEach((sale) => {
        const string = "11.11"
        const checkSoldDuring = sale.SoldDuring
        const checkYear = new Date(sale.DateSold).toISOString().split('T')[0].slice(0, 4);
        const cTotalRevenue = parseInt(sale.SellingPrice);
        const cProfit = parseFloat(sale.Profit)
        const cLoss = parseFloat(sale.Loss)
        const cProfitMargin = parseFloat(sale.ProfitMargin)

        if (checkYear == selectedYear && checkSoldDuring == string){
            elevenElevenTotals.TotalRevenue += cTotalRevenue
            elevenElevenTotals.TotalProfit += cProfit
            elevenElevenTotals.TotalProfit += cLoss
            profitMarginSum += cProfitMargin
            lengthCounter++
            elevenElevenTotals.UnitSold += 1
        }
    })

    let profitmarginave = parseFloat((profitMarginSum/lengthCounter).toFixed(2))
    elevenElevenTotals.ProfitMargin += profitmarginave
    setEleven2(elevenElevenTotals)
}

async function settingTwelveTwelve(){
    const twelveTwelveTotals = {
        TotalRevenue: 0,
        TotalProfit: 0,
        ProfitMargin: 0,
        UnitSold: 0,
    }

    let profitMarginSum = 0;
    let lengthCounter = 0;
    sales.forEach((sale) => {
        const string = "12.12"
        const checkSoldDuring = sale.SoldDuring
        const checkYear = new Date(sale.DateSold).toISOString().split('T')[0].slice(0, 4);
        const cTotalRevenue = parseInt(sale.SellingPrice);
        const cProfit = parseFloat(sale.Profit)
        const cLoss = parseFloat(sale.Loss)
        const cProfitMargin = parseFloat(sale.ProfitMargin)

        if (checkYear == selectedYear && checkSoldDuring == string){
            twelveTwelveTotals.TotalRevenue += cTotalRevenue
            twelveTwelveTotals.TotalProfit += cProfit
            twelveTwelveTotals.TotalProfit += cLoss
            profitMarginSum += cProfitMargin
            lengthCounter++
            twelveTwelveTotals.UnitSold += 1
        }
    })

    let profitmarginave = parseFloat((profitMarginSum/lengthCounter).toFixed(2))
    twelveTwelveTotals.ProfitMargin += profitmarginave
    setTwelve2(twelveTwelveTotals)
}

async function settingOtherPeriod(){
    const otherPeriodTotals = {
        TotalRevenue: 0,
        TotalProfit: 0,
        ProfitMargin: 0,
        UnitSold: 0,
    }

    let profitMarginSum = 0;
    let lengthCounter = 0;
    sales.forEach((sale) => {
        const string1 = "12.12"
        const string2 = "11.11"
        const string3 = "Normal Day"
        const string4 = "Mega Sale"
        const string5 = "Payday Sale"
        const string6 = "End of Month Sale"

        const checkSoldDuring = sale.SoldDuring
        const checkYear = new Date(sale.DateSold).toISOString().split('T')[0].slice(0, 4);
        const cTotalRevenue = parseInt(sale.SellingPrice);
        const cProfit = parseFloat(sale.Profit)
        const cLoss = parseFloat(sale.Loss)
        const cProfitMargin = parseFloat(sale.ProfitMargin)

        if (checkYear == selectedYear && ![string1, string2, string3, string4, string5, string6].includes(checkSoldDuring)) {
                
            otherPeriodTotals.TotalRevenue += cTotalRevenue
            otherPeriodTotals.TotalProfit += cProfit
            otherPeriodTotals.TotalProfit += cLoss
            profitMarginSum += cProfitMargin
            lengthCounter++
            otherPeriodTotals.UnitSold += 1
        }
    })

    let profitmarginave = parseFloat((profitMarginSum/lengthCounter).toFixed(2))
    otherPeriodTotals.ProfitMargin += profitmarginave
    setOtherPeriod(otherPeriodTotals)
}


  const saleperiodtablestyle = 'flex flex-col justify-center items-center bg-indigo-400 p-4 h-full w-full border-2 border-blue-900 shadow-lg shadow-blue-900/50 rounded-3xl text-white'
  return (
    // MAIN DIV
    <div className={`${saleperiodtablestyle} `}>
      {/* CONTENTS */}
        <div className="flex flex-col justify-center items-center ">
            <h1 className='text-2xl mb-1'>Sales Performance by Sale Period</h1>
            <div>
                <h1 className=' text-white'>Choose a Year: &nbsp;</h1>
                <select name="yearList" id="yearList" className='border' onChange={(e) => setSelectedYear(e.target.value)}>
                    {years.map((year, index) => (
                    <option key={index} value={year} className='text-black'>{year}</option>
                    ))}
                </select>
            </div>
        </div>
        
        <div className='border-2 border-white p-1 w-full'>
            <table className='text-center w-full bg-white border-2 border-white text-black'>
                <thead >
                    <tr>
                        <th className='py-3 px-2 border text-md border-black bg-sky-800 text-white'>Sale Period</th>
                        <th className='py-3 px-2 border text-md border-black bg-sky-400 text-white'>Total Revenue</th>
                        <th className='py-3 px-2 border text-md border-black bg-sky-400 text-white'>Total Profit</th>
                        <th className='py-3 px-2 border text-md border-black bg-sky-400 text-white'>Profit Margin</th>
                        <th className='py-3 px-2 border text-md border-black bg-sky-400 text-white'>Unit Sold</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='hover:bg-sky-100'>
                        <th className='py-2 px-2 border border-black bg-sky-400 text-white text-md'>Normal Day</th>
                        <td className='py-2 px-2 border text-lg'>{normalDay.TotalRevenue.toLocaleString()}</td>
                        <td className='py-2 px-2 border text-lg'>{normalDay.TotalProfit.toLocaleString()}</td>
                        <td className='py-2 px-2 border text-lg'>{normalDay.ProfitMargin.toLocaleString()}</td>
                        <td className='py-2 px-2 border text-lg'>{normalDay.UnitSold.toLocaleString()}</td>
                    </tr>
                    <tr className='hover:bg-sky-100'>
                        <th className='py-2 px-2 border border-black bg-sky-400 text-white text-md'>Mega Sale</th>
                        <td className='py-2 px-2 border text-lg'>{megaSale.TotalRevenue.toLocaleString()}</td>
                        <td className='py-2 px-2 border text-lg'>{megaSale.TotalProfit.toLocaleString()}</td>
                        <td className='py-2 px-2 border text-lg'>{megaSale.ProfitMargin.toLocaleString()}</td>
                        <td className='py-2 px-2 border text-lg'>{megaSale.UnitSold.toLocaleString()}</td>
                    </tr>
                    <tr className='hover:bg-sky-100'>
                        <th className='py-2 px-2 border border-black bg-sky-400 text-white text-md'>End of Month Sale</th>
                        <td className='py-2 px-2 border text-lg'>{endOfMonth.TotalRevenue.toLocaleString()}</td>
                        <td className='py-2 px-2 border text-lg'>{endOfMonth.TotalProfit.toLocaleString()}</td>
                        <td className='py-2 px-2 border text-lg'>{endOfMonth.ProfitMargin.toLocaleString()}</td>
                        <td className='py-2 px-2 border text-lg'>{endOfMonth.UnitSold.toLocaleString()}</td>
                    </tr>
                    <tr className='hover:bg-sky-100'>
                        <th className='py-2 px-2 border border-black bg-sky-400 text-white text-md'>Payday Sale</th>
                        <td className='py-2 px-2 border text-lg'>{paydaySale.TotalRevenue.toLocaleString()}</td>
                        <td className='py-2 px-2 border text-lg'>{paydaySale.TotalProfit.toLocaleString()}</td>
                        <td className='py-2 px-2 border text-lg'>{paydaySale.ProfitMargin.toLocaleString()}</td>
                        <td className='py-2 px-2 border text-lg'>{paydaySale.UnitSold.toLocaleString()}</td>
                    </tr>
                    <tr className='hover:bg-sky-100'>
                        <th className='py-2 px-2 border border-black bg-sky-400 text-white text-md'>11.11</th>
                        <td className='py-2 px-2 border text-lg'>{eleven2.TotalRevenue.toLocaleString()}</td>
                        <td className='py-2 px-2 border text-lg'>{eleven2.TotalProfit.toLocaleString()}</td>
                        <td className='py-2 px-2 border text-lg'>{eleven2.ProfitMargin.toLocaleString()}</td>
                        <td className='py-2 px-2 border text-lg'>{eleven2.UnitSold.toLocaleString()}</td>
                    </tr>
                    <tr className='hover:bg-sky-100'>
                        <th className='py-2 px-2 border border-black bg-sky-400 text-white text-md'>12.12</th>
                        <td className='py-2 px-2 border text-lg'>{twelve2.TotalRevenue.toLocaleString()}</td>
                        <td className='py-2 px-2 border text-lg'>{twelve2.TotalProfit.toLocaleString()}</td>
                        <td className='py-2 px-2 border text-lg'>{twelve2.ProfitMargin.toLocaleString()}</td>
                        <td className='py-2 px-2 border text-lg'>{twelve2.UnitSold.toLocaleString()}</td>
                    </tr>
                    <tr className='hover:bg-sky-100'>
                        <th className='py-2 px-2 border border-black bg-sky-400 text-white text-md'>Other Period</th>
                        <td className='py-2 px-2 border text-lg'>{otherPeriod.TotalRevenue.toLocaleString()}</td>
                        <td className='py-2 px-2 border text-lg'>{otherPeriod.TotalProfit.toLocaleString()}</td>
                        <td className='py-2 px-2 border text-lg'>{otherPeriod.ProfitMargin.toLocaleString()}</td>
                        <td className='py-2 px-2 border text-lg'>{otherPeriod.UnitSold.toLocaleString()}</td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
    </div>
  )
}

