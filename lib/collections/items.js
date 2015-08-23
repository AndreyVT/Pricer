Items = new Meteor.Collection('items');

Items.allow({
	insert: function(userId, doc) {
	// разрешить постить только если пользователь залогинен
	return !! userId;
	}
}) ;

if (Meteor.isClient){
	Meteor.subscribe("items");
}