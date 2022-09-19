const db = require("../database-connect");


// création d'un post. 
exports.newPost = (req, res, next) => {
    if (req.body.file) {  // si j'ai un fichier image dans la requete
        imageUrl = `${req.protocol}://${req.get("host")}/images/${req.body.file.filename}`;  // req.protocol renvoie le http ou https,  req.get ('host') => donne le host de notre serveur (ici localhost 3001 en réel racine de notre serveur) ensuite dossier images et le nom du fichi
        console.log("je suis la ! ")
        console.log(imageUrl)
    }
    else {
        imageUrl = ""; 

    }
    
    db.query(`INSERT INTO posts VALUES (NULL, '${req.body.id_user}', '${req.body.title}', CURRENT_TIMESTAMP,'${req.body.texte}', '${imageUrl}', 0, 0, "", "", '${req.body.username}')`
      , (error, result) => {
      if (error) {
          return res.status(400).json(
            "erreur au niveau du serveur, de l'enregistrement dans la bdd"
          );
      }
      return res.status(201).json({
          message: 'Votre post à été publié !'
      })

      
  });
};


// Modifier un post. 
exports.modifyOnePost = (req, res, next) => {
    console.log(req.body)
    console.log(req.params.id[1])
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
    WHERE id = ${req.params.id[1]}`, 
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
  

// supression d'un post. 
exports.deleteOnePost = (req, res, next) => {
    console.log(req.params.id[1])
  db.query(`DELETE FROM posts WHERE id = ${req.params.id[1]}`, (error, result) => {
      if (error) {
        console.log("erreure")
          return res.status(400).json({
              error
          });
      }
      return res.status(200).json({

        message: 'Votre post à été supprimer !'
    })});
};


// obtenir tous les posts. 
exports.getAllPost = (req, res, next) => {
    db.query('SELECT * FROM posts', (error, result) => {
        if (error) {
            return res.status(400).json({
                message: 'erreur lors du chargemnt des publications!'
            });
        }
        return res.status(200).json(result);
    });
  };


  // obtenir tous les posts d'un utilisateur
  exports.getUserPosts = (req, res, next) => {
    db.query(`SELECT * FROM posts WHERE id_user = ${req.params.id}`, (error, result ) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        return res.status(200).json(result);
    });
  };
    

  // obtenir un post spécifique, plus les informations du user du post pour construction de la page par la suite.
  exports.getOnePost = (req, res, next) => {
      db.query(`SELECT * FROM posts JOIN users  ON posts.id_user = users.id WHERE id = ${req.params.id}`,  // on joint les deux tables posts users (relation 1-N, 1 utilisateur n post), on filtre sur le post ciblé 
                (error, result) => {
        if (error) {
              return res.status(400).json({
                  error
              });
          }
          return res.status(200).json(result);
      });
    };


// gestion des likes.
  exports.like = (req, res, next) => {
        db.query(`UPDATE posts 
            SET likes = '4'
            WHERE id = ${req.params.id[1]}`, 
            (error, result) => {
                console.log("je viens d'enregistrer")
                if (error) {
                      return res.status(400).json({
                          error
                      });
                  }
                  return res.status(200).json(result);
              });
}
        
            
  

// gestion des dislikes.
exports.dislike = (req, res, next) => {
    console.log("je suis ici")
    let userId = (req.body.userID).toString();

    db.query(`SELECT * FROM posts  WHERE id = ${req.params.id[1]}`,   
              (error, result) => {
                let stringUsersLiked = result[0].users_liked;
                let arrayUsersLiked = stringUsersLiked.split(',')
                let stringUsersDisLiked = result[0].users_disliked;
                let arrayUsersDisLiked = stringUsersDisLiked.split(',')
                console.log(arrayUsersLiked)
                console.log(arrayUsersDisLiked)
                console.log(stringUsersDisLiked)

        if ( !(arrayUsersLiked.includes(userId)) && !(arrayUsersDisLiked.includes(userId)) ) {                        //  utilisateur dislike pour la première fois
                console.log("je suis ic")
                arrayUsersDisLiked.push(userId);
                stringUsersDisLiked = arrayUsersDisLiked.toString();
                console.log(stringUsersDisLiked)
                let dislikes = (result[0].dislikes) + 1 ; 
                console.log(dislikes)
                db.query(`UPDATE posts 
                SET dislikes = '${dislikes}', users_disliked = '${stringUsersDisLiked}'
                WHERE id = ${req.params.id[1]}`, 
                (error, result) => {
                    if (error) {
                        return res.status(400).json({
                            error
                        });
                    }
                    return res.status(200).json({
                    message: 'dislike ajouté avec succès !'
                })});
                
            }else if  ( (arrayUsersLiked.includes(userId)) && !(arrayUsersDisLiked.includes(userId)) ){                        //  utilisateur change d'avis et dislike
                
                arrayUsersDisLiked.push(userId);
                stringUsersDisLiked = arrayUsersDisLiked.toString();
                arrayUsersLiked.filter(item => item !== (userId))  ;
                stringUsersLiked = arrayUsersLiked.toString();

                let likes = (result[0].likes) - 1 ; 
                let dislikes = (result[0].dislikes) + 1 ; 
                db.query(`UPDATE posts 
                SET likes = '${likes}', users_liked = '${stringUsersLiked}' dislikes = '${dislikes}', users_disliked = '${stringUsersDisLiked}'
                WHERE id = ${req.params.id[1]}`, 
                (error, result) => {
                    if (error) {
                        return res.status(400).json({
                            error
                        });
                    }
                    return res.status(200).json({
                    message: 'ta changer d\'avis mon coco  !'
                })})};

            })
  };



     




