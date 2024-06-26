import {User} from '../models/usermodel.js';
import {ErrorHandler} from "../utils/ErrorHandler.js"; 
import {catchAsyncErrors} from "../middlewares/CatchAsyncError.js";
import { sendEmail } from '../utils/sendEmail.js';
import { sendToken } from '../utils/jwttoken.js';
import cloudinary from "cloudinary"


export const registeruser =catchAsyncErrors( async(req,res,next)=>{

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "Useravatars",
      });

    const {name,email,password} = req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    });

     sendToken(user,200,res);
})


export const loginuser = catchAsyncErrors( async(req,res,next)=>{
    const { email , password } = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please enter the Email and Password : ",400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Please enter registered Email or Password : ",400));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Please enter registered Email or Password : ",400));
    }

    sendToken(user,200,res);
}) 

//Log out 
export const logout = catchAsyncErrors( async (req,res,next)=>{
     
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly : true
    });

    res.status(200).json({
        success:true,
        message:"Logged Out"
    });
})

//FORGOT PASSWORD
export const forgotPassword = catchAsyncErrors( async (req,res,next)=>{
  const user = await User.findOne({email:req.body.email});

  if(!user){
    return NodeList(new ErrorHandler("User Not Found",404));
  }

  // Get resetpasswordtoken
  const resetToken = user.getResetPasswordToken;
  await user.save({validateBeforeSave:false});

  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

  const message = `Your Password reset Token is :-  \n\n${resetPasswordUrl}. \n\n  If you have not requested for such please ignore `

  try{
    await sendEmail({
         email:user.email,
         subject : "Password Recovery of Cart-zone account",
         message,
    })
    res.status(200).json({
        success : true,
        message : `The Email was sent to ${user.email} successfully`
    })
  }catch(error){
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({validateBeforeSave:false});

    return next(new ErrorHandler(error.message,500))
}
})

//Reset Password
export const resetPassword = catchAsyncErrors(async (req,res,next)=>{

   const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

   const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire : { $gt:Date.now()}

   })
   if(!user){
    return NodeList(new ErrorHandler("Reset password token is Invalid and has been expired",400));
  }

  if(req.body.password!==req.body.confirmPassword){
    return next((new ErrorHandler("Reset password token is Invalid and has been expired",400)));
  }
   user.password = req.body.password;
   user.resetPasswordToken = undefined;
   user.resetPasswordExpire = undefined;

    await user.save();
    
    sendToken(user,200,res);
})

//USER DETAILS
export const getUserDetails = catchAsyncErrors(async (req,res,next)=>{
    
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success : true,
        user,
        
    })
})

//UPDATE PASSWORD
export const updatePassword = catchAsyncErrors(async (req,res,next)=>{

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Please enter correct Old Password : ",401));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("New password and Confirm password doesn't match : ",401));
    }

    user.password = req.body.newPassword; 

    await user.save()

    sendToken(user,200,res); 
})

//UPDATE Profile
export const updateProfile = catchAsyncErrors(async (req,res,next)=>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    } ;

    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);
    
        const imageId = user.avatar.public_id;
    
        await cloudinary.v2.uploader.destroy(imageId);
    
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "Useravatars",
        });
    
        newUserData.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };

}})

// Get all User(admin)
export const getAllUser = catchAsyncErrors(async (req,res,next)=>{

    const userCount = await User.countDocuments();
    const user = await User.find()

    res.status(200).json({
        success:true,
        user,
        userCount
    })
})

// Get single User details(admin)
export const getSingleUserDetails = catchAsyncErrors(async (req,res,next)=>{

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exist in the record : ${req.params.id}`));
    }

    res.status(200).json({
        success:true,
        user,
    })
})

//Update Roles 
export const updateRole = catchAsyncErrors(async (req,res,next)=>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role : req.body.role,
    } ;

    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new : true,
        runValidators : true,
        useFindAndModify : false,
    });

    res.status(200).json({
        success:true
    })

})
//Delete the User  ....--admin

export const deleteUser = catchAsyncErrors(async (req,res,next)=>{
    
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User is not present in the record : ${req.parasm.id}`));
    }

    await user.deleteOne();

    res.status(200).json({
        success:true,
        message : " User Deleted successfully"
    })

})

