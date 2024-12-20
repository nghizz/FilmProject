import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SharedDataService {
    private customerId: number | null = null;
    private customerName: string | null = null;

    constructor() {
        const storedId = localStorage.getItem('customerId');
        const storedName = localStorage.getItem('username');
        if (storedId) this.customerId = Number(storedId);
        if (storedName) this.customerName = storedName;
    }

    setCustomerId(id: number) {
        this.customerId = id;
        localStorage.setItem('customerId', id.toString());
    }

    setCustomerName(name: string) {
        this.customerName = name;
        localStorage.setItem('username', name);
    }

    getCustomerId(): number | null {
        return this.customerId;
    }

    getCustomerName(): string | null {
        return this.customerName;
    }

    clearCustomerData() {
        this.customerId = null;
        this.customerName = null;
        localStorage.removeItem('customerId');
        localStorage.removeItem('username');
    }
}
