import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.MAILER_USERNAME,
      pass: process.env.MAILER_PASSWORD,
    //   pass: "vucsxmlbjohxmqel",
    },
  });

  transporter.verify().then(()=>{
    console.log("Ready for send emails")
  }).catch(error=>{
    console.log({error})
  })
