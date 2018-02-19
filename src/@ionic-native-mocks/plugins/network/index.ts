import { Network } from '@ionic-native/network';
import { Observable } from 'rxjs/Observable';
import { merge } from 'rxjs/observable/merge';
import { Subject } from 'rxjs';

export class NetworkMock extends Network {
    private _onDisconnect = new Subject();
    private _onConnect = new Subject();
    /**
     * Connection type
     * The `type` property will return one of the following connection types: `unknown`, `ethernet`, `wifi`, `2g`, `3g`, `4g`, `cellular`, `none`
     * @return {string}
     */
    private __type: string;

    constructor() {
      super();
      this.type = 'cellular';
    }

    get type(): string {
        return this.__type;
    };
    set type(t: string) {
        if (this.__type !== t) {
            this.__type = t;
            if (t === 'none') {
                this._onDisconnect.next(null);
            } else {
                this._onConnect.next(null);
            }
        }
    }
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
        return this._onDisconnect.asObservable();
    }
    /**
     * Get notified when the device goes online
     * @returns {Observable<any>} Returns an observable.
     */
    onConnect(): Observable<any> {
        return this._onConnect.asObservable();
    }
}
