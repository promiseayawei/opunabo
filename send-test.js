// send-test.js
const { sendMail } = require("./mailer");

sendMail({
  to: "ayaweisoft@gmail.com",
  subject: "Welcome to Bricores",
  html: "<h1>Hello from Bricores!</h1><p>This is a test email.</p>",
}).then(console.log).catch(console.error);
