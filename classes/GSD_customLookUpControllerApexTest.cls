@isTest
public class GSD_customLookUpControllerApexTest {
    @testSetup static void setup() {
        Account testAccount = new Account();
        testAccount.Name = 'test';
        testAccount.Region__c = 'Asia';
        insert testAccount;
    }
    
    @isTest static void fetchLookUpValues() {
        GSD_customLookUpControllerApex.fetchLookUpValues('t','Account');
    }
}