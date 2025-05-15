const nodemailer = require('nodemailer');
require('dotenv').config();

async function serviceConfirmationMail(email, serviceName, username, bookingId, bookingDate, status) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_COMPANY,
                pass: process.env.APP_PASS
            }
        });

        await transporter.sendMail({
            from: `"IHMS Support" <${process.env.EMAIL_COMPANY}>`,
            to: email,
            subject: `Service Update - ${serviceName} [${status}]`,
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
                background: ${status === 'Confirmed' ? 'green' : 'orange'};
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
            .details {
                background: #f9f9f9;
                padding: 15px;
                border-radius: 8px;
                margin-top: 15px;
                text-align: left;
                display: inline-block;
            }
            .button {
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
            <div class="header">Service ${status} - ${serviceName} ${status === 'Confirmed' ? '✅' : '🛠'}</div>
            <div class="content">
                <p>Dear ${username},</p>
                <p>Your service request has been <strong>${status}</strong> by our team.</p>
                <div class="details">
                    <p><strong>Service:</strong> ${serviceName}</p>
                    <p><strong>Booking ID:</strong> ${bookingId}</p>
                    <p><strong>Updated Date & Time:</strong> ${bookingDate}</p>
                </div>
                <p>We appreciate your patience and will ensure a smooth service experience.</p>
                <p>If you have any questions, feel free to reach out to our support team.</p>
                <a href="mailto:ihmsservice@gmail.com" class="button">Contact Support</a>
            </div>
            <div class="footer">
                <p>Thank you for choosing IHMS!</p>
                <p>&copy; 2025 IHMS. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>`
        });

        return true;
    } catch (error) {
        console.log("Service confirmation email not sent successfully", error.message);
        return false;
    }
}

module.exports = serviceConfirmationMail;
