const conexao = require("../config/database");
var { Schema, model } = require("mongoose");

var ProdutoSchema = conexao.Schema({
  nome: { type: "String" },
  descricao: { type: "String" },
  valor: { type: "String" },
  frete: { type: "String" },
  estoque: { type: "Number" },
  imgproduto: { type: "String" },
  imgName: { type: "String" },
  empresa: { type: conexao.Schema.Types.ObjectId },
});

module.exports = conexao.model("Produto", ProdutoSchema);
