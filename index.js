const dgram = require('dgram');
const Twit = require('twit');

const client = dgram.createSocket('udp4');
const host = '192.168.1.2';
const port = 8888;

const sendText = text => {
	const message = new Buffer(text, 'binary');
	client.send(message, 0, message.length, port, host);
};
sendText('#20');

const T = new Twit({
	consumer_key: '1B5KBUELhN2NY1zuDs0xxyO8p',
	consumer_secret: 'y6XMwwVVTC3CUaZAEYm1DZWa3FF3XVnKNRXLWlvEA0aEFAeWyn',
	access_token: '102975831-kkWNaQCJQanJy1AfwkIuQKLxhpRa5xVt5NsjDxz9',
	access_token_secret: 'n4st20pZYkrmIs97v5hVjJur6iuOVPS7eevWFOtjUvz0D',
});

const stream = T.stream('statuses/filter', { track: '#pow' });
stream.on('tweet', tweet => {
	console.log(tweet.text);
	sendText(tweet.text.split('#').join('') || ' ');
});
