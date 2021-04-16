const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'b9913bce4244440db7e6d79cd15f8cd8' 
   });

const hangleImageApi = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(err => res.json('Unable to detect the face'))
}


const handleImage = (req, res, db) => {
    const {id} = req.body;

    
        db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            if(entries.length){
                res.json(entries[0])
            }
            else{
                res.json('user id fault')
            }
        })
        .catch(err => res.json('Error'))
    
   
}

module.exports = {
    handleImage,
    hangleImageApi
}