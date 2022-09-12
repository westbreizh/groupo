const db = require("../database-connect");


//créer un nouveau commentaire. 
exports.newComment = (req, res, next) => {
    db.query(`INSERT INTO comments VALUES (NULL, '${req.body.id_user}', '${req.body.texte}', '${req.params.id}')`,  // req.params.id renvoit le paramètre id contenu dans l'url entant que tellle c'est l'id du post au final ...
    (error, result ) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result);
    });
  };
  

  //supprimer un commentaire. 
  exports.deleteComment = (req, res, next) => {
      db.query(`DELETE FROM comments WHERE comments.id = ${req.params.id}`, (error, result) => {
          if (error) {
              return res.status(400).json({
                  error
              });
          }
          return res.status(200).json(result);
      });
    };
  
  
  // obtenir les commentaires d'un post ou d'un utilisateur
  exports.getAllComments = (req, res, next) => {
    db.query(`SELECT users.id, users.username, comments.id,comments.texte, comments.id_user FROM users INNER JOIN comments ON users.id = comments.id_user WHERE comments.id_post = ${req.params.id} `,
        (error, result, field) => {
            if (error) {
                return res.status(400).json({
                    error
                });
            }
            return res.status(200).json(result);
        });
  };
  