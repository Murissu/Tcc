const conexao = require("mongoose");

const uri = "mongodb+srv://mauricio:Tcc123456@tcc.s8tbozh.mongodb.net/";
conexao.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = conexao;
