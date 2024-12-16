import { Component, OnInit } from '@angular/core';
import {NouveauteBnaque} from "../../dto/model/nouveauteBnaque";
import {ActivatedRoute} from "@angular/router";
import {NouveauteBanqueService} from "../../services/nouveauteBanque/nouveaute-banque.service";

@Component({
  selector: 'app-nouveaute-detail',
  templateUrl: './nouveaute-detail.page.html',
  styleUrls: ['./nouveaute-detail.page.scss'],
})
export class NouveauteDetailPage implements OnInit {
  nouveaute: NouveauteBnaque | undefined;

  constructor(
    private route: ActivatedRoute,
    private nouveauteBanqueService: NouveauteBanqueService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadNouveaute(parseInt(id, 10));
    }
  }

  loadNouveaute(id: number) {
    this.nouveauteBanqueService.getNouveauteBnaque(id).subscribe({
      next: (data) => {
        this.nouveaute = data;
      },
      error: (error) => {
        console.error('Failed to load nouveaute', error);
      }
    });
  }

}
