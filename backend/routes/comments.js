const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const commentsCtrl = require('../controllers/comments');


//Commentaires

 
router.post('/:id', auth, commentsCtrl.newComment);    
router.get('/:id', auth,  commentsCtrl.getAllComments);    
router.delete('/:id',auth, commentsCtrl.deleteOneComment);    

module.exports = router;