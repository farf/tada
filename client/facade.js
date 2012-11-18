console.log("Client");

// Define Minimongo collection to match server/publish.js
TadaFactory = new Meteor.Collection("tadas");

// Subscribe to tadas of current tadas

Template.description.tada = function() {
	var tada = TadaFactory.findOne({name: /Prem/});
	if (typeof tada != 'undefined') {
		Session.set('tada_id', tada._id);
	}
	return tada;
}

Template.items.tadas = function() {
	var _id = Session.get('tada_id');
	var tadas =  TadaFactory.find();
	console.log(tadas); 
	return tadas;
}

Template.description.events({
	'blur': function(event, template) {
		var dom = $(event.target);
		var _id = dom.parents(".tada-id").attr('id');
		var value = dom.html();
		var key = dom.attr('data-param');
		var tada = {};
		tada[key] = value;
		
		TadaFactory.update(_id, {$set: tada});
	}

});

Template.description.rendered = function() {
	CKEDITOR.inlineAll();
}