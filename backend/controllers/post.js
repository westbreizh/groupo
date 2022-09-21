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
    
    db.query(`INSERT INTO posts VALUES (NULL, '${req.body.id_user}', '${req.body.title}', CURRENT_TIMESTAMP,'${req.body.texte}', '${imageUrl}', 0, 0, "0", "0", '${req.body.username}')`
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
  

// supression d'un post. 
exports.deleteOnePost = (req, res, next) => {
    let postId = req.params.id
    postId= postId.substring(1)
  db.query(`DELETE FROM posts WHERE id = ${postId}`, (error, result) => {
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

   let userId = (req.body.userId).toString();
   let postId = req.params.id
   postId= postId.substring(1)

    db.query(`SELECT * FROM posts  WHERE id = ${postId}`,   
    (error, result) => {
      let post = result[0]
      let usersLiked = post.users_liked;
      let arrayUsersLiked = usersLiked.split(',')
      let usersDisLiked = post.users_disliked;
      let arrayUsersDisLiked = usersDisLiked.split(',')
      let likes = post.likes
      let dislikes = post.dislikes
      let cond1 = !arrayUsersLiked.includes(userId)
      let cond2 = !arrayUsersDisLiked.includes(userId)

        if (cond1 && cond2) {                    // utilisateur like pour la première fois
            likes +=1
            arrayUsersLiked.push(userId);
            usersLiked = arrayUsersLiked.toString();
            db.query(`UPDATE posts 
                SET likes = '${likes}', users_liked = '${usersLiked}'
                WHERE id = ${postId}`, 
                (error, result) => {
                    console.log("je viens d'enregistrer en un like")
                    if (error) {
                        return res.status(400).json({
                            error
                        });
                    }
                    return res.status(200).json({
                        message: 'like ajouté !'
                    });
                });
        }

        if (cond1 && !cond2) {                   // utilisateur like alors qu' il avait déjà disliker
            likes +=1
            dislikes -=1 
            arrayUsersLiked.push(userId);
            usersLiked = arrayUsersLiked.toString();
            let index = arrayUsersDisLiked.indexOf(userId)
            arrayUsersDisLiked.splice(index, 1)
            usersDisLiked = arrayUsersDisLiked.toString();

            db.query(`UPDATE posts 
                SET likes = '${likes}',  users_liked = '${usersLiked}', dislikes= '${dislikes}', users_disliked = '${usersDisLiked}'
                WHERE id = ${postId}`, 
                (error, result) => {
                    console.log("je viens d'enregistrer en deux like")
                    if (error) {
                        return res.status(400).json({
                            error
                        });
                    }
                    return res.status(200).json({
                        message: 'like ajouté et dislike supprimé !'

                    });
                });
        }
    })}
  

  
// gestion des dislikes.

exports.dislike = (req, res, next) => {            
   let userId = (req.body.userId).toString();
   let postId = req.params.id
   postId= postId.substring(1)
    db.query(`SELECT * FROM posts  WHERE id = ${postId}`,   
    (error, result) => {
      let post = result[0]
      let usersLiked = post.users_liked;
      let arrayUsersLiked = usersLiked.split(',')
      let usersDisLiked = post.users_disliked;
      let arrayUsersDisLiked = usersDisLiked.split(',')
      let likes = post.likes
      let dislikes = post.dislikes
      let cond1 = !arrayUsersLiked.includes(userId)
      let cond2 = !arrayUsersDisLiked.includes(userId)

        if (cond1 && cond2) {                // utilisateur dislike pour la première fois
            dislikes +=1
            arrayUsersDisLiked.push(userId);
            usersDisLiked = arrayUsersDisLiked.toString();
            db.query(`UPDATE posts 
                SET dislikes = '${dislikes}', users_disliked = '${usersDisLiked}'
                WHERE id = ${postId}`, 
                (error, result) => {
                    console.log("je viens d'enregistrer en un dislike")
                    if (error) {
                        return res.status(400).json({
                            error
                        });
                    }
                    return res.status(200).json({
                        message: 'dislike ajouté !'

                    });
                });
        }
        if (!cond1 && cond2) {          // utilisateur dislike alors qu'il avait liker auparavant
            likes -=1
            dislikes +=1 
            arrayUsersDisLiked.push(userId);
            usersDisLiked = arrayUsersDisLiked.toString()
            let index = arrayUsersLiked.indexOf(userId)
            arrayUsersLiked.splice(index, 1)
            usersLiked = arrayUsersLiked.toString()
          
            db.query(`UPDATE posts 
                SET likes = '${likes}',  users_liked = '${usersLiked}', dislikes= '${dislikes}', users_disliked = '${usersDisLiked}'
                WHERE id = ${postId}`, 
                (error, result) => {
                    console.log("je viens d'enregistrer en deux dislike")
                    if (error) {
                        return res.status(400).json({
                            error
                        });
                    }
                    return res.status(200).json({
                        message: 'dislike ajouté et like supprimé !'

                    });
                });
        }
    })}
  

