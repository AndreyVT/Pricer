Template.addItem.events({
	"click [data-action='submitAddItem']" : function(e) {
		e.preventDefault() ;
		var item = {};
		item.name = $('#itemName').val();
		item.unitId = $('#itemUnit').find(":selected").val();
		//item._id = Items.insert(item);
		Session.set("addedItem", item);
		$('#recordItem').val(item.name);
		
		Session.set("item.name", false);
	}
}) ;

Template.addItem.helpers({
	itemName : function(){
		return Session.get("item.name");
	},
	units: function(){
		return Units.find().fetch();
	}
});