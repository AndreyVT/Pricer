Items = new Meteor.Collection('items');

// вызывать если что так Meteor.call("findItemsByName", searchTextValue);
Meteor.methods({
    findItemsByName: function (name) {
        var search = new RegExp(name, 'i');
        searchResults = Items.find({ "name": search }).fetch();
    }
});

if (Meteor.isServer) {
    Meteor.methods({
        //findItemMinPrice: function (itemId) {
        //    var minRecord = Records.findOne({ "itemId": itemId }, { sort: { price: 1 }, limit: 1 }); // 
        //    var purchase = Purchases.findOne(minRecord.purchaseId);
        //    var shop = Shops.findOne(purchase.shopId);
        //    shop.price = minRecord.price;
        //    shop.date = purchase.date;
        //    return shop;
        //}, // minmax -1 - max value,  +1 - in value
        findItemPrice: function (itemId, minmax) {
            var result = {};
            var maxRecord = Records.findOne({ "itemId": itemId }, { sort: { price: minmax }, limit: 1 }); // 
            var purchase = Purchases.findOne(maxRecord.purchaseId);
            var shop = Shops.findOne(purchase.shopId);

            result.shopName = shop.shopName;
            result.price = maxRecord.price;
            result.date = purchase.date;
            
            return result;
        }
    });
}

Items.allow({
	insert: function(userId, doc) {
	// разрешить постить только если пользователь залогинен
	return !! userId;
	}
}) ;

if (Meteor.isClient){
	Meteor.subscribe("items");
}