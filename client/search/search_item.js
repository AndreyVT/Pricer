Template.searchItem.helpers({
    minPrice: function () {
        return Template.instance().minPriceValue.get();
        //return Session.get("miPrice" + this._id) || "Loading...";
    },
    maxPrice: function () {
        return Template.instance().maxPriceValue.get();
    },
    value1: function () {
        return Template.instance().value1.get();
    }
});

if(Meteor.isClient){
    Template.searchItem.onCreated(function () {
        this.minPriceValue = new ReactiveVar({});
        this.maxPriceValue = new ReactiveVar({});
        this.value1 = new ReactiveVar();
        self = this;

        Meteor.call('findItemPrice', this.data._id, 1, function (error, result) {
            console.log("Min value:", result);
            self.minPriceValue.set(result);
            self.value1.set(result.price);
        });

        Meteor.call('findItemPrice', this.data._id, -1, function (error, result) {
            console.log("Max value:", result);
            self.maxPriceValue.set(result);
        });
    });
}