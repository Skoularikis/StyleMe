export class GlobalApp {

constructor() {}


public localStorageItem(): string {
    return localStorage.getItem('userId');
}

}
