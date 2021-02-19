module.exports = {
	name: 'cat',
	description: 'Random cat image pulled from https://thecatapi.com.',
	type: 'fun',
  cooldown: 5,

	async execute(message) {

    const catKey = 'API_KEY';
    const querystring = require('querystring');
    const r2 = require('r2');
    const catURL   = "https://api.thecatapi.com/";

    try {
      var images = await loadImage(message.author.username);
      var image = images[0];

      message.channel.send({ files: [ image.url] } );
    } catch(error)
    {
      console.log(error)
    }

    async function loadImage(sub_id){
      var headers = {
        'X-API-KEY': catKey,
      }
      var query_params = {
        'mime_types':'jpg,png',
        'size':'small',
        'sub_id': sub_id,
        'limit': 1
      }
      let queryString = querystring.stringify(query_params);


      try {
        let _url = catURL + `v1/images/search?${queryString}`;
        var response = await r2.get(_url , {headers} ).json
      } catch (e) {
        console.log(e)
      } return response;
    }
},
};
