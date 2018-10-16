//https://medium.com/@amcdnl/global-error-handling-with-angular2-6b992bdfb59c
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MyerrorhandlerComponent } from './myerrorhandler/myerrorhandler.component';
import { ACTIVITY_TIMEOUT_OCCURRED } from './session.store';

@Injectable()
export class Myerrorhandler implements ErrorHandler {
    dialog: MatDialog;
    error: string;
    result: string;
    constructor(private injector: Injector) { }
    handleError(error) {
        this.dialog = this.injector.get(MatDialog)
        console.log("my custom error handler " + error)
        this.error = error.message;
        //getting data access error after logout, which it shouldn't matter at this time
        if (error.message.indexOf("Client doesn't have permission to access the desired data") < 0)
            this.openDialog();
        //throw error;
    }
    openDialog(): void {
        let dialogRef = this.dialog.open(MyerrorhandlerComponent, {
            width: '250px',
            data: { error: this.error }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.result = result;
        });
    }
}