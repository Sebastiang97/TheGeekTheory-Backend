import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    host: "mail.smtp2go.com", // Host de SMTP2GO
    port: 2525, // <--- PUERTO MÁGICO QUE FUNCIONA EN FREE TIER
    secure: false, // El puerto 2525 usa STARTTLS, no SSL directo
    requireTLS: true, // Forzar la conexión segura
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
