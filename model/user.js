const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcryptjs = require('bcrypt');

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true, select: false},
    created: {type: Date, default: Date.now}
});

UserSchema.pre('save', function(next) {
    let user = this;
    if (!user.isModified('password')) return next();
    bcryptjs.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcryptjs.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});
console.log('User.js');
module.exports = mongoose.model('User', UserSchema);