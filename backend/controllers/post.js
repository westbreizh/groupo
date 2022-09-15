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
    
    db.query(`INSERT INTO posts VALUES (NULL, '${req.body.id_user}', '${req.body.title}', CURRENT_TIMESTAMP,'${req.body.texte}', '${imageUrl}', 0, 0, "", "")`
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
    let userId = (req.body.userID).toString();
    console.log(userId)
    console.log(typeof(userId))
    db.query(`SELECT * FROM posts  WHERE id = ${req.params.id[1]}`,   
              (error, result) => {
                console.log(result)
                let stringUsersLiked = result[0].users_liked;
                console.log(stringUsersLiked)
                let arrayUsersLiked = stringUsersLiked.split(',')
                console.log(arrayUsersLiked)

        if ( !(arrayUsersLiked.includes(userId))){                        //  utilisateur like pour la première fois
                stringUsersLiked = arrayUsersLiked.push(userId);
                console.log(arrayUsersLiked)
                stringUsersLiked = arrayUsersLiked.toString();
                console.log(stringUsersLiked)
                let likes = (result[0].likes) + 1 ; 
                db.query(`UPDATE posts 
                SET likes = '${likes}', users_liked = '${stringUsersLiked}'
                WHERE id = ${req.params.id[1]}`, 
                (error, result) => {
                    if (error) {
                        return res.status(400).json({
                            error
                        });
                    }
                    return res.status(200).json({
                    message: 'like ajouté avec succès !'
                })});
            }else {
                console.log("hello")
                return res.status(200).json({
                    message: 'you can not like twice !'})
            }              
    });
  };
  

  // gestion des dislikes.
  exports.dislike = (req, res, next) => {
    let dislikeOrChange = req.body.dislike;
    let userId = req.body.userId;
    db.query(`SELECT * FROM posts  WHERE id = ${req.params.id[1]}`,   
              (error, result) => {
                let stringUsersDisliked = result.users_disliked;
                let arrayUsersDisliked = stringUsersDisliked.split(',')

        if ( dislikeOrChange == 1 && !(arrayUsersDisliked.includes(userId))){                        //  utilisateur dislike pour la première fois
                stringUsersDisliked = arrayUsersDisliked.push(userId).toString();
                let dislike = result.dislikes + 1 ; 
                db.query(`UPDATE posts SET like = '${dislike}', users_disliked = '${stringUsersDisliked}' WHERE id = ${req.params.id}`, 
                (error, result) => {
                    if (error) {
                        return res.status(400).json({
                            error
                        });
                    }
                    return res.status(200).json({
                    message: 'dislike ajouté avec succès !'
                })});
            }             
        else if ( dislikeOrChange == 0 && (arrayUsersDisliked.includes(userId))){                        //  utilisateur change d'avis enlève son dislike
            let index = arrayUsersDisliked.indexOf(userId);
            stringUsersDisliked = arrayUsersdisliked.splice(index, 1).toString();
            let dislike = result.likes - 1 ; 
            db.query(`UPDATE posts SET like = '${dislike}', users_disliked = '${stringUsersDisliked}' WHERE id = ${req.params.id}`, 
            (error, result) => {
                if (error) {
                    return res.status(400).json({
                        error
                    });
                }
                return res.status(200).json({
                message: 'like retiré avec succès !'
            })});
        }             
        
    });
  };


     




