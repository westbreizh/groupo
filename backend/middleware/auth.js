// verfication de l'identité via le token le jeton venant du frontend, qui une fois décodé renvoit l'id de l'utilisateur que l'on compare à celui de la base de donnée

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];      //on extrait le token du header "autorization" et on prend la partie située apres l'espace
    const decodedToken = jwt.verify(token, `${process.env.Token_Secret_Key}`);
    const id_user = decodedToken.userId;
    if (req.body.id_user && req.body.id_user !== id_user) {    //si la demande contient un id, on le compare à celui extrait du token
      throw 'Mauvais ID utilisateur';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('authorisation non!')
    });
  }
};