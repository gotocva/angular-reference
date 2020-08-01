import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LocalService {

    private storage= new Subject();

    watch(){
        return this.storage.asObservable();
    }

    setItem(key: string, data: any) {
        if(typeof data != 'string') data = JSON.stringify(data);
        localStorage.setItem(key, data);
        this.storage.next(data);
    }

    getItem(key: string) {
        const data = localStorage.getItem(key);
        try {
            return JSON.parse(data);
        } catch (error) {
            return data;
        }
    }

    clear() {
        this.storage.unsubscribe();
        localStorage.clear();
    }
}
