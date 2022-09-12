const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const commentsCtrl = require('../controllers/comments');




//Commentaires
router.get('/:id/comments',auth,  commentsCtrl.getAllComments);          
router.post('/:id/comment/',auth, commentsCtrl.newComment);        
router.delete('/comment/:id',auth, commentsCtrl.deleteComment);    

module.exports = router;