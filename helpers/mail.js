const nodemailer = require("nodemailer");
const moment = require("moment");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nodetest4342",
    pass: "tucandzsgzzgqxdd",
  },
});

// notice
async function sendMailNotice(toEmail, item) {
  // send mail with defined transport object
  try {
    let info = await transporter.sendMail({
      from: '"Test College" <nodetest4342@gmail.com>', // sender address
      to: toEmail, // list of receivers
      subject: `Announcement Alert`, // Subject line
      html: `
          <div
            class="container"
            style="max-width: 90%; margin: auto; padding-top: 20px"
          >
            <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${item.type}</h1>
            <p style="margin-top:50px; text-align:center;">${item.description}</p>
          </div>
        `,
    });
    console.log(`Email sent to ${toEmail}: ${info.response}`);
    return info;
    //   console.log("Message sent: %s", info.messageId);
    //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log("Mail Error: %s", error);
  }
}

// calender
async function sendMailCalender(toEmail, item) {
  // send mail with defined transport object
  try {
    let info = await transporter.sendMail({
      from: '"Test College" <nodetest4342@gmail.com>', // sender address
      to: toEmail, // list of receivers
      subject: `Calender Alert`, // Subject line
      html: `
          <div
            class="container"
            style="max-width: 90%; margin: auto; padding-top: 20px"
          >
            <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">New Event !</h1>
            <p style="margin-top:50px; text-align:center;">${item.title}</p>
            <p style="margin-top:30px; text-align:center;">Starts on ${moment(
              item.start
            ).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
          </div>
        `,
    });
    console.log(`Email sent to ${toEmail}: ${info.response}`);
    return info;
    //   console.log("Message sent: %s", info.messageId);
    //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log("Mail Error: %s", error);
  }
}

module.exports = { sendMailNotice, sendMailCalender };
