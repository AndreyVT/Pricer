Template.record.helpers({
	name: function(){
		//console.log(this);
		var item = Items.findOne({_id: this.itemId});
		return item.name;
	}
});