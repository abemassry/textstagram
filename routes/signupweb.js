var pact = require('../pact.js');

exports.main = function(req, res){
  email = req.params['email'];
  password = req.params['password'];
  res.render('signup', { title: 'Sign Up',
                        user: false
                      });
};
