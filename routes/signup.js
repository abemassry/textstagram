var pact = require('../pact.js');

exports.main = function(req, res){
  res.render('signup', { title: 'Sign Up',
                        user: false
                      });
};
