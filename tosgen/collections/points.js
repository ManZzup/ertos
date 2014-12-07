Points = new Meteor.Collection('points');


Meteor.methods({
	insertPoint: function(pid,point){		
		if(!Points.findOne({ id:pid })){
			return Points.insert(point);
		}
	}
});

