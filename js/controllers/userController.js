var Userdb = require('../models/models');

// criar e salvar usuário
exports.create = (req, res) => {
  //validar a requisição
  if (!req.body) {
    res.status(400).send({ message: 'Conteúdo não pode estar vazio' });
    return;
  }
  //criando usuário
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  //salvando no BD
  user
    .save(user)
    .then((data) => {
      //res.send(data);
      res.redirect('/add-user');
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || 'Deu merda ao salvar o usuário' });
    });
};

//recuperar usuário único ou todos
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: 'Usuário não encontrado' });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: 'Deu ruim' });
      });
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: err.message || 'usuário não encontrado.' });
      });
  }
};

//alterar usuário pelo ID
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: 'Conteúdo não pode estar vazio' });
  }
  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .send({ message: `Não foi possível atualizar usuário ${id}.` });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: 'Erro ao salvar alterações' });
    });
};

//deletar usuário pelo ID
exports.delete = (req, res) => {
  const id = req.params.id;
  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: 'Usuário não encontrado' });
      } else {
        res.send({ message: 'Usuário deletado' });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: 'Nao foi possível deletar o usuário' });
    });
};
