const jwt = require('jsonwebtoken');

exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'supersecret', (err, decodedToken) => {
      if (err) {
        // console.log('You are not logged in.');
        // res send status 401 you are not logged in
        res.status(401).json({ message: 'You are not logged in.' });
        // res.redirect('/login');
      } else {
        console.log('henaa');
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'You are not logged in.' });
  }
};
