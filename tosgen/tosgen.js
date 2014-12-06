if (Meteor.isClient) {
   
  Template.view.helpers({
  	point : function(){
  		var page = Session.get('pg');
  		if(!page){
  			page = 1;	
  			Session.set('pg',page);
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
  		var page = Session.get('pg');
  		return page != this.total && this.total != 1;
  	},
  	hasFinishButton : function(){
  		return Session.get('pg') == this.total;
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
  		var win = window.open("http://localhost:3000/generate?n=facebook&callback=callBack","View Agreement","width=500,height=500");  		
  	}
  });
  

}




  
  
