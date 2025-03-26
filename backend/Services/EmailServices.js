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

  const sendOrderEmail = (to, RequirementName, LocationAddress) => {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: to,
        subject: 'Order Approved',
        text: `Your order for "${RequirementName}" at "${LocationAddress}" has been approved successfully.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending order email:', error);
        } else {
            console.log('Order email sent: ' + info.response);
        }
    });
};

const sentRejectOrderEmail = (to, RequirementName, LocationAddress) => {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: to,
        subject: 'Order Rejected',
        text: `Your order for "${RequirementName}" at "${LocationAddress}" has been rejected.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending reject order email:', error);
        } else {
            console.log('Reject order email sent: ' + info.response);
        }
    });
};

const markAsReceivedEmail =(to, RequirementName, LocationAddress) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: to,
    subject: 'Order Received',
    text: `Your order for "${RequirementName}" at "${LocationAddress}" has been received.`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending mark as received email:', error);
    } else {
      console.log('Mark as received email sent: ' + info.response);
    }
  });

}

module.exports = { sendPasswordEmail, sendOrderEmail, sentRejectOrderEmail, markAsReceivedEmail };