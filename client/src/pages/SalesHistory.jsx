import React from 'react'
import { useEffect, useState } from 'react'
import {getSalesHistory} from '../api.js'

export function SalesHistory() {

  const [sales, setSales] = useState([])
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
      // Handle error display to the user
    }
  }
  
  return (
    <div className=' relative flex flex-col items-center pr-1 pl-1 pt-2 pb-4 max-h-[89vh] '>
      {/* Top Div */}
      <div className='flex flex-row justify-between items-center  w-full h-15 pb-2'>
        <div>
          <h1 className='text-xl'>Sales History</h1>
        </div>
        <div>
          <label>Search:</label>
          <input className="border-1 rounded-md ml-1 pl-2 pr-2"></input>
        </div>
      </div>

      {/* Table Div */}
      <div className={`max-w-[md] overflow-auto h-full w-full border-2 `}>
        <table className="w-full text-left border-collapse bg-gray-200">
          <thead className='text-sm sticky top-0'>
            <tr className="bg-green-300 text-center ">
              <th className="py-2 px-4 font-semibold text-gray-700 border-l-1 border-r-1 border-gray-300">Seller</th>
              <th className="py-2 px-4 font-semibold text-gray-700 border-l-1 border-r-1 border-gray-300">Buyer</th>
              <th className="py-2 px-4 font-semibold text-gray-700 border-l-1 border-r-1 border-gray-300">Watch ID</th>
              <th className="py-2 px-4 font-semibold text-gray-700 border-l-1 border-r-1 border-gray-300">Model Name</th>
              <th className="py-2 px-4 font-semibold text-gray-700 border-l-1 border-r-1 border-gray-300">Reference No.</th>
              <th className="py-2 px-4 font-semibold text-gray-700 border-l-1 border-r-1 border-gray-300">Price</th>
              <th className="py-2 px-4 font-semibold text-gray-700 border-l-1 border-r-1 border-gray-300">Channel</th>
              <th className="py-2 px-4 font-semibold text-gray-700 border-l-1 border-r-1 border-gray-300">Location</th>
              <th className="py-2 px-4 font-semibold text-gray-700 border-l-1 border-r-1 border-gray-300">Sold During</th>

              <th className="flex-col py-2 px-4 font-semibold text-gray-700 border-l-1 border-r-1 border-gray-300">
                <div>Date Sold</div>
                <div className='text-[10px]'>(YYYY-MM-DD)</div>
              </th>

              <th className="py-2 px-4 font-semibold text-gray-700 border-l-1 border-r-1 border-gray-300">
                <div>Warranty</div>
                <div className='text-[10px]'>(YYYY-MM-DD)</div>
              </th>
            </tr>
          </thead>
          <tbody className='bg-white text-center'>
            {sales.map((sale) => (
              <tr className='hover:bg-blue-400 hover:text-white'>
                {/* <td className="py-2 px-4 border border-gray-300">C{String(sale._id).padStart(3, '0')}</td> */}
                <td className="py-2 px-4 border border-gray-300">{sale.SoldBy}</td>
                <td className="py-2 px-4 border border-gray-300">{sale.SoldTo}</td>
                <td className="py-2 px-4 border border-gray-300">{sale.WatchId}</td>
                <td className="py-2 px-4 border border-gray-300">{sale.ModelName}</td>
                <td className="py-2 px-4 border border-gray-300">{sale.Reference}</td>
                <td className="py-2 px-4 border border-gray-300">{sale.SellingPrice}</td>
                <td className="py-2 px-4 border border-gray-300">{sale.Channel}</td>
                <td className="py-2 px-4 border border-gray-300">{sale.Location}</td>
                <td className="py-2 px-4 border border-gray-300">{sale.SoldDuring}</td>

                <td className="py-2 px-4 border border-gray-300">{new Date(sale.DateSold).toISOString().split('T')[0]}</td>
                <td className="py-2 px-4 border border-gray-300">{new Date(sale.Warranty).toISOString().split('T')[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    

    </div>
  );
};
