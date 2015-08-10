Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function() {
	this.route('purchasesList' , {path: '/'});

	this.route('addShop' , {
		path: '/shops/add'
	}) ;
}) ;

