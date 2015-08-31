// единицы измерения

Units = new Meteor.Collection("units");

if (Meteor.isClient){
	Meteor.subscribe("units");
}