/**
 Métodos Http:

 GET: Buscar uma informação do back-end
 POST: Criar uma informação no back-end
 PUT: Alterar uma informação no back-end
 DELETE: Apagar uma informação do back-end
 */

 /**
  * Tipos de parâmetros:
  * 
  * Query params: Parâmetros nomeados enviado na rota após "?"(filtros, paginação)
  * Route params: Parâmetros utilizados para identificar recursos
  * Request body: Corpo da requisição, utilizado para criar ou alterar recursos
  */


const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(3333);
