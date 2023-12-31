/* eslint-disable @lwc/lwc/no-async-operation */
/* eslint-disable @lwc/lwc/no-document-query */
/* eslint-disable no-console */
import { LightningElement, track, api, wire } from 'lwc';
import searchedList from '@salesforce/apex/LiquidationLookupController.searchedList';
import searchedListPoland from '@salesforce/apex/LiquidationLookupControllerPoland.searchedListPoland'
//import getSeletedRecords from '@salesforce/apex/SelectedRecords.getSeletedRecords';
import { CurrentPageReference } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { fireEvent, registerListener } from 'c/pubsub';
import All from '@salesforce/label/c.All';
import None from '@salesforce/label/c.None';
import Remove from '@salesforce/label/c.Grz_Remove';
export default class Liquidationlookupcmps extends LightningElement {
    // public Properties
 @api sobject;
 @api fieldname;
 @api multiselect;
 @api iconname;
 @api placeholder;
 @api dependent=false;
 @api parentvalue='';
 @api disable=false;
 @api required=false;
 @api filter;
 @api displayfield;
 @api singleselectedrec='';
 @api cmpwidth ='long';
 


 // private Properties
 @track searchRecords = undefined;
 @track selectedRecords = [];
 @track i=0;
 @track message = false;
 @track flag;
 @track recordDataseleted;
 @api recordData = [];
 @track require_attribute=false;

 @track recordVisibility = false;
 @track spinner_flag = false;

 @track mouse_enter;
 @track mouse_leave;
 @track btn_flag;
 @track btn_clear = false;
 @track is_multiple;
 @track hidebox ='';
// @track disable = false;
 @track deleteitemdetail = false;
 @track textboxclass='';
 @track dropdownClass=''
 @track hasRendered = true;
 @track hasRenderedData = true;
 @track labels ={All:All,
                None:None,
                Remove :Remove}

 @api issingle;
 @api ispoland=false;
 @wire(CurrentPageReference) pageRef;
 connectedCallback() {
     this.is_multiple = JSON.parse(this.multiselect);
     console.log('disable connected',this.dependent);
     console.log('ispoland==>',this.ispoland);
 }
 renderedCallback(){
     
     console.log('lookup cmp')
     if(this.singleselectedrec!==''){
         this.hidebox = 'hideboxcss';
     }else{
         this.hidebox = '';
     }
     console.log('disable rendered',this.dependent);
     if(this.dependent!==undefined){
         this.dependent =  JSON.parse(this.dependent);
         if(this.dependent===true){
             console.log('start registerListener');
             registerListener("deleteitems",this.deleteItemdetails,this);
             registerListener("selectitems",this.selectitemsdetails,this);
             //registerListener("disblesku",this.disablesku,this);
             //console.log('end registerListener');
         }       
     }
     if(this.spinner_flag==true){
     if(this.required === true){
         if(this.singleselectedrec==''|| this.singleselectedrec==undefined){
             this.require_attribute = true;
         }else{
             this.require_attribute = false;
         }
     }
     }

     if(this.cmpwidth==='long'){
         this.textboxclass = 'slds-input mytextb';
         this.dropdownClass = 'dropdownb dropdown slds-scrollable'
     }else{
         this.textboxclass = 'slds-input mytextbsmall';
         this.dropdownClass = 'dropdownsmall dropdown slds-scrollable';
     }
     if(this.hasRendered){
         if(this.parentvalue==='' && this.dependent===true){
            this.disable = true;
         }
         this.hasRendered = false;
     }
     console.log('disable ',this.disable);
     console.log('this.hasRenderedData out side IF-->',this.hasRenderedData);
     if(this.hasRenderedData==true){
         if(!this.ispoland){
            searchedList({ obj: this.sobject, name: this.fieldname, value: '',filter:this.filter,displayfield:this.displayfield })
            .then(data => {
                console.log('select id,'+this.fieldname+' from '+this.sobject+' '+this.filter+' and '+this.displayfield);
                // data = [];
                let temp = {
                    recId:'',
                   recName:this.labels.All
                }
                console.log(`Wired Data obj ${this.sobject}`,data);
                if(data.length>1){
                    data.unshift(temp);
                }
                this.flag = true;
                this.btn_flag = false;
                this.message = false;
                this.searchRecords = data;
                if (data.length === 0) {
                    this.searchRecords = undefined;
                    this.message = true;
                    this.flag = false;
                    this.btn_flag = true;
                }
                this.spinner_flag = false;
                let event;   
                if(data.length>0){
                event = {
                    target : {
                        dataset: {
                            val : data[0].recId,
                            name: data[0].recName
                               }
                        }   
                    }
                }else{
                    event = {
                        target : {
                            dataset: {
                                val : 'none',
                                name: this.labels.None
                                }
                            }   
                        }
                }
            this.setSelectedrecord(event);
            }).catch(err=>{
                console.log('select id,'+this.fieldname+' from '+this.sobject+' '+this.filter+' and '+this.displayfield+' like');
                console.log('onload search record ',err);
            });
            this.hasRenderedData = false;
            console.log('this.hasRenderedData inside IF-->',this.hasRenderedData);
         }
        else{
            searchedListPoland({ obj: this.sobject, name: this.fieldname, value: '',filter:this.filter,displayfield:this.displayfield })
        .then(data => {
            console.log('select id,'+this.fieldname+' from '+this.sobject+' '+this.filter+' and '+this.displayfield);
            // data = [];
            let temp = {
                recId:'',
               recName:this.labels.All
            }
            console.log(`Wired Data obj ${this.sobject}`,data);
            if(data.length>1){
                data.unshift(temp);
            }
            this.flag = true;
            this.btn_flag = false;
            this.message = false;
            this.searchRecords = data;
            if (data.length === 0) {
                this.searchRecords = undefined;
                this.message = true;
                this.flag = false;
                this.btn_flag = true;
            }
            this.spinner_flag = false;
            let event;   
            if(data.length>0){
            event = {
                target : {
                    dataset: {
                        val : data[0].recId,
                        name: data[0].recName
                           }
                    }   
                }
            }else{
                event = {
                    target : {
                        dataset: {
                            val : 'none',
                            name: this.labels.None
                            }
                        }   
                    }
            }
        this.setSelectedrecord(event);
        }).catch(err=>{
            console.log('select id,'+this.fieldname+' from '+this.sobject+' '+this.filter+' and '+this.displayfield+' like');
            console.log('onload search record ',err);
        });
        this.hasRenderedData = false;
        console.log('this.hasRenderedData inside IF-->',this.hasRenderedData);
        }
     }
    
 }



 deleteItemdetails(items){
     this.deleteitemdetail = true;
     this.hasRendered = true;
     this.clearAllselected(items);
    // console.log('Parent value on delete',this.parentvalue);
     if(this.parentvalue===''){
             this.disable = true;
     }else{
         console.log('Depented ',this.dependent);
         if(this.dependent && this.parentvalue==items.data){
             this.disable = true;    
         }else{
         this.disable = false;
         }
     }
 }
 selectitemsdetails(item){
     this.hasRendered = true;
     console.log("p v",this.parentvalue);
     this.disable = false;
   //  console.log('disable false');
 }
 disablesku(){
   //  this.disable = true;
 }
 
 // ****************** called when click on Search box
 searchField(event) {
     this.spinner_flag = true;
     let text ='';
     if(this.dependent===true){
         text = this.parentId;
     }else{
         text = event.target.value;
     }
     console.log(`{ obj: ${this.sobject}, name: ${this.fieldname}, value: ${text},filter:${this.filter},dependent:${this.dependent},displayfield:${this.displayfield}`);
     console.log('select id,'+this.fieldname+' from '+this.sobject+' '+this.filter+' and '+this.displayfield+' like','%'+text);
     if(!this.ispoland){
        searchedList({ obj: this.sobject, name: this.fieldname, value: text,filter:this.filter,displayfield:this.displayfield })
        .then(data => {
            let temp = {
                recId:'',
               recName:this.labels.All
            }
            let none = {
               recId:'none',
              recName:this.labels.None
           }
            console.log('Data --',data);
            if(data.length>1){
               data.unshift(temp);
            }
            if(data.length==0){
                data.unshift(none);
            }
            this.flag = true;
            this.btn_flag = false;
            this.message = false;
            this.searchRecords = data;
            if (data.length === 0) {
                this.searchRecords = undefined;
                this.message = true;
                this.flag = false;
                this.btn_flag = true;
            }
            this.spinner_flag = false;
        }).catch(error => {
            console.log('ERR-->',error);
            this.flag = true;
            let data  = [];
            let none = {
               recId:'none',
              recName:this.labels.None
           }
           data.unshift(none);
            this.searchRecords = data;
            console.log('data no found ',this.searchRecords);
            this.spinner_flag = false;
        })
     }
     else{
        searchedListPoland({ obj: this.sobject, name: this.fieldname, value: text,filter:this.filter,displayfield:this.displayfield })
        .then(data => {
            let temp = {
                recId:'',
               recName:this.labels.All
            }
            let none = {
               recId:'none',
              recName:this.labels.None
           }
            console.log('Data --',data);
            if(data.length>1){
               data.unshift(temp);
            }
            if(data.length==0){
                data.unshift(none);
            }
            this.flag = true;
            this.btn_flag = false;
            this.message = false;
            this.searchRecords = data;
            if (data.length === 0) {
                this.searchRecords = undefined;
                this.message = true;
                this.flag = false;
                this.btn_flag = true;
            }
            this.spinner_flag = false;
        }).catch(error => {
            console.log('ERR-->',error);
            this.flag = true;
            let data  = [];
            let none = {
               recId:'none',
              recName:this.labels.None
           }
           data.unshift(none);
            this.searchRecords = data;
            console.log('data no found ',this.searchRecords);
            this.spinner_flag = false;
        })
     }
 }

 // ******************** Called when Click on particular record
 setSelectedrecord(event) {

     this.spinner_flag = true;
     const recid = event.target.dataset.val;
     const recname = event.target.dataset.name;
     let newObj = { 'recId': recid, 'recName': recname };
     if (this.is_multiple === true) {
        
         let dublele = this.selectedRecords.find(obj => obj.recName === newObj.recName);
         if (dublele === undefined) {

             this.selectedRecords.push(newObj);
             this.recordData.push(recid);
             this.btn_clear = true;
             this.spinner_flag = false;
             this.isSingle=false;
              this.dispatchEvent(new CustomEvent('multiselected',{detail:newObj}));
         }
         this.spinner_flag = false;

         this.flag = false;
         this.btn_flag = true;
     } else {
         if(recname!==undefined){
         this.singleselectedrec = recname;
         this.spinner_flag = false;
         this.flag = false;
         this.isSingle=true;
         const selectEvent = new CustomEvent('selected',{detail:newObj});
         this.dispatchEvent(selectEvent);
         fireEvent(this.pageRef,"selectitems",this.singleselectedrec);
         this.hidebox = 'hideboxcss'
         }
     }

 }

 // ************************** Called when removing any particular Record
 removeHandler(event) {

     const del = event.target.dataset.val;
     //console.log("items " + this.recordData);
     let sel_rec = this.recordData;
     let records = this.selectedRecords;
     records.splice(del, 1);
     sel_rec.splice(del, 1);
     this.selectedRecords = records;
     this.recordData = sel_rec;
     //console.log("deleted item ");
     if (this.recordData.length === 0) {
         this.recordVisibility = false;
         this.btn_clear = false;
     }
 }

 // ***************** called when We want to retrive Data of selected Records

 handleSelectedrecord() {

     if (this.recordData.length === 0) {
         this.recordVisibility = false;
         this.btn_clear = false;
     } else {

         this.spinner_flag = true;
         this.recordVisibility = true;
         //console.log("record data", this.recordData)
         // getSeletedRecords({ lstId: this.recordData, obj: this.sobject })
         //     .then(data => {
         //         this.recordDataseleted = data;
         //         console.log("record data Seleted", this.recordDataseleted);
         //         this.spinner_flag = false;
         //     })
         //     .catch(error => console.log("error in Handle Selecred records", error));
     }
 }

 focusOut_event() {
     if (this.mouse_leave === true) {
         this.flag = false;
     } else {
         //console.log("hello");
     }
 }

 mouseIn() {
     this.mouse_enter = true;
     this.mouse_leave = false;
     //console.log("mouse enter", this.mouse_enter);
 }
 mouseOut() {
     this.mouse_leave = true;
     this.mouse_enter = false;
     //console.log("mouse enter", this.mouse_enter);
 }

 // ******************* use to Clear All selected Records
 clearAllselected(item) {
     console.log('Clear ALl')
     this.searchRecords = undefined;
     this.selectedRecords = [];
     this.recordData = [];
     this.btn_clear = false;
     console.log('Item ',item)
     if(item.parent=='parent'){
         console.log('parent value ',this.parentvalue,'data ',item.data);
         if(this.parentvalue==item.data){
         this.singleselectedrec = '';
         this.parentvalue = '';
         }
     }else{
         this.singleselectedrec ='';
     }

     this.hidebox = ''
 }

 removeSingleHandler(event) {
     // this.is_multiple = true;
     console.log('event  ',event.target.label,'selected rec',this.singleselectedrec);
     console.log("remove conntroller");
     const removeEvent = new CustomEvent('remove',{detail:this.singleselectedrec});
     this.dispatchEvent(removeEvent);
     if(this.dependent){
         fireEvent(this.pageRef,"deleteitems",{parent:'child','data':this.singleselectedrec});
         this.singleselectedrec = ''
         this.hidebox = '';
     }else{
         fireEvent(this.pageRef,"deleteitems",{parent:'parent','data':this.singleselectedrec});
         this.singleselectedrec = ''
         this.hidebox = '';
     }
    
 }
}