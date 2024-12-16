import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { ToastController } from "@ionic/angular";
import { HistoriqueService } from "../../services/historique/historique.service";


interface El {
  eligible: boolean
}

@Component({
  selector: 'app-eligibility-result',
  templateUrl: './eligibility-result.page.html',
  styleUrls: ['./eligibility-result.page.scss'],
})
export class EligibilityResultPage implements OnInit {
  offreId!: number;
  eligibilityMessage!: string;
  eligibilityIcon!: string;
  eligibilityColor!: string;
  isEligible: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private toastController: ToastController,
    private historiqueService: HistoriqueService
  ) {}

  ngOnInit() {
    this.offreId = Number(this.route.snapshot.paramMap.get('id'));
    this.checkEligibility();
  }

  checkEligibility() {
    const userId = this.userService.getUserId();

    if (userId) {
      console.log("okok")
      this.userService.checkEligibilitie(userId, this.offreId).subscribe({
        next: (rps: El) => {
          console.log("okok next")
          this.isEligible = rps?.eligible;
          console.log(rps)
          if (rps?.eligible === true) {
            this.eligibilityMessage = 'Parfait ! Vous êtes éligible';
            this.eligibilityIcon = 'checkmark-circle-outline';
            this.eligibilityColor = 'green';
          } else {
            this.eligibilityMessage = 'Désolé ! Vous n\'êtes pas éligible';
            this.eligibilityIcon = 'close-circle-outline';
            this.eligibilityColor = 'red';
          }
        },
        error: (error) => {
          console.error('Error checking eligibility:', error);
        }
      });
    } else {
      console.error('No valid user ID found in local storage.');
      this.router.navigate(['/login']); // Redirect to login if no user ID is found
    }
  }

  async enregistrer() {
    const userId = this.userService.getUserId();
    if (userId && this.offreId) {
      this.historiqueService.saveHistorique(userId, this.offreId).subscribe({
        next: async () => {
          const toast = await this.toastController.create({
            message: 'Résultat d\'éligibilité enregistré avec succès dans l\'historique.',
            duration: 2000,
            position: 'bottom',
          });
          toast.present();
        },
        error: async (error: any) => {
          console.error('Error saving historique:', error);
          const toast = await this.toastController.create({
            message: 'Erreur lors de l\'enregistrement dans l\'historique.',
            duration: 2000,
            position: 'bottom',
          });
          toast.present();
        }
      });
    }
  }


  /*async enregistrer() {
    const userId = this.userService.getUserId();
    if (userId && this.offreId) {
      console.log("user "+userId,"offre "+this.offreId);
      this.historiqueService.toggleHistorique(userId, this.offreId).subscribe({
        next: async () => {
          const toast = await this.toastController.create({
            message: 'Résultat d\'éligibilité enregistré avec succès.',
            duration: 2000,
            position: 'bottom',
          });
          toast.present();
        },
        error: async (error) => {
          console.error('Error saving historique:', error);
          const toast = await this.toastController.create({
            message: 'Erreur lors de l\'enregistrement dans l\'historique',
            duration: 2000,
            position: 'bottom',
          });
          toast.present();
        }
      });
    }
  }*/

  async envoyerDemande() {
    this.router.navigate(['/suivi']);
    const toast = await this.toastController.create({
      message: 'Demande envoyée avec succès.',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}
