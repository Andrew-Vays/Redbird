({
    init: function (component, event, helper) {
        var actions = [
            { label: 'Show', name: 'show' },
            { label: 'Delete', name: 'delete' }
        ];
        
        component.set('v.columns', [
            {label: 'Title', fieldName: 'linkName', type: 'url', typeAttributes: {label: { fieldName: 'title' }, target: '_self'}},
            {label: 'Type', fieldName: 'Type__c', type: 'text'},
            {label: 'Interaction Date', fieldName: 'Due_Date__c', type: 'date'},
            {label: 'Note', fieldName: 'note', type: 'text'},
            { type: 'action', typeAttributes: { rowActions: actions } } 
        ]);

       helper.fetchData(component);
    },
    
    handleRowAction: function (cmp, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        
        switch (action.name) {
            case 'show':
                helper.showInteraction(cmp, row);
                break;
            case 'delete':
                helper.deleteInteraction(cmp, row)
                break;
        }
    },
})