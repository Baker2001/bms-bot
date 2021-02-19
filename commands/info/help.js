//require modules + files
const fs = require ('fs');
const Discord = require ('discord.js');
const config = require (__dirname + '/../../config.json');
const commands = new Discord.Collection();
const commandFolders = fs.readdirSync(__dirname + '/../../commands');
let successVar = 0;

//module
module.exports = {
	name: 'help',
	description: 'Lists all bot commands.',
	type: 'info',
  usage: '<module>',

	execute(message, args) {

    //base helpEmbed
    const helpEmbed = new Discord.MessageEmbed()
      .setColor('#27c32d')
			.attachFiles([__dirname + '/../../images/botBaseImage.png'])
      .setAuthor('BMS Bot', 'attachment://botBaseImage.png')
      .setThumbnail('attachment://botBaseImage.png')
			.setFooter(`Type \`${config.prefix}help [command name]\` to get info on a specific command!`)

    //if no further arguments, then list modules
		if (args.length == '0') {
			for (const folder of commandFolders) {
				helpEmbed.setTitle('Modules')
        helpEmbed.addField(`${folder}`, '`'+`${config.prefix}help ${folder}`+'`', false);
			}
			message.channel.send({ embed: helpEmbed });

		} else {

			//try to search for module
			try {
				const searchDir = fs.readdirSync(__dirname + `/../../commands/${args}`).filter(file => file.endsWith('.js'));

				if (searchDir) {
					for (const file of searchDir) {
						const command = require(__dirname + `/../../commands/${args}/${file}`);
						commands.set(command.name, command.description, command);

						//setting command info for the embed
						if (command.name) {var fieldName = `${command.name}`}
							else {var fieldName = "This command does not have a name."}
						if (command.description) {var fieldDescription = `${command.description}`}
							else {var fieldDescription = "This command does not have a description."}

						//spitting out the embed
						helpEmbed.addField(fieldName, fieldDescription, false);
					}

					var fieldTitle = (`${args} Commands`)
					helpEmbed.setTitle(fieldTitle.charAt(0).toUpperCase() + fieldTitle.slice(1))
					successVar += 1;

				}

				//try to search for specific command
			} catch {
				for (const folder of commandFolders) {
					const commandFiles = fs.readdirSync(__dirname + `/../../commands/${folder}`).filter(file => file.endsWith('.js'));

					for (const file of commandFiles) {
						const command = require(__dirname + `/../../commands/${folder}/${file}`);
						commands.set(command.name, command.description, command.aliases, command.usage, command.cooldown);

						//setting fields for embed
						if (command.name == args) {
							successVar += 1;
							if (command.name) {var fieldName = `${command.name}`}
								else {var fieldName = "[Unnamed]"}
							if (command.description) {var fieldDescription = `${command.description}`}
								else {var fieldDescription = "[No description available]"}
							if (command.aliases) {var fieldAliases = `${command.aliases}`}
								else {var fieldAliases = "[No aliases]"}
							if (command.usage) {var fieldUsage = `${command.usage}`}
								else {var fieldUsage = "[No usage]"}
							if (command.cooldown) {var fieldCooldown = `${command.cooldown}`}
								else {var fieldCooldown = "[No cooldown]"}

							helpEmbed.setTitle(fieldName);
							helpEmbed.addFields(
								{ name: 'Description', value: fieldDescription, inline: false },
								{ name: '\u200b', value: '\u200b', inline: false },
								{ name: 'Aliases', value: fieldAliases, inline: true },
								{ name: 'Usage', value: fieldUsage, inline: true },
								{ name: 'Cooldown', value: fieldCooldown, inline: true },
							);

							break;

							//else show no results
						} else {}
					}
				}
			}

			if (successVar < 1) {
				helpEmbed.addField('\u200b', `Sorry, no results could be found for "${args}".`, false)
				message.channel.send({ embed: helpEmbed });
			} else {successVar = 0; message.channel.send({ embed: helpEmbed })}
		}
	},
};
