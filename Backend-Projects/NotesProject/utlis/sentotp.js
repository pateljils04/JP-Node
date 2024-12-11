const nodemailer = require("nodemailer");
const dotenv = require("dotenv")
dotenv.config()

const sendEmail= async(email,htmltemplate)=>{
    const transporter = nodemailer.createTransport({
        service:process.env.HostService,
        auth: {
          user: process.env.HostEmail,
          pass: process.env.HostPassword,
        },
      });
      try {
        const info = await transporter.sendMail({
            from:  process.env.HostEmail, 
            to: email, 
            subject: "Verification", 
            html:htmltemplate,
          });
          console.log("otp sent successfully");
      } catch (error) {
        console.log(error)
      }
}


module.exports=sendEmail;
