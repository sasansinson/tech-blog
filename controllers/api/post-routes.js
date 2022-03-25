const router = require("express").Router();
const { Post } = require("../../models/");
const withAuth = require("../../utils/auth");

//CREATE POST
router.post('/', withAuth, async (req, res) => {
 
  try {
    const newPost = await Post.create({ ...req.body,
      userId: req.session.userId });
     
      res.status(200).json(newPost);
      } catch (err) {
       res.status(500).json(err);
  }
});

// UPDATE POST
router.put('/:id', withAuth, async (req, res) => {
  try {
    //console.log('here is the req.body', req.body);
    const affectedPost = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!affectedPost) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    } 
    res.status(200).json(affectedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE POST
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        userId: req.session.userId
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    } 
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;