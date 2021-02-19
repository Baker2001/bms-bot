module.exports = {
	name: 'server',
	description: 'Information about this server.',
	type: 'info',

	execute(message) {
		message.channel.send(`${message.guild.iconURL(32)}\n
		Server name: ${message.guild.name}\n
		Total members: ${message.guild.memberCount}`);
	},
};
