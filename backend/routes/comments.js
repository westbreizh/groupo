const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const commentsCtrl = require('../controllers/comments');




//Commentaires


router.post('/:id', commentsCtrl.newComment);    
router.get(':id/', commentsCtrl.getAllComments);    
router.delete(':id',auth, commentsCtrl.deleteComment);    

module.exports = router;