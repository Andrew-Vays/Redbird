@isTest
public class GSD_InteractionsModalControllerApexTest {
	@testSetup static void setup() {
        Account testAccount = new Account();
        testAccount.Name = 'test';
        testAccount.Region__c = 'Asia';
        insert testAccount;
        
		Interaction__c interaction = new Interaction__c();
        interaction.Title__c = 'test';
        interaction.Due_Date__c = system.today();
        interaction.Type__c = 'Call';
        insert interaction;
        
        Interaction_Link__c IL = new Interaction_Link__c();
        IL.Interaction__C = interaction.Id;
        IL.Company__c	 = testAccount.Id;
        insert IL;
    }
    
    @isTest static void deleteInteractionsTest() {
		Interaction__c[] interactions = [Select Id from Interaction__c];
        GSD_InteractionsModalControllerApex.deleteInteractions(interactions[0].Id);
    }
    
    @isTest static void createInteractionsTest() {
        Account testAccount = new Account();
        testAccount.Name = 'test';
        testAccount.Region__c = 'Asia';
        insert testAccount;
        
        Account[] accounts = new Account[]{};
        accounts.add(testAccount);
        
        Contact ct = new Contact();
        ct.AccountId = testAccount.Id;
        ct.LastName = 'test';
        insert ct;
        
        Contact[] contacts = new Contact[]{};
        contacts.add(ct);
        
        Opportunity op = new Opportunity();
        op.Name = 'testOp';
        op.AccountId = testAccount.Id;
        op.CloseDate = system.today();
        op.StageName = 'Open';
        insert op;
        
        Opportunity[] opportunities = new Opportunity[]{};
        opportunities.add(op);
        
        GSD_InteractionsModalControllerApex.InteractionsData interaction = new GSD_InteractionsModalControllerApex.InteractionsData();
        interaction.InteractionTitle = 'test';
        interaction.InteractionType = 'Call';
        interaction.InteractionDate = system.today();
        interaction.Contacts = contacts;
        interaction.Accounts = accounts;
        interaction.Opportunities = opportunities;
                    
        GSD_InteractionsModalControllerApex.createInteractions(JSON.serialize(interaction));
    }
    
    @isTest static void getInteractionsTest() {
        Interaction_Link__c[] IL = [Select Id,Company__c from Interaction_Link__c];
        GSD_InteractionsModalControllerApex.getInteractions(5,5,IL[0].Company__c);
    }
    
    @isTest static void fetchUserTest() {
        GSD_InteractionsModalControllerApex.fetchUser();
    }
    
    
}