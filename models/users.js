module.exports = function(mongoose) {
  var collection = 'users';
  var Schema = mongoose.Schema;
  var ObjectId = Schema.ObjectId;

  var Following = new Schema({
    follow_id: Objectd,
    timestamp: Date,
    user

  var schema = new Schema({
    uid: ObjectId,
    name: String,
    email: String,
    photo: String,
    account_created: Date,
    last_active: Date
  });

  return mongoose.model(collection, schema);
};
