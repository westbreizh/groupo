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
  
  // obtenir tous les commentaires d'un post
  exports.getAllComments = (req, res, next) => {

    let postId = req.params.id
    postId= postId.substring(1)
    db.query(`SELECT * FROM comments WHERE id_post = ${postId}`, (error, result) => {
        if (error) {
            return res.status(400).json({
                message: 'erreur lors du chargemnt des publications!'
            });
        }
        return res.status(200).json(result);
    });
  };






  //supprimer un commentaire. 
  exports.deleteOneComment = (req, res, next) => {
    let postId = req.params.id
    postId= postId.substring(1)
      db.query(`DELETE FROM comments WHERE id = ${postId}`, (error, result) => {
          if (error) {
              return res.status(400).json({
                  error
              });
          }
          return res.status(200).json({

            message: 'Votre comment à été supprimer !'
          });
        })  
    };
  

  

