({
    doInit: function(component, event, helper) {
        helper.getFormFields(component);
    },
    
    openAllocationModal: function(component, event, helper) {
        var totalAllocation = component.get("v.totalAllocation");
        if(totalAllocation < 100){
            // for Display Model,set the "isOpen" attribute to "true"
            component.set("v.isOpenAllocation", true);
            helper.applyCSS(component);
            helper.callEvent(component);
        }
        else{
            helper.showErrorToast(component, 'Total Product Allocations percentage for this Marketing Requisitions should not exceed 100%');   
        }
    },
    
    closeAllocationModal: function(component, event, helper) {
        // for Hide/Close Model,set the "isOpen" attribute to "False"  
        component.set("v.isOpenAllocation", false);
        helper.revertCssChange(component);
        helper.callEvent(component);
    },
    
    openItemModal: function(component, event, helper) {
        // for Display Model,set the "isOpen" attribute to "true"
        component.set("v.isOpenItem", true);
        helper.applyCSS(component);
        helper.callEvent(component);
        helper.getItemFields(component);
    },
    
    closeItemModal: function(component, event, helper) {
        // for Hide/Close Model,set the "isOpen" attribute to "False"  
        component.set("v.isOpenItem", false);
        helper.revertCssChange(component);
        helper.callEvent(component);
    },
    
    openLiquidationModal: function(component, event, helper) {
        // for Display Model,set the "isOpen" attribute to "true"
        component.set("v.isOpenLiquidation", true);
        helper.applyCSS(component);
        helper.callEvent(component);
    },
    
    closeLiquidationModal: function(component, event, helper) {
        // for Hide/Close Model,set the "isOpen" attribute to "False"  
        component.set("v.isOpenLiquidation", false);
        helper.revertCssChange(component);
        helper.callEvent(component);
    },
    
    addAllocation: function(component, event, helper) {
        var isValid = true;
        
        var productGroup = component.get("v.selectPG");
        var productGroupId = '';
        var productGroupName = '';
        //console.log('productGroup: '+JSON.stringify(productGroup));
        
        if(productGroup){
            productGroupId = component.get("v.selectPG").val;
            productGroupName = component.get("v.selectPG").text;
        }
        var allocationPercent = component.find("allocationPercent").get("v.value");
        var allocationList = component.get("v.allocationList");
        
        var target = event.getSource();
        //Divya: 23-07-2020: Added for INCTASK0231869
        console.log("index is "+target.get("v.labelClass"));
        if(target.get("v.labelClass") === ''){
            var index = allocationList.length;
        }
        else{
           var index = target.get("v.labelClass"); 
        }
        
        console.log('index: '+index);
        
        if(!productGroupName){
            isValid = false;
            helper.showErrorToast(component, 'Product Group is required');              
        }
        var totalAllocation = component.get("v.totalAllocation");
        var tempTotal = 0;   
        if(!allocationPercent){
            isValid = false;
            component.find("allocationPercent").set("v.errors",[{message: 'Complete this field'}]);                    
        }
        else{
            if(allocationList[index]){
                tempTotal = (totalAllocation - allocationList[index].allocationPercent) + allocationPercent;
            }
            else{
                tempTotal = totalAllocation + allocationPercent;   
            }
            component.find("allocationPercent").set("v.errors",null);    
        }
        
        if(tempTotal > 100){
            isValid = false;
            component.find("allocationPercent").set("v.errors",[{message: 'Total Product Allocations percentage for this Marketing Requisitions should not exceed 100%'}]);                    
        }
        else{
            component.find("allocationPercent").set("v.errors",null);    
        }
        
        if(isValid){
            if(allocationList[index]){
                allocationList[index].productGroupId = productGroupId; 
                allocationList[index].productGroupName = productGroupName; 
                allocationList[index].allocationPercent = allocationPercent;
            }
            else{
                index = allocationList.length;
                allocationList.push({
                    productGroupId: productGroupId,
                    productGroupName: productGroupName, 
                    allocationPercent: allocationPercent,
                    index : index
                });
            }

            component.set("v.selectPG", null);
            component.find("allocationPercent").set("v.value", '');
            component.find("addAllocation").set("v.labelClass",'');
            component.set("v.allocationList",allocationList);
            
            helper.getTotalAllocation(component);
            component.set("v.isOpenAllocation", false);
            helper.revertCssChange(component);
            helper.callEvent(component);
        }
    },
    
    editAllocation: function(component, event, helper) {
        component.set("v.isOpenAllocation", true);
        helper.applyCSS(component);
        helper.callEvent(component);
        
        var target = event.getSource();  
        var index = target.get("v.value");
        
        var allocationList = component.get("v.allocationList"); 
        
        var productGroup = {val: allocationList[index].productGroupId, text: allocationList[index].productGroupName, object:"Product2"};
        component.set("v.selectPG",productGroup);
        
        component.find("allocationPercent").set("v.value",allocationList[index].allocationPercent);
        component.find("addAllocation").set("v.labelClass",allocationList[index].index);
        
        helper.getTotalAllocation(component);
    },
    
    removeAllocation: function(component, event, helper) {
        var target = event.getSource();  
        var index = target.get("v.value");
        
        var allocationList = component.get("v.allocationList"); 
        allocationList.splice(index, 1);
        
        for (var idx = 0; idx < allocationList.length; idx++) {
            allocationList[idx].index = idx;
        }
        component.set("v.allocationList", allocationList);
        
        helper.getTotalAllocation(component);
    },
    
    addItem: function(component, event, helper) {
        
        var isValid = true;
        
        var item = component.find("itemOptions").get("v.value");
        var otherItem = component.find("otheritem").get("v.value");
        var description = component.find("description").get("v.value");
        var nou = component.find("nou").get("v.value");
        var cpu = component.find("cpu").get("v.value");
        var subtotal = component.find("subtotal").get("v.value");
        
        var itemList = component.get("v.itemList");
        
        var target = event.getSource();  
        //Divya: 23-07-2020: Added for INCTASK0231869
        if (target.get("v.labelClass") === ""){
            var index = itemList.length;
        }
        else{
           var index = target.get("v.labelClass"); 
        }
        //console.log('index: '+index);
        
        if(item=='None'){
            isValid = false;
            component.find("itemOptions").set("v.errors",[{message: 'Complete this field'}]);                    
        }
        else if(item=='LAIN-LAIN' && otherItem==''){
            isValid = false;
            component.find("otheritem").set("v.errors",[{message: 'Complete this field'}]);                    
        }
        else{
            component.find("itemOptions").set("v.errors",null);   
            component.find("otheritem").set("v.errors",null);   
        }
        
        /*if(!description){
            isValid = false;
            component.find("description").set("v.errors",[{message: 'Complete this field'}]);                    
        }
        else{
            component.find("description").set("v.errors",null);    
        }*/
        
        if(!nou){
            isValid = false;
            component.find("nou").set("v.errors",[{message: 'Complete this field'}]);                    
        }
        else{
            component.find("nou").set("v.errors",null);    
        }
        
        if(!cpu){
            isValid = false;
            component.find("cpu").set("v.errors",[{message: 'Complete this field'}]);                    
        }
        else{
            component.find("cpu").set("v.errors",null);    
        }
        
        if(isValid){
            if(itemList[index]){
                itemList[index].item = item;
                itemList[index].otherItem = otherItem;
                itemList[index].description = description;
                itemList[index].nou = nou;
                itemList[index].cpu = cpu;
                itemList[index].subtotal = subtotal;
            }
            else{
                index = itemList.length;
                itemList.push({
                    item: item,
                    otherItem: otherItem,
                    description: description,
                    nou : nou,
                    cpu : cpu,
                    subtotal : subtotal,
                    index : index
                });
            }
            component.find("itemOptions").set("v.value",'None');
            component.find("otheritem").set("v.value",'');
            component.find("description").set("v.value",'');
            component.find("nou").set("v.value",'');
            component.find("cpu").set("v.value",'');
            component.find("subtotal").set("v.value",'');
            component.find("addItem").set("v.labelClass",'');
            component.set("v.itemList",itemList);
            
            helper.getTotalItem(component);
            component.set("v.isOpenItem", false);
            helper.revertCssChange(component);
            helper.callEvent(component);
        }
    },
    
    calculateItemSubtotal: function(component, event, helper) {
        var nou = component.find("nou").get("v.value");
        var cpu = component.find("cpu").get("v.value");
        if(nou && cpu){
            var subtotal = nou * cpu;
            component.find("subtotal").set("v.value", Math.abs(subtotal));
        }
    },
    
    editItem: function(component, event, helper) {
        component.set("v.isOpenItem", true);
        helper.applyCSS(component);
        helper.callEvent(component);
        helper.getItemFields(component);
        var target = event.getSource();  
        var index = target.get("v.value");
        
        var itemList = component.get("v.itemList"); 
        
        component.find("itemOptions").set("v.value",itemList[index].item);
        component.find("otheritem").set("v.value",itemList[index].otherItem);
        component.find("description").set("v.value",itemList[index].description);
        component.find("nou").set("v.value",itemList[index].nou);
        component.find("cpu").set("v.value",itemList[index].cpu);
        component.find("subtotal").set("v.value",itemList[index].subtotal);
        
        component.find("addItem").set("v.labelClass",itemList[index].index);
        
        helper.getTotalItem(component);
    },
    
    removeItem: function(component, event, helper) {
        var target = event.getSource();  
        var index = target.get("v.value");
        
        var itemList = component.get("v.itemList"); 
        itemList.splice(index, 1);
        
        for (var idx = 0; idx < itemList.length; idx++) {
            itemList[idx].index = idx;
        }
        component.set("v.itemList", itemList);
        
        helper.getTotalItem(component);
    },
    
    addLiquidation: function(component, event, helper) {
        var isValid = true;
        
        var distributor = component.get("v.selectDI");
        var distributorId = '';
        var distributorName = '';
        if(distributor){
            distributorId = component.get("v.selectDI").val;
            distributorName = component.get("v.selectDI").text;
        }
        
        var retailer = component.get("v.selectR1");
        var retailerId = '';
        var retailerName = '';
        if(retailer){
            retailerId = component.get("v.selectR1").val;
            retailerName = component.get("v.selectR1").text;
        }
        
        var productGroup = component.get("v.selectPG2");
        var productGroupId = '';
        var productGroupName = '';
        if(productGroup){
            productGroupId = component.get("v.selectPG2").val;
            productGroupName = component.get("v.selectPG2").text;
        }
        
        var stock = component.find("stock").get("v.value");
        var qty = component.find("qty").get("v.value");
        var price = component.find("price").get("v.value");
        var subtotal = component.find("subtotal2").get("v.value");
        
        var liquidationList = component.get("v.liquidationList");
        
        var target = event.getSource(); 
      //Divya: 23-07-2020: Added for INCTASK0231869
        if (target.get("v.labelClass") === ""){
            var index = liquidationList.length;
        }
        else{
           var index = target.get("v.labelClass"); 
        }

        //console.log('index: '+index);
        
        if(!distributorName && !retailerName){
            isValid = false;
            helper.showErrorToast(component, 'Please select either Distributor or R1');
        }
        
        if(!productGroupName){
            isValid = false;
            helper.showErrorToast(component, 'Product is required');                   
        }
        
        if(!stock){
            isValid = false;
            component.find("stock").set("v.errors",[{message: 'Complete this field'}]);                    
        }
        else{
            component.find("stock").set("v.errors",null);    
        }
        
        if(!qty){
            isValid = false;
            component.find("qty").set("v.errors",[{message: 'Complete this field'}]);                    
        }
        else{
            component.find("qty").set("v.errors",null);    
        }
        
        if(!price){
            isValid = false;
            component.find("price").set("v.errors",[{message: 'Complete this field'}]);                    
        }
        else{
            component.find("price").set("v.errors",null);    
        }
        
        if(isValid){
            if(liquidationList[index]){
                liquidationList[index].distributorId = distributorId; 
                liquidationList[index].distributorName = distributorName; 
                liquidationList[index].retailerId = retailerId;
                liquidationList[index].retailerName = retailerName; 
                liquidationList[index].productGroupId = productGroupId; 
                liquidationList[index].productGroupName = productGroupName; 
                liquidationList[index].stock = stock;
                liquidationList[index].qty = qty;
                liquidationList[index].price = price;
                liquidationList[index].subtotal = subtotal;
            }
            else{
                index = liquidationList.length;
                liquidationList.push({
                    distributorId: distributorId, 
                    distributorName: distributorName, 
                    retailerId: retailerId, 
                    retailerName: retailerName, 
                    productGroupId: productGroupId, 
                    productGroupName: productGroupName, 
                    stock: stock,
                    qty: qty,
                    price: price,
                    subtotal: subtotal,
                    index : index
                });
            }
            
            component.set("v.selectDI", null);
            component.set("v.selectR1", null);
            component.set("v.selectPG2", null);
            component.find("stock").set("v.value",'');
            component.find("qty").set("v.value",'');
            component.find("price").set("v.value",'');
            component.find("subtotal2").set("v.value",'');
            component.find("addLiquidation").set("v.labelClass",'');
            component.set("v.liquidationList",liquidationList);
            
            helper.getTotalLiquidation(component);
            component.set("v.isOpenLiquidation", false);
            helper.revertCssChange(component);
            helper.callEvent(component);
        }
    },
    
    calculateLiquidationSubtotal: function(component, event, helper) {
        var qty = component.find("qty").get("v.value");
        var price = component.find("price").get("v.value");
        if(qty && price){
            var subtotal = qty * price;
            component.find("subtotal2").set("v.value", Math.abs(subtotal));
        }
    },
    
    editLiquidation: function(component, event, helper) {
        component.set("v.isOpenLiquidation", true);
        helper.applyCSS(component);
        helper.callEvent(component);
        var target = event.getSource();  
        var index = target.get("v.value");
        
        var liquidationList = component.get("v.liquidationList"); 
        
        var distributor = {val: liquidationList[index].distributorId, text: liquidationList[index].distributorName, object:"Account"};
        component.set("v.selectDI", distributor);
        
        var retailer = {val: liquidationList[index].retailerId, text: liquidationList[index].retailerName, object:"Account"};
        component.set("v.selectR1", retailer);
        
        var productGroup = {val: liquidationList[index].productGroupId, text: liquidationList[index].productGroupName, object:"Product2"};
        component.set("v.selectPG2", productGroup);
        
        component.find("stock").set("v.value",liquidationList[index].stock);
        component.find("qty").set("v.value",liquidationList[index].qty);
        component.find("price").set("v.value",liquidationList[index].price);
        component.find("subtotal2").set("v.value",liquidationList[index].subtotal);
        
        component.find("addLiquidation").set("v.labelClass",liquidationList[index].index);
        
        helper.getTotalLiquidation(component);
    },
    
    removeLiquidation: function(component, event, helper) {
        var target = event.getSource();  
        var index = target.get("v.value");
        var liquidationList = component.get("v.liquidationList"); 
        liquidationList.splice(index, 1);
        for (var idx = 0; idx < liquidationList.length; idx++) {
            liquidationList[idx].index = idx;
        }
        component.set("v.liquidationList", liquidationList);
        
        helper.getTotalLiquidation(component);
    },
    
    //Validate Start Date
    onDateChangeStartDate: function(component, event, helper) {
        var inputCmp = component.find("startDate");
        var value = inputCmp.get("v.value");
        
        var inputCmp2 = component.find("endDate");
        var value2 = inputCmp2.get("v.value");
        
        var today = new Date();
        var dd = (today.getDate() < 10 ? '0' : '') + today.getDate();
        var MM = ((today.getMonth() + 1) < 10 ? '0' : '') + (today.getMonth() + 1);
        var yyyy = today.getFullYear();
        
        // Custom date format for ui:inputDate
        var currentDate = (yyyy + "-" + MM + "-" + dd);
        
        var x = new Date(value);
        var y = new Date(currentDate);
        var z = new Date(value2);
        
        var flag = true;
        
        //console.log('validFromDate: '+x);
        //console.log('validToDate: '+z);
        //console.log('+x > +z: '+(+x > +z));
        
        if(x=='Invalid Date'){
            inputCmp.set("v.errors", [{message:"Complete this field"}]);           
            $A.util.addClass(inputCmp, "error");
            flag = false; 
        }
        // is less than today?
        else if (+x < +y) {
            inputCmp.set("v.errors", [{message: "Start Date cannot be less than today" }]);    
            $A.util.addClass(inputCmp, "error");
            flag = false;
        } 
		else if(+x > +z){
            inputCmp.set("v.errors", [{message: "Start Date cannot be after End Date" }]);
            $A.util.addClass(inputCmp, "error");
            flag = false;
		}
		else {
			inputCmp.set("v.errors", null);
			$A.util.removeClass(inputCmp, "error");
		}
        //component.set("v.isValidStartDate",flag);
    },
    
    //Validate End Date
    onDateChangeEndDate: function(component, event, helper) {
        var inputCmp = component.find("endDate");
        var value = inputCmp.get("v.value");
        
        var inputCmp1 = component.find("startDate");
        var value1 = inputCmp1.get("v.value");
        
        var x = new Date(value);
        var y = new Date(value1);
        
        var today = new Date();
        var dd = (today.getDate() < 10 ? '0' : '') + today.getDate();
        var MM = ((today.getMonth() + 1) < 10 ? '0' : '') + (today.getMonth() + 1);
        var yyyy = today.getFullYear();
        
        // Custom date format for ui:inputDate
        var currentDate = (yyyy + "-" + MM + "-" + dd);
        var z = new Date(currentDate);
        
        var flag = true;
        
        if(x=='Invalid Date'){
            inputCmp.set("v.errors", [{message: "Complete this field"}]);      
            $A.util.addClass(inputCmp, "error");
            flag = false; 
        }
        else if (+x < +z) {
            inputCmp.set("v.errors", [{message: "End Date cannot be less than today" }]);    
            $A.util.addClass(inputCmp, "error");
            flag = false;
        }         
        // is less than today?
        else if (+x < +y) {
            //inputCmp.set("v.errors", [{message:"Valid To date: "+value+" cannot be less than Valid From date: " + value1}]);
            inputCmp.set("v.errors", [{message: "End Date cannot be before Start Date"}]);
            $A.util.addClass(inputCmp, "error");
            flag = false;
        }
        else {
            inputCmp.set("v.errors", null);
            $A.util.removeClass(inputCmp, "error");
        }
        
        //component.set("v.isValidEndDate",flag);
    },
    
    getRecordData : function(component, event, helper) {
        
        var params = event.getParam('arguments');
        if (params) {
            console.log('params: '+params.param1);
            var recordId = params.param1;
            var isDisabled = component.set("v.isDisabled", params.param2);
            
            var action = component.get("c.getRecord");
            action.setParams({
                recordId: recordId
            });
            action.setCallback(this, function(a) {
                
                // on call back make it false ,spinner stops after data is retrieved
                component.set("v.showSpinner", false); 
                
                var state = a.getState();
                console.log('state: '+JSON.stringify(state)); 
                
                if (state == "SUCCESS") {
                    var returnValue = a.getReturnValue();
                    //console.log('returnValue: '+JSON.stringify(returnValue));   
             		
                    component.set("v.apObj", returnValue.apObj);
                    component.set("v.allocationList", returnValue.allocationList);
                    component.set("v.itemList", returnValue.itemList);
                    component.set("v.liquidationList", returnValue.liquidationList);
                    
                    component.set("v.totalAllocation", returnValue.apObj.Activity_percentage__c);
                    component.set("v.totalItem", returnValue.apObj.Activity_Cost__c);
                    component.set("v.totalLiquidation", returnValue.apObj.Liquidation_Cost__c);
                    // #INC-391862
                    //var crop = {val: returnValue.apObj.Crop__c, text: returnValue.apObj.Crop__r.Name, object:"Crop__c"};
                    //component.set("v.selectCR", crop);
                }
            });
            $A.enqueueAction(action);
            
        }
    },
    
    saveFormData : function(component, event, helper) {
        helper.validateForm(component);
        
        var isValid = component.get("v.isValid");
        
        if(isValid){
            // show spinner to true on click of a button / onload
            component.set("v.showSpinner", true);
            
            var action = component.get("c.saveRecord");
            var apObj = component.get("v.apObj");
            var allocationString = component.get("v.allocationList");
            var itemString = component.get("v.itemList");
            var liquidationString = component.get("v.liquidationList");
            
            action.setParams({
                apObj: apObj,
                allocationString: JSON.stringify(allocationString),
                itemString: JSON.stringify(itemString),
                liquidationString: JSON.stringify(liquidationString)
            });
            
            action.setCallback(this, function(a) {
                
                // on call back make it false ,spinner stops after data is retrieved
                component.set("v.showSpinner", false); 
                
                var state = a.getState();
                console.log('state: '+JSON.stringify(state));  
                
                if (state == "SUCCESS") {
                    var returnValue = a.getReturnValue();
                    //console.log('returnValue: '+JSON.stringify(returnValue)); 

                    // Get the component event by using the
                    // name value from aura:registerEvent
                    var mktEvent = component.getEvent("mktEvent");
                    mktEvent.setParams({
                        "message" : "" });
                    mktEvent.fire();
                    
                    helper.showToast(component, 'Record saved Successfully.');
                }
                else{
                   // helper.showErrorToast(component, 'Marketing Requisition  is already submitted for approval. Please RECALL approval process to edit the record.');
                    helper.showErrorToast(component, 'Some error has occurred. Please contact System Administrator.');
                }
            });
            $A.enqueueAction(action);
        }
    },
    
    // Restrict Negative Discount Values
    restrictNegativeValue: function(component, event, helper){
        var target = event.getSource();  
        var value = target.get("v.value");
        
        //Logic to restrict negative value
        if(!value){
            value = 0;
        }
        else{
            var valueString = value.toString(); //Convert to string
            value = parseFloat(valueString.replace("-", "")); //Replace negative sign
        }
        
        target.set("v.value", value);
        //End of logic
    },
    
    handleItemChange: function(component, event, helper) {
        // handle value change
        //console.log("old value (Order Type): " + JSON.stringify(event.getParam("oldValue")));
        //console.log("current value (Order Type): " + JSON.stringify(event.getParam("value")));
        
        //var target = event.getSource();  
        var value = event.getParam("value"); //target.get("v.value");
        var otheritem = component.find('otheritem');
        
        if(value=='LAIN-LAIN'){
            otheritem.set("v.disabled", false);
        }
        else{
            otheritem.set("v.disabled", true);
        }
    },
    
    checkValidPercent: function(component, event, helper){
        var target = event.getSource();  
        var value = target.get("v.value");
        if(value > 100){
            value = null;
            target.set("v.errors",[{message: 'Allocation Percentage should not be greater than 100%'}]);     
        }
        else{
			target.set("v.errors",null); 
        }
        target.set("v.value", value);
    },

})