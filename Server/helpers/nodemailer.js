const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bryanowen.code@gmail.com",
    pass: "ffgh vbqb afvo urb",
  },
});

let mailOptions = {
  from: "bryanowen.code@gmail.com",
  to: "christianbryanowen@gmail.com",
  subject: "Welcome to SoulCalm",
  text: "Being mindful just gets easier",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
