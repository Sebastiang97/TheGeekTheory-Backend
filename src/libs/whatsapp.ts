import { Client } from "whatsapp-web.js"
// import qrcode from 'qrcode-terminal'
export const client = new Client({});

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
    QR_CODE_DATA = qr
    // qrcode.generate(qr, {small: true});
})

client.initialize()
