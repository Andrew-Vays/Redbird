@isTest
public class GSD_reUseableApexTest {
    @testSetup static void setup() {
        Account testAccount = new Account();
        testAccount.Name = 'test';
        testAccount.Region__c = 'Asia';
        insert testAccount;
    }
    
    @isTest static void fetchLookUpValues() {
        List<sObject> ExcludeitemsList = new List<sObject>();
        GSD_reUsableMultiSelectLookupCtrlApex.fetchLookUpValues('t','Account',ExcludeitemsList);
    }
}