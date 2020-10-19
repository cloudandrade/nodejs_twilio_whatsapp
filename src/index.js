const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8000;
let message;
//msg sender function
const WA = require('../helper-function/whatsapp-send-message');

app.get('/', (req, res) => {
	res.send('Messaging now');
});

app.post('/whatsapp', async (req, res) => {
	//quando alguem envia mensagem para nosso bot ele irá responder dessa forma
	console.log(req.body);

	message =
		'Olá, esta é uma mensagem automática, caso tenha dúvidas entre em contato com o administrador do serviço.';
	let senderID = req.body.From; //pessoa que enviou a mensagem
	let clientReq = req.body.Body; // o que o cliente enviou de mensagem para seu bot

	console.log('cliente entrou em contato com bot, e disse: ' + clientReq);
	//função para enviar a resposta devolta para o que mandou mensagem
	await WA.sendMessage(message, senderID);
	res.status(200).send('please, dont resend a message! this is a auto message!');
});

app.post('/whatsapp/send', async (req, res) => {
	let destinatarioNumero = req.body.numero;
	let verifica = destinatarioNumero.substr(0, 1);
	let codArea = req.body.codArea;

	/* if (verifica == 9 && destinatarioNumero.length > 8) {
		destinatarioNumero = destinatarioNumero.split('9');
		destinatarioNumero = destinatarioNumero[1];
	} */

	/* 	if (destinatarioNumero.length > 8) {
		console.log('numero mal formatado');
		res.status(400).send('numero mal formatado');
	} */

	message = req.body.mensagem;
	destinatarioNumero = `whatsapp:+55${codArea}${destinatarioNumero}`;
	await WA.sendMessage(message, destinatarioNumero);
	console.log('mensagem enviada para o numero =' + destinatarioNumero);
	res.status(200).send('mensagem enviada ao destinatário');
});

app.listen(PORT, () => {
	console.log(`server running at PORT ${PORT}`);
});
