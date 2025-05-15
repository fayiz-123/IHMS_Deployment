const nodemailer = require('nodemailer')
require('dotenv').config()

async function verifygmail(username,email,otp) {
    try {
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL_COMPANY,
                pass:process.env.APP_PASS
            }
           })
            await transporter.sendMail({
            from:`"IHMS Support" <${process.env.EMAIL_COMPANY}>`,
            to:email,
            subject:"Your OTP verification Code",
            html:`<!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 20px auto;
                        background: #ffffff;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        text-align: center;
                    }
                    .header {
                        background: rgb(7, 7, 129);
                        color: white;
                        padding: 15px;
                        font-size: 22px;
                        font-weight: bold;
                        border-top-left-radius: 10px;
                        border-top-right-radius: 10px;
                    }
                    .content {
                        padding: 20px;
                        color: #333;
                        font-size: 16px;
                        line-height: 1.6;
                    }
                    .otp-code {
                        font-size: 24px;
                        font-weight: bold;
                        color: rgb(10, 15, 111);
                        background: #f0f0f0;
                        padding: 10px 15px;
                        border-radius: 5px;
                        display: inline-block;
                        margin: 10px 0;
                    }
                    .footer {
                        margin-top: 20px;
                        font-size: 14px;
                        color: #777;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">OTP Verification - IHMS</div>
                    <div class="content">
                        <p>Hi <b>${username}</b>,</p>
                        <p>Your OTP verification code for IHMS is:</p>
                        <p class="otp-code">${otp}</p>
                        <p>This code is valid for <b>5 minutes</b>. Please do not share this code with anyone.</p>
                    </div>
                    <div class="footer">
                        <p>Need help? Contact us at <a href="mailto:ihmsservice@gmail.com">ihmsservice@gmail.com</a></p>
                        <p>&copy; 2025 IHMS. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>`
          })
          return true;
    } catch (error) {
        console.log("Email not Sent SuccessFully:",error.message);
        return false;
        
    } 
  
}

module.exports=verifygmail;