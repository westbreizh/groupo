const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');


//Posts

router.post('/', auth,  multer, postCtrl.newPost);     
router.put('/:id', postCtrl.modifyOnePost);
router.delete('/:id', auth, postCtrl.deleteOnePost); 



router.get('/',auth, postCtrl.getAllPost);  
router.get('/user:id/posts', auth, postCtrl.getUserPosts);
router.get('/:id',auth,  postCtrl.getOnePost);       

router.put('/:id/like', auth, postCtrl.like); 
router.put('/:id/dislike', auth, postCtrl.dislike); 


module.exports = router;