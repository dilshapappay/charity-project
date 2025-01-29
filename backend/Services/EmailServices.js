const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use any email service
    auth: {
      user: 'dhilshapappay@gmail.com', // Replace with your email
      pass: 'azjs qgur ugmm cgun' // Replace with your email password
    }
  });

  const sendPasswordEmail = (to, password) => {
    const mailOptions = {
      from: 'dhilshapappay@gmail.com', // Replace with your email
      to: to,
      subject: 'Your account is created',
      text: `Your account has been created. Your password is: ${password}`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  };

  module.exports = sendPasswordEmail;