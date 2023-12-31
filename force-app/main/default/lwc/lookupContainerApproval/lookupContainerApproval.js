import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import apexSearch from '@salesforce/apex/UserLookupControllerApprove.search';

export default class LookupContainerApproval extends LightningElement {
    // Use alerts instead of toast to notify user
    @api notifyViaAlerts = false;

    @track isMultiEntry = false;
    @track initialSelection = [];
    @track errors = [];

    handleLookupTypeChange(event) {
        this.initialSelection = [];
        this.errors = [];
        this.isMultiEntry = event.target.checked;
    }

    handleSearch(event) {
        apexSearch(event.detail)
            .then(results => {
                this.template
                    .querySelector('c-lookupapproval')
                    .setSearchResults(results);
            })
            .catch(error => {
                this.notifyUser(
                    'Lookup Error',
                    'An error occured while searching with the lookup field.',
                    'error'
                );
                // eslint-disable-next-line no-console
                console.error('Lookup error', JSON.stringify(error));
                this.errors = [error];
            });
    }

    handleSelectionChange(event) {
        this.dispatchEvent(new CustomEvent('selectionchange', {
            detail: {
                value: event.detail.value
            }
        }));
        this.errors = [];
    }

    // handleSubmit() {
    //     this.checkForErrors();
    //     if (this.errors.length === 0) {
    //         this.notifyUser('Success', 'The form was submitted.', 'success');
    //     }
    // }

    checkForErrors() {
        const selection = this.template
            .querySelector('c-lookupapproval')
            .getSelection();
        if (selection.length === 0) {
            this.errors = [
                { message: 'You must make a selection before submitting!' },
                { message: 'Please make a selection and try again.' }
            ];
        } else {
            this.errors = [];
        }
    }

    notifyUser(title, message, variant) {
        if (this.notifyViaAlerts) {
            // Notify via alert
            // eslint-disable-next-line no-alert
            alert(`${title}\n${message}`);
        } else {
            // Notify via toast
            const toastEvent = new ShowToastEvent({ title, message, variant });
            this.dispatchEvent(toastEvent);
        }
    }
}