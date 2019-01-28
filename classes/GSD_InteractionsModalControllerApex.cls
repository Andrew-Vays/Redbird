public class GSD_InteractionsModalControllerApex {
    public class InteractionsData {
        public User Owner;
        public Contact[] Contacts;
        public Account[] Accounts;
        public Opportunity[] Opportunities;
        public string InteractionTitle;
        public string InteractionType;
        public string InteractionNote;
        public Date InteractionDate;
    }
    
    @AuraEnabled
    public static boolean deleteInteractions(String id){
        Interaction__c interaction = new Interaction__c();
        interaction.Id = id;
        delete interaction;
        
        return true;
    }
    
	@AuraEnabled
    public static boolean createInteractions(String data){
        
    InteractionsData d = (InteractionsData)JSON.deserialize(data, InteractionsData.class);

        if (d != null)
        {
            Interaction_Link__c[] InteractionLinksToCreate = new Interaction_Link__c[]{};
                
            Interaction__c newInteraction = new Interaction__c();
            newInteraction.Title__c = d.InteractionTitle;
            newInteraction.Due_Date__c = d.InteractionDate;
            newInteraction.Type__c = d.InteractionType;
            if(d.Owner != null){
              newInteraction.OwnerId = d.Owner.Id;  
            }
            newInteraction.Note__c = d.InteractionNote;
            insert newInteraction;
            
            for(Contact c : d.Contacts){
                Interaction_Link__c newInteractionLink = new Interaction_Link__c();
                newInteractionLink.Interaction__c = newInteraction.Id;
                newInteractionLink.Contact__c = c.Id;
                InteractionLinksToCreate.add(newInteractionLink);
            }
            
            for(Account a : d.Accounts){
                Interaction_Link__c newInteractionLink = new Interaction_Link__c();
                newInteractionLink.Interaction__c = newInteraction.Id;
                newInteractionLink.Company__c = a.Id;
                InteractionLinksToCreate.add(newInteractionLink);
            }
            
            for(Opportunity o : d.Opportunities){
                Interaction_Link__c newInteractionLink = new Interaction_Link__c();
                newInteractionLink.Interaction__c = newInteraction.Id;
                newInteractionLink.Opportunity__c = o.Id;
                InteractionLinksToCreate.add(newInteractionLink);
            }

            insert InteractionLinksToCreate;
            System.debug(d);
            return true;
        }
    
        return false;
    }
    
    
    @AuraEnabled
    public static List<Interaction_Link__c> getInteractions(Integer limits , Integer offsets, string recordId){
        System.debug('limits'+limits);
        System.debug('offsets'+offsets);
        Integer intlimits = integer.valueof(limits);
        Integer intoffsets = integer.valueof(offsets);
        system.debug(recordId);
        
        List<Interaction_Link__c> Interactions = [Select id,Interaction__r.Name,Interaction__r.Title__c,Contact__c,Company__c,Opportunity__c,Interaction__r.Due_Date__c,Interaction__r.Type__c,Interaction__r.OwnerId,Interaction__r.Note__c 
                                                  from Interaction_Link__c 
                                                  where (Contact__c =:recordId or Company__c =: recordId or Opportunity__c =: recordId)
                                                  Order by Name Limit :intlimits Offset :intoffsets];
       
        system.debug(Interactions);
        return Interactions;
    } 
    
    @AuraEnabled 
    public static user fetchUser(){
        // query current user information  
        User oUser = [select id,Name
                      FROM User Where id =: userInfo.getUserId()];
        return oUser;
    }
    
}