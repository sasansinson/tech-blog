const router = require("express").Router();
const { Post , User } = require("../models");
const withAuth = require("../utils/auth");

// ALL POSTS DASHBOARD
router.get('/', withAuth, async (req, res) => {
  try {

    const postData = await Post.findAll({
      where:{"userId": req.session.userId},
      include: [User]
    });
       
    const posts = postData.map((post) => post.get({ plain: true }));
     //console.log(posts);
    res.render('all-posts', {
      layout: 'dashboard',
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// AFTER CLICK ON NEW POST BUTTON
router.get('/new', withAuth, (req, res) => {
  
  res.render('new-post', {
    layout: 'dashboard',
    loggedIn: req.session.loggedIn,
  });
});

// WHEN WE CLICK ON THE POST ITSELF
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      // serializing the data
      const post = postData.get({ plain: true });
      console.log(post);
      // which view should we render if we want to edit a post?
      res.render('edit-post', {
        layout: 'dashboard',
        post,
        loggedIn: req.session.loggedIn,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;