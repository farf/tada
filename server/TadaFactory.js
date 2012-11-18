
TadaFactory = new Meteor.Collection("tadas");

TadaFactory.addChildren = function(parent, children) {
	parent.tadas.concat(children);
	for (var i = 0 ; i < children.length ; i++) {
		children[i].parent = parent._id;
	}
}

TadaFactory.addChild = function(parent, child) {
	this.addChildren(parent, new Array(child));
}

TadaFactory.insertTadaFromJson = function(json) {

	//remove children
	if (typeof json.tadas != "undefined") {
		var children = json.tadas;
		json.tadas = new Array;
		console.log(children.length);
	} else {
		var children = null;
		console.log(":(");
	}

	var _id = TadaFactory.insert(json);

	// Break the children
	if (children) {
		var _ids = new Array();
		
		for (var i = 0; i < children.length ; i ++) {
			
			var childId = TadaFactory.insertTadaFromJson(children[i]);
			_ids.push(childId);
			TadaFactory.update(childId, {$pushAll: {parents: [_id]}});

		}

	}
	if (_ids) console.log(_ids.length);
	TadaFactory.update(_id, {$set: {tadas: _ids}});
}