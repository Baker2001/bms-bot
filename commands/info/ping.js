module.exports = {
	name: 'ping',
	description: 'Shows roundtrip latency of the bot.',
	type: 'info',
	cooldown: 5,

	execute(message) {
		message.channel.send('Pong.')
		.then(message.channel.send('Pinging...')
		.then(sent => {
    sent.edit(`Roundtrip latency: ${sent.createdTimestamp - message.createdTimestamp}ms`);
	})
)
},
};
