console.log("Client");

// Define Minimongo collection to match server/publish.js
TadaFactory = new Meteor.Collection("tadas");

// If no tada selected, select one.
Meteor.startup(function () {
  Meteor.autorun(function () {
	console.log("previous session tada-id: " + Session.get('tada-id'));
    if (! Session.get("tada-id")) {
      	var tada = TadaFactory.findOne({ $or : [
			{ parents: { $exists : false }}, {parents: {$size:0}}
		]});
      	if (tada) {
      		Session.set("tada-id", tada._id);
      	}
    	console.log(tada);
    } else {
    	console.log("session tada-id: " + Session.get('tada-id'));
    }
  });
});
var summaryEvents = {
	'blur': function(event, template) {
		var dom = $(event.target);
		var _id = dom.parents(".tada-id").attr('id');
		var value = dom.html();
		var key = dom.attr('data-param');
		var tada = {};
		tada[key] = value;
		
		TadaFactory.update(_id, {$set: tada});
	}
};

Template.name.tada = function() {
	var _id = Session.get('tada-id');
	var tada = TadaFactory.findOne({_id: _id}, {name:1});
	return tada;
};
Template.text.tada = function() {
	var _id = Session.get('tada-id');
	var tada = TadaFactory.findOne({_id: _id}, {text:1});
	return tada;
}
Template.tada.tada = function() {
	var _id = Session.get('tada-id');
	var tada = TadaFactory.findOne({_id: _id}, {_id:1});
	return tada;
}

Template.name.events(summaryEvents);
Template.text.events(summaryEvents);

Template.items.tadas = function() {
	var _id = Session.get('tada-id');
	var tadas =  TadaFactory.find({parents: _id}, {name:1, _id:1});
	return tadas.fetch();
}

Template.text.rendered = function() {
	CKEDITOR.inline("text");
}
Template.name.rendered = function() {
	CKEDITOR.inline("name");
} 

Template.parents.tadas = function() {
	var _id = Session.get('tada-id');
	var tadas =  TadaFactory.find({tadas: _id}, {name:1, _id:1});
	return tadas.fetch();
}

var openEvents = {
	'click': function(event, template) {
		var dom = $(event.target);
		if (dom.attr('id')) {
			var _id = dom.attr('id');
		} else {
			var _id = dom.parents(".tada-id").attr('id');
		}
		console.log('put tada-id:'+_id);
		Session.set('tada-id', _id);
	}
};
Template.parent.events = openEvents;
Template.item.events = openEvents;