import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavorisService } from "../../services/favoris/favoris.service";
import {OffreImmobilier} from "../../dto/model/offreImmobilier";

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.page.html',
  styleUrls: ['./favoris.page.scss'],
})
export class FavorisPage implements OnInit {
  favoris: OffreImmobilier[] = [];
  userId: number = Number(localStorage.getItem('userId'));

  constructor(private favorisService: FavorisService, private router: Router) { }

  ngOnInit() {
    this.loadFavoris();
  }

  loadFavoris() {
    this.favorisService.getFavoris(this.userId).subscribe({
      next: (data: OffreImmobilier[]) => {
        this.favoris = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des favoris:', err);
      },
    });
  }

  viewDetails(offreId: number | undefined): void {
    if (offreId !== undefined) {
      this.router.navigate(['/offre-detail-component', offreId]);
    } else {
      console.error('ID de l\offre non valide:', offreId);
    }
  }

  formatTypeBien(typeBien: OffreImmobilier['typeBien'] | undefined): string {

    switch (typeBien) {
      case 'APPARTEMENT':
        return 'Apartment';
      case 'MAISON':
        return 'House';
      case 'VILLA':
        return 'Villa';
      case 'LOFT':
        return 'Loft';
      default:
        return 'Type inconnu';
    }
  }

  getImageUrl(offre: OffreImmobilier | undefined): string {
    return offre?.imageUrls?.[0] || 'assets/placeholder-image.png';
  }

  getChambresText(chambres: OffreImmobilier['chambres'] | undefined): string {
    switch (chambres) {
      case 'S1':
        return '1 Chambre';
      case 'S2':
        return '2 Chambres';
      case 'S3':
        return '3 Chambres';
      case 'S4':
        return '4 Chambres';
      case 'S5':
        return '5 Chambres';
      case 'S6':
        return '6 Chambres';
      default:
        return 'Chambres inconnues';
    }
  }

  getSallesDeBainText(sallesDeBain: OffreImmobilier['sallesDeBain'] | undefined): string {
    switch (sallesDeBain) {
      case 'B1':
        return '1 Salle de bain';
      case 'B2':
        return '2 Salles de bain';
      case 'B3':
        return '3 Salles de bain';
      case 'B4':
        return '4 Salles de bain';
      case 'B5':
        return '5 Salles de bain';
      case 'B6':
        return '6 Salles de bain';
      default:
        return 'Salles de bain inconnues';
    }
  }

  formatAddress(adresse: string | undefined): string {
    if (adresse) {
      return adresse.length > 30 ? adresse.substring(0, 27) + '...' : adresse;
    }
    return 'Adresse non définie';
  }
}
