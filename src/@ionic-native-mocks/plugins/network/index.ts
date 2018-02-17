import { Network } from '@ionic-native/network';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { never } from 'rxjs/observable/never';
import { merge } from 'rxjs/observable/merge';
import { MockCordovaProperty } from '@ionic-native-mocks/core';

export class NetworkMock extends Network {
    /**
     * Connection type 
     * The `type` property will return one of the following connection types: `unknown`, `ethernet`, `wifi`, `2g`, `3g`, `4g`, `cellular`, `none`
     * @return {string}
     */
    @MockCordovaProperty('cellular')
    type: string;
    /**
     * Downlink Max Speed
     * @return {string}
     */
    downlinkMax: string;
    /**
     * Returns an observable to watch connection changes
     * @return {Observable<any>}
     */
    onchange(): Observable<any> {
        return merge(this.onConnect(), this.onDisconnect());
    }
    /**
     * Get notified when the device goes offline
     * @returns {Observable<any>} Returns an observable.
     */
    onDisconnect(): Observable<any> {
        return never();
    }
    /**
     * Get notified when the device goes online
     * @returns {Observable<any>} Returns an observable.
     */
    onConnect(): Observable<any> {
        return Observable.create( (observer: Observer<any>) => {
            observer.next(null);
        });
    }
}
