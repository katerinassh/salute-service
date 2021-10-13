const nodemailer = require('nodemailer');

async function mailer(email, link) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shakiryanova.testing@gmail.com',
      pass: 'Fullstack12',
    },
  });

  const mailData = {
    from: 'SALUTE',
    to: email,
    subject: 'Invitation to Salute',
    text: link,
  };

  transporter.sendMail(mailData, (err) => {
    if (err) {
      throw new Error(err);
    }
  });
}

module.exports = { mailer };
