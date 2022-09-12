

const express = require('express'); 
const path = require('path');         
const helmet = require('helmet');    
const rateLimit = require("./middleware/rate-limit"); 

const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const commentsRoutes = require('./routes/comments');






// Création de l'application express
const app = express();

// Middleware Header pour contourner les erreurs en débloquant certains systèmes de sécurité CORS, afin que tout le monde puisse faire des requetes depuis son navigateur
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }

  next();
});



app.use(express.urlencoded({extended: true})); //middleware qui analyse, intercepte, les requêtes string ou array et met les données analysées dans req.body.
app.use(express.json()); //middleware qui analyse, intercepte, les requêtes JSON entrantes et met les données analysées dans req.body.
app.use(helmet());  // utilisation du module 'helmet' pour la sécurité en protégeant les entetes d'ou le nom casque ...
app.use(rateLimit); //limitation du nombre de requetes, prevention d'attaque par force brute
app.use('/images', express.static(path.join(__dirname, 'images')));     // Middleware permettant de charger les fichiers qui sont dans le repertoire images, on ne connaitra pas l'emplacement de notre ressource image donc on passe par le module path .... _dirname coorespond à l'endroit ou l'on se trouve et on joint jusqu'au dossier image pour avoir le chemin ...

// après avoir intercepter les requetes, appliquer différents middleware de sécurité et de configuartion à l'ensemble des situations, on aiguille celle-ci vers fichier voulu pour suite de traitement
app.use('/api/posts', postRoutes); // intercepte requête avec le début du nom de la route et ensuite dirige vers le routeur
app.use('/api/user', userRoutes); 
app.use('/api/comments', commentsRoutes); 



module.exports = app;