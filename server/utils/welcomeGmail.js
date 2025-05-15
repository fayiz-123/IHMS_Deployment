const nodemailer = require('nodemailer')
require('dotenv').config()

async function welcomeMail(email,username) {
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
                subject: "Welcome To Integrated Home Mangement System",
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
            background:rgb(7, 7, 129);
            color: white;
            padding: 15px;
            font-size: 20px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }
        .content {
            padding: 20px;
            color: #333;
            font-size: 16px;
            line-height: 1.6;
        }
        .button {
            display: inline-block;
            background:rgb(10, 15, 111);
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
        <div class="header">Welcome to IHMS, ${username}! 🎉</div>
        <div class="content">
            <p>We’re excited to have you on board! IHMS (Integrated Home Management System) makes managing home services seamless and hassle-free.</p>
            <p>With IHMS, you can:</p>
            <ul style="text-align: left; display: inline-block;">
                <li>Book home services like plumbing, electricity, and waste management.</li>
                <li>Track service progress in real time.</li>
                <li>Manage your bookings from a user-friendly dashboard.</li>
                <li>Receive timely updates and notifications.</li>
            </ul>
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
        console.log("Email not Sent SuccessFully",error.message);
        return false;
        
    } 
  
}

module.exports=welcomeMail;