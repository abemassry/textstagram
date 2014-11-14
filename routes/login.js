var pact = require('../pact.js');

exports.main = function(req, res){
  res.render('login', { title: 'Login',
                        user: false
                      });
};
