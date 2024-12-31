import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js"
import Doctor from "../models/DoctorSchema.js"


export const updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const updateUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.status(200).json({ success: true, message: "Successfully updated", data: updateUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update" });
    }
};

export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Successfully deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete" });
    }
};

export const getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id).select("-password");
        res.status(200).json({ success: true, message: "User Found", data: user });
    } catch (error) {
        res.status(404).json({ success: false, message: "No user found" });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.status(200).json({ success: true, message: "Users Found", data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getAllUserProfile=async(req,res)=>{

    const userId=req.userId
    try{
        const user=await User.findById(userId)
        if(!user){
            return res.status(404).json({success:false,message:"User not found"})
        }

        const {password,...rest}=user._doc
        res.status(200).json({success:true,message:"Profile info is getting",data:{...rest}})
    } 
    catch(err){

        return res.status(500).json({success:false,message:"Something went wrong, cannot get"})

    }
}

export const getMyAppointments=async(req,res)=>{
    try{
        // step-1:retrieve appointments from booking for specific user
        const bookings=await Booking.find({user:req.userId})

        // step-2:extract doctor ids from appointment booking
        const doctorIds=bookings.map(el=>el.doctor.id)

        // step-3:retreive doctors using doctor ids
        const doctors=await Doctor.find({_id:{$in:doctorIds}}).select('-password')

        res.status(200).json({success:true,message:"Appointment are getting", data:doctors})

    }
    catch(err){

        return res.status(500).json({success:false,message:"Something went wrong, cannot get"})

    }
}