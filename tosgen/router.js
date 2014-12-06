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
			//dummy icon set
			var icons = {
					"HUL_4wIbNGY":true,
					"PD5ZWzgv2RI":true,
					"QZgR8faRWDU":true,
					"yCSzdR_gOW4":true
				    };
			
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
					var links = [];
					
					
					for(var key in res.links){
						links.push({
							   	name:res.links[key].name,
							   	url:res.links[key].url
							   });
					}
					
					doc.links = links;
					
					var points = [];
					res.points.forEach(function(o,i){
						points[i] = {};
						points[i].index = i;
						points[i].id = res.pointsData[o].id;
						points[i].title = res.pointsData[o].title;
						points[i].score = res.pointsData[o].tosdr.point;
						
						if(icons[points[i].id]){
							points[i].icon = "/img/" + points[i].id + ".png";	
						}else{
							points[i].icon = "/img/neut.png";
												
							if(points[i].score == 'good'){
								points[i].icon = "/img/good.png";
							}else if(points[i].score == 'bad'){
								points[i].icon = "/img/bad.png";
							}else if(points[i].score == 'neutral'){
								points[i].icon = "/img/info.png";
							}						
						}
						
						
						
					});		
					
					
					doc.points = points;
					doc.total = res.points.length;
					doc.site = n;
					doc.voice = params.voiceMode ? params.voiceMode : 1;
					
					Session.set('doc',doc);
					
					Router.go('view',{},{query:"callback="+params.callback});
				    }
				}
			});
			
			
		}
	});
});
