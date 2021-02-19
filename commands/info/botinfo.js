module.exports = {
	name: 'botinfo',
	description: 'Information about myself and all the people who helped contribute.',
	type: 'info',
  cooldown: 5,

	execute(message) {
		message.channel.send(`\`\`\`Created on 4th of December, 2020
\`\`\`\`\`\`diff
-  Coding: Abu Bakr @Baker#8842  -
\`\`\`\`\`\`css
[  Testing & help command: Q  ]
\`\`\`\`\`\`json
"  Profile Art: Kim @kimchin#0608  "
\`\`\`\`\`\`  Special thanks to: The members of The Quiet Forest Discord server
\`\`\`\`\`\`fix
For technical support or questions related to the code, please contact Abu Bakr through Discord or Messenger
\`\`\``);
	},
};
