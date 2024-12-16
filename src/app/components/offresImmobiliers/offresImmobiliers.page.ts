import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OffreImmobilierService } from "../../services/offreImmobilier/offre-immobilier.service";
import { OffreImmobilier } from "../../dto/model/offreImmobilier";
import { Router } from "@angular/router";
import { register } from 'swiper/element/bundle';
import { FavorisService } from "../../services/favoris/favoris.service";
import { GeocodingService } from "../../services/geocoding/geocoding.service";
import { UserService } from "../../services/user/user.service";
import { ToastController } from "@ionic/angular";

register();

export interface OffreImmobilierExtended extends OffreImmobilier {
  isFavori?: boolean;
  distance?: number;
}

@Component({
  selector: 'app-recommendations',
  templateUrl: './offresImmobiliers.page.html',
  styleUrls: ['./offresImmobiliers.page.scss'],
})
export class OffresImmobiliersPage implements OnInit {
  offres: OffreImmobilierExtended[] = [];
  offresPresDeChezVous: OffreImmobilierExtended[] = [];
  userId: number;
  userAddress?: string;
  userCoordinates!: { lat: number, lon: number };
  addressCoordinatesCache: { [key: string]: { lat: number, lon: number } } = {};

  constructor(
    private offreImmobilierService: OffreImmobilierService,
    private router: Router,
    private favorisService: FavorisService,
    private geocodingService: GeocodingService,
    private userService: UserService,
    private toastController: ToastController,
    private cdRef: ChangeDetectorRef
  ) {
    this.userId = Number(localStorage.getItem('userId'));
  }

  ngOnInit() {
    this.loadUserAddress();
  }

  loadUserAddress() {
    this.userService.getUser(this.userId).subscribe({
      next: (profile) => {
        this.userAddress = profile.adresse;
        if (this.userAddress) {
          this.geocodingService.getCoordinates(this.userAddress).subscribe({
            next: (coordinates) => {
              this.userCoordinates = coordinates;
              this.loadRecommandations();
            },
            error: (err) => {
              console.error('Error fetching user coordinates:', err);
              this.showErrorMessage(`Erreur lors de la récupération des coordonnées de l'adresse utilisateur : ${err.message}`);
            }
          });
        }
      },
      error: (err) => {
        console.error('Error fetching user profile:', err);
        this.showErrorMessage('Erreur lors de la récupération du profil utilisateur');
      }
    });
  }

  loadRecommandations() {
    this.offreImmobilierService.getAllOffreImmobiliers().subscribe({
      next: (data: OffreImmobilier[]) => {
        this.offres = data.map(offre => ({ ...offre, isFavori: false }));
        this.filterOffersNearby();
      },
      error: (err) => {
        console.error('Error fetching offers:', err);
        this.showErrorMessage('Erreur lors de la récupération des offres immobilières');
      }
    });
  }

  filterOffersNearby() {
    if (!this.userCoordinates) return;

    const nearbyOffers: OffreImmobilierExtended[] = [];
    const checkedAddresses: Set<string> = new Set();

    const processOffer = (offer: OffreImmobilierExtended) => {
      if (!checkedAddresses.has(offer.adresse)) {
        checkedAddresses.add(offer.adresse);

        if (this.addressCoordinatesCache[offer.adresse]) {
          const coordinates = this.addressCoordinatesCache[offer.adresse];
          const distance = this.getDistanceBetweenCoordinates(this.userCoordinates, coordinates);
          if (distance < 10) {
            nearbyOffers.push({ ...offer, distance });
          }
        } else {
          this.geocodingService.getCoordinates(offer.adresse).subscribe({
            next: (coordinates) => {
              this.addressCoordinatesCache[offer.adresse] = coordinates;
              const distance = this.getDistanceBetweenCoordinates(this.userCoordinates, coordinates);
              if (distance < 10) {
                nearbyOffers.push({ ...offer, distance });
              }
            },
            error: (err) => {
              console.error(`Error fetching coordinates for address ${offer.adresse}:`, err);
            }
          });
        }
      }
    };

    this.offres.forEach(offer => processOffer(offer));

    // Use a timeout to give async geocoding calls some time to complete
    setTimeout(() => {
      this.offresPresDeChezVous = nearbyOffers;
      this.cdRef.detectChanges();
      this.checkFavoriStatus();
    }, 2000);
  }

  getDistanceBetweenCoordinates(coord1: { lat: number, lon: number }, coord2: { lat: number, lon: number }): number {
    const R = 6371; // Rayon de la Terre en kilomètres
    const dLat = this.deg2rad(coord2.lat - coord1.lat);
    const dLon = this.deg2rad(coord2.lon - coord1.lon);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(coord1.lat)) * Math.cos(this.deg2rad(coord2.lat)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance en kilomètres
    return distance;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  checkFavoriStatus() {
    if (this.userId) {
      const allOffers = [...this.offres, ...this.offresPresDeChezVous];
      allOffers.forEach(offre => {
        this.favorisService.isFavori(this.userId, offre.id).subscribe({
          next: (isFavori) => {
            offre.isFavori = isFavori;
          },
          error: (err) => {
            console.error('Error checking favori status:', err);
            this.showErrorMessage('Erreur lors de la vérification du statut favori');
          }
        });
      });
    }
  }

  showErrorMessage(message: string) {
    this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    }).then(toast => toast.present());
  }

  formatTypeBien(typeBien: string | undefined): string {
    if (!typeBien) {
      return '';
    }
    switch (typeBien) {
      case 'APPARTEMENT':
        return 'Appartement';
      case 'MAISON':
        return 'Maison';
      case 'VILLA':
        return 'Villa';
      case 'LOFT':
        return 'Loft';
      default:
        return typeBien;
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

  openSearch() {
    this.router.navigate(['/search']).then(() => {
      console.log('Navigation réussie');
    }).catch(err => {
      console.error('Erreur lors de la navigation:', err);
    });
  }

  viewDetails(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigate(['/offre-detail-component', id]);
    } else {
      console.error('Invalid information ID:', id);
    }
  }
}
