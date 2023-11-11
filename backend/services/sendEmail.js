const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "kseniya-pin@meta.ua",
    pass: "Me25101981ta",
  },
});

async function sendEmail({userName, userEmail, userMessage}) {
	const output = `
		<h1 style="color: green">Ви отримали листа від ${userName}</h1>
		<h2>Email для зв'язку: ${userEmail}</h2>
		<p style="color: blue">Текст повідомлення: ${userMessage}</p>
	`
  const info = await transporter.sendMail({
    from: 'kseniya-pin@meta.ua', // sender address
    to: 'yuriystaynov@gmail.com', // list of receivers
    subject: "Лист для директора. Скарга на ментора", // Subject line
    text: userMessage,
		html: output

  });

	console.log("Message sent: %s", info.messageId);
	return true;

}

module.exports = sendEmail;
