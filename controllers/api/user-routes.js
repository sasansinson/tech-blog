const router = require("express").Router();
const { User } = require("../../models");

// SIGN UP

router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
      req.session.userId = newUser.id;
      req.session.loggedIn = true;

      res.status(200).json(newUser);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// LOGIN

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

      req.session.userId = user.id;
      req.session.loggedIn = true;

      res.json({ user: user, message: 'You are now logged in!' });
   
  } catch (err) {
    res.status(400).json(err);
  }
});

// LOGOUT

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;