const nodemailer = require('nodemailer');

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const sendOTPByEmail = async (email, otp, token, firstname) => {
  try {
    const verificationLink = `https://job.com/auth/verification?otp=${otp}&token=${token}`;

    const transporter = nodemailer.createTransport({ 
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASSWORD
      }

    });

    const mailOptions = {
      from: `Job ${process.env.EMAIL_USER}`, 
      to: email,
      subject: 'Account Verification OTP',
      html: `
        <html>
        <head>
          <style>
            body{
              background-color: gray;
              color: white;
            }
            .container{
              border-radius: 10px;
              background-color: gray;
              color: white;
            }
            .email-text{
              background-color: rgba(0,0,0,0.5); 
              color : gray;
              padding: 20px;
            }
            button{
              background-color: black; 
              color: white; 
              border: none; 
              padding: 10px; 
              border-radius: 10px;
            }
            p{
              color:gray
            }
            .footer{
              padding: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="email-text">
              <p>Dear ${firstname},</p>
              <p>Please click the button below to verify your email address.</p>
              <p><a href="${verificationLink}"><button>Verify Email Address</button></a></p>
              <p>If you did not create an account, no further action is required.</p>
              <p>Best Regards,<br/> Job.</p>
            </div>
            <div class="footer">&copy; Job. All rights reserved.</div>
        </div>
        </body>
        </html>
      `
    }; 

    await transporter.sendMail(mailOptions);
    console.log('OTP sent to email:', email);
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
};

module.exports = {
  generateOTP,
  sendOTPByEmail
};
