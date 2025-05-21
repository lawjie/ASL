import React, { useState, useEffect, useRef } from 'react';
import { getProducts, getProduct, createProduct, updateProduct, counterIncrement, deleteProduct, getCounters} from '../api'; // Adjust the path as needed
import { CirclePlus, FilePenLine, Trash2, MoveLeft } from 'lucide-react';

export function ItemInventory() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);

  const [counter, setCounter] = useState([]);
  const [currCounter, setCurrCounter] = useState(0);

  const [activeInfo, setActiveInfo] = useState(false)

  const [ModelName, setModelName] = useState("");
  const [Brand, setBrand] = useState("");
  const [TotalCost, setTotalCost] = useState("");
  const [SellingPrice, setSellingPrice] = useState("");
  const [Reference, setReference] = useState("");
  const [Quality, setQuality] = useState("");
  const [Strap, setStrap] = useState("");
  const [DialColor, setDialColor] = useState("");
  const [Shape, setShape] = useState("");
  const [Movement, setMovement] = useState("");
  const [CaseSize, setCaseSize] = useState("");
  const [WristSize, setWristSize] = useState("");
  const [Condition, setCondition] = useState("");

  const [hiddenForm, setHiddenForm] = useState(true);
  const [hiddenEdit, setHiddenEdit] = useState(true);
  const [hiddenInfo, setHiddenInfo] = useState(true);


  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const confirmDiv = () => setConfirmDelete(!confirmDelete)
  const changeActiveInfo = () => setActiveInfo(!activeInfo)

  const modelNameInputRef = useRef(null);
  const brandInputRef = useRef(null);
  const totalCostInputRef = useRef(null);
  const sellingPriceInputRef = useRef(null);
  const statusInputRef = useRef(null);

  const toggleHiddenForm = () => setHiddenForm(!hiddenForm);
  const toggleHiddenEdit = () => {
    setHiddenEdit(!hiddenEdit)

    document.getElementById('_idEdit').value = '';
    document.getElementById('ModelNameEdit').value = '';
    document.getElementById('BrandEdit').value = '';
    document.getElementById('ReferenceEdit').value = '';
    document.getElementById('TotalCostEdit').value = '';
    document.getElementById('SellingPriceEdit').value = '';

    document.getElementById('QualityEdit').value = '';
    document.getElementById('StrapEdit').value = '';
    document.getElementById('ReferenceEdit').value = '';
    document.getElementById('DialColorEdit').value = '';
    document.getElementById('ShapeEdit').value = '';
    document.getElementById('MovementEdit').value = '';
    document.getElementById('CaseSizeEdit').value = '';
    document.getElementById('WristSizeEdit').value = '';
    document.getElementById('ConditionEdit').value = '';
  }
  
  useEffect(() => {
    loadAllProducts();
    loadCounters();
  }, []);

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

  async function loadCounters() {
    try {
      const data = await getCounters();
      if (data) {
        setCounter(data);
        console.log('Counter:', typeof data);
        setCurrCounter(parseInt(data[0].count));
      }
    } catch (error) {
      console.error('Error loading counter:', error);
    }
  }

  async function handleSubmit(event) { 
    event.preventDefault();

    const nextId = currCounter;

    let ProfitLoss = parseFloat(SellingPrice) - parseFloat(TotalCost);
    let ProfitMargin = (((parseFloat(SellingPrice) - parseFloat(TotalCost)) / parseFloat(SellingPrice)) * 100).toFixed(2);
    const submitObject = {
      _id: nextId,
      ModelName: ModelName,
      Brand: Brand,
      TotalCost: parseFloat(TotalCost),
      SellingPrice: parseFloat(SellingPrice),
      Profit: ProfitLoss > 0 ? ProfitLoss : 0,
      Loss: ProfitLoss < 0 ? Math.abs(ProfitLoss) : 0,
      ProfitMargin: ProfitMargin,
      CaseSize: CaseSize,
      Condition: Condition,
      DialColor: DialColor,
      Movement: Movement,
      Quality: Quality,
      Reference: Reference,
      Shape: Shape,
      Strap: Strap,
      WristSize: WristSize,
    };

    try {
      const response = await createProduct(submitObject);
      console.log('Post created:', response.data);
      loadAllProducts();
      handleCounterIncrement();
      loadCounters();
      // Reset form values by setting the state variables to their initial states (empty strings)
      document.getElementById('addModelName').value = '';
      document.getElementById('addBrand').value = '';
      document.getElementById('addTotalCost').value = '';
      document.getElementById('addSellingPrice').value = '';
      document.getElementById('addReference').value = '';
      document.getElementById('addQuality').value = '';
      document.getElementById('addStrap').value = '';
      document.getElementById('addDialColor').value = '';
      document.getElementById('addShape').value = '';
      document.getElementById('addMovement').value = '';
      document.getElementById('addCaseSize').value = '';
      document.getElementById('addWristSize').value = '';
      document.getElementById('addCondition').value = '';


      toggleHiddenForm();
      console.log(submitObject);
      
      
      // Reset form...
    } catch (error) {
      console.error('Failed to create post:', error.message || error);
      // Handle error display...
    }
  }

  // FIX THIS NEXT
  async function handleEdit(event) {
    event.preventDefault();
    
    const row = event.target.closest('tr');
    const cells = row.querySelectorAll('td');
    const id = cells[0].textContent.trim().substring(1);
    const productId = parseInt(id);

    try {
      const data = await getProduct(productId);
      if (data) {
        setProduct('');
        setProduct(data);

        document.getElementById('_idEdit').value = parseInt(productId);
        document.getElementById('ModelNameEdit').value = data.ModelName;
        document.getElementById('BrandEdit').value = data.Brand;
        document.getElementById('ReferenceEdit').value = data.Reference;
        document.getElementById('TotalCostEdit').value = data.TotalCost;
        document.getElementById('SellingPriceEdit').value = data.SellingPrice;

        document.getElementById('QualityEdit').value = data.Quality;;
        document.getElementById('StrapEdit').value = data.Strap;
        document.getElementById('ReferenceEdit').value = data.Reference;
        document.getElementById('DialColorEdit').value = data.DialColor;
        document.getElementById('ShapeEdit').value = data.Shape;
        document.getElementById('MovementEdit').value = data.Movement;;
        document.getElementById('CaseSizeEdit').value = data.CaseSize;
        document.getElementById('WristSizeEdit').value = data.WristSize;
        document.getElementById('ConditionEdit').value = data.Condition;


      }
    } catch (error) {
      console.error('Error loading product:', error);
    }


  }

  // FIX THIS NEXT 2
  async function handleEditSubmit(event) {
    event.preventDefault();

    const paramsId = parseFloat(document.getElementById('_idEdit').value)
    const TotalCostEdit = document.getElementById('TotalCostEdit').value
    const SellingPriceEdit = document.getElementById('SellingPriceEdit').value


    let ProfitLossEdited = parseFloat(SellingPriceEdit) - parseFloat(TotalCostEdit);
    let ProfitMarginEdited = (((parseFloat(SellingPriceEdit) - parseFloat(TotalCostEdit)) / parseFloat(SellingPriceEdit)) * 100).toFixed(2); // Calculate profit margin
    
    const submitObject = {
      _id: paramsId,
      ModelName: document.getElementById('ModelNameEdit').value,
      Brand: document.getElementById('BrandEdit').value,
      TotalCost: parseFloat(TotalCostEdit),
      SellingPrice: parseFloat(SellingPriceEdit),
      Profit: ProfitLossEdited > 0 ? ProfitLossEdited : 0,
      Loss: ProfitLossEdited < 0 ? Math.abs(ProfitLossEdited) : 0,
      ProfitMargin: parseFloat(ProfitMarginEdited),
      CaseSize: document.getElementById('CaseSizeEdit').value,
      Condition: document.getElementById('ConditionEdit').value,
      DialColor: document.getElementById('DialColorEdit').value,
      Movement: document.getElementById('MovementEdit').value,
      Quality: document.getElementById('QualityEdit').value,
      Reference: document.getElementById('ReferenceEdit').value,
      Shape: document.getElementById('ShapeEdit').value,
      Strap: document.getElementById('StrapEdit').value,
      WristSize: document.getElementById('WristSizeEdit').value,
    };


    
    try {
      const response = await updateProduct(paramsId, submitObject);
      console.log('Updated product created successfully:', response.data);
      loadAllProducts();
      // Reset form values by setting the state variables to their initial states (empty strings)
      // Directly clear the input values using the refs
      if (modelNameInputRef.current) {
        modelNameInputRef.current.value = '';
      }
      if (brandInputRef.current) {
        brandInputRef.current.value = '';
      }
      if (totalCostInputRef.current) {
        totalCostInputRef.current.value = '';
      }
      if (sellingPriceInputRef.current) {
        sellingPriceInputRef.current.value = '';
      }
      if (statusInputRef.current) {
        statusInputRef.current.value = '';
      }

      toggleHiddenEdit();
      
      // Reset form...
    } catch (error) {
      console.error('Failed to edit post:', error.message || error);
      console.log(submitObject);
    }
  }

  async function handleCounterIncrement() {
    try {
      const response = await counterIncrement();
      console.log('Counter incremented:', response.data);
    } catch (error) {
      console.error('Error incrementing counter:', error);
    }
  }

  // --------------------------------
  async function handleDisplayInfo(event) {
    event.preventDefault();
    
    const row = event.target.closest('tr');
    const cells = row.querySelectorAll('td');
    const id = cells[0].textContent.trim().substring(1);
    const productId = parseInt(id);

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


  async function handleDeleteInfo(event) {
    event.preventDefault(); // Prevent default form behavior if applicable
  
    confirmDiv(); // Displays the Yes or No...  <--  Important:  Handle Await Correctly
  
    const row = event.target.closest('tr');
    const cells = row.querySelectorAll('td');
    const id = cells[0].textContent.trim().substring(1); // Remove the 'W' prefix
    const productId = parseInt(id);
    console.log("NUMBER", productId);
  
    setSelectedId(productId)
  }
  
  async function proceedDelete() {
    console.log("Proceeding to delete product with ID:", selectedId);
    try {
      await deleteProduct(selectedId);
      console.log('Product deleted:', selectedId);
      await loadAllProducts();
      confirmDiv();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }

  let items;
  if (activeInfo) {
    items = (
      // Main Div
      <div onClick={changeActiveInfo} className={`absolute flex justify-center items-center bg-sky-200/90 rounded-md w-full h-full`}>

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

  let deleteInfo;
  if (confirmDelete) {
    deleteInfo = (
      // Main Div
      <div onClick={confirmDiv} className={`absolute flex justify-center items-center bg-sky-200/50 rounded-md w-full h-full`}>

        {/* Card Div*/}
        <div className='flex flex-col justify-center items-center bg-white border-2 border-[#001f3e] rounded-2xl w-[40vw] p-4'
            onClick={(e) => {e.stopPropagation()}}>
            <h1>Are you sure your want to delete?</h1>
          <div className='flex'>
            <button onClick={proceedDelete} className='flex justify-center items-center bg-green-300 hover:bg-green-600 w-20 h-10 m-4'>Yes</button>
            <button onClick={confirmDiv} className='flex justify-center items-center bg-sky-200 hover:bg-sky-500 w-20 h-10 m-4'>No</button>
          </div>

        </div>
      </div>
    );
  } else {
    deleteInfo = null;
  }

  return (
    // MAIN DIV
    <div className=' relative flex flex-col items-center bg-white pr-4 pl-4 pb-4 rounded-lg shadow-md min-h-[89vh] '>
      {/* DIV FOR TOP BAR */}
      <div className={`flex justify-between items-center sticky top-0 pt-4 mb-2 w-full ${hiddenForm ? "" : "pointer-events-none"}`}>
        <div className={`flex justify-start w-full gap-2`}>
          <h1 className='text-[#003264]'>Legend</h1>
          <h1 className='bg-[#003264] text-white pl-2 pr-2 rounded-md'>Edit</h1>
          <h1 className='bg-[#00bf63] text-white pl-2 pr-2 rounded-md'>Sold</h1>
          <h1 className='bg-[#ff3131] text-white pl-2 pr-2 rounded-md'>Delete</h1>
        </div >
        <div className='flex w-full justify-end'>
          <button onClick={toggleHiddenForm} className="flex w-40 h-10 justify-center items-center bg-sky-100 py-2 px-4 rounded hover:bg-blue-300"><CirclePlus size={20} className='mr-2'/>Add Item</button>
        </div>
      </div>



 

            
      {/* ------------------------------------------------DIV START TABLE----------------------------------------------------- */}
      <div className={`flex max-w-full overflow-auto max-h-[78vh] w-full ${hiddenForm ? "" : "pointer-events-none"} border-1`}>
        <table className="bg-white w-full ">
          <thead className={`sticky top-0 `}>
            <tr className={`bg-amber-300 text-center `}>
              <th className="py-2 px-4 font-semibold text-black border-l-1 border-r-1 border-gray-300  ">ID</th>
              <th className="py-2 px-4 font-semibold text-black border-l-1 border-r-1 border-gray-300  ">Model Name</th>
              <th className="py-2 px-4 font-semibold text-black border-l-1 border-r-1 border-gray-300  ">Brand</th>
              <th className="py-2 px-4 font-semibold text-black border-l-1 border-r-1 border-gray-300  ">Total Cost</th>
              <th className="py-2 px-4 font-semibold text-black border-l-1 border-r-1 border-gray-300  ">Selling Price</th>
              <th className="py-2 px-4 font-semibold text-black border-l-1 border-r-1 border-gray-300  ">Profit</th>
              <th className="py-2 px-4 font-semibold text-black border-l-1 border-r-1 border-gray-300  ">Loss</th>
              <th className="py-2 px-4 font-semibold text-black border-l-1 border-r-1 border-gray-300  ">Profit Margin</th>
              <th className="py-2 px-4 font-semibold text-black border-l-1 border-r-1 border-gray-300  ">Action</th>
            </tr>
          </thead>
          <tbody className='bg-white text-center text-xl'>
            {products.map((product, index) => (
              <tr key={product._id} className={`border-b border-gray-200 hover:bg-sky-100`} onDoubleClick={(e) => {handleDisplayInfo(e)}}>
                <td className="flex justify-center items-center">W{product._id}</td>
                <td className="py-2 px-1 border border-gray-300">{product.ModelName}</td>
                <td className="py-2 px-4 border border-gray-300">{product.Brand}</td>
                <td className="py-2 px-4 border border-gray-300">{product.TotalCost.toLocaleString()}</td>
                <td className="py-2 px-4 border border-gray-300">{product.SellingPrice.toLocaleString()}</td>
                <td className="py-2 px-4 border border-gray-300">{product.Profit.toLocaleString()}</td>
                <td className="py-2 px-4 border border-gray-300">{product.Loss.toLocaleString()}</td>
                <td className="py-2 px-4 border border-gray-300">{product.ProfitMargin.toLocaleString()}</td>

                {/* Action buttons */}
                <td className="flex py-2 justify-center items-center gap-2">
                  {/* Choices */}
                  <div id="choices" className={`flex flex-row gap-2`}>
                    <button className={`flex rounded-full bg-[#81c0ff] hover:bg-[#003264] p-1` } onClick={(e) => {handleEdit(e,product); toggleHiddenEdit()}}><FilePenLine color='white'/></button>
                    <button className={`flex rounded-full bg-[#ffa0a0] hover:bg-[#ff3131] p-1`} onClick={(e) => {handleDeleteInfo(e)}}><Trash2 /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

            {/* Add Product Form */}
            <div className={`absolute flex justify-center items-center bg-gray-500/50 w-full h-full ${hiddenForm ? "hidden" : ""}`}>
        <div className={`relative flex flex-col justify-center bg-white border-2 rounded-md shadow-md border-[#003264]`}>
          <h1 className='flex items-center text-md font-bold rounded-t-md ml-3 mt-2'>
            <MoveLeft onClick={toggleHiddenForm} type="button" className='mr-2 cursor-pointer hover:bg-gray-400/30 hover:rounded-md' size={30}/>
            ADD ITEM
          </h1>
          {/* Main Div Form */}
          <form onSubmit={handleSubmit} className='flex flex-col p-4 gap-6'>
              
              {/* BODY Div */}
              <div className='flex flex-row gap-10'>

                {/* Left Side */}
                <div className='flex flex-col p-2 gap-2'>

                  <div className='flex justify-center text-xl underline pb-2'>
                    <h1>Model Information</h1>
                  </div>

                  <div className='flex justify-between'>
                    <label htmlFor="_id">Watch Id:</label>
                    <input type="number" name="_id" onChange={(e)=>setTitle(e.target.value)} value={currCounter} className="focus:outline-none focus:border-transparent" readOnly /><br/>
                  </div>

                  <div className='flex justify-between'>
                    <label htmlFor="ModelName">Model Name:</label>
                    <input type="text" id="addModelName" name="ModelName" className='border-1 rounded-md' onChange={(e) => setModelName(e.target.value)} maxLength={200} required/><br/>
                  </div>

                  <div className='flex justify-between'>
                    <label htmlFor="Brand">Brand:</label>
                    <input type="text" id="addBrand" name="Brand" className='border-1 rounded-md' onChange={(e) => setBrand(e.target.value)} maxLength={200} required/><br/>
                  </div>

                  <div className='flex justify-between'>
                    <label htmlFor="Reference">Reference:</label>
                    <input type="text"  id="addReference" name="Reference" className='border-1 rounded-md' onChange={(e) => setReference(e.target.value)} maxLength={200} required/><br/>
                  </div>

                  <div className='flex justify-between'>
                  <label htmlFor="TotalCost">Total Cost:</label>
                  <input type="number" id="addTotalCost" name="TotalCost" className='border-1 rounded-md' onChange={(e) => setTotalCost(e.target.value)} step="any" required/><br/>
                  </div>

                  <div className='flex justify-between'>
                    <label htmlFor="SellingPrice">Selling Price:</label>
                    <input type="number" id="addSellingPrice" name="SellingPrice" className='border-1 rounded-md' onChange={(e) => setSellingPrice(e.target.value)} step="any" required/><br/>
                  </div>
                </div>
                {/* Left Side End */}

                {/* Right Side */}
                <div className='flex flex-col p-2 gap-2'>

                  <div className='flex justify-center text-xl underline pb-2'>
                    <h1>Additional Information</h1>
                  </div>
                  
                  <div className='flex justify-between'>
                    <label htmlFor="Quality">Quality:</label>
                    <input type="text" id="addQuality" name="Quality" className='border-1 rounded-md' onChange={(e) => setQuality(e.target.value)} maxLength={200} required/><br/>
                  </div>

                  <div className='flex justify-between'>
                    <label htmlFor="Strap">Strap:</label>
                    <input type="text"  id="addStrap" name="Strap" className='border-1 rounded-md' onChange={(e) => setStrap(e.target.value)} maxLength={200} required/><br/>
                  </div>

                  <div className='flex justify-between'>
                    <label htmlFor="DialColord">Dial Color:</label>
                    <input type="text"  id="addDialColor" name="DialColor" className='border-1 rounded-md' onChange={(e) => setDialColor(e.target.value)} maxLength={200} required/><br/>
                  </div>

                  <div className='flex justify-between'>
                    <label htmlFor="Shape">Shape:</label>
                    <input type="text"  id="addShape" name="Shape" className='border-1 rounded-md' onChange={(e) => setShape(e.target.value)} maxLength={200} required/><br/>
                  </div>

                  <div className='flex justify-between'>
                    <label htmlFor="Movement">Movement:</label>
                    <input type="text"  id="addMovement" name="Movement" className='border-1 rounded-md' onChange={(e) => setMovement(e.target.value)} maxLength={200} required/><br/>
                  </div>

                  <div className='flex justify-between'>
                    <label htmlFor="CaseSize">Case Size:</label>
                    <input type="text"  id="addCaseSize" name="CaseSize" className='border-1 rounded-md' onChange={(e) => setCaseSize(e.target.value)} maxLength={200} required/><br/>
                  </div>

                  <div className='flex justify-between'>
                    <label htmlFor="WristSize">Wrist Size:</label>
                    <input type="text"  id="addWristSize" name="WristSize" className='border-1 rounded-md' onChange={(e) => setWristSize(e.target.value)} maxLength={200} required/><br/>
                  </div>

                  <div className='flex justify-between'>
                    <label htmlFor="Condition">Condition:</label>
                    <input type="text"  id="addCondition" name="Condition" className='border-1 rounded-md' onChange={(e) => setCondition(e.target.value)} maxLength={200} required/><br/>
                  </div>

   


                </div>
                {/* Right Side END */}


              </div>
              {/* BODY DIV END */}
              
              
              {/* Submit Div */}
              <div className='flex justify-center items-center'>
                <button type="submit" className='bg-[#abffd7] text-2xl hover:bg-[#00ff84] w-[10rem] border-1 border-black rounded-md'>Submit</button>
              </div>
          </form>
        </div>
      </div>

      {/* Edit Form */}
      <div className={`absolute flex justify-center items-center bg-gray-500/50 w-full h-full ${hiddenEdit ? "hidden" : ""}`}>
        <div className={`relative flex flex-col justify-center bg-white border rounded-md shadow-md border-[#003264]`}>
        <h1 className='flex items-center text-md font-bold rounded-t-md ml-3 mt-2'>
          <MoveLeft onClick={toggleHiddenEdit} type="button" className='mr-2 cursor-pointer hover:bg-gray-400/30 hover:rounded-md' size={30}/> 
            EDIT ITEM
          </h1>
          
          {/* Main Div Form */}
          <form onSubmit={handleSubmit} className='flex flex-col p-4 gap-6'>
              
              {/* BODY Div */}
            <div className='flex flex-row gap-10'>
              
              {/* Left Side */}
              <div className='flex flex-col gap-2'>
                <div className='flex justify-center text-xl underline pb-2'>
                    <h1>Model Information</h1>
                  </div>

                  <div className='flex justify-between'>
                    <label htmlFor="_id">Watch Id:</label>
                    <input type="number" id='_idEdit' name="_id" onChange={(e)=>setTitle(e.target.value)} className="focus:outline-none focus:border-transparent" readOnly /><br/>
                  </div>

                  <div className='flex justify-between'>
                    <label htmlFor="ModelNameEdit">ModelName:</label>
                    <input type="text" id='ModelNameEdit' name="ModelNameEdit" className='border-1 rounded-md' onChange={(e) => setModelName(e.target.value)}  maxLength={100} required ref={modelNameInputRef} /><br/>
                  </div>

                  {/* EDIT BELOW  DEKETE THIS COMMENT AFTER */}
                  <div className='flex justify-between'>
                    <label htmlFor="BrandEdit">Brand:</label>
                    <input type="text" id="BrandEdit" name="BrandEdit" className='border-1 rounded-md' onChange={(e) => setBrand(e.target.value)} maxLength={200} required/><br/>
                  </div>

                  <div className='flex justify-between'>
                    <label htmlFor="ReferenceEdit">Reference:</label>
                    <input type="text"  id="ReferenceEdit" name="ReferenceEdit" className='border-1 rounded-md' onChange={(e) => setReference(e.target.value)} maxLength={200} required/><br/>
                  </div>

                  <div className='flex justify-between'>
                  <label htmlFor="TotalCostEdit">Total Cost:</label>
                  <input type="number" id="TotalCostEdit" name="TotalCostEdit" className='border-1 rounded-md' onChange={(e) => setTotalCost(e.target.value)} step="any" required/><br/>
                  </div>

                  <div className='flex justify-between'>
                    <label htmlFor="SellingPriceEdit">Selling Price:</label>
                    <input type="number" id="SellingPriceEdit" name="SellingPriceEdit" className='border-1 rounded-md' onChange={(e) => setSellingPrice(e.target.value)} step="any" required/><br/>
                  </div>
                </div>

                {/* Left Side End */}


                {/* Right Side */}
                <div className='flex flex-col p-2 gap-2'>
                  <div className='flex justify-center text-xl underline pb-2'>
                    <h1>Additional Information</h1>
                  </div>

                  <div className='flex justify-between'>
                    <label htmlFor="QualityEdit">Quality:</label>
                    <input type="text" id="QualityEdit" name="QualityEdit" className='border-1 rounded-md' onChange={(e) => setQuality(e.target.value)} maxLength={200} required/><br/>
                  </div>

                  <div className='flex justify-between'>
                    <label htmlFor="StrapEdit">Strap:</label>
                    <input type="text"  id="StrapEdit" name="StrapEdit" className='border-1 rounded-md' onChange={(e) => setStrap(e.target.value)} maxLength={200} required/><br/>
                  </div>

                  <div className='flex justify-between'>
                    <label htmlFor="DialColorEdit">Dial Color:</label>
                    <input type="text"  id="DialColorEdit" name="DialColorEdit" className='border-1 rounded-md' onChange={(e) => setDialColor(e.target.value)} maxLength={200} required/><br/>
                  </div>

                  <div className='flex justify-between'>
                    <label htmlFor="ShapeEdit">Shape:</label>
                    <input type="text"  id="ShapeEdit" name="ShapeEdit" className='border-1 rounded-md' onChange={(e) => setShape(e.target.value)} maxLength={200} required/><br/>
                  </div>

                  <div className='flex justify-between'>
                    <label htmlFor="MovementEdit">Movement:</label>
                    <input type="text"  id="MovementEdit" name="MovementEdit" className='border-1 rounded-md' onChange={(e) => setMovement(e.target.value)} maxLength={200} required/><br/>
                  </div>

                  <div className='flex justify-between'>
                    <label htmlFor="CaseSizeEdit">Case Size:</label>
                    <input type="text"  id="CaseSizeEdit" name="CaseSizeEdit" className='border-1 rounded-md' onChange={(e) => setCaseSize(e.target.value)} maxLength={200} required/><br/>
                  </div>

                  <div className='flex justify-between'>
                    <label htmlFor="WristSizeEdit">Wrist Size:</label>
                    <input type="text"  id="WristSizeEdit" name="WristSizeEdit" className='border-1 rounded-md' onChange={(e) => setWristSize(e.target.value)} maxLength={200} required/><br/>
                  </div>

                  <div className='flex justify-between'>
                    <label htmlFor="ConditionEdit">Condition:</label>
                    <input type="text"  id="ConditionEdit" name="ConditionEdit" className='border-1 rounded-md' onChange={(e) => setCondition(e.target.value)} maxLength={200} required/><br/>
                  </div>
                </div>
                {/* Right Side END */}


            </div>
              {/* Edit For Submit Button */}
              <div className='flex justify-center items-center'>
                <button onClick={handleEditSubmit} type="submit" className='bg-[#abffd7] text-2xl hover:bg-[#00ff84] w-[10rem] border-1 border-black rounded-md'>Submit</button>
              </div>
          </form>
        </div>
      </div>
      
      {/* Displaying Infos */}
      {items}
      
      {/* You sure you want to delete? */}
      {deleteInfo}
      {/* ------------------------------------------------DIV END TABLE----------------------------------------------------- */}

    </div>
  );
}