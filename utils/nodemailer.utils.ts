import { nodemailerTransporter } from "@/lib/nodemailer";
import { emailVerificationHtmlTemplate, loginVerificationHtmlTemplate, onSuccessVendorRegistrationHtmlTemplate } from '@/templates/email-templates';
export async function sendEmailVerificationMail (to : string, verificationCode : string) {
  try { 
      await nodemailerTransporter.sendMail({
       from: '"SolarKoko Email Verification" <support@stocksavvy.metclan.com>',
       to: to,
       subject: "Verify Your Email Address",
       html: emailVerificationHtmlTemplate.replace("{{verificationCode}}", verificationCode)
     });
     console.log('sent sent')
     return { sent : true }
     
  }catch(err){
      console.log(err); 
      return { sent : false}
  }

}
export async function sendEmailVerificationLoginMail (to : string, verificationCode : string) {
  try { 
      await nodemailerTransporter.sendMail({
       from: '"SolarKoko Email Verification" <support@stocksavvy.metclan.com>',
       to: to,
       subject: "Verify Your Email Address",
       html: loginVerificationHtmlTemplate.replace("{{loginVerificationCode}}", verificationCode)
     });
     console.log('sent sent')
     return { sent : true }
     
  }catch(err){
      console.log(err); 
      return { sent : false}
  }

}

export async function sendVendorWelcomeEmail (to : string, fullname : string) {
  try { 
      await nodemailerTransporter.sendMail({
       from: '"SolarKoko Vendor" <support@stocksavvy.metclan.com>',
       to: to,
       subject: "Welcome to SolarKoko's Vendor Community - You're Ready to Sell!",
       html: onSuccessVendorRegistrationHtmlTemplate.replace("{{fullName}}", fullname)
     });
     return { sent : true }
     
  }catch(err){
      console.log(err); 
      return { sent : false}
  }

}
