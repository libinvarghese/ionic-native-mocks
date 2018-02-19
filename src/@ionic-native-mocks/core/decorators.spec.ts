import 'core-js';
import {
  IonicNativePlugin,
  Plugin,
  Cordova,
  CordovaProperty,
  CordovaCheck,
  CordovaInstance,
  InstanceProperty,
} from '@ionic-native/core';
import { MockCordovaProperty } from './decorators';
import { Observable } from 'rxjs/Observable';

declare const window: any;

class TestObject {

  constructor(public _objectInstance: any) {}

  @InstanceProperty
  name: string;

  @CordovaInstance({ sync: true })
  pingSync(): string { return; }

  @CordovaInstance()
  ping(): Promise<any> { return; }

}

@Plugin({
  pluginName: 'TestPlugin',
  pluginRef: 'testPlugin',
  repo: '',
  plugin: 'cordova-plugin-my-plugin',
  platforms: ['Android', 'iOS']
})
class TestPlugin extends IonicNativePlugin {

  @CordovaProperty
  name: string;

  @Cordova({ sync: true })
  pingSync(): string { return; }

  @Cordova()
  ping(): Promise<string> { return; }

  @CordovaCheck()
  customPing(): Promise<string> {
    return Promise.resolve('pong');
  }

  create(): TestObject {
    return new TestObject(TestPlugin.getPlugin().create());
  }

  @Cordova({
    destruct: true
  })
  destructPromise(): Promise<any> { return; }

  @Cordova({
    destruct: true,
    observable: true
  })
  destructObservable(): Observable<any> { return; }

}

function definePlugin() {
  (window as any).testPlugin = {
    name: 'John Smith',
    ping: (success: Function, error: Function) => success('pong'),
    pingSync: () => 'pong',
    create: function TestObject() {
      this.pingSync = () => 'pong';
      this.ping = (success: Function, error: Function) => success('pong');
      this.name = 'John Smith';
      return this;
    },
    destructPromise: (success: Function) => success('hello', 'world'),
    destructObservable: (success: Function) => success('hello', 'world')
  };
}

class MockTestPlugin extends TestPlugin {
  @MockCordovaProperty('Mock Value')
  name: string;
}

describe('Mock Cordova Property', () => {

  let plugin: MockTestPlugin;

  beforeEach(() => {
    plugin = new MockTestPlugin();
    definePlugin();
  });

  describe('MockCordovaProperty', () => {

    it('should return property value', () => {
      expect(plugin.name).toEqual('Mock Value');
    });

    it('should set property value', () => {
      plugin.name = 'value2';
      expect(plugin.name).toEqual('value2');
    });

  });
});
