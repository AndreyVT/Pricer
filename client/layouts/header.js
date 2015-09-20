Template.header.helpers({
	isLogged : function(){
		return Meteor.user();
	},
	isAdmin: function(){
		return true;
	}
});
