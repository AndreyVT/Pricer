Template.noMatchItem.events({
	"click [data-action='addItem']" : function(e, t){
	    e.preventDefault();
	    var options = {};
	    $('#addItemModal').modal(options);
	    Session.set("item.name", $("[name='recordItem']").val());
 	}
});


