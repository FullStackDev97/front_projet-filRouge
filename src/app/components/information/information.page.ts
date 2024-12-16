import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {InformationService} from "../../services/information/information.service";
import {Information} from "../../dto/model/information";

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {

  information: Information | undefined;

  constructor(
    private route: ActivatedRoute,
    private informationService: InformationService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadInformation(parseInt(id, 10));
    }
  }

  loadInformation(id: number) {
    this.informationService.getInformation(id).subscribe({
      next: (data) => {
        this.information = data;
      },
      error: (error) => {
        console.error('Failed to load information', error);
      }
    });
  }

}
