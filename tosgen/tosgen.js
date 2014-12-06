if (Meteor.isClient) {
   
  Template.view.helpers({
  	point : function(){
  		var page = Session.get('pg');
  		Session.set('voiceVerify',false);
  		Session.set('voiceMode',this.voice);
  		if(!page){
  			page = 1;	
  			Session.set('pg',page);
  			Session.set('total',this.total);
  		}
  		var point = this.points[page-1];
  		return point;  		
  	},
  	currentPoint : function(){
  		return Session.get('pg');
  	},
  	totalPoints : function(){
  		return this.total;
  	},
  	hasBackButton : function(){
  		return Session.get('pg') > 1;
  	},
  	hasNextButton : function(){
  		if(this.voice == 2){
  			if(!Session.get('voiceVerify')){
  				return false;
  			}
  		}
  		var page = Session.get('pg');
  		return page != this.total && this.total != 1;
  	},
  	hasFinishButton : function(){
  		if(this.voice == 2){
  			if(!Session.get('voiceVerify')){
  				return false;
  			}
  		}
  		return Session.get('pg') == this.total;
  	},
  	isActiveInd : function(ind){
  		return ind == Session.get('pg')-1 ? 'active' : '';
  	},
  	quoteClass : function(){
  		return Session.get('voiceVerify') ? 'active' : '';
  	} 	
  });
  
  Template.view.events({
  	'click #btnNext' : function(){
  		var page = Session.get('pg');
  		Session.set('pg',page+1);
  	},
  	'click #btnBack' : function(){
  		var page = Session.get('pg');
  		Session.set('pg',page-1);
  	},
  	'click #btnFinish' : function(){
  		var callBackFunction = this.callback;
  		if(callBackFunction){
  			window['opener'][callBackFunction]();
  		}
  		window.close();
  	}
  });
  
  Template.view.rendered = function(){
  	var saidI = false;
  	
  	if (annyang) {
	  // Let's define our first command. First the text we expect, and then the function it should call
	  var commands = {
	    'I agree': function() {
	      	Session.set('voiceVerify',true);
	      	
	      	var page = Session.get('pg');
	      	var total = Session.get('total');
	      	if(page < total && Session.get('voiceMode') != 2){
  			Session.set('pg',page+1);
  		}
	    }	    
	  };

	  // Add our commands to annyang
	  annyang.addCommands(commands);

	  // Start listening. You can call this here, or attach this call to an event, button, etc.
	  annyang.start();
	}else{
		Session.set('voiceMode',0);
	}
  };
  
  Template.home.helpers({
  	btnSubmit : function(){
  		if(!Session.get('btnSubmitVal')){
  			Session.set('btnSubmitVal','View TOS');
  		}
  		return Session.get('btnSubmitVal');
  	}
  });
  
  Template.home.events({
  	'click #btnTOS' : function(){
  		Session.set('btnSubmitVal','Viewing TOS');
  		var win = window.open("/generate?n=facebook&callback=callBack","View Agreement","width=500,height=500");  		
  	}
  });
  

}




  
  
