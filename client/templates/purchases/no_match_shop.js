Template.noMatchShop.events({
  "click [data-action='addShop']" : function(e, t){
    e.preventDefault();
    var options = {};
    $('#addShopModal').modal(options);
	//Session.set("shop.name", $("[name='shopName']").val());
 }
});
