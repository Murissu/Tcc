var express = require("express");
const Usuario = require("./model/Usuario");
const Produto = require("./model/Produto");
var app = express();
var path = require("path");
const multer = require("multer");

// Configurar o armazenamento dos arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Definir o diretório de destino dos arquivos
    cb(null, path.join(__dirname, "public", "fotos"));
  },
  filename: function (req, file, cb) {
    // Definir o nome do arquivo
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Criar o middleware do multer
const upload = multer({ storage: storage });

app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname + "/public")));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.render("index.ejs", {});
});

app.get("/carrinho", function (req, res) {
  res.render("carrinho.ejs", {});
});

app.get("/login", function (req, res) {
  Produto.find({}).then(function (docs) {
    res.render("login.ejs", { Produtos: docs });
  });
});

app.get("/registrar", function (req, res) {
  Produto.find({}).then(function (docs) {
    res.render("registrar.ejs", { Produtos: docs });
  });
});

app.get("/produto", function (req, res) {
  Produto.find({}).then(function (docs) {
    res.render("produto.ejs", { Produtos: docs });
  });
});

app.get("/jogos", function (req, res) {
  Produto.find({}).then(function (docs) {
    res.render("jogos.ejs", { Produtos: docs });
  });
});

app.get("/editar/:id", function (req, res) {
  Produto.findById(req.params.id).then(function (docs) {
    res.render("editar.ejs", { Produto: docs });
  });
});

app.post("/", function (req, res) {
  var usuario = new Usuario({
    nome: req.body.nome,
    cnpj: req.body.cnpj,
    email: req.body.email,
    senha: req.body.senha,
    ramo: req.body.ramo,
    telefone: req.body.telefone,
  });

  usuario.save(function (err, docs) {
    if (err) {
      res.send("Deu o seguinte erro ao salvar a empresa: " + err);
    } else {
      res.redirect("/produto");
    }
  });
});

app.post("/produto", upload.single("imgproduto"), function (req, res) {
  console.log(req.file, "dalhe");
  var produto = new Produto({
    nome: req.body.nome,
    descricao: req.body.descricao,
    valor: req.body.valor,
    frete: req.body.frete,
    estoque: req.body.estoque,
    imgproduto: req.file.path,
    imgName: req.file.filename,
  });

  produto.save(function (err, docs) {
    if (err) {
      res.send("Deu o seguinte erro ao cadastrar o produto: " + err);
    } else {
      res.redirect("/produtos");
    }
  });
});

app.post("/editar/:id", function (req, res) {
  Produto.findByIdAndUpdate(
    req.params.id,
    {
      nome: req.body.nome,
      descricao: req.body.descricao,
      valor: req.body.valor,
      frete: req.body.frete,
      estoque: req.body.estoque,
    },
    function (err, docs) {
      if (err) {
        res.send("Aconteceu o seguinte erro: " + err);
      } else {
        res.redirect("/produto");
      }
    }
  );
});

app.get("/deletar/:id", function (req, res) {
  Produto.findByIdAndDelete(req.params.id, function (err, docs) {
    if (err) {
      res.send("Aconteceu o seguinte erro: " + err);
    } else {
      res.redirect("/produto");
    }
  });
});

app.get("/empresa", function (req, res) {
  Usuario.find({}).then(function (docs) {
    res.render("empresa.ejs", { Usuarios: docs });
  });
});

app.get("/produtos", function (req, res) {
  Produto.find({}).then(function (docs) {
    res.render("list.ejs", { Produtos: docs });
  });
});

app.listen("3000", function () {
  console.log("Conexão iniciada com sucesso!");
});
