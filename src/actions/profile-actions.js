"use server";

import { ERRORS, MESSAGES } from "@/enums/enums.js";
import { User } from "@/model/user-model";

export const getProfile = async (email) => {
    const user = await User.findOne({ email }).lean();
    if (user) {
      return {
        ...user,
        _id: user._id.toString(),
      };
    }
    return null;
}

export const updateProfile = async (email, data) => {
    const user = await User.findOne({ email });
    if (!user) {    
        return {
            success: false,
            error: ERRORS.USER_NOT_FOUND
        };
    }    
    user.displayName = data.displayName;
    user.phoneNumber = data.phoneNumber;
    user.email = data.email;
    user.disabled = data.disabled;
    user.save();
    return {
        success: true,  
        message: MESSAGES.PROFILE_UPDATED
    };
}

