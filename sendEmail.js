
const nodemailer = require('nodemailer');

// Set up Nodemailer transporter with OAuth2
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.APP_PASSWORD,
  },
});

// Send referral email function
async function sendReferralEmail(referralData) {
  try {
    const { referrerName, referrerEmail, refereeName, refereeEmail, course } = referralData;

    const mailOptions = {
      from: referrerEmail,
      to: refereeEmail,
      subject: 'You have been referred!',
      text: `Hello ${refereeName},\n\nYou have been referred by ${referrerName} (${referrerEmail}) for the course: ${course}.\n\nBest regards,\nAccredian`,
    };

    // Send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

module.exports = {
  sendReferralEmail,
};
