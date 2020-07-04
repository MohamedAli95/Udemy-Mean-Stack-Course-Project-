const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");
const postController = require("../controllers/post");



router.post(
  "",checkAuth,
 extractFile,
postController.createPost
);


router.get("" ,postController.getPosts);
router.get("/:id" ,postController.getPost);
router.delete("/:id",checkAuth,postController.deletePost);
router.put("/:id",checkAuth,extractFile,postController.updatePost);

module.exports = router;
