({
    handleCancel : function(component, event, helper) {
        //closes the modal or popover from the component
        component.find("overlayLib").notifyClose();
    },
    handleOK : function(component, event, helper) {
        //do something
        //var appEvent = component.getEvent("saveModalEvent"); 
        var appEvent = $A.get("e.c:GSD_saveModalEventLE");
        // fire the event  
        appEvent.fire();
        console.log('firing event!');
    },
    closeModalEvent : function(component, event, helper) {
        component.find("overlayLib").notifyClose();
    }
})