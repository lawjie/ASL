import React from 'react'
import RevenueMonthlySales from '../components/RevenueMonthlySales'
import FourCards from '../components/FourCards'
import SalePeriodTable from '../components/SalePeriodTable'
import ProfitMarginChart from '../components/ProfitMarginChart'
import ProfitChart from '../components/ProfitChart'
import UnitSoldChart from '../components/UnitSoldChart'
import UnitSoldTable from '../components/UnitSoldTable'




export function Dashboard (){

    //flex max-w-full overflow-auto max-h-[78vh] w-full
    return (
        <div className='flex flex-col bg-white items-center p-2 overflow-auto max-h-[89vh] max-w-[90vw] h-screen '>
            {/* Top Div */}
            <div className="flex justify-start items-center w-full text-xl text-gray-800 mb-2">
                <h1>Sales Overview</h1>
            </div>
            {/* Main Div */}
            <div className="flex flex-col w-full h-full p-0.5 gap-4">
                {/* First Line */}
                <FourCards/>

                {/* Second Line */}
                <div className='flex gap-4 w-full justify-between'>
                    <RevenueMonthlySales/>
                    <SalePeriodTable/>
                </div>

                {/* Third Line */}
                <div className='flex gap-4 w-full justify-between'>
                    <ProfitChart/>
                    <ProfitMarginChart/>
                </div>

                <div className='flex gap-4 w-full justify-center items-center pb-5'>
                    <UnitSoldTable/>
                </div>

                


            </div>
        </div>    
    )
}