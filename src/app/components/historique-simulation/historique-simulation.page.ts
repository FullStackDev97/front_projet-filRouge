import { Component, OnInit } from '@angular/core';
import { HistoriqueService } from '../../services/historique/historique.service';
import { UserService } from '../../services/user/user.service';
import { HistoriqueSimulation } from '../../dto/model/historiqueSimulation';
import { Router } from '@angular/router';
import { OffreImmobilier } from "../../dto/model/offreImmobilier";

@Component({
  selector: 'app-historique-simulation',
  templateUrl: './historique-simulation.page.html',
  styleUrls: ['./historique-simulation.page.scss'],
})
export class HistoriqueSimulationPage implements OnInit {
  historiqueSimulations: HistoriqueSimulation[] = [];
  private historique: OffreImmobilier | undefined;

  constructor(
    private historiqueService: HistoriqueService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadHistoriqueSimulations();
  }

  loadHistoriqueSimulations() {
    const userId = this.userService.getUserId();
    if (userId) {
      this.historiqueService.getHistoriqueSimulationsByUser(userId).subscribe({
        next: (historiqueSimulations: HistoriqueSimulation[]) => {
          this.historiqueSimulations = historiqueSimulations
        },
        error: (error) => {
          console.error('Error fetching historique simulations:', error);
        }
      });
    }
  }



  //retirer
/*
  loadHistoriqueSimulations() {
    const userId = this.userService.getUserId();
    if (userId) {
      console.log(`Chargement des simulations pour l'utilisateur ${userId}`);
      this.historiqueService.getHistoriqueSimulationsByUser(userId).subscribe({
        next: (historiqueSimulations: HistoriqueSimulation[]) => {
          console.log('Historique Simulations:', historiqueSimulations);
          this.historiqueSimulations = historiqueSimulations;
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des simulations :', error);
        }
      });
    } else {
      console.error('Aucun ID utilisateur valide trouvé.');
    }
  }*/


  /*loadHistoriqueSimulations() {
    const userId = this.userService.getUserId();
    if (userId) {
      this.historiqueService.getHistoriqueSimulationsByUser(userId).subscribe({
        next: (historiqueSimulations: HistoriqueSimulation[]) => {
          this.historiqueSimulations = historiqueSimulations;
        },
        error: (error) => {
          console.error('Error fetching historique simulations:', error);
        }
      });
    } else {
      console.error('No valid user ID found in local storage.');
    }
  }*/

  /*getImageUrl(offre: any): string {
    return offre?.imageUrls && offre.imageUrls.length > 0 ? offre.imageUrls[0] : 'assets/placeholder-image.png';
  }
  */

  getImageUrl(historique: OffreImmobilier | undefined): string {
    this.historique = historique;
    return this.historique?.imageUrls ? this.historique?.imageUrls[0] : "" // Image par défaut
  }


  /*viewDetails(offreId: number | undefined) {
    if (offreId) {
      this.router.navigate(['/offre-detail-component', offreId]);
    } else {
      console.error('Invalid offreId:', offreId);
    }
  }*/

  viewDetails(offreId: number | undefined): void{
    if (offreId !== undefined && offreId !== null) {
      this.router.navigate(['/offre-detail-component', offreId]);
    } else {
      console.error('Invalid offreId. Make sure the historique object has a valid offreImmobilier:', offreId);
    }
  }


  formatTypeBien(typeBien: OffreImmobilier.TypeBienEnum | undefined): string {
    switch (typeBien) {
      case 'MAISON':
        return 'Maison';
      case 'APPARTEMENT':
        return 'Appartement';
      case 'VILLA':
        return 'Villa';
      case 'LOFT':
        return 'Loft';
      default:
        return 'Type de bien inconnu';
    }
  }

  formatAddress(adresse: string | undefined): string {
    if (adresse) {
      return adresse.length > 30 ? adresse.substring(0, 27) + '...' : adresse;
    }
    return 'Adresse non définie';
  }

  getChambresText(chambres: OffreImmobilier.ChambresEnum | undefined): string {
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

  getSallesDeBainText(sallesDeBain: OffreImmobilier.SallesDeBainEnum | undefined): string {
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
}
