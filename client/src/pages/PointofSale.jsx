import React, { useState, useEffect } from 'react'
import { getProducts, getProduct, createSalesHistory, deleteProduct } from '../api';

export const PointofSale = () => {

  const [products, setProducts] = useState([]);
  
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [product, setProduct] = useState([]);
  const [activeInfo, setActiveInfo] = useState(false);
  const [selectedData, setSelectedData] = useState([]);

  const [SoldBy, setSoldBy] = useState("");
  const [SoldTo, setSoldTo] = useState("");
  const [DateSold, setDateSold] = useState("");
  const [Location, setLocation] = useState("");
  const [Channel, setChannel] = useState("");
  const [SoldDuring, setSoldDuring] = useState("");
  const [Warranty, setWarranty] = useState("");
  
  const dataCount = selectedData.length;
  const totalSellingPrice = selectedData.reduce((sum, product) => {
    return sum + product.SellingPrice;
  }, 0);

  const changeActiveInfo = () => setActiveInfo(!activeInfo)

  const handleRowClick = (e, productId) => {
    setSelectedRows((prevSelectedRows) => {
      const newSelectedRows = new Set(prevSelectedRows);
      if (newSelectedRows.has(productId)) {
        newSelectedRows.delete(productId); // Deselect if already selected
      } else {
        newSelectedRows.add(productId); // Select if not selected
      }

      return newSelectedRows;
    });


  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;

    if (selectedDate) {
      const [yearStr, monthStr, dayStr] = selectedDate.split('-');
      const year = parseInt(yearStr, 10);
      const month = parseInt(monthStr, 10); // Month is 0-indexed in JavaScript Date
      const day = parseInt(dayStr, 10);

      const saleDate = new Date(year, month - 1, day); // Create Date object (month - 1)
      saleDate.setMonth(saleDate.getMonth() + 3); // Add 3 months

      const warrantyYear = saleDate.getFullYear();
      const warrantyMonth = (saleDate.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed, pad with 0
      const warrantyDay = saleDate.getDate().toString().padStart(2, '0'); // Pad with 0

      const formattedDateYYYYMMDD = `${year}-${monthStr}-${dayStr}`;
      const formattedWarrantyDate = `${warrantyYear}-${warrantyMonth}-${warrantyDay}`;

      setDateSold(formattedDateYYYYMMDD);
      setWarranty(formattedWarrantyDate);
      

    } else {
      setDateSold('');
      setWarranty('');
    }


  };



  useEffect(() => {
      loadAllProducts();
  }, []);

  // JUST DISPLAYING THE IDS OF SELECTED ROWS
  useEffect(() => {
    const fetchData = async () => {
      const results = []; // Array to hold fetched data
      for (const element of selectedRows) { // Use a for...of loop for async/await
        try {
          const data = await getProduct(element);
          if (data) {
            results.push(data); // Add to the results array
          }
        } catch (error) {
          console.error("Error fetching product:", error);
          // Handle error as needed (e.g., show a message)
        }
      }
      setSelectedData(results); // Set the entire array after fetching
    };
  
    if (selectedRows.size > 0) {
      fetchData();
    } else {
      setSelectedData([]); // Clear the data when no rows are selected
    }
  }, [selectedRows, getProduct]);
  

  

// Getting All Products
  async function loadAllProducts() {
    try {
      const data = await getProducts();
      if (data) {
        setProducts(data);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      // Handle error display to the user
    }
  }


  async function handleDisplayInfo(productId) {

    try {
      const data = await getProduct(productId);
      if (data) {
        setProduct('');
        setProduct(data);
        console.log(data);
        changeActiveInfo();
      }
    } catch (error) {
      console.error('Error loading product:', error);
      // Handle error display to the user
    }
  }

  async function handleSoldProducts(event) {
    event.preventDefault();
  
    const promises = selectedData.map(async (product) => {
      const submitObject = {
        SoldTo: SoldTo,
        SoldBy: SoldBy,
        WatchId: `W${product._id}`,
        ModelName: product.ModelName,
        Reference: product.Reference,
        TotalCost: product.TotalCost,
        SellingPrice: product.SellingPrice,
        Profit: product.Profit,
        Loss: product.Loss,
        ProfitMargin: product.ProfitMargin,
        Channel: Channel,
        Location: Location,
        DateSold: DateSold,
        Warranty: Warranty,
        SoldDuring: SoldDuring,
      };
  
      try {
        const response = await createSalesHistory(submitObject);
        console.log(`SALES CREATED SUCCESSFULLY for ${product._id}:`, response.data);
        console.log("Trying to Delete: ", product._id)
        return response; // Important to return the promise
  
      } catch (error) {
        console.error(`Failed to create SALES HISTORY for ${product._id}:`, error.message || error);
        throw error; // Re-throw the error to be caught by the Promise.all
      }
    });
  
    try {
      await Promise.all(promises); // Wait for all sales history creations and deletions to complete
      loadAllProducts();
      entryClearer();
      
    } catch (error) {
      console.error("Error during sales submission or deletion:", error);
    }


    selectedData.map(async (product) => {
        const response = await deleteProduct(product._id);
        loadAllProducts();
        return response;
    })

    setSelectedData([]);
    entryClearer();

  }

  const entryClearer = () => {

    try{
      document.getElementById('SoldBy1').value = '';
      document.getElementById('SoldTo1').value = '';
      document.getElementById('DateSold1').value = '';
      document.getElementById('Location1').value = '';
      document.getElementById('Channel1').value = '';
      document.getElementById('SoldDuring1').value = '';
    } catch (error){
      console.log(error)
    }
    
  }

  // Double Click to display info
  let items;
  if (activeInfo) {
    items = (
      // Main Div
      <div onClick={changeActiveInfo} className={`absolute flex justify-center items-center bg-sky-200/50 rounded-md w-full h-full`}>

        {/* Card Div*/}
        <div className='flex flex-col justify-center items-center bg-white border-2 border-[#001f3e] rounded-2xl w-[40vw] p-4'
            onClick={(e) => {e.stopPropagation()}}>
          
          {/* Header */}
          <div className='flex flex-col items-center text-2xl w-full'>
            <h1 className=' font-bold underline underline-offset-1'>{product.ModelName}</h1>
            <h1>{product.Condition}</h1>
          </div><br/>

          {/* Body */}
          <div className='flex w-full justify-around text-2xl'>
            <div className='flex flex-col p-2'>
              <h1><b>Brand</b> : {product.Brand}</h1>
              <h1><b>Case Size</b> : {product.CaseSize}</h1>
              <h1><b>Dial Color</b> : {product.DialColor}</h1>
              <h1><b>Wrist Size</b> : {product.WristSize}</h1>
              <h1><b>Movement</b> : {product.Movement}</h1>
              <h1><b>Quality</b> : {product.Quality}</h1>
              <h1><b>Shape</b> : {product.Shape}</h1>
              <h1><b>Strap</b> : {product.Strap}</h1>
            </div><br/>

            <div className='flex flex-col p-2'>
              <h1><b>Watch Code</b> : {product._id}</h1>
              <h1><b>Total Cost</b> : {product.TotalCost}</h1>
              <h1><b>Selling Price</b> : {product.SellingPrice}</h1>
              <h1><b>Profit</b> : {product.Profit}</h1>
              <h1><b>Loss</b> : {product.Loss}</h1>
              <h1><b>Profit Margin</b> : {product.ProfitMargin}</h1>
            </div>
          </div><br/>
          

          {/* Footer */}
          <div className='flex flex-col justify-center items-center'>
            <h1 className='text-xl'><u>Ref No: {product.Reference}</u></h1><br/>
            <h1 className='text-blue-400 underline text-2xl cursor-pointer hover:text-red-400 hover:underline' onClick={changeActiveInfo}>Back</h1>
          </div>
  
        </div>
      </div>
    );
  } else {
    items = null;
  }
  

  return (
    // MAIN DIV
    <div className=' relative bg-white flex justify-center min-h-[89vh] h-[89vh] '>

      {/* LEFT SIDE------------ */}
      <div className='flex flex-col items-center w-full h-full border-1 p-1'>
        <h1 className='text-xl bg-[#003264] w-full text-center text-white'>ITEMS</h1>
        <h3 className='text-sm bg-white w-full pl-2 border-1 mb-0.5'>All Products</h3>
        {/* LEFT SIDE BODY */}
        <div className={`flex bg-sky-300 overflow-auto max-h-[81vh] w-full border-1`}>
          {/* TABLE */}
          <table className="bg-white w-full">
            <thead className={`sticky top-0`}>
              <tr className="bg-gray-600 text-center">
                <th className=" px-4 font-semibold text-white border ">ID</th>
                <th className=" px-4 font-semibold text-white border ">Model Name</th>
                <th className=" px-4 font-semibold text-white border ">Total Cost</th>
                <th className=" px-4 font-semibold text-white border ">Selling Price</th>
              </tr>
            </thead>
            <tbody className="bg-white text-center text-xl">
              {products.map((product) => (
                <tr
                  key={product._id}
                  className={`border-b border-gray-200 ${
                    selectedRows.has(product._id) ? 'bg-[#79bcff] text-white' : 'hover:bg-sky-100'
                  }`}
                  onClick={(e) => handleRowClick(e, product._id)}
                  onDoubleClick={(e) => {handleDisplayInfo(product._id)}}
                >
                  <td className="py-2 px-1 border border-gray-300 ">W{product._id}</td>
                  <td className="py-2 px-1 border border-gray-300">{product.ModelName}</td>
                  <td className="py-2 px-4 border border-gray-300">{product.TotalCost.toLocaleString()}</td>
                  <td className="py-2 px-4 border border-gray-300">{product.SellingPrice.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>




      {/* RIGHT SIDE----------------------------------------------------------------- */}
      <div className='flex flex-col items-center min-w-auto w-[50vw] p-1 border-1 max-h-[89vh]'>
        {/* TiTLE */}
        <h1 className='text-xl text-center bg-[#ffd26b] w-full'>CURRENT ORDER</h1>
        
        {/* RIGHT FORM START */}
        <form onSubmit={handleSoldProducts} className='flex flex-col w-full bg-white'>
          <div className='flex flex-col justify-between max-h-[84vh] h-[85vh]'>
            {/* SELECTED TABLE BOX */}
            <div className={`flex bg-sky-300 overflow-auto max-h-[50vh] w-full`}>
              {/* TABLE */}
              <table className="bg-white border-2 border-gray-400 w-full">
                <thead className={`sticky top-0`}>
                  <tr className="bg-[#ffec4e] text-center">
                    <th className=" px-4 font-semibold text-black border ">ID</th>
                    <th className=" px-4 font-semibold text-black border ">Model Name</th>
                    <th className=" px-4 font-semibold text-black border ">Selling Price</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-center text-xl"> 
                  {selectedData.map((product) => (
                    <tr key={product._id}>
                      <td className="py-2 px-1 border border-gray-300 ">W{product._id}</td>
                      <td className="py-2 px-1 border border-gray-300">{product.ModelName}</td>
                      <td className="py-2 px-4 border text-blue-600 border-gray-300">{product.SellingPrice.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Div - Summary and Sold */}
            <div className={`flex flex-col justify-between items-center text-xl bg-[#ffd26b] overflow-auto max-h-[35vh] h-full w-full border-1 border-t-4 border-gray-700 px-3`}>
              
              {/* INPUTS */}
              <div className='flex w-full h-full pb-2 justify-center items-center pt-2'> 
                <div className='flex flex-col justify-center items-left text-sm mx-6'>
                  <label htmlFor="SoldBy">Sold By:</label>
                  <input id="SoldBy1" name="SoldBy" onChange={(e) => setSoldBy(e.target.value)} className='border-2 bg-white border-black mb-1 w-50 pl-2' required></input>
                  <label htmlFor="SoldTo">Sold To:</label>
                  <input id="SoldTo1" name="SoldTo" onChange={(e) => setSoldTo(e.target.value)} className='border-2 bg-white border-black mb-1 w-50 pl-2' required></input>
                  <label htmlFor="DateSold">Date Sold:</label>
                  <input id="DateSold1" name="DateSold" onChange={handleDateChange} type='date' className='border-2 bg-white border-black w-50 pl-2' required></input>
                </div>

                <div className='flex flex-col justify-center items-left text-sm mx-6'>
                  <label htmlFor="Location">Location:</label>
                  <input id="Location1" name="Location" onChange={(e) => setLocation(e.target.value)} className='border-2 bg-white border-black mb-1 w-50 pl-2' required></input>

                  <label htmlFor="Channel">Channel:</label>
                  <input id="Channel1" list="Channel" onChange={(e) => setChannel(e.target.value)} className='border-2 bg-white border-black mb-1 w-50 pl-2' required></input>
                  <datalist id="Channel">
                    <option value="Facebook"></option>
                    <option value="Instagram"></option>
                    <option value="TikTok"></option>
                    <option value="Carousell"></option>
                  </datalist>
                                    
                  <label htmlFor="SoldDuring">Sold During:</label>
                  <input id="SoldDuring1" list="SoldDuring" onChange={(e) => setSoldDuring(e.target.value)} name="SoldDuring" className='border-2 bg-white border-black  w-50 pl-2' required></input>
                  <datalist id="SoldDuring" className='bg-white'>
                    <option value="Normal Day"></option>
                    <option value="11.11"></option>
                    <option value="Payday Sale"></option>
                    <option value="12.12"></option>
                    <option value="End of Month Sale"></option>
                    <option value="Mega Sale"></option>
                  </datalist>
                  {/* OPTION IF CLIENT WANT IT TO BE PREDEFINED <select id="SoldDuring1" list="SoldDuring" onChange={(e) => setSoldDuring(e.target.value)} name="SoldDuring" className='border-2 bg-white border-black  w-50 pl-2' required>
                    <option value=""></option>
                    <option value="Normal Day">Normal Day</option>
                    <option value="11.11">11.11</option>
                    <option value="Payday Sale">Payday Sale</option>
                    <option value="12.12">12.12</option>
                    <option value="End of Month Sale">End of Month Sale</option>
                    <option value="Mega Sale">Mega Sale</option>
                  </select> */}
                </div>
              </div>
              {/* END INPUTS */}

              {/* SUMMARY */}
              <div className='flex flex-col bg-white w-[29vw] px-3'>
                <div className='flex justify-between '>
                  <h1>Total Amount : </h1>
                  <h1>{totalSellingPrice}</h1>
                </div>

                <div className='flex justify-between'>
                  <h1>Quantity : </h1>
                  <h1>{dataCount}</h1>
                </div>
              </div>

              <div>
                <div className='flex justify-center items-center p-2'>
                  <button type="submit" className='bg-green-500 text-white w-[20vw] rounded-2xl hover:bg-green-800'>SOLD</button>
                </div>
              </div>
            </div>
          </div>
        </form>
        {/* FORM END */}
      </div>
      {/* End of Right Side -------------------------------------------------------------*/}
      

      {/* If item is double clicked */}
      {items}

  </div>
  )
}
