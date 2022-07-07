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
    // host: "smtp.gmail.com",
    // mail.privateemail.com
    name:'mail.eyeframeng.com',
    host:'mail.eyeframeng.com',
    port:  465,
  // true for 465, false for other ports
    auth: {
        user: 'myorder@eyeframeng.com',
        pass: 'Dee1dc28c0d6@' // generated ethereal password
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
// ${today}
// ${transactionId}
// ${initialState.subTotal}
// ${initialState.grandTotal}
// <div style='display:flex'>
//                 <div style=''>
//                         <h3>BILING INFO</h3>
//                         <p>${initialState.firstName} ${initialState.lastName}</p>
//                         <p>${initialState.address}</p>
//                         <p>${initialState.city}</p>
//                         <p>${initialState.postalCode}</p>
//                         <p>${initialState.country}</p>
//                     </div>
//                     <div style='margin-left:10rem'>
//                         <p>${initialState.firstName} ${initialState.lastName}</p>
//                         <p>${initialState.address}</p>
//                         <p>${initialState.city}</p>
//                         <p>${initialState.postalCode}</p>
//                         <p>${initialState.country}</p>
//                     </div>
//                 </div>
                    

  app.post('/sendmessage', (req, res) => {
    const data = (req.body);
    const items = req.body.items
    const newItem = []

    // console.log(items.id)
    let img = []
    items.forEach(item => {
      console.log(item.productImage, 'image')
      //  newItem.push(item.productImage)
       img.push(item.productImage)
    })
    // console.log(items)
    console.log(newItem, 'no-image')

    var mail = {
        from: 'myorder@eyeframeng.com',
        subject: data.title,
        text: data.content,
        to: data.emails,
        html: `<div style='background:white;'>
        <div style='width:40rem; background:#3730A3; margin-left:auto; margin-right:auto;'>
            <div style='background:white; padding:5rem; margin:2rem'>
            <div >
                <img style='width:15rem; height:5rem' src="https://eyeframeng.com/wp-content/uploads/2020/11/cropped-eyeframeng-logo-1-1536x460-1.png"/>
            </div>
            <h1 style='fontSize:3rem; text-align:center;'>ORDER NO. </h1>
            <p style='fontSize:1rem; text-align:center;'></p>
            <h4>ITEMS ORDERED</h4>
                <div style='border-top:1px solid grey; border-bottom:1px solid grey; fontSize:1rem; text-align:center; display:flex; justify-content:space-between;'>
                <div style='display:flex;'>
                    <div >
                        <img style='width:10rem; height:10rem' src=${img}/>
                    </div>
                    <div style='margin-top:2rem'>
                        <p>${newItem.productName}</p>
                    </div>
                </div>
                <div style='margin-top:2rem'>
                    <p>x${newItem.qty} ${newItem.productPrice}</p>
                </div>
            </div>
            <div style='display:flex;>
                <p>Discount(JUSTINCASE)</p>
                <p style='margin-left:10rem'>-$18.00</p>
            </div>
            <div style='display:flex;'>
                <p>Subtotal</p>
                <p style='margin-left:14rem'></p>
            </div>
            <div style='display:flex;'>
                <p>Royal Mail Tracked & Signed(4-9 days)</p>
                <p style='margin-left:2.8rem'>$0.00</p>
            </div>
            <div style='display:flex;'>
                <p>Total</p>
                <p style='margin-left:15.2rem'></p>
            </div>
            
            
        </div>
    </div>
</div>`

    };
    transporter.sendMail(mail, (err, data) => {
        
        if (err) {
            console.log(err)
          res.json({
            msg: 'fail'
          })
        } else {
          console.log('message suceefullly sent')
          res.json({
            msg: 'success ' + data
          })
        }
    })
})


app.listen(PORT)