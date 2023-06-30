@isTest
public class FranceCaseApprovalController_Test {
   
  
    
    @isTest
    public static void testFranceCaseApprovalControllertestMethod() {
        // Create a test record type
        Id recordTypeId = Schema.SObjectType.Case.getRecordTypeInfosByName().get('Quality - Farmer').getRecordTypeId();
        Id recordTypeId2 = Schema.SObjectType.Account.getRecordTypeInfosByName().get('France Farmer').getRecordTypeId();
		ID approvalID = [SELECT Id FROM ProcessDefinition WHERE DeveloperName = 'France_Case_Approval_Process' LIMIT 1].Id;
        User user1 = [SELECT Id FROM User WHERE Profile.Name='System administrator' LIMIT 1];
        
        // Create a test user
        User submittingUser = new User(
            ProfileId = [SELECT Id FROM Profile WHERE Name = 'System Administrator' LIMIT 1].Id,
            FirstName = 'TestFrance123',
            LastName = 'User1234',
            Email = 'testuserfrance123@example.com',
            Alias = 'tuserfr',
            Username = 'testuser123fr12@example.com',
            EmailEncodingKey = 'UTF-8',
            LanguageLocaleKey = 'en_US',
            LocaleSidKey = 'en_US', 
            TimeZoneSidKey = 'America/Los_Angeles'
        );
        insert submittingUser;

        // Create test data
        Account accObj3 = new Account(
            RecordTypeId = recordTypeId2,
            FirstName = 'KVP',
            LastName = 'KVP Test',
            Farm_Name__c = 'test',
            Email__c = 'kvp@gmail.com',
            Mobile__c = '9999999999',
            BillingPostalCode = '456789',
            District__c = 'NeoFog'
        );
        insert accObj3;

        Case casObj = new Case(
            RecordTypeId = recordTypeId,
            Entity__c = 'UPL France',
            Date__c = Date.today(),
            Case_Type__c = 'Quantité [Q]',
            Status = 'Open',
            Productname__c = 'Test',
            Order_number__c = '2',
            Batch_no__c = '2',
            Packaging__c = '2',
            Delivered_quantity__c = '2',
            Quantity_incriminated__c = '2',
            Sample_taken__c = 'OUI',
            Storagewith_the_carrier__c = 'OUI',
            Compensation_requested__c = 'OUI',
            Technical_visit_requested__c = 'OUI',
            Product_exchange_requested__c = 'OUI',
            Product_return_requested__c = 'OUI',
            Detailed_description_of_the_complaint__c = 'Test Data',
            Farmer_Account__c = accObj3.Id
        );
        insert casObj;

       
            
     
        list<id> l= new list<Id>();
        l.add(user1.Id);
        
        GetProcessInstanceeData.getRowData(submittingUser.Id, casObj.id, null, 'Case', 'mixed');
        
        GetProcessInstanceeData.getCaseList('Case');
        Approval.ProcessSubmitRequest req1 = new Approval.ProcessSubmitRequest();
        req1.setComments('Submitting request for approval.');
        req1.setObjectId(casObj.id);
        
        // Submit on behalf of a specific submitter
        req1.setSubmitterId(submittingUser.Id);
        req1.setNextApproverIds(l);
        
        // Submit the record to specific process and skip the criteria evaluation
        req1.setProcessDefinitionNameOrId('Brazil_Case_Approvals');
        req1.setSkipEntryCriteria(true);
        
        // Submit the approval request for the account
        Approval.ProcessResult result = Approval.process(req1);
        system.debug('@@@@result--->'+result);

        // Set up the test context
        Test.startTest();

        // Run the controller method
        List<FranceCaseApprovalController.SubmittedRecordsWrapper> submittedRecords = FranceCaseApprovalController.getSubmittedRecords();
        String approvalResult = FranceCaseApprovalController.processRecords('Approve', JSON.serialize(submittedRecords));

  
        System.assertEquals('All records are Approved successfully', approvalResult, 'Approval result is incorrect');

       

        Test.stopTest();
    }
}