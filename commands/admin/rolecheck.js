module.exports = {
	name: 'rolecheck',
	description: 'Sends role strings through console. Admin only.',
	type: 'admin',
	cooldown: 5,

	execute(message) {
		if (message.member.roles.cache.find(role => role.name === 'Admin')) {
		console.log(message.guild.roles);
		message.channel.send(`A list of the server's current roles has been sent through the console, ${message.author}!`);
	} else (message.channel.send("You do not have permission to use this command."))
	},
};
