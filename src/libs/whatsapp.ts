import { Client } from "whatsapp-web.js"
import qrcode from 'qrcode-terminal'
export const client = new Client({});

client.once('ready', () => {
    console.log('Client is ready!');
})

// client.on('message', message => {
// 	console.log(message.body);
//     if(message.body === "Hello"){
//         client.sendMessage(message.from, "World")
//     }
// })

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
})

client.initialize()
