Items = new Meteor.Collection('items');

Meteor.methods({
    findItemsByName: function (name) {
        console.log("findItemsByName::", name);
        searchResults = Items.find({"name": name }).fetch(); 
        console.log("searchResults::", searchResults);
        
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