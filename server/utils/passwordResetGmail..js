const nodemailer = require('nodemailer')
require('dotenv').config()

async function passwordResetGmail(username,email,resetLink) {
    try {
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL_COMPANY,
                pass:process.env.APP_PASS
            }
           })
            await transporter.sendMail({
                from: `"IHMS Support" <${process.env.EMAIL_COMPANY}>`,
                to: email,
                subject: "Reset Your Password - IHMS",
                html: `<!DOCTYPE html>
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
                        .reset-button {
                            display: inline-block;
                            background: rgb(10, 15, 111);
                            color: white;
                            padding: 10px 20px;
                            margin-top: 20px;
                            text-decoration: none;
                            border-radius: 5px;
                            font-size: 16px;
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
                        <div class="header">Reset Your Password - IHMS</div>
                        <div class="content">
                            <p>Hi <b>${username}</b>,</p>
                            <p>We received a request to reset your password. Click the button below to reset it:</p>
                            <p><a class="reset-button" href="${resetLink}" target="_blank">Reset Password</a></p>
                            <p>If the button above doesn’t work, you can also click <a href="${resetLink}" target="_blank">here</a> to reset your password.</p>
                            <p><b>This link will expire in 1 hour.</b> If you didn’t request a password reset, please ignore this email.</p>
                        </div>
                        <div class="footer">
                            <p>Need help? Contact us at <a href="mailto:ihmsservice@gmail.com">ihmsservice@gmail.com</a></p>
                            <p>&copy; 2025 IHMS. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
            `,

          })
          return true;
    } catch (error) {
        console.log("Email not Sent SuccessFully",error.message);
        return false;
        
    } 
  
}

module.exports=passwordResetGmail;