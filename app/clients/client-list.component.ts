import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderBy } from "../app/app.orderBy"

import { Client } from './client';
import { ClientService } from './client.service';


@Component({
    selector: 'client-list',
    templateUrl: 'views/clients/client-list.component.html',
    pipes: [OrderBy],
    providers: [ClientService]
})
export class ClientListComponent implements OnInit {
    clients: Client[];
    selectedClient: Client;
    errorMessage: string;

    constructor(
        private router: Router,
        private clientService: ClientService
    ) { }

    getClients(): void {
        this.clientService.getClients()
            .then(clients => this.clients = clients,
            error =>  this.errorMessage = <any>error);
    }

    add(fldCompanyName: string): void {
        fldCompanyName = fldCompanyName.trim();
        if (!fldCompanyName) { return; }
        this.clientService.create(fldCompanyName)
            .then(client => {
                this.clients.push(client);
                this.selectedClient = null;
            });
    }

    delete(client: Client): void {
        this.clientService
            .delete(client.fldClientID)
            .then(() => {
                this.clients = this.clients.filter(h => h !== client);
                if (this.selectedClient === client) { this.selectedClient = null; }
            });
    }



    ngOnInit(): void {
        this.getClients();
    }

    onSelect(client: Client): void {
        this.selectedClient = client;
    }

    gotoDetail(): void {
        this.router.navigate(['/clients', this.selectedClient.fldClientID]);
    }
}