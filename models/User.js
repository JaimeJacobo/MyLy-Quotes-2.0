


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
username: String,
password: String,
quotebooks: [{type: Schema.Types.ObjectId, ref:'Quotebook'}]}, {timestamps: true})

module.exports = mongoose.model('User', userSchema);