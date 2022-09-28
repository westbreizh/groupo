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


  // obtenir un user via l'id 
  exports.getOneUser = (req, res, next) => {
    let userId = req.params.id
    userId= userId.substring(1)
    db.query(`SELECT * FROM users   WHERE id = ${userId}`, 
              (error, result) => {
      if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(
            result);
    });
  };


// Modifier un post. 
exports.modifyOnePost = (req, res, next) => {
    let postId = req.params.id
    postId= postId.substring(1)
    console.log(postId)
    if (req.body.file) {  // si j'ai un fichier image dans la requete
        imageUrl = `${req.protocol}://${req.get("host")}/images/${req.body.file.filename}`;  // req.protocol renvoie le http ou https,  req.get ('host') => donne le host de notre serveur (ici localhost 3001 en réel racine de notre serveur) ensuite dossier images et le nom du fichi
        console.log("je suis la ! ")
        console.log(imageUrl)
    }
    else {
        imageUrl = req.body.imageUrl; 
        console.log("je suis ici")
    }

    db.query(`UPDATE posts 
    SET titre = '${req.body.title}', texte = '${req.body.texte}', image_url = '${imageUrl}' 
    WHERE id = ${postId}`, 
    (error, result) => {
        console.log("juste après avoir enregistrer")

        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json({
        message: 'Votre post à été modifié !'
    })});
    };
  



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