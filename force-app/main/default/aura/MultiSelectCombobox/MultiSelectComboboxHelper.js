({
    doInitHelper : function(component) {
        $A.util.toggleClass(component.find('resultsDiv'),'slds-is-open');
        var value = component.get('v.value');
        var values = component.get('v.values');
 if( !$A.util.isEmpty(value) || !$A.util.isEmpty(values) ) {
            var searchString;
         var count = 0;
            var multiSelect = component.get('v.multiSelect');
 var options = component.get('v.options');
            options.forEach( function(element, index) {
                if(multiSelect) {
                    if(values.includes(element.value)) {
                        element.selected = true;
                        count++;
                    }  
                } else {
                    if(element.value == value) {
                        searchString = element.label;
                    }
                }
            });
            if(multiSelect)
                component.set('v.searchString', count + ' '+$A.get("$Label.c.Grz_OptionsSelected"));
            else
                component.set('v.searchString', searchString);
            component.set('v.options', options);
 }
    },
    
    filterOptionsHelper : function(component) {
        component.set("v.message", '');
        var searchText = component.get('v.searchString');
 var options = component.get("v.options");
 var minChar = component.get('v.minChar');
 if(searchText.length >= minChar) {
            var flag = true;
 options.forEach( function(element,index) {
     console.log('element'+element);
                if(element.label.toLowerCase().trim().startsWith(searchText.toLowerCase().trim())) {
 element.isVisible = true;
                    flag = false;
                } else {
 element.isVisible = false;
                }
 });
 component.set("v.options",options);
            if(flag) {
                component.set("v.message", $A.get("$Label.c.Grz_NoDataFound")+" '" + searchText + "'");
            }
 }
        $A.util.addClass(component.find('resultsDiv'),'slds-is-open');
 },
    
    selectItemHelper : function(component, event) {
        var options = component.get('v.options');
        var multiSelect = component.get('v.multiSelect');
        var searchString = component.get('v.searchString');
        var values = component.get('v.values') || [];
        var value;
        var count = 0;
        options.forEach( function(element, index) {
            if(element.value === event.currentTarget.id) {
                if(multiSelect) {
                    if(values.includes(element.value)) {
                        values.splice(values.indexOf(element.value), 1);
                    } else {
                        values.push(element.value);
                    }
                    element.selected = element.selected ? false : true;   
                } else {
                    value = element.value;
                    searchString = element.label;
                }
            }
            if(element.selected) {
                count++;
            }
        });
        component.set('v.value', value);
        component.set('v.values', values);
        console.log('options->>',options);
        component.set('v.options', options);
        if(multiSelect)
            component.set('v.searchString', count + ' '+$A.get("$Label.c.Grz_OptionsSelected"));
        else
            component.set('v.searchString', searchString);
        if(multiSelect)
            event.preventDefault();
        else
         $A.util.removeClass(component.find('resultsDiv'),'slds-is-open');
        
        
        if(count == 0){
            component.set('v.searchString',$A.get("$Label.c.All"));
        }
         var compEvent = component.getEvent("MultiSelectComboboxEvent");
        compEvent.setParams({
            "SelectedDistributor" : options , "count" : count
        });
        compEvent.fire();
        
    },
    
      clearAll : function(component, event) {
        var value = event.getSource().get('v.name');
        var multiSelect = component.get('v.multiSelect');
        var count = 0;
        var options = component.get("v.options");
        var values = component.get('v.values') || [];
        options.forEach( function(element, index) {
            // if(element.value === value) {
            element.selected = false;
            values.splice(values.indexOf(element.value), 1);
            //  }
            if(element.selected) {
                count++;
            }
        });
        if(multiSelect)
            component.set('v.searchString', count + ' '+$A.get("$Label.c.Grz_OptionsSelected"));
        component.set('v.values', values)
        component.set("v.options", options);
        
        if(count == 0){
            component.set('v.searchString',$A.get("$Label.c.All"));
        }
        
        var compEvent = component.getEvent("MultiSelectComboboxEvent");
        compEvent.setParams({
            "SelectedDistributor" : options , "count" : count
        });
        compEvent.fire();
    },
    
    removePillHelper : function(component, event) {
        var value = event.getSource().get('v.name');
        var multiSelect = component.get('v.multiSelect');
        var count = 0;
        var options = component.get("v.options");
        var values = component.get('v.values') || [];
        options.forEach( function(element, index) {
            if(element.value === value) {
                element.selected = false;
                values.splice(values.indexOf(element.value), 1);
            }
            if(element.selected) {
                count++;
            }
        });
        if(multiSelect)
         component.set('v.searchString', count + ' '+ $A.get("$Label.c.Grz_OptionsSelected"));
        component.set('v.values', values)
        component.set("v.options", options);
        
      //  alert('remove');
    },
    
    blurEventHelper : function(component, event) {
        var selectedValue = component.get('v.value');
        var multiSelect = component.get('v.multiSelect');
        var previousLabel;
        var count = 0;
        var options = component.get("v.options");
        options.forEach( function(element, index) {
            if(element.value === selectedValue) {
                previousLabel = element.label;
            }
            if(element.selected) {
                count++;
            }
        });
        if(multiSelect){
            console.log('count'+count)
         component.set('v.searchString', count + ' '+$A.get("$Label.c.Grz_OptionsSelected"));
         if(count == 0){
            component.set('v.searchString',$A.get("$Label.c.All"));
        }
        }
        else
         component.set('v.searchString', previousLabel);
        
     if(multiSelect)
         $A.util.removeClass(component.find('resultsDiv'),'slds-is-open');
    }
})