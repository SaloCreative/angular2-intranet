import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { Client } from './client';
import { ClientService } from './client.service';

@Component({
    selector: 'client-detail',
    templateUrl: 'views/clients/client-detail.component.html',
    providers: [ClientService]
})
export class ClientDetailComponent implements OnInit {
    client: Client;

    constructor(
        private clientService: ClientService,
        private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.clientService.getClient(id)
                .then(client => this.client = client);
        });
    }

    save(): void {
        this.clientService.update(this.client)
            .then(this.goBack);
    }

    goBack(): void {
        window.history.back();
    }
}