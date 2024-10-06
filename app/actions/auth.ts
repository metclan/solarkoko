"use server";
import { sendEmailVerificationMail } from "@/utils/nodemailer.utils";
import { genVerificationCodeUtil } from "@/utils/genVerificationCodeUtil";
import { createSession } from "@/utils/session";
import { User } from "@/models/user";
import { redisClient } from "@/lib/redis";
import bcrypt from 'bcrypt'; // For password encryption
import { redirect } from "next/navigation";

export async function login(email: string, password: string) {
    try { 
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { success: false, message: "Invalid email format" };
        }

        // Check if email exists in the database
        const existingUser = await User.findOne({ email: email });
  
        if (!existingUser) {
            return { success: false, message: "Incorrect email or password" };
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            return { success: false, message: "Incorrect email or password" };
        }
        
        // Generate verification code
        const verificationCode = genVerificationCodeUtil();

        // Send verification email
        const emailSent = await sendEmailVerificationMail(email, verificationCode);
        if (!emailSent.sent) {
            throw new Error("An error occurred sending mail");
        }

        // Cache email and code in Redis (expire after 15 minutes)
        await redisClient.set(email, verificationCode, 'EX', 900);
        // If everything is correct, return success
        return { success: true, message: "Verification code sent" };

    } catch (error) {
        console.error("Error during login:", error);
        return { success: false, message: "Failed to login" };
    }
}
interface CustomerSignupFields {
    email:string;
    password:string;
    firstName:string; 
    lastName:string; 
    phone:string
}
export async function signup({email, password, firstName, lastName, phone} : CustomerSignupFields) {
    let success : null | true = null
    try {
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { success: false, message: "Invalid email format" };
        }
        // Check if email exists in the database
        const existingUser = await User.findOne( { email : email});

        if (existingUser) {
            return { success: false, message: "Account already exists" };
        }
        // Trim the email
        const trimmedEmail = email.trim();

        // Encrypt the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const newUser = new User({
            email: trimmedEmail,
            password: hashedPassword,
            phone: phone,
            lastName, 
            firstName, 
        });

        // Save the user to the database
        await newUser.save();
        await createSession(newUser._id, newUser.role)
        success = true;
    } catch (error) {
        console.error("Error during signup:", error);
        return { success: false, message: "Failed to register user" };
    }finally { 
        if(success){
            redirect('/')
        }
    }
}

export async function genVerificationCode(email: string) {
    
    try {
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { success: false, message: "Invalid email format" };
        }

        // Check if email exists in the database
        const existingUser = await User.findOne( { email : email});

        if (existingUser) {
            return { success: false, message: "Account already exists" };
        }

        // Generate verification code
        const verificationCode = genVerificationCodeUtil();

        // Send verification email
        const emailSent = await sendEmailVerificationMail(email, verificationCode);
        if (!emailSent.sent) {
            throw new Error("An error occurred sending mail");
        }

        // Cache email and code in Redis (expire after 15 minutes)
        await redisClient.set(email, verificationCode, 'EX', 900);

        return { success: true, message: "Verification email sent" };
    } catch (err) {
        console.error("Error in verifyEmail:", err);
        return { success: false, message: "An error occurred during email verification" };
    }
}

export async function verifyCodeForLogin(verificationCode: string, email: string) {
    try {
        // Retrieve the stored verification code from Redis
        const storedCode = await redisClient.get(email);
        if (storedCode === null) {
            return null;
        }

        if (storedCode === verificationCode) {
            // Code is correct, delete it from Redis
            await redisClient.del(email);
            // Fetch user id 
            const user = await User.findOne({ email : email}, { _id : 1, role : 1})
            if(!user) throw new Error("Incorrect email")
            //Create user session 
            await createSession(user._id, user.role)
            return true; 
        } else {
            return null;
        }
    } catch (err) {
        console.error("Error in validateVerificationCode:", err);
        return null
    }
}
export async function verifyCodeForSignup(verificationCode: string, email: string) {
    try {
        // Retrieve the stored verification code from Redis
        const storedCode = await redisClient.get(email);
        if (storedCode === null) {
            return null;
        }

        if (storedCode === verificationCode) {
            // Code is correct, delete it from Redis
            await redisClient.del(email);
            // Fetch user id 
            return true
        } else {
            return null;
        }
    } catch (err) {
        console.error("Error in validateVerificationCode:", err);
        return null
    }
}
