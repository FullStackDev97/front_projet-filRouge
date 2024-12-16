import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../dto/model/user';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import {HistoriqueService} from "../../services/historique/historique.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileForm: FormGroup;
  user: User | null = null;
  simulationPanelOpen = false;
  files?: string[] = [];
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private fileChooser: FileChooser, private http: HttpClient,
    private histoService: HistoriqueService
  ) {
    this.profileForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numeroTelephone: ['', Validators.required],
      adresse: ['', Validators.required],
      duree: ['', Validators.required],
      apport: ['', Validators.required],
      mensualite: ['', Validators.required]
    });
    this.userService.getUser(this.userService.getUserId()).subscribe({next: (user) => {this.user=user, this.files = user.files;}})
  }

  ngOnInit() {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadUserProfile();
  }

  loadUserProfile() {
    const userId = this.userService.getUserId();
    if (userId) {
      this.userService.getUser(userId).subscribe({
        next: (user: User) => {
          this.user = user;
          this.profileForm.patchValue(user);
        },
        error: (error) => {
          console.error('Error fetching user profile:', error);
        }
      });
    } else {
      console.error('No valid user ID found in local storage.');
      this.router.navigate(['/login']); // Redirect to login if no user ID is found
    }
  }

  selectFile() {
    this.fileInput.nativeElement.click();
  }

  toggleSimulationPanel() {
    this.simulationPanelOpen = !this.simulationPanelOpen;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      const blob = new Blob([file], { type: file.type });

      const formData = new FormData();
      formData.append('file', blob, file.name);

      let userId = this.userService.getUserId();
      this.histoService.addFileForUser(formData, userId).subscribe(
        {
          next: (response: string[]) => {
            console.log(response)
            this.files = response
          },
          error: (error) => {
            console.log("Some error occur while uploading file, check for it", error)
          }
        }
      )
    }
  }

  onSubmit() {
    if (this.profileForm.valid && this.user) {
      const updatedUser: User = this.profileForm.value;
      this.userService.updateUser(this.user.id!, updatedUser).subscribe({
        next: response => {
          console.log('User updated successfully', response);
        },
        error: error => {
          console.error('Error updating user', error);
        }
      });
    }
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  goToHistorique() {
    this.router.navigate(['/historique-simulation']);
  }

  delete(file: string) {
    const userId = this.userService.getUserId();
    this.histoService.deleteFile(file, userId).subscribe(
      {
        next: (response: string[]) => {
          console.log(response)
          this.files = response
        },
        error: (error) => {
          console.log("Some error occur while uploading file, check for it", error)
        }
      }
    )
  }
}
