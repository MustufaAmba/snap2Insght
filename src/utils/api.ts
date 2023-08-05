export const uploadFile= async(body:FormData)=>{
    try{
        const response = await fetch("/api/upload", {
            method: "POST",
            body
          });
          return response
    }
    catch(e){
        console.log(e)
    }
}
export const getFiles= async()=>{
    try{
        const response = await fetch("/api/get", {
            method: "GET",
          });
          return await response.json()
    }
    catch(e){
        console.log(e)
    }
}
export const getProducts= async(imageUUID:string)=>{
    try{
        const response = await fetch(`/api/product?imageUUID=${imageUUID}`, {
            method: "GET",
          });
          return await response.json()
    }
    catch(e){
        console.log(e)
    }
}