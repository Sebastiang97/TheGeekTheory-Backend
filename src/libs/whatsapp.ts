import { Client, LocalAuth } from "whatsapp-web.js"
// import qrcode from 'qrcode-terminal'
export const client = new Client({
  authTimeoutMs: 120000, // 2 minutos
  // puppeteer: {
  //   headless: true,
  //   args: ['--no-sandbox', '--disable-setuid-sandbox'], // útiles en servidores
  // }
  authStrategy: new LocalAuth({
    dataPath: './session-data' // Guarda la sesión aquí
  }),
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage', // CRÍTICO para entornos con memoria limitada
      '--disable-accelerated-2d-canvas',
      '--disable-gpu'
    ]
  }
})

export let QR_CODE_DATA = '';
export let IS_CLIENT_READY = false;

client.once('ready', () => {
    IS_CLIENT_READY = true
    console.log('Client is ready!');
})

// client.on('message', message => {
// 	console.log(message.body);
//     if(message.body === "Hello"){
//         client.sendMessage(message.from, "World")
//     }
// })

client.on('qr', (qr) => {
    console.log({qr})
    QR_CODE_DATA = qr
    // qrcode.generate(qr, {small: true});
})

client
.initialize()
.catch(err=>{
    console.log({err, msg: "error al inicializar whatsapp-web.js"})
})


// npx tunnelmole 3000