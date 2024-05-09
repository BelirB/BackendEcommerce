import nodemailer from 'nodemailer';
import configObject from '../../envs.js';
import __dirname from '../dirname.js';
import Handlebars from 'handlebars';
import fs from 'fs';

const transport = nodemailer.createTransport({
  service: 'gmail', 
  port: 587,        
  auth: {
    user: configObject.gmail_user_app,
    pass: configObject.gmail_pass_app
  },
  tls: {
      rejectUnauthorized: false
  }
})
  
export const sendMail = async ( to, subject, bodyhtml) => {
  return await transport.sendMail({
    from: 'Blasco Bruno <brunoblasco403@gmail.com>',
    to,
    subject,
    html: bodyhtml
  })
}

export const generateHtml = (options, layout = '') => {
  
  const template = Handlebars.compile(fs.readFileSync(__dirname+`/libraries/mail/sendMailUtil/${layout}.hbs`, 'utf-8'))
    
  const html = template(options);

  return html
};

export const sendEmailwithLayout = async (option, subject, layout) => {
  try {
    const to       = option.user.email
    const bodyhtml = generateHtml(option, layout)

    await sendMail(to, subject, bodyhtml)

    return "E-mail send"
  } catch (error) {
    throw Error("Error sending email: " + error)
  }
}

export default sendEmailwithLayout;