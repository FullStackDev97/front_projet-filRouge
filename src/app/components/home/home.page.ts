import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NouveauteBnaque} from "../../dto/model/nouveauteBnaque";
import {NouveauteBanqueService} from "../../services/nouveauteBanque/nouveaute-banque.service";
import {Router} from "@angular/router";
import {Information} from "../../dto/model/information";
import {InformationService} from "../../services/information/information.service";
import { register } from 'swiper/element/bundle';
import Swiper from "swiper";

register();
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage  implements OnInit {
  @ViewChild('swiperPaginationNouveautes', { static: false }) swiperPaginationNouveautes: ElementRef | undefined;
  @ViewChild('swiperPaginationInformations', { static: false }) swiperPaginationInformations: ElementRef | undefined;

  nouveautes: NouveauteBnaque[] = [];
  informations: Information[] = [];

  swiperConfigNouveautes: any = {
    slidesPerView: 1.2,
    spaceBetween: 10,
    pagination: {
      el: undefined,
      clickable: true,
    },
  };

  swiperConfigInformations: any = {
    slidesPerView: 1.2,
    spaceBetween: 10,
    pagination: {
      el: undefined,
      clickable: true,
    },
  };

  constructor(private nouveauteBanqueService: NouveauteBanqueService,
              private router: Router,
              private informationService: InformationService
  ) {}

  ngOnInit() {
    this.loadNouveautes();
    this.loadInformation();
  }

  ngAfterViewInit() {
    if (this.swiperPaginationNouveautes && this.swiperPaginationNouveautes.nativeElement) {
      this.swiperConfigNouveautes.pagination.el = this.swiperPaginationNouveautes.nativeElement;
      new Swiper('.swiper-container', this.swiperConfigNouveautes);
    }
    if (this.swiperPaginationInformations && this.swiperPaginationInformations.nativeElement) {
      this.swiperConfigInformations.pagination.el = this.swiperPaginationInformations.nativeElement;
      new Swiper('.swiper-container', this.swiperConfigInformations);
    }
  }

  loadNouveautes() {
    this.nouveauteBanqueService.getAllNouveauteBnaques().subscribe({
      next: (data) => {
        this.nouveautes = data;
      },
      error: (error) => {
        console.error('Failed to load nouveautés', error);
      }
    });
  }

  loadInformation() {
    this.informationService.getAllInformations().subscribe({
      next: (data) => {
        this.informations = data;
      },
      error: (error) => {
        console.error('Failed to load informations', error);
      }
    });
  }
  viewNouveaute(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigate(['/nouveaute-detail', id]);
    } else {
      console.error('Invalid nouveaute ID:', id);
    }
  }

  viewInformation(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigate(['/information', id]);
    } else {
      console.error('Invalid information ID:', id);
    }
  }
}
