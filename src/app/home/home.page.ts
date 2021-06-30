import { Component, ViewChild } from '@angular/core';
import { ListaService } from '../servicos/lista.service';

import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('input') meuInput;

  inputTexto:String = "";

  listaService:ListaService;

  constructor(private http:HttpClient,
              public toastController: ToastController) {
    this.listaService = new ListaService(http,toastController);
  }

  adiciona() {
    this.listaService.add(this.inputTexto);
    this.inputTexto="";
    this.meuInput.setFocus();
  }

  remover(indice) {
    this.listaService.remove(indice);
  }



}
