Template.searchItem.helpers({
    minPrice: function () {
        return Template.instance().minPriceValue.get();
        //return Session.get("miPrice" + this._id) || "Loading...";
    },
    maxPrice: function () {
        return Template.instance().maxPriceValue.get();
    }
});

if(Meteor.isClient){
    Template.searchItem.onCreated(function () {
        //this.records = new ReactiveArray([]);
        this.minPriceValue = new ReactiveVar({});
        this.maxPriceValue = new ReactiveVar({});
        self = this;

        Meteor.call('findItemPrice', this.data._id, 1, function (error, result) {
            self.minPriceValue.set(result);
        });

        Meteor.call('findItemPrice', this.data._id, -1, function (error, result) {
            self.maxPriceValue.set(result);
        });
    });
}