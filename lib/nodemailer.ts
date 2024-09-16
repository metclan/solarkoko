import nodemailer from 'nodemailer';

const {NODEMAILER_EMAIL, NODEMAILER_HOST, NODEMAILER_PASSWORD, NODEMAILER_PORT  } = process.env
if(!NODEMAILER_HOST){
    throw new Error('')
}
export  const nodemailerTransporter:nodemailer.Transporter = nodemailer.createTransport({
  host: NODEMAILER_HOST, // Replace with your SMTP hos
  port: Number(NODEMAILER_PORT) ||  465, // Replace with your SMTP port
  secure: true, // Use TLS
  auth: {
    user: NODEMAILER_EMAIL,
    pass: NODEMAILER_PASSWORD // Replace with your email password or app-specific password
  }
});
   