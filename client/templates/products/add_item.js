Template.addItem.events({
	"click [data-action='submitAddItem']" : function(e) {
		e.preventDefault() ;
		var item = {};
		item.name = $('#itemName').val();
		item._id = Items.insert(item);
		Session.set("item.name", false);
	}
}) ;

Template.addItem.helpers({
	itemName : function(){
		return Session.get("item.name");
	}
});