({
    
    showInteraction: function(component, row){
        var sObectEvent = $A.get("e.force:navigateToSObject");
        console.log(JSON.stringify(row, null, 4));
        sObectEvent .setParams({
            "recordId": row.id,
            "slideDevName": "detail"
        });
        sObectEvent.fire(); 
    },
    deleteInteraction: function(component, row){
        
        var action = component.get("c.deleteInteractions");
        // set param to method  
        action.setParams({
            'id': row.id
        });
        // set a callBack    
        action.setCallback(this, function(response) {
            $A.util.removeClass(component.find("mySpinner"), "slds-show");
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                var appEvent = $A.get("e.c:GSD_refreshInteractionsBodyLE");
                // fire the event  
                appEvent.fire();
                
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "type" : "success",
                    "message": "The record has been deleted successfully."
                });
                toastEvent.fire();
            }
            
        });
        // enqueue the Action  
        $A.enqueueAction(action);
        console.log(JSON.stringify(row, null, 4));
    },
    fetchData: function(component){
            return new Promise($A.getCallback(function(resolve, reject) {
                var action = component.get('c.getInteractions');
                
                action.setParams({
                    "limits": component.get("v.initialRows"),
                    "offsets": '0',
                    "recordId": component.get("v.recordId")
                });
               
                
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === "SUCCESS") {
                        var storeResponse = response.getReturnValue();
                        var data = []; 
                        storeResponse.forEach(function (interaction,index) {
                            let temp = {};
                            temp['Type__c'] = interaction.Interaction__r.Type__c;
                            temp['Due_Date__c'] = interaction.Interaction__r.Due_Date__c;
                            temp['id'] = interaction.Interaction__c;
                            temp['name'] = interaction.Interaction__r.Name;
                            temp['title'] = interaction.Interaction__r.Title__c;
                            temp['note'] = interaction.Interaction__r.Note__c;
                            temp['linkName'] = '/one/one.app#/sObject/' + interaction.Interaction__c;
                            data.push(temp);
                        });
                        
                        console.log(data);
                        console.log(storeResponse)
                        component.set("v.data",data);
                    }else{
                        console.log('Failed!');
                    }
                    
                });
                
                $A.enqueueAction(action);
                
                
            }));
            
        }
})