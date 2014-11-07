module.exports = function(mongoose) {
  var collection = 'users';
  var Schema = mongoose.Schema;
  var ObjectId = Schema.ObjectId;

  var Followers = new Schema({
    follow_id: Objectd,
    timestamp: Date,
    user_name: String
  });
  exports.Followers = mongoose.model('Followers', Followers);

  var schema = new Schema({
    uid: ObjectId,
    user_name: String,
    email: String,
    photo: String,
    account_created: Date,
    last_active: Date,
    followers: [Followers]
  });

  return mongoose.model(collection, schema);
};
