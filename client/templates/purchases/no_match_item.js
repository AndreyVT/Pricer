Template.noMatchItem.events({
	"click [data-action='addItem']" : function(e, t){
	    e.preventDefault();
	    Session.set("item.name", $("[name='recordItem']").val());
 	}
});


