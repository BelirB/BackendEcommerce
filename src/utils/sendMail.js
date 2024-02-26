// const nodemailer = require('nodemailer')
// const { configObject } = require('../config/config')

// const transport = nodemailer.createTransport({
//     service: 'gmail',
//     port: 587,
//     auth: {
//         user: configObject.gmail_user_app,
//         pass: configObject.gmail_code_app
//     }
// })

// exports.sendMail = async () => {
//     return await transport.sendMail({
//         from: 'Este mail lo envia <capu.blasco12@hotmail.com.ar>',
//         to: 'capu.blasco12@hotmail.com.ar',
//         subject: 'Mail de prueba',
//         html: `<div>
//                     <h1>Mail de prueba</h1>
//                 </div>`
//     })
// }