module.exports = {
	name: 'graduateyearlevel',
  aliases: 'graduate',
	description: 'Graduates all users with year level roles to next level. Admin only.',
	type: 'admin',
	cooldown: 30,

	execute(message) {

		const member = message.guild.members.cache.get();
		const data = [];

		//const firstYear = '784295741735960597';
		//const secondYear = '784295792315727933';
		//const thirdYear = '784295832559026196';
		//const fourthYear = '784296069550833685';

		let p = new Promise((resolve, reject) => {

			if (message.author.id === '300247320534974465') {
				resolve((message.guild.members.cache.forEach((member) => {

					if (member.roles.cache.get(firstYear)) {
						member.roles.remove(firstYear)
						.then(() => member.roles.add(secondYear))
						.then(() => message.channel.send('First year updated.'))
						.catch()
					}
						else if (member.roles.cache.get(secondYear)) {
						member.roles.remove(secondYear)
						.then(() => member.roles.add(thirdYear))
						.then(() => message.channel.send('Second year updated.'))
						.catch()
					}
						else if (member.roles.cache.get(thirdYear)) {
						member.roles.remove(thirdYear)
						.then(() => member.roles.add(fourthYear))
						.then(() => message.channel.send('Third years updated.'))
						.catch()

					}
			})))
			} else {
				reject(message.channel.send('You do not have permission to use this command.'))
		}
	})
	},
	};
