


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quotebookSchema = new Schema({
name: String,
quotes: [{type: Schema.Types.ObjectId, ref:'Quote'}]}, {timestamps: true})

module.exports = mongoose.model('Quotebook', quotebookSchema);