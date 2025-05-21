import React, {useState, useEffect} from 'react'
import { getSalesHistory } from '../api'

export default function FourCards(){
    const [sales, setSales] = useState([])
    const [totalIncome, setTotalIncome] = useState(0)
    const [totalCost, setTotalCost] = useState(0)
    const [totalRevenue, setTotalRevenue] = useState(0)
    const [totalAverageProfit, setTotalAverageProfit] = useState(0)
    const [decimalAverageProfit, setDecimalAverageProfit] = useState(0)

    useEffect(() => {
        loadAllSalesHistory();
    }, []);

    useEffect(() => {
        loadVariables();
    }, [sales])
    

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

    async function loadVariables() {
        let income = 0;
        let cost = 0;
        let revenue = 0;
        let sumProfitMargin = 0;
        let length = sales.length;

        sales.map((val) => {
            income += val.Profit
            income += val.Loss
            cost += val.TotalCost;
            revenue += val.SellingPrice;
            sumProfitMargin += val.ProfitMargin;
        })  

        let AverageIfProfit = sumProfitMargin/length;
        let decimalAve = (AverageIfProfit - Math.floor(AverageIfProfit)).toFixed(2)
        let decimalString = decimalAve.toString();

        // Find the index of the decimal point
        let decimalIndex = decimalString.indexOf(".");

        // Extract the decimal part of the string
        let decimalPartString = decimalString.substring(decimalIndex + 1);

        // Convert the decimal part string to a number
        let decimalPartNumber = parseInt(decimalPartString);
        
        setTotalIncome(income);
        setTotalCost(cost);
        setTotalRevenue(revenue);
        setTotalAverageProfit(Math.floor(AverageIfProfit))
        setDecimalAverageProfit(decimalPartNumber);
        
    }


//shadow-md shadow-blue-900/50 
    //ADJUST H AND W for ADJUSTMENTS
    const firstLineStyles = 'flex flex-col justify-around items-center bg-white h-33 w-full border-2 shadow-lg  border-blue-900 shadow-blue-900/50 rounded-3xl  '
    return (
        <div className='flex justify-between w-full gap-4 text-'>
            {/* FIRST BOX */}
            <div className={`${firstLineStyles}`}>
                <h1 className='md:text-2xl '>Total Income</h1>
                    <div className='flex flex-col justify-center items-center w-auto'>
                        <h1 className='lg:text-5xl md:text-2xl sm:text-md text-yellow-500 '>&#8369; {totalIncome.toLocaleString()}</h1>
                        <div className='flex w-full justify-center gap-20'>
                            <h1>PHP</h1>
                        </div>
                </div>
                <div></div>
            </div>
            
            {/* SECOND BOX */}
            <div className={`${firstLineStyles}`}>
                <h1 className='md:text-2xl'>Total Cost</h1>
                    <div className='flex flex-col justify-center items-center w-auto'>
                        <h1 className='lg:text-5xl md:text-2xl sm:text-md text-blue-900'>&#8369; {totalCost.toLocaleString()}</h1>
                        <div className='flex w-full justify-center gap-20'>
                            <h1>PHP</h1>
                        </div>
                </div>
                <div></div>
            </div>

            {/* THIRD BOX */}
            <div className={`${firstLineStyles}`}>
                <h1 className='md:text-2xl'>Total Revenue</h1>
                    <div className='flex flex-col justify-center items-center w-auto'>
                        <h1 className='lg:text-5xl md:text-2xl sm:text-md text-blue-700'>&#8369; {totalRevenue.toLocaleString()}</h1>
                        <div className='flex w-full justify-center gap-20'>
                            <h1>PHP</h1>
                        </div>
                </div>
                <div></div>
            </div>

            {/* FOURTH BOX */}
            <div className={`${firstLineStyles}`}>
                <h1 className='md:text-2xl'>Average Profit</h1>
                    <div className='flex flex-col justify-center items-center w-auto'>
                        <h1 className='lg:text-5xl md:text-2xl sm:text-md text-green-500'>{totalAverageProfit.toString()}</h1>
                        <div className='flex w-full justify-between gap-20'>
                            <h1>%</h1><h1>.{decimalAverageProfit}</h1>
                        </div>
                </div>
                <div></div>
            </div>
        </div>
  )
}
