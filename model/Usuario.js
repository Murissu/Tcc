const conexao = require("../config/database");
var {Schema, model} = require("mongoose")

var UsuarioSchema = conexao.Schema({
  nome:      { type: 'String' },
  cnpj:      { type: 'Number' },
  email:     { type: 'String' },
  senha:     { type: 'String' },
  ramo:      { type: 'String' },
  telefone:  { type: 'Number' },
  produtos: [conexao.Schema.Types.ObjectId],
});

module.exports = conexao.model("Usuario", UsuarioSchema);


