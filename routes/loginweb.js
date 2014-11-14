var pact = require('../pact.js');

exports.main = function(req, res){
  if (req.user) {
    res.redirect('/');
  } else {
    var userName = req.param('username');
    var password = req.param('password');
    var now = new Date();
    pact.models.users.findOne({user_name: userName}, function(err, doc) {
      if(err) return handleError(err);
      if (doc) {
        var hash = doc.password;
        if (pact.bcrypt.compareSync(password, hash)) {
          doc.last_active = now;
          doc.save(function(err) {
            if(err) { throw err; }
          });
          req.session.logged = true;
          req.session.user = userName;
          res.redirect('/');
        } else {
          res.render('login', {
            title: 'Login',
            user: false,
            errMessage: 'Username or Password Incorrect'
          });
        }
      } else {
        res.render('login', {
          title: 'Login',
          user: false,
          errMessage: 'Username or Password Incorrect'
        });
      }
    });
  }

};
