({
	createInteractions : function(component,event,data) {
	  // call the apex class method 
     var action = component.get("c.createInteractions");
      // set param to method  
        action.setParams({
            'data': data
          });
      // set a callBack    
        action.setCallback(this, function(response) {
          $A.util.removeClass(component.find("mySpinner"), "slds-show");
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                console.log(storeResponse);
                var appEvent = $A.get("e.c:GSD_closeModalEventLE");
                // fire the event  
                appEvent.fire();
                
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "type" : "success",
                    "message": "The Interaction has been created successfully."
                });
            }
 
        });
      // enqueue the Action  
        $A.enqueueAction(action);
    
	},
})