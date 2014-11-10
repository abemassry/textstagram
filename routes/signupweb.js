var pact = require('../pact.js');

exports.main = function(req, res){
  var userName = req.param('username');
  var password = req.param('password');
  var salt = pact.bcrypt.genSaltSync(10);
  var hash = pact.bcrypt.hashSync(password, salt);
  var now = new Date();
  pact.models.users.findOne({user_name: userName}, function(err, doc) {
    if(err) return handleError(err);
    if (doc) {
      res.render('signup', {
        title: 'Sign Up',
        user: false,
        errMessage: 'email already registered'
      });
    } else {
      var User = pact.models.users;
      var user = new User();
      user.user_name = userName;
      user.password = hash;
      user.account_created = now;
      user.last_active = now;
      user.save(function(err) {
        if(err) {throw err;}
        req.session.logged = true;
        req.session.user = userName;
        console.log("account created");
        res.redirect('/');
      });
    }
  });

};
