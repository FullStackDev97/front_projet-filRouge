import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavorisService } from "../../services/favoris/favoris.service";

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.page.html',
  styleUrls: ['./favoris.page.scss'],
})
export class FavorisPage implements OnInit {
  favoris: any[] = [];
  userId: number = Number(localStorage.getItem('userId'));

  constructor(private favorisService: FavorisService, private router: Router) { }

  ngOnInit() {
    this.loadFavoris();
  }

  loadFavoris() {
    this.favorisService.getFavoris(this.userId).subscribe((data) => {
      this.favoris = data;
    });
  }

  viewDetails(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigate(['/offre-detail-component', id]);
    } else {
      console.error('Invalid information ID:', id);
    }
  }

  formatTypeBien(typeBien: string | undefined): string {
    if (!typeBien) {
      return '';
    }
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
        return typeBien;
    }
  }

  getImageUrl(offre: any): string {
    return offre?.imageUrls && offre.imageUrls.length > 0 ? offre.imageUrls[0] : 'assets/placeholder-image.png';
  }

  getChambresText(chambres: string | undefined): string {
    switch (chambres) {
      case 'S1': return '1 Chambre';
      case 'S2': return '2 Chambres';
      case 'S3': return '3 Chambres';
      case 'S4': return '4 Chambres';
      default: return 'Chambres';
    }
  }

  getSallesDeBainText(sallesDeBain: string | undefined): string {
    switch (sallesDeBain) {
      case 'B1': return '1 Salle de bain';
      case 'B2': return '2 Salles de bain';
      case 'B3': return '3 Salles de bain';
      case 'B4': return '4 Salles de bain';
      case 'B5': return '5 Salles de bain';
      case 'B6': return '6 Salles de bain';
      default: return 'Salles de bain';
    }
  }

  formatAddress(address: string | undefined): string {
    if (address) {
      if (address.length > 20) {
        return address.slice(0, 20) + '...';
      }
    }
    return address || '';
  }
}
