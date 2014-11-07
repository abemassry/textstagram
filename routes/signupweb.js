var pact = require('../pact.js');

exports.main = function(req, res){
  var userName = req.param('username');
  var password = req.param('password');
  var salt = pact.bcrypt.genSaltSync(10);
  var hash = pact.bcrypt.hashSync(passwd, salt);
  res.render('signup', { title: 'Sign Up',
                        user: false
                      });
};
