Router.map(function(){	
	this.route('view', {
		path: '/view',
		data: function(){
		      		//dummy data
		      		/*
		      		tmpData = { 
		      				site:'facebook',
		      				total:2,
		      			  	points:[
		      			  	       	    {
		      			  	       	   	"id": "E58aPtzP3jk",
		      			  	       		"title": "This service tracks you on other websites",
		      			  	       		"score": 60,
		      			  	       		"icon":"https://cdn3.iconfinder.com/data/icons/musthave/256/Check.png"
				
		      			  	       	    },
		      			  	       	    {
		      			  	       	   	"id": "VTlWfubfib4",
		      			  	       		"title": "You can give comments before changes",
		      			  	       		"score": 10,
		      			  	       		"icon":"https://cdn3.iconfinder.com/data/icons/musthave/256/Check.png"
				
		      			  	       	    }
		      			  	       ],
		      			  	callback:this.params.query.callback
		      			  		
		      			  };	     		
				return tmpData;
				*/
				return Session.get('doc');
		      }		
	});
	this.route('home', {path: '/'});
	this.route('getTos',{
		path: '/generate',
		action: function(){
			var n = this.params.query.n;
			
			var params = this.params.query;
			
			Meteor.http.get("https://tosdr.org/api/1/service/" + n + ".json", function (error, result) {
				if(error) {
				    console.log('http get FAILED!');
				} else {
				    console.log('http get SUCCES');
				    if (result.statusCode === 200) {
					
					var res = JSON.parse(result.content);
					
					var doc = {};
					doc.links = res.links;
					
					var points = [];
					res.points.forEach(function(o,i){
						points[i] = {};
						points[i].id = res.pointsData[o].id;
						points[i].title = res.pointsData[o].title;
						points[i].score = res.pointsData[o].score;
						points[i].icon = "";
					});		
					
					doc.points = points;
					doc.total = res.points.length;
					doc.site = n;
					
					Session.set('doc',doc);
					
					Router.go('view',{},{query:"callback="+params.callback});
				    }
				}
			});
			
			
		}
	});
});
