console.log("Client");

// Define Minimongo collection to match server/publish.js
Tadas = new Meteor.Collection("tadas");

// Id of the current tadas
Session.set('tada_id', null);

// Subscribe to tadas of current tadas

Template.description.tada = function() {
	var tada_id = Session.get('tada_id');
	var tada = Tadas.findOne();
	console.log(tada);
	return tada;
}
$(document).ready(function() {
   
 });