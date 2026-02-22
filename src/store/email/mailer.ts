import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587, // Puerto recomendado para STARTTLS
    secure: false, // false porque usamos el 587, STARTTLS lo hará seguro después
    requireTLS: true, // Forzar el uso de TLS
    auth: {
      user: process.env.MAILER_USERNAME,
      pass: process.env.MAILER_PASSWORD,
    },
    tls: {
        // No rechazar certificados autofirmados (Gmail no tiene, pero a veces ayuda)
        rejectUnauthorized: true, // Mantener en 'true' en producción para seguridad
        minVersion: "TLSv1.2"
    },
    // Aumentar timeouts
    connectionTimeout: 60000, // 60 segundos
    greetingTimeout: 30000,   // 30 segundos
    socketTimeout: 60000,      // 60 segundos
    debug: true, // Activa logs detallados (quitar en producción si no se necesita)
    logger: true // Para ver logs en la consola
  });

  transporter.verify().then(()=>{
    console.log("Ready for send emails")
  }).catch(error=>{
    console.log({error})
  })
