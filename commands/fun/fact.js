module.exports = {
	name: 'fact',
	description: 'A random fact that you have almost definitely never heard before ~~that may or may not be true~~!',
	type: 'fun',
	cooldown: 0,

	execute(message) {

    const factMessages = [
      "The mitochondria is the powerhouse of the cell.",
      "I'm not actually a human. I'm just *very* well coded to act *very* human-like.",
      "Drinking something that has a 'Not fit for human consumption' sticker is probably a bad idea.",
      "In biomedicine, you may learn about cells.",
      "Cells are small.",
      "The Golgi Complex was named after Pierre Golgi, who also invented the gram stain.",
      "Half of the responses I'm coded to say aren't very useful and are probably also untrue.",
      "Sheep actually have three more brain wrinkles than goats.",
      "This isn't a fact. I just wanted to say hi :slight_smile:",
      "During my development, I was nicknamed 'Bakr's Sheep' and had a profile picture with one of his actual sheep.",
      "Biology is the study of life.",
      "This command only requires 5 lines of code to run.",
      "People that study biology are referred to as biologists.",
      "The common cold is a type of virus.",
      "One of the many symptoms of cancer is the rapid growth of body parts, such as the hands. Often times, these may grow bigger than the patient's face.",
      "Administering Viagra to a man taking angina medication can potentially be fatal.",
      "Dupuytren's disease, a connective tissue disease, is also called 'Viking disease' due to its higher prevalence amongst people of Nordic descent.",
      "In addition to intense pain and possible medical complications, the bite of a Brazilian wandering spider can deliver a long, painful erection to human males, lasting up to four hours.",
      "Vancomycin is named after its inventor's ex-wife, whose name was Vancomy.",
      "Early signs of dementia usually includes forgetting what day it is.",
      "One of the coronary arteries is called The 'LAD'.",
      "The heart can develop extra muscle to pump more blood in response to disease.",
      "On average, a person will swallow 8 spiders while asleep every year.",
      "The sternal angle is also called the 'angle of Louis', though nobody actually knows who 'Louis' is.",
      "According to all known laws of aviation, there is no way that a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyways.",
      "Hippopotomonstrosesquippedaliophobia is the fear of long words.",
      "The Emu War was originally a pay negotiation between European Australians and Emus turned violent due to the violation of the treaty of 1902.",
      "Binary code is for losers. I use only the best programming language; Javascript.",
      "01001110 01100101 01110110 01100101 01110010 00100000 01100111 01101111 01101110 01101110 01100001 00100000 01100111 01101001 01110110 01100101 00100000 01111001 01101111 01110101 00100000 01110101 01110000 00101100 00100000 01101110 01100101 01110110 01100101 01110010 00100000 01100111 01101111 01101110 01101110 01100001 00100000 01101100 01100101 01110100 00100000 01111001 01101111 01110101 00100000 01100100 01101111 01110111 01101110 00101110",
      "I am a Nigerian prince, and I have recently discovered that you are my last remaining relative. I would like to come to America to share my fortune with you, but the airport will not accept my currency, so I need your bank account information to come and see you. Please share it here and I will be with you soon. Na gode my friend.",
    ]

    const randomResponse = factMessages[Math.floor(Math.random() * factMessages.length)];

    message.channel.send('**Did you know?**')

    .then(() => message.channel.send(randomResponse))

	},
};
