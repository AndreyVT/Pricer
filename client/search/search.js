Template.search.events({
    "click [data-action='search']": function (e, template) {
        e.preventDefault();
        var searchText = $('#searchText').val();
        console.log("searchText::", searchText);
        //template.searchResults = Items.find({ "name": /searchText/i }).fetch();
        template.searchResults.clear();
        var tmpArray = Items.find({}).fetch(); 
        console.log("tmpArray::", tmpArray.length);
        for (var i = 0; i < tmpArray.length; i++) {
            console.log("tmpArray[i]::", tmpArray[i]);
            template.searchResults.push(tmpArray[i]);
        }
        
        console.log("template.searchResults::", template.searchResults);
        $('#searchText').val('')
    }
});

Template.search.helpers({
    searchItems: function () {
        console.log("Template.instance().searchResults.list()::", Template.instance().searchResults.list());
        return Template.instance().searchResults.list();
    }
});

Template.search.onCreated(function () {
    this.searchText = new ReactiveVar(0);
    this.searchResults = new ReactiveArray([]);
    this.searchResults.thisIs = 1;
});