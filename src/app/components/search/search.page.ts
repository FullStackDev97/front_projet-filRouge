import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OffreImmobilierService } from '../../services/offreImmobilier/offre-immobilier.service';
import { OffreImmobilier } from "../../dto/model/offreImmobilier";

type FilterType = 'typeBien' | 'chambres' | 'sallesDeBain' | 'agePropriete';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  searchForm: FormGroup;
  offres: OffreImmobilier[] = [];
  propertyTypes = Object.values(OffreImmobilier.TypeBienEnum);
  chambresTypes = Object.values(OffreImmobilier.ChambresEnum);
  sallesDeBainTypes = Object.values(OffreImmobilier.SallesDeBainEnum);
  ageProprieteTypes = Object.values(OffreImmobilier.AgeProprieteEnum);

  allSelected = {
    typeBien: false,
    chambres: false,
    sallesDeBain: false,
    agePropriete: false
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private offreService: OffreImmobilierService
  ) {
    this.searchForm = this.fb.group({
      adresse: [''],
      budgetMin: [''],
      budgetMax: [''],
      typeBien: [[]],
      chambres: [[]],
      sallesDeBain: [[]],
      agePropriete: [[]]
    });
  }

  ngOnInit(): void {}

  applyFilters() {
    const criteria = this.searchForm.value;
    console.log('Search criteria:', criteria);
    this.offreService.getFilteredOffres(criteria).subscribe({
      next: (data) => this.offres = data,
      error: (err) => console.error('Failed to load offre:', err)
    });
  }

  toggleSelection(controlName: FilterType, value: string) {
    const control = this.searchForm.get(controlName) as FormControl;
    const currentValues = control.value as string[];
    if (currentValues.includes(value)) {
      control.setValue(currentValues.filter(v => v !== value));
    } else {
      control.setValue([...currentValues, value]);
      this.allSelected[controlName] = false;
    }
  }

  toggleAllSelection(controlName: FilterType) {
    const control = this.searchForm.get(controlName) as FormControl;
    if (this.allSelected[controlName]) {
      control.setValue([]);
      this.allSelected[controlName] = false;
    } else {
      control.setValue(this.getAllValues(controlName));
      this.allSelected[controlName] = true;
    }
  }

  getAllValues(controlName: FilterType): string[] {
    switch (controlName) {
      case 'typeBien':
        return this.propertyTypes;
      case 'chambres':
        return this.chambresTypes;
      case 'sallesDeBain':
        return this.sallesDeBainTypes;
      case 'agePropriete':
        return this.ageProprieteTypes;
      default:
        return [];
    }
  }

  isSelected(controlName: FilterType, value: string): boolean {
    const control = this.searchForm.get(controlName) as FormControl;
    return control.value.includes(value);
  }

  dismiss() {
    this.router.navigate(['/home']);
  }

  resetFilters() {
    this.searchForm.reset({
      adresse: '',
      budgetMin: '',
      budgetMax: '',
      typeBien: [],
      chambres: [],
      sallesDeBain: [],
      agePropriete: []
    });
    this.allSelected = {
      typeBien: false,
      chambres: false,
      sallesDeBain: false,
      agePropriete: false
    };
  }

  viewDetails(id: number | undefined) {
    this.router.navigate(['/offre-detail-component', id]);
  }

  formatTypeBien(typeBien: string): string {
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

  formatAgePropriete(agePropriete: string): string {
    switch (agePropriete) {
      case 'MOINS_DE_1_AN':
        return 'Moins d\'un an';
      case 'MOINS_DE_3_ANS':
        return 'Moins de 3 ans';
      case 'MOINS_DE_10_ANS':
        return 'Moins de 10 ans';
      case 'PLUS_DE_10_ANS':
        return 'Plus de 10 ans';
      default:
        return agePropriete;
    }
  }
}
