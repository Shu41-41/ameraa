const mongoose = require('mongoose');

const Member = mongoose.Schema({
    guildID: String,
    userID: String,
    afk: Object,
    history: Array,
    yetkili: Map,
});

module.exports = mongoose.model('Members', Member);
