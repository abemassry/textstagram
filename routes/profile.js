var pact = require('../pact.js');

exports.main = function(req, res){
  res.render('index', { title: 'Welcome',
                        user: req.session.user
                      });
};
