import { LightningElement, api } from 'lwc';

export default class Grz_RecordListCmp extends LightningElement {
    @api record;
    @api fieldname;
    @api iconname;

    handleSelect(event){
        event.preventDefault();
        const selectRecord = new CustomEvent(
            "select",
            {
                detail : this.record.Id
            }
        );
        /*eslint-disable no-console*/
        //console.log('this.record.Id');
        /* fire the event to be handled on the Parent Component */
        this.dispatchEvent(selectRecord);
    }
}