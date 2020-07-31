
import {ConnectionService} from 'ng-connection-service';

export class BaseComponent {

    private connection;

    constructor() {
        this.connection = new ConnectionService();
        // check internet connection
        this.connection.monitor().subscribe(isConnected => {
            // TODO display some alert message
            if(isConnected == false) alert(`Your internet connection disconnected`);
        });
    }

    storageChanged(event: StorageEvent) {
        // if changed key is null means localstorage cleared
        console.log('changed key : '+event.key);
        console.log(event.newValue);        
    }

    logSomething(){
        console.log(`log from base component ------------------ `);
    }
}
