const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./server/database/connection');

const app = express();

dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 8080;

//Log request
app.use(morgan('tiny'));

//conexão com BD
connectDB();

//parse request para o body bodyParser
app.use(express.urlencoded({ extended: true }));

//setando a engine EJS engine
app.set('view engine', 'ejs');
//app.set("views", path.resolve(__dirname,"views"))

//carregando Assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));

// carregar rotas
app.use('/', require('./server/routes/routes'));

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
