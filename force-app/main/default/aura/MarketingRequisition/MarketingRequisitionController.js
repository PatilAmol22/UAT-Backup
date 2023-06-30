({
    doInit: function(component, event, helper) {
        helper.getFormFields(component);
        var page = component.get("v.page") || 1; 
        var recordToDisply = component.find("recordSize").get("v.value"); 
        
        helper.fetchActivities(component, page, recordToDisply, component.get('v.selectedTabsoft'), component.get("v.isAsc"),'');  
    },
    
    onSelectChange: function(component, event, helper) {  
        var target = event.getSource();  
        var searchText = component.get("v.search");
        
        var value = target.get("v.value");
        if (value=='None' && !searchText) { 
            var action = component.get("c.doInit");
            $A.enqueueAction(action);
        }
        else{
            var page = 1  
            var recordToDisply = component.find("recordSize").get("v.value");  
            var splitValues = value.split(" ");
            var month = splitValues[0];
            var year = splitValues[1];
            
            /*var total = parseInt(component.get("v.total"));
            var start = page;
            var end = parseInt(start) - 1 + parseInt(recordToDisply);
            
            if(end > total){
                end = total;
            }
            
            component.set("v.start", start);
            component.set("v.end", end);*/
            
            var whereClause="WHERE calendar_month(CreatedDate) = "+parseInt(month.trim())+" AND calendar_year(CreatedDate) = "+parseInt(year.trim());    
            if(searchText){
                var numString = parseInt(searchText.trim());
                if(Number.isNaN(numString)){
                    whereClause="WHERE (Activity_Type__c LIKE '%"+searchText.trim()+"%' OR Name LIKE '%"+searchText.trim()+"%' OR Time__c LIKE '%"+searchText.trim()+"%') AND (calendar_month(CreatedDate) = "+parseInt(month)+" AND calendar_year(CreatedDate) = "+parseInt(year.trim())+")";
                }
                else{
                    whereClause="WHERE (Name LIKE '%"+searchText.trim()+"%' OR Time__c LIKE '%"+searchText.trim()+"%' OR Activity_Cost__c = "+parseInt(searchText.trim())+" OR Liquidation_Cost__c = "+parseInt(searchText.trim())+") AND (calendar_month(CreatedDate) = "+parseInt(month)+" AND calendar_year(CreatedDate) = "+parseInt(year.trim())+")";
                }
                //Full SOQL
                //whereClause="WHERE Activity_Type__c LIKE '%"+searchText.trim()+"%' OR Name LIKE '%"+searchText.trim()+"%' OR Time__c LIKE '%"+searchText.trim()+"%' OR Activity_Cost__c = "+parseInt(searchText.trim())+" OR Liquidation_Cost__c = "+parseInt(searchText.trim())+" OR (calendar_month(CreatedDate) = "+parseInt(month)+" AND calendar_year(CreatedDate) = "+parseInt(year.trim())+")";
            }
            
            helper.fetchActivities(component, page, recordToDisply,component.get('v.selectedTabsoft'), component.get("v.isAsc"), whereClause);
        }
    },  
    
    search: function(component, event, helper) {  
        var target = event.getSource();  
        var searchText = target.get("v.value");
        
        var last_SearchText = component.get("v.last_SearchText");
        if (event.keyCode == 27 || !searchText.trim()) { 
            var action = component.get("c.doInit");
            $A.enqueueAction(action);
        }
        else if(searchText.trim() != last_SearchText  && /\s+$/.test(searchText) ){
            //Save server call, if last text not changed
            //Search only when space character entered
            
            var page = 1;  
            var recordToDisply = component.find("recordSize").get("v.value");
            var value = component.get("v.mtd");
            var whereClause=""; //"WHERE calendar_month(CreatedDate) = "+parseInt(month.trim())+" AND calendar_year(CreatedDate) = "+parseInt(year.trim());    
            var numString = parseInt(searchText.trim());
            console.log('value mtd: '+value);
            if(value){
                var splitValues = value.split(" ");
                var month = splitValues[0];
                var year = splitValues[1];
                if(Number.isNaN(numString)){
                    whereClause="WHERE (Activity_Type__c LIKE '%"+searchText.trim()+"%' OR Name LIKE '%"+searchText.trim()+"%' OR Time__c LIKE '%"+searchText.trim()+"%') AND (calendar_month(CreatedDate) = "+parseInt(month)+" AND calendar_year(CreatedDate) = "+parseInt(year.trim())+")";
                }
                else{
                    whereClause="WHERE (Name LIKE '%"+searchText.trim()+"%' OR Time__c LIKE '%"+searchText.trim()+"%' OR Activity_Cost__c = "+parseInt(searchText.trim())+" OR Liquidation_Cost__c = "+parseInt(searchText.trim())+") AND (calendar_month(CreatedDate) = "+parseInt(month)+" AND calendar_year(CreatedDate) = "+parseInt(year.trim())+")";
                }
            }
            else{
                if(Number.isNaN(numString)){
                    whereClause="WHERE (Activity_Type__c LIKE '%"+searchText.trim()+"%' OR Name LIKE '%"+searchText.trim()+"%' OR Time__c LIKE '%"+searchText.trim()+"%')";
                }
                else{
                    whereClause="WHERE (Name LIKE '%"+searchText.trim()+"%' OR Time__c LIKE '%"+searchText.trim()+"%' OR Activity_Cost__c = "+parseInt(searchText.trim())+" OR Liquidation_Cost__c = "+parseInt(searchText.trim())+")";
                }
                //Full SOQL
                //whereClause = "WHERE Activity_Type__c LIKE '%"+searchText.trim()+"%' OR Name LIKE '%"+searchText.trim()+"%' OR Time__c LIKE '%"+searchText.trim()+"%' OR Activity_Cost__c = "+searchText.trim()+" OR Liquidation_Cost__c = "+searchText.trim();
            }
            
            helper.fetchActivities(component, page, recordToDisply,component.get('v.selectedTabsoft'), component.get("v.isAsc"), whereClause);
        }
    },
    
    previousPage: function(component, event, helper) {  
        var recordToDisply = component.find("recordSize").get("v.value"); 
        
        component.set("v.page", component.get("v.page") - 1);  
        helper.fetchActivities(component, component.get("v.page"), recordToDisply,component.get('v.selectedTabsoft'), component.get("v.isAsc"),'');          
        
        /*var end = parseInt(component.get("v.start")) - 1;
        var start = (end + 1) - parseInt(recordToDisply);
        
        component.set("v.start", start);
        component.set("v.end", end);*/
    }, 
    
    gotoFirstPage : function(component, event, helper) {  
        component.set("v.page",1);  
        var recordToDisply = component.find("recordSize").get("v.value");  
        helper.fetchActivities(component, 1, recordToDisply,component.get('v.selectedTabsoft'), component.get("v.isAsc"),'');  
        
        /*var total = parseInt(component.get("v.total"));
        var start = component.get("v.page");
        var end = parseInt(start) - 1 + parseInt(recordToDisply);
        
        if(end > total){
            end = total;
        }
        
        component.set("v.start", start);
        component.set("v.end", end);*/
    },  
    
    gotoLastPage : function(component, event, helper) {  
        component.set("v.page",component.get("v.pages"));  
        var recordToDisply = component.find("recordSize").get("v.value");  
        helper.fetchActivities(component, component.get("v.pages"), recordToDisply,component.get('v.selectedTabsoft'), component.get("v.isAsc"),'');  
        
        /*var total = parseInt(component.get("v.total"));
        var end = total;
        var start = parseInt(end) - parseInt(recordToDisply);
        
        var temp = end % parseInt(recordToDisply);
        
        if(temp!=0){
            start = end - temp + 1;
        }
        
        component.set("v.start", start);
        component.set("v.end", end);*/
    },  
    
    nextPage: function(component, event, helper) {  
        var recordToDisply = component.find("recordSize").get("v.value");
        component.set("v.page", component.get("v.page") + 1);  
        helper.fetchActivities(component, component.get("v.page"), recordToDisply,component.get('v.selectedTabsoft'), component.get("v.isAsc"),'');  
        
        /*var start = parseInt(component.get("v.start")) + parseInt(recordToDisply);
        var end = parseInt(component.get("v.end")) + parseInt(recordToDisply);
        var total = parseInt(component.get("v.total"));
        
        if(end > total){
            end = total;
        }
        
        component.set("v.start", start);
        component.set("v.end", end);*/
    },  
    
    sortActivityNo: function(component, event, helper) {  
        component.set("v.selectedTabsoft", 'Name');  
        helper.sortHelper(component, event, 'Name');  
    },  
    
    sortActivityType: function(component, event, helper) {  
        component.set("v.selectedTabsoft", 'Activity_Type__c');  
        //helper.sortHelper(component, event, 'Activity_Type__c');  
        var activityType = component.find("activityTypeOptions").get("v.value");
        
        var page = 1  
        var recordToDisply = component.find("recordSize").get("v.value");  

        if(activityType!='None'){
            helper.fetchActivities(component, page, recordToDisply,component.get('v.selectedTabsoft'), component.get("v.isAsc"), "WHERE Activity_Type__c='"+activityType+"'");
        }
        else{
            helper.fetchActivities(component, page, recordToDisply,'Name', component.get("v.isAsc"), "");
        }
        //var action = component.get("c.doInit");
        //$A.enqueueAction(action);
    }, 
    
    sortStartDate: function(component, event, helper) {  
        component.set("v.selectedTabsoft", 'Start_Date__c');  
        helper.sortHelper(component, event, 'Start_Date__c');  
    }, 
    
    sortEndDate: function(component, event, helper) {  
        component.set("v.selectedTabsoft", 'End_Date__c');  
        helper.sortHelper(component, event, 'End_Date__c');  
    }, 
    
    sortTime: function(component, event, helper) {  
        component.set("v.selectedTabsoft", 'Time__c');  
        helper.sortHelper(component, event, 'Time__c');  
    }, 
    
    sortActivityCost: function(component, event, helper) {  
        component.set("v.selectedTabsoft", 'Activity_Cost__c');  
        helper.sortHelper(component, event, 'Activity_Cost__c');  
    }, 
    
    sortLiquidationCost: function(component, event, helper) {  
        component.set("v.selectedTabsoft", 'Liquidation_Cost__c');  
        helper.sortHelper(component, event, 'Liquidation_Cost__c');  
    }, 
    
    openModel: function(component, event, helper) {
        // for Display Model,set the "isOpen" attribute to "true"
        component.set("v.isOpen", true);
        component.set("v.header", "New Activity");
        helper.applyCSS(component);
    },
    
    closeModel: function(component, event, helper) {
        // for Hide/Close Model,set the "isOpen" attribute to "Fasle"  
        component.set("v.isOpen", false);
        helper.revertCssChange(component);
    },
    
    openDeleteModal: function(component, event, helper) {
        var target = event.getSource();  
        var recordId = target.get("v.value");
        var recordNo = target.get("v.name");
        
        component.set("v.isOpenDelete", true);
        component.set("v.header", "Delete Activity");
        component.set("v.recordId", recordId);
        component.set("v.recordNo", recordNo);
        
        helper.applyCSS(component);
    },
    
    closeDeleteModal: function(component, event, helper) {
        component.set("v.isOpenDelete", false);
        helper.revertCssChange(component);
    },
    
    closeViewModal: function(component, event, helper) {
        // for Hide/Close Model,set the "isOpen" attribute to "Fasle"  
        component.set("v.isOpenView", false);
        helper.revertCssChange(component);
    },
    
        
    deleteRecord: function(component, event, helper) {
        
        // perform custom logic here    
        
        var action = component.get("c.deleteActivityRecord");
        action.setParams({ 
            "recordId": component.get("v.recordId")
        });
        
        action.setCallback(this, function(a) {
            var state = a.getState();
            var toastMsg = '';
            if (state == "SUCCESS") {
                var flag = a.getReturnValue();
                if(flag){
                    toastMsg = '#'+component.get("v.recordNo")+' deleted successfully';
                    helper.showToast(component, toastMsg);                     
                }
                else{
                    //toastMsg = $A.get("$Label.c.Delete_denied_Please_contact_System_Administrator");
                    toastMsg = 'Can not delete the record in pending state. Please RECALL approval process to delete the record.';
                    helper.showErrorToast(component, toastMsg);   
                }
            }
            else{
                toastMsg = 'Some error has occurred. Please contact System Administrator';
                helper.showErrorToast(component, toastMsg);   
            }             
        });
        $A.enqueueAction(action);  
        
        component.set("v.isOpenDelete", false);
        helper.revertCssChange(component);
        
        var action = component.get("c.doInit");
        $A.enqueueAction(action);
    },
    
    editRecord: function(component, event, helper) {
        var target = event.getSource();  
        var recordId = target.get("v.value");
		var recordNo = target.get("v.name");
        component.set("v.isOpen", true);
        component.set("v.header", "Edit Activity #"+recordNo);
        helper.applyCSS(component);
        
        var childCmp = component.find('childCmp');
        childCmp.getRecordData(recordId, false);       
    },
    
    viewRecord: function(component, event, helper) {
        var target = event.getSource();  
        var recordId = target.get("v.value");
        var recordNo = target.get("v.name");
        
        component.set("v.recordId", recordId);
        component.set("v.recordNo", recordNo);
        
        component.set("v.isOpenView", true);
        helper.applyCSS(component);
        
        //var childCmp = component.find('childCmp');
        //childCmp.getRecordData(recordId, true);  
    },
    
    likenClose: function(component, event, helper) {
        // Display alert message on the click on the "Like and Close" button from Model Footer 
        // and set set the "isOpen" attribute to "False for close the model Box.
        
        //component.set("v.isOpen", false);
        
        var childCmp = component.find('childCmp');
        
        // Call the Child Controller method using childCmp variable dot method name defined into the child component
        childCmp.saveForm();
    },
    
    handleCloseEvent : function(component, event, helper) {
        var message = event.getParam("message");
        console.log('message: '+message);
        
        if(!message){
            // set the handler attributes based on event data
            component.set("v.isOpen", false);
            helper.revertCssChange(component);
            
            var action = component.get("c.doInit");
            $A.enqueueAction(action);
        }
        else{
            //var entryModal = component.find("entryModal");
            //$A.util.toggleClass(entryModal, 'tog');
            
            //var entryModalBackDrop = component.find("entryModalBackDrop");
            //$A.util.toggleClass(entryModalBackDrop, 'tog');
            
            var entryModalContainer = component.find("entryModalContainer");
            $A.util.toggleClass(entryModalContainer, 'slds-modal__container');
        }
    },
    
    /*handleTotalChange : function(component, event, helper) {
        // handle value change
        console.log("old value (Currency): " + JSON.stringify(event.getParam("oldValue")));
        console.log("current value (Currency): " + JSON.stringify(event.getParam("value")));
        
        //var total = parseInt(event.getParam("value").toString()); //component.get("v.total");
        //var end = parseInt(component.get("v.end"));

        //if(end > total){
        //    end = total;
        //}
        
        //component.set("v.end", end);
    }*/

})