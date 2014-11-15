var pact = require('../pact.js');

exports.main = function(req, res){
  res.render('profile', { title: 'Welcome',
                        user: req.session.user
                      });
};
