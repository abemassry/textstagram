var pact = require('../pact.js');

exports.main = function(req, res){
  res.render('submit', { title: 'Submit',
                        user: req.session.user
                      });
};
