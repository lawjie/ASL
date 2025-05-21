import axios from "axios"

const URL = "http://localhost:3000"

// API FOR PRODUCTS-----------------------------------------------------
//#1 - Retrieve All
export async function getProducts(){ 
    // "http://localhost:3000/posts"
    const response = await axios.get(`${URL}/products`)
    if (response.status === 200){
        return response.data
    } else {
        return console.log("Theres and error in getProducts()")
    }
}

//#2 - Retrieve One
export async function getProduct(id){
    // "http://localhost:3000/posts/12345"    <----  FOR EXAMPLE(id = 12345)
    const response = await axios.get(`${URL}/products/${id}`)
    if (response.status === 200){
        return response.data
    } else {
        return console.log("Theres and error in getProduct()")
    }
}

//#3 - Create One
export async function createProduct(post) {
    try {
      const response = await axios.post(`${URL}/products`, post);
  
      if (response.status === 200 || response.status === 201) {
        console.log('Product created successfully:', response.data);
        return response;
      } else {
        console.warn('Unexpected response:', response);
        return null;
      }
  
    } catch (error) {
      console.error('Error creating post:', error.response?.data || error.message);
      throw error;
    }
}

//#4 - Update One
export async function updateProduct(id, post){
    const response = await axios.put(`${URL}/products/${id}`, post)
    return response 
}
                  
//#5 - Delete One
export async function deleteProduct(id){
    const response = await axios.delete(`${URL}/products/${id}`)
    return response // TO CHECK IF IT WILL RETURN OK 200 or else theres an error
}






// COUNTER Increment-----------------------------------------------------

//#1 - RETRIEVE ALL COUNTERS
export async function getCounters(){ 
    const response = await axios.get(`${URL}/productcounter`)
    if (response.status === 200){
        return response.data
    } else {
        return console.log("Theres and error in getCounters()")
    }
}

//#2 - Update Counter
export async function counterIncrement(post) {
    const id = "680dc9009c10b527ae50e9c4"
    const response = await axios.put(`${URL}/productcounter/${id}`)
    console.log(response)
    return response 
}




// SALES HISTORY-----------------------------------------------------
//#1 - Retrieve All Sales History
export async function getSalesHistory(){ 
    // "http://localhost:3000/posts"
    const response = await axios.get(`${URL}/saleshistory`)
    if (response.status === 200){
        return response.data
    } else {
        return console.log("Theres and error in getProducts()")
    }
}

//#2 - Create - Transfer from Products to Sales History
export async function createSalesHistory(post) {
    try {
      const response = await axios.post(`${URL}/saleshistory`, post);
  
      if (response.status === 200 || response.status === 201) {
        console.log('Product/s created successfully:', response.data);
        return response;
      } else {
        console.warn('Unexpected response:', response);
        return null;
      }
  
    } catch (error) {
      console.error('Error creating post:', error.response?.data || error.message);
      throw error;
    }
}




// API FOR USERS-----------------------------------------------------

//#1 - Retrieve One--------------------------------------------------
export async function getUser(id){
    // "http://localhost:3000/user/12345"    <----  FOR EXAMPLE(id = 12345)
    const response = await axios.get(`${URL}/users/${id}`)
    if (response.status === 200){
        return response.data
    } else {
        return console.log("Theres and error in getUser()")
    }
}

//#2 - Create One ---------------------------------------------------
export async function createUser(user){
    // "http://localhost:3000/user"
    const response = await axios.post(`${URL}/users`, user)
    return response // TO CHECK IF IT WILL RETURN OK 200 or else theres an error
}

//#3 - Update One-----------------------------------------------------
export async function updateUser(id, user){
    // "http://localhost:3000/users/${id}"
    const response = await axios.put(`${URL}/users/${id}`, user)
    return response // TO CHECK IF IT WILL RETURN OK 200 or else theres an error
}

export async function verifyUser(user) {
    const response = await axios.post(`${URL}/users/login`, user)
    // console.log(response)
    if (response.data.success){
        return response.data.token
    } else {
        return
    }
}