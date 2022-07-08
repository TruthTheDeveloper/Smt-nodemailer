const express = require('express')
const nodemailer = require('nodemailer');
const Email = require('email-templates');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors())



let transporter = nodemailer.createTransport({
    name:'mail.eyeframeng.com',
    host:'mail.eyeframeng.com',
    port:  465,

    auth: {
        user: 'myorder@eyeframeng.com',
        pass: 'Dee1dc28c0d6@' 
    },
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  


  const email = new Email({
    message: {
      from: 'myorder@eyeframeng.com'
    },

    send: true,
    transport: {
      name:'mail.eyeframeng.com',
      host:'mail.eyeframeng.com',

      port:  465,
      auth: {
          user: 'myorder@eyeframeng.com',
          pass: 'Dee1dc28c0d6@' 
      },
    },
    views: {
      options: {
        extension: 'ejs' 
      }
    },
  });




                    

  app.post('/sendmessage', (req, res) => {
    const data = (req.body);
    console.log(data)
    email
    .send({
      template: 'mars',
      message: {
        to: data.emails
      },
      locals: {
        product: data.payload.items,
        date:data.date,
        orderId:data.transactionId,
        orderInfo:data.payload,

      }
    })
    .then(console.log('sent'))
    .catch(console.error);
   
})


app.listen(PORT)