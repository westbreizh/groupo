const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');


//Posts

router.post('/',  multer, postCtrl.newPost);     
router.put('/:id', postCtrl.modifyOnePost);
router.delete('/:id',  postCtrl.deleteOnePost); 



router.get('/', postCtrl.getAllPost);  
router.get('/user:id/posts', auth, postCtrl.getUserPosts);
router.get('/:id',auth,  postCtrl.getOnePost);       

router.post('/:id/like', postCtrl.like); 
router.post('/:id/dislike', postCtrl.dislike); 


module.exports = router;