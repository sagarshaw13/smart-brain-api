const handleSignIn = (req, res, db, bcrypt) => {
    // Load hash from your password DB.
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json('Incorrect form submission')
    }
    db.select('email', 'hash').from('login').where('email','=',email)
    .then(user => {
        const isValid = bcrypt.compareSync(password, user[0].hash);
        if(isValid){
            return db.select('*').from('users').where('email','=',email)
            .then(user => res.json(user[0]))
            .catch(err => res.status(400).json('Unable to login'))
        }
        else{
            res.status(400).json('Wrong Credentials')
        }
    })
    .catch(err => res.status(400).json('Wrong Credentials'))

}

module.exports = {
    handleSignIn
}