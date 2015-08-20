Template.noMatchShop.events({
  "click [data-action='addShop']" : function(e, t){
    e.preventDefault();
	Session.set("shop.name", $("[name='shopName']").val());
 }});


