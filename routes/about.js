var pact = require('../pact.js');

exports.main = function(req, res){
  res.render('index', { title: 'About',
                        user: req.session.user
                      });
};
