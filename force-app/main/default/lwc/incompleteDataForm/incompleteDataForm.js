import { LightningElement, wire } from 'lwc';
import getData from '@salesforce/apex/getData.getAccountData';
import { refreshApex } from '@salesforce/apex';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const columns = [
    { label: 'Account Name', fieldName: 'Name',editable : 'true', typeAttributes: { linkify: true } },
    { label: 'Site', fieldName: 'Site',editable : 'true' },
    { label: 'Rating', fieldName: 'Rating',editable : 'true' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' ,editable : 'true'},
];
export default class IncompleteDataForm extends LightningElement {
    error;
    columns = columns;

    @wire(getData)
    Accounts;
    connectedCallback(){
        console.log(getData);
    }
    handleSave(event) {
        const recordInputs =  event.detail.draftValues.slice().map(draft => {
            const fields = Object.assign({}, draft);
            return { fields };
        });
    
        const promises = recordInputs.map(recordInput => updateRecord(recordInput));
        Promise.all(promises).then(account => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Accounts updated',
                    variant: 'success'
                })
            );
             // Clear all draft values
             this.draftValues = [];
    
             // Display fresh data in the datatable
             return refreshApex(this.account);
        }).catch(error => {
            // Handle error
        });
    }

    
}