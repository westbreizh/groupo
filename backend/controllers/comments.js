const db = require("../database-connect");


//créer un nouveau commentaire. 
exports.newComment = (req, res, next) => {
    let postId = req.params.id
    postId= postId.substring(1)
    db.query(`INSERT INTO comments VALUES (NULL, '${req.body.id_user}', '${req.body.texte}', '${postId}', CURRENT_TIMESTAMP,'${req.body.username}')`,  // req.params.id renvoit le paramètre id contenu dans l'url entant que tellle c'est l'id du post au final ...
    (error, result ) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(201).json({
            message: 'commentaire enregistré ras !'
        })
    });
  };
  

  //supprimer un commentaire. 
  exports.deleteComment = (req, res, next) => {
    let postId = req.params.id
    postId= postId.substring(1)
      db.query(`DELETE FROM comments WHERE comments.id = ${postId}`, (error, result) => {
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
    let postId = req.params.id
    postId= postId.substring(1)
    db.query(`SELECT users.id, users.username, comments.id,comments.texte, comments.id_user FROM users INNER JOIN comments ON users.id = comments.id_user WHERE comments.id_post = ${postId} `,
        (error, result, field) => {
            if (error) {
                return res.status(400).json({
                    error
                });
            }
            return res.status(200).json(result);
        });
  };
  