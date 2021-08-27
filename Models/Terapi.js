const mongoose = require("mongoose");

const Terapi = mongoose.Schema({
  sunucuID: String,
  uyeID: String,
  yetkiliID: String,
  baslangicTarihi: Number,
  bitisTarihi: Number
});

module.exports = mongoose.model("Terapiler", Terapi)