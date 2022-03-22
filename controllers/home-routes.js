const router = require("express").Router();
const { Post, Comment, User } = require("../models");
const withAuth = require('../utils/auth');

// get all posts for homepage
router.get('/', async (req, res) => {
  try {
    
    const postData = await Post.findAll({
      include: [User],
    });
    
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('all-posts-admin', { posts, logged_in: req.session.logge_in}
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single post
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    
    const postData = await Post.findOne({
      
      where: {id: req.params.id},
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (postData) {
      
      const post = postData.get({ plain: true });
      //console.log(post);
      res.render('single-post', { post, logged_in: req.session.logge_in});
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});


module.exports = router;