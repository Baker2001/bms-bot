module.exports = {
	name: 'dog',
	description: 'Random dog image pulled from https://thedogapi.com.',
	type: 'fun',
  cooldown: 5,

	async execute(message) {

    const dogKey = 'API_KEY';
    const querystring = require('querystring');
    const r2 = require('r2');
    const dogURL   = "https://api.thedogapi.com/";

    try {
      var images = await loadImage(message.author.username);
      var image = images[0];
      var breed = image.breeds[0];

      message.channel.send( "***"+breed.name + "*** \r *"+breed.temperament+"*", { files: [ image.url] } );
    } catch(error)
    {
      console.log(error)
    }

    async function loadImage(sub_id){
      var headers = {
        'X-API-KEY': dogKey,
      }
      var query_params = {
        'has_breeds':true,
        'mime_types':'jpg,png',
        'size':'small',
        'sub_id': sub_id,
        'limit': 1
      }
      let queryString = querystring.stringify(query_params);


      try {
        let _url = dogURL + `v1/images/search?${queryString}`;
        var response = await r2.get(_url , {headers} ).json
      } catch (e) {
        console.log(e)
      } return response;
    }
},
};
