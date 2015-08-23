Shops = new Mongo.Collection('shops');

Shops.allow({
	insert: function(userId, doc) {
	// разрешить постить только если пользователь залогинен
	return !! userId;
	}
});

if (Meteor.isClient){
	Meteor.subscribe("shops");
}
