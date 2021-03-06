Template.addItem.events({
	"click [data-action='submitAddItem']" : function(e, template) {
		e.preventDefault() ;
		var item = {};
		item.name = $('#itemName').val();
		item.unitId = $('#itemUnit').find(":selected").val();
		item._id = Items.insert(item);
		Session.set("addedItem", item);
		$('#recordItem').val(item.name);
		var unit = Units.findOne($('#itemUnit').find(":selected").val());
		$('#countValueLabel').text(unit.name);

		Session.set("item.name", false);
		template.view.parentView._templateInstance.lastAddedItem.set(item);

		$('#addItemModal').modal('hide');
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