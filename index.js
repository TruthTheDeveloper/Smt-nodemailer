const express = require('express')
const nodemailer = require('nodemailer');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

// var mail = {
//             from: 'Henry',
//             to: 'henrysempire111@gmail.com',  //Change to email address that you want to receive messages on
//             subject: 'Pool party request',
//             text: 'Helo there wanna come to my pool?'
//         }


let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
  // true for 465, false for other ports
    auth: {
        user: 'henrysempire111@@gmail.com',
        pass: 'slntxxalnbeutspy' // generated ethereal password
    },
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

//   const main = () => {
//     transporter.sendMail(mail, (err, data) => {
        
//     })
//   }

//   async function main() {
//     // Generate test SMTP service account from ethereal.email
//     // Only needed if you don't have a real mail account for testing
//     let testAccount = await nodemailer.createTestAccount();
  
//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 587,
//       // true for 465, false for other ports
//         auth: {
//             user: 'henrysempire111@@gmail.com',
//             pass: 'slntxxalnbeutspy' // generated ethereal password
//         },
//       });
//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//         from: 'Henry',
//         to: 'henrysempire111@gmail.com',  //Change to email address that you want to receive messages on
//         subject: 'Pool party request',
//         text: 'Helo there wanna come to my pool?'
//     });
  
//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
//     // Preview only available when sending through an Ethereal account
//     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//   }
  
//   main().catch(console.error);

// const d = <div>
// <h1 style={{'color':'black', 'fontSize':'2rem'}}>You Succesfully place An Order for s;d;sd;llsd;</h1>
// </div>

  app.post('/sendmessage', (req, res) => {
    const data = (req.body);
    console.log(data)
    var mail = {
        from: 'EyeFremeng',
        subject: data.title,
        text: data.content,
        to: data.emails,
        html: data.html

    };
    transporter.sendMail(mail, (err, data) => {
        
        if (err) {
            console.log(err)
          res.json({
            msg: 'fail'
          })
        } else {
          res.json({
            msg: 'success ' + data
          })
        }
    })
})


app.listen(PORT)