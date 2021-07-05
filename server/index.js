const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  port: "3306",
  password: "master",
  database: "condominios",
});

app.post("/create", (req, res) => {
  const id = req.body.id
  const nome = req.body.nome;
  const cpf = req.body.cpf;
  const email = req.body.email;
  const senha = req.body.senha;
  const telefone_celular = req.body.telefone_celular;
  const telefone_fixo = req.body.telefone_fixo;
  const id_localizacao_no_condominio = req.body.id_localizacao_no_condominio;

  db.query(
    "INSERT INTO morador (id, nome, cpf, email, senha, telefone_celular, telefone_fixo, id_localizacao_no_condominio) VALUES (?,?,?,?,?,?,?,?)",
    [id, nome, cpf, email, senha, telefone_celular, telefone_fixo, id_localizacao_no_condominio],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.post("/createperdido", (req, res) => {
  const perdido_condominio_id = req.body.perdido_condominio_id
  const perdido_funcionario_id = req.body.perdido_funcionario_id;
  const perdido = req.body.perdido;

  db.query(
    "INSERT INTO achados_e_perdidos (id_condominio, id_funcionario, objeto_descricao) VALUES (?,?,?)",
    [perdido_condominio_id, perdido_funcionario_id, perdido],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.post("/createocorrencia", (req, res) => {
  const ocorrencia_condominio_id = req.body.ocorrencia_condominio_id
  const ocorrencia_morador_id = req.body.ocorrencia_morador_id;
  const categoria = req.body.categoria;
  const ocorrencia = req.body.ocorrencia;

  db.query(
    "INSERT INTO ocorrencia (id_condominio, id_morador, categoria, descricao) VALUES (?,?,?,?)",
    [ocorrencia_condominio_id, ocorrencia_morador_id, categoria, ocorrencia],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/moradores", (req, res) => {
  db.query("SELECT * FROM morador;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/perdidos", (req, res) => {
  db.query("SELECT * FROM achados_e_perdidos;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/ocorrencias", (req, res) => {
  db.query("SELECT * FROM ocorrencia;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;
  db.query(
    "UPDATE morador SET senha = ? WHERE id = ?",
    [wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM morador WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/deleteperdido/:perdido", (req, res) => {
  const perdido = req.params.perdido;
  db.query("DELETE FROM achados_e_perdidos WHERE objeto_descricao = ?", perdido, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/deleteocorrencia/:ocorrencia", (req, res) => {
  const ocorrencia = req.params.ocorrencia;
  db.query("DELETE FROM ocorrencia WHERE descricao = ?", ocorrencia, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Your server is running on port 3001");
});
