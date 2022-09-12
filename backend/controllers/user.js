const bcryptjs = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const db = require("../database-connect");
const dotenv = require("dotenv");   // charge les variables d'environnement du fichier .env dans process.env
dotenv.config();



// fonction de creation d'un compte avec email et password crypté que l'on enregistre dans la base de donnée groupomania de Mysql
exports.signup = (req, res, next) => {
    db.query(`SELECT * FROM users WHERE email='${req.body.email}'`, (err, results) => {
        if (results.length > 0) {                           // email deja utilisé
            return res.status(401).json({message: 'Email non disponible l\'ami ! '});
         } else {                                           // email disponible
            bcryptjs.hash(req.body.password, 10)
            .then(cryptedPassword => {
                db.query(`INSERT INTO users VALUES (NULL, '${req.body.userName}', '${req.body.email}', '${cryptedPassword}', NULL)`,(err, results) => {
                    if (err) {
                        console.log("erreur avec la base de donnée")
                        return res.status(400).json({message :"une erreur avec le serveur s'est produite!"});
                    } else {
                       return res.status(201).json({ message: 'Votre compte a bien été crée !'})};
                })
            })}
        if (err) {
            return res.status(500).json({message :"une erreur avec le serveur s'est produite!"});
        }  
    })
}


//Connexion, login
exports.login = (req, res, next) => {
  db.query(`SELECT * FROM users WHERE email='${req.body.email}'`,
      (err, result) => {
          if (result.length > 0) {          // email trouvé
              bcryptjs.compare(req.body.password, result[0].password) //
                  .then(valid => {
                      if (!valid) {         // mot de passe non valide
                          res.status(401).json({
                              message: 'Mot de passe incorrect.'
                          });
                      } else {          // mot de passe ok
                          res.status(200).json({
                              id: result[0].id,
                              username: result[0].username,
                              email: result[0].email,
                              is_admin: result[0].is_admin,
                              token: jwt.sign(
                                  {userId: result[0].id},
                                  `${process.env.Token_Secret_Key}`, 
                                  { expiresIn: '24h' }
                            )
                          });
                      }
                  });
          } else {          //email non trouvé
              res.status(404).json({
                  message: 'Utilisateur inconnu.'
            })}
        if (err) {
        return res.status(500).json({message :"une erreur avec le serveur s'est produite!"});
        }  
      }
)}


// suprresion utilisateur de la DB
exports.deleteUser = (req, res, next) => {
  db.query(`DELETE FROM users WHERE id = ${req.params.id}`, 
  (error, result) => {
      if (error) {
          return res.status(400).json({
              error
          });
      }
      return res.status(200).json(result);
  });
};