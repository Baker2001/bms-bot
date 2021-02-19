//essential bastards - dont change or alter
const fs = require('fs');
const Discord = require('discord.js');
const {token, prefix} = require(__dirname + '/config.json');

const credit = require(__dirname + `/commands/info/botinfo.js`)

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFolders = fs.readdirSync(__dirname + '/commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(__dirname + `/commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(__dirname + `/commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

const cooldowns = new Discord.Collection();

//logs startup and sets status - can alter the status set
client.once('ready', () => {
	console.log(`-------------------------------
  Online and listening for ${prefix}
-------------------------------`)
  client.user.setActivity(`BMS lectures | ${prefix}help`, { type: 'WATCHING' });
});

//join message
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(ch => ch.name === 'new-members');
  if (!channel) return;
  // Send the message
  channel.send(`Welcome to the Monash University BioMed Discord Server!
    Population: ${member.guild.memberCount}`);
});

//reports on updates to roles
client.on('guildMemberUpdate', (oldMember, newMember) => {
	// Removed roles
	const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
	if (removedRoles.size > 0) console.log(`ROLE UPDATE: ${removedRoles.map(r => r.name)} - REMOVED - ${oldMember.displayName}.`);
	// Added roles
	const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
	if (addedRoles.size > 0) console.log(`ROLE UPDATE: ${addedRoles.map(r => r.name)} - ADDED - ${oldMember.displayName}.`);
});

//bot replying to being @ed
client.on('message', message => {
  const greeting = [`Hi ${message.author}!`,`Hello ${message.author}!`,`Nice to see you, ${message.author}!`]
  const randomGreeting = greeting[Math.floor(Math.random()*greeting.length)];
  if (message.mentions.has(client.user)) {
    message.channel.send(randomGreeting)
    .then(() => message.channel.send(`My prefix is \`${prefix}\`
Try using ${prefix}help to learn more about what I can do!`))
  }
})

client.login(token);

//changes caps to lowercase to make bot read better
client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any command names, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

//cooldown related mumbo jumbo how the hell am i supposed to know what any of this means
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
	const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

	if (now < expirationTime) {
		const timeLeft = (expirationTime - now) / 1000;
		return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
	}
}

timestamps.set(message.author.id, now);
setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

//bot getting commands
if (!client.commands.has(commandName)) return;

try {
  command.execute(message, args)
  console.log(commandName, `: ${message.author.username}, ${message.guild}`);
} catch (error) {
  console.error(error);
  message.reply("Sorry, something somewhere didn't respond like it should have. Please check the console log for more info.");
}
});

//API error reporter
process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

//kills Node process - bot dies, needs to be restarted through terminal (currently uses author id)
client.on('message', message => {
  if (message.content === '!shutdown') {
    if (message.author.id === '300247320534974465') {

      message.channel.send('Going offline.')
      .then(() => client.user.setStatus('invisible'))
      .then(() => process.exit());
  }
}
})
