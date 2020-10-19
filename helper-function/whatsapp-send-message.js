var accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console

const client = require('twilio')(accountSid, authToken, {
	lazyLoading: true,
});

//function to send message to whatsapp
const sendMessage = async (message, senderID) => {
	try {
		await client.messages.create({
			to: senderID,
			body: message,
			from: `whatsapp:+${process.env.PHONE}`,
		});
	} catch (error) {
		console.log(`Error at send message --> ${error}`);
	}
};

module.exports = { sendMessage };
