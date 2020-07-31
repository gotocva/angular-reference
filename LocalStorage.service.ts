import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LocalStorageService {

    private storage= new Subject();

    watch(){
        return this.storage.asObservable();
    }

    setItem(key: string, data: any) {
        localStorage.setItem(key, data);
        this.storage.next(data);
    }

    getItem(key: string) {
        return localStorage.getItem(key);
    }

    clear() {
        this.storage.unsubscribe();
        localStorage.clear();
    }
}
