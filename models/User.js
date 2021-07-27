const mongoose = require('mongoose')
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt')
const UserSchema = new Schema({
    username: {
        type: String,
        required:  [true, 'Rentrez SVP un nom d’utilisateur'],
        unique: true
    }, password: {
        type: String,
        required: [true,'SVP rentrez un mot de passe']
    }
});
UserSchema.plugin(uniqueValidator);

// export model
UserSchema.pre('save', function (next) {
    const user = this
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash
        next()
    })
})
const User = mongoose.model('User', UserSchema);
module.exports = User
