({
    doInit  : function(component, event, helper) {
        
        var action = component.get("c.fetchUser");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                // set current user information on userInfo attribute
                component.set("v.selectedOwnerLookUpRecord", storeResponse);
                console.log(storeResponse);
            }
        });
        $A.enqueueAction(action);
    },
	openModalEvent : function(component, event, helper) {
        
        var allValid = component.find('field').reduce(function (validSoFar, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        
        var selectedOwnerLookUpRecord = component.get('v.selectedOwnerLookUpRecord');
        
        if(allValid && selectedOwnerLookUpRecord.Id !== 'undefined' && selectedOwnerLookUpRecord.Id !== undefined){
            var data = {};
            data['Owner'] = component.get('v.selectedOwnerLookUpRecord');
            data['Accounts'] = component.get('v.selectedAccountLookUpRecords');
            data['Contacts'] = component.get('v.selectedContactLookUpRecords');
            data['Opportunities'] = component.get('v.selectedOpportunitiesLookUpRecords');
            data['InteractionType'] = component.get('v.InteractionType');
			data['InteractionDate'] = component.get('v.InteractionDate');
            data['InteractionNote'] = component.get('v.Note');
            data['InteractionTitle'] = component.get('v.Title');
            
            console.log(JSON.stringify(data, null, 4));
            helper.createInteractions(component,event,JSON.stringify(data));
            
            //Let's brodcast Modal Save Event
        }else{
            
        }
	}
})