({
    handleShowModal : function(component, event, helper) {
        var modalBody;
        var modalFooter;
        $A.createComponents([
            ["c:GSD_InteractionsCreateModalLC",{}],
            ["c:GSD_InteractionsCreateModalFooterLC",{}]
        ],
                            function(components, status){
                                if (status === "SUCCESS") {
                                    modalBody = components[0];
                                    modalFooter = components[1];
                                    component.find('overlayLib').showCustomModal({
                                        header: "Interaction",
                                        body: modalBody, 
                                        footer: modalFooter,
                                        showCloseButton: true,
                                        cssClass: "",
                                        closeCallback: function() {
                                            var appEvent = $A.get("e.c:GSD_refreshInteractionsBodyLE");
                                            // fire the event  
                                            appEvent.fire();
                                        }
                                    })
                                }
                            }
                           );
    }
})