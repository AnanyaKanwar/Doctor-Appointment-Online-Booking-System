const upload_preset=import.meta.env.VITE_UPLOAD_PRESET
const cloud_name=import.meta.env.VITE_CLOUD_NAME

const uploadImageforCloudinary=async file=>{
    const uploadData=new FormData()
    // creates object for image upload
    uploadData.append('file',file)
    uploadData.append('upload_preset',upload_preset)
    uploadData.append('cloud_name',cloud_name)

    const res=await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,{
        method:'post',
        body:uploadData
    })


    const data=await res.json();    
    return data;


}
export default uploadImageforCloudinary

