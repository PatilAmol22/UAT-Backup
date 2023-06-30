@isTest
public class AccountTriggerHandlerTest {
	@isTest
    public static void testOnwerNAM(){
        Sales_Org__c sOrg = new Sales_Org__c(
            Name = 'USA',
            Description__c = 'USA',
            Sales_Org_Code__c = '3100'
        );
        insert sOrg;
        
        Account accObj = new account();
        accObj.RecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByName().get('Distributor').getRecordTypeId();
        accObj.Email__c = 'test@gmail.com';
        accObj.Name = 'Test';
        accObj.BillingPostalCode = '400014';
        accObj.Sales_Org__c = sorg.Id;
        insert accObj;
        
        Profile profileId = [SELECT Id FROM Profile WHERE Name = 'Territory Manager' LIMIT 1];
        
        User usr1 = new User(
            firstname = 'Test',
            lastName = 'NAM', 
            Alias = 'tnam',                                                                   
            Email = 'test@gmail.com',                                       
            ProfileId = profileId.Id,                                                             
            Username = 'test@upl-ltd.com.upltest',                                         
            IsActive = true,                                                                   
            CommunityNickname = 'test.nam',
            TimeZoneSidKey = 'Asia/Kolkata',               
            LocaleSidKey = 'en_US',                                                  
            LanguageLocaleKey = 'en_US',                                                     
            ForecastEnabled = false,                                                           
            Phone = '7722034447',                                                    
            EmailEncodingKey = 'ISO-8859-1',
            Zone__c = 'Pune'                                                           
        );
        insert usr1;
        
        Territory_Distributor__c td = new Territory_Distributor__c();
        td.Name = '4101';
        td.TerritoryCode__c = '4101';
        td.TerritoryManager__c = usr1.Id;
        td.SalesOrg__c = sOrg.Id;
		insert td;
        
        accObj.Territory_Distributor__c = td.Id;
        
        Test.startTest();
        update accObj;
        Test.stopTest();
        
    }
      @isTest
    public static void testcase123(){
        Price_Group_Master__c pgObj = new Price_Group_Master__c ();	
        pgObj.PG_Code__c='001';	
        insert pgObj;
        Sales_Org__c sOrg = new Sales_Org__c(
            Name = 'SWAL',            // Sales Org Name
            Description__c = 'India',    // Description
            Sales_Org_Code__c = '1410'//'1000' //uplsetting.India_SAS_Sales_Org__c  // Sales Org Code
        );
        insert sOrg;
		Pin_Code__c pCode = new Pin_Code__c();
        pCode.Name = '400014';
        pCode.District__c = 'Mumbai';
        insert pCode;
        State_Tax_Structure__c sTax = new State_Tax_Structure__c();
        sTax.State_Name__c = 'Maharashtra';
        sTax.State_Code__c = '13';
        sTax.GST_State_Code__c = '27';
        sTax.SalesOrg__c = sOrg.Id;
        insert sTax;
        Account accOb = new account();	
        accOb.RecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByName().get('Prospect').getRecordTypeId();	
        accOb.Name = 'Pagani Zonda';	
        accOb.PriceGroupCode__c=PGObj.Id;	
        accOb.Mobile__c='9967341759';	
        accOb.Phone='0202356589';	
        accOb.Sales_Org__c = sOrg.Id;
        accOb.Callout_Set__c = False;	
        accOb.ApprovalStatus__c = 'Approved';	
        accOb.Country__c='SWAL';	
        accOb.BillingCity = 'Mumbai';	
        accOb.BillingCountry = 'India';	
        accOb.BillingStreet = 'DSP';	
        accOb.BillingState = 'MAHARASHTRA';	
        accOb.BillingPostalCode= '400014';	
        accOb.PAN_Number__c = 'DLEPK3323L';	
        //accOb.State_Tax_Structure__c = sTax.Id;
        accOb.Tax_Number_3__c = '27DLEPK3323LAAA';  	
        accOb.Payment_Term_Code1__c ='0014';	
        accOb.State_Code1__c ='27';	
        accOb.Partner_Function_Code__c ='Z1';	
        accOb.Division_Code__c ='10';	
        accOb.Prospect_to_Distributor__c =false;	
        accOb.Central_Admin_Comment__c ='';	
        accOb.Depot_Code__c ='SEC1';
        accOb.Pin_Code__c = pCode.Id;
        accOb.District__c = pCode.District__c;
        //insert accOb;
    }
}