const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        mail: {type: String, require: true},
        password:{type: String, require: true},
        name:{ type: String }
    },
    {timestamps: true}
    );

    const User = mongoose.model('User', userSchema);

    module.exports = User;