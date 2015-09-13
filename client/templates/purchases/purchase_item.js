//purchaseItem
Template.purchaseItem.events({
  "click [data-action='removePurchase']" : function(e){
    e.preventDefault();
    Purchases.remove(this._id);
  },
    "click [data-action='showPurchaseRecords']" : function(e, template){
        e.preventDefault();
        template.showPurchaseRecords.set(!template.showPurchaseRecords.get());
        //Purchases.remove(this._id);
    }
});

Template.purchaseItem.helpers({
	shop: function(){
		var shop = Shops.findOne({_id:this.shopId});
		return shop;
	},
    showPurchaseRecords : function(){
        return Template.instance().showPurchaseRecords.get();
    },
    recordsItem : function()
    {//.sort({"num": 1})
        return Records.find({purchaseId: this._id},
            {sort: {num: 1}}).fetch();
    },
    purchaseSum : function(){
        return 0;
    }
});

Template.purchaseItem.onCreated(function(){
   // this.records = new ReactiveArray([]);
    this.showPurchaseRecords = new ReactiveVar(false);
});