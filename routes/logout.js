var pact = require('../pact.js');

exports.main = function(req, res){
  req.session.logged = false;
  req.session.user = '';
  req.session.user_id = '';
  res.redirect('/');
};
