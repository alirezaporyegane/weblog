const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

const transporterDetails = smtpTransport({
  host: 'alirezaporyegane@yahoo.com',
  port: 465,
  secure: true,
  auth: {
    user: 'alirezaporyegane@yahoo.com',
    pass: '13771377@$good',
  },
  tls: {
    rejectUnauthorized: false,
  },
})

const sendMail = (email, subject, message) => {
  const transporter = nodemailer.createTransport(transporterDetails)
  transporter.sendMail({
    from: 'alirezaporyegane@yahoo.com',
    to: email,
    subject: subject,
    html: `
      <h1>${email}</h1>
      <p>${message}</p>
    `,
  })
}

module.exports = { sendMail }
