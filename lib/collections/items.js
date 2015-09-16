Items = new Meteor.Collection('items');

// вызывать если что так Meteor.call("findItemsByName", searchTextValue);
Meteor.methods({
    findItemsByName: function (name) {
        var search = new RegExp(name, 'i');
        searchResults = Items.find({ "name": search }).fetch();
    },
    findItemMinPrice: function (itemId) {
        Session.set("miPrice" + this._id, "Some data");
    }
});

Items.allow({
	insert: function(userId, doc) {
	// разрешить постить только если пользователь залогинен
	return !! userId;
	}
}) ;

if (Meteor.isClient){
	Meteor.subscribe("items");
}