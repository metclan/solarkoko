import { nodemailerTransporter } from "@/lib/nodemailer";
import { emailVerificationHtmlTemplate, loginVerificationHtmlTemplate } from '@/templates/email-templates';
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
