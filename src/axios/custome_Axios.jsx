import axios from "axios";

const custome_Axios = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
 timeout:5000,
        
})


custome_Axios.interceptors.request.use(config =>{
  console.log(`Request sent ${config}`);
    return config  
})


custome_Axios.interceptors.response.use( AxiosResponse =>{
    console.log(`Response Response ${AxiosResponse}`);
      return AxiosResponse  
  })


export default custome_Axios;