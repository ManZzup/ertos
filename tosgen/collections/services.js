Services = new Meteor.Collection('services');


Meteor.methods({
	insertService: function(name,service){	
		if(!Services.findOne({ site:name })){
			return Services.insert(service);
		}	
	}
});

