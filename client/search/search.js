Template.search.events({
    "click [data-action='search']": function (e, template) {
        e.preventDefault();
        searchTextValue = '/' + $('#searchText').val() + '/i';
        console.log("searchTextValue::", searchTextValue);
        //template.searchResults = Items.find({ "name": /searchText/i }).fetch();
        //template.searchResults.clear();
        var tmpArray;
        Meteor.call("findItemsByName", searchTextValue);
        /*, function (err, list) {
            tmpArray = list;
            console.log("tmpArray::", tmpArray.length);
            for (var i = 0; i < tmpArray.length; i++) {
                console.log("tmpArray[i]::", tmpArray[i]);
                template.searchResults.push(tmpArray[i]);
            }

            console.log("template.searchResults::", template.searchResults);
            $('#searchText').val('')
        });*///Items.find({ "name": searchTextValue }).fetch(); //Items.find({}).fetch();
        
    }
});

Template.search.helpers({
    searchItems: function () {
        //return Template.instance().searchResults.list();
        return searchResults;
    }
});

Template.search.onCreated(function () {
    this.searchText = new ReactiveVar(0);
    searchResults = new ReactiveArray([]);
});