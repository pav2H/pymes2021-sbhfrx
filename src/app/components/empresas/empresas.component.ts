import { Component, OnInit } from '@angular/core';
import { Empresas } from '../../models/empresas';
import { EmpresasService } from '../../services/empresas.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css'],
})
export class EmpresasComponent implements OnInit {
  empresa: Empresas;
  TituloAccionABMC = {
    A: '(Agregar)',
    L: '(Listado)',
  };
  AccionABMC = 'L';
  Items: Empresas[] = null;
  constructor(private EmpresasService: EmpresasService) {}

  FormAlta = new FormGroup({
    RazonSocial: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(55),
    ]),
    CantidadEmpleados: new FormControl(null, [
      Validators.required,
      Validators.pattern('[0-9]{1,7}'),
    ]),
    FechaFundacion: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)[0-9]{2}'
      ),
    ]),
  });

  ngOnInit() {
    this.GetEmpresas();
  }

  GetEmpresas() {
    this.EmpresasService.get().subscribe((res: Empresas[]) => {
      console.log(res);
      this.Items = res;
    });
  }
}
