import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  private minhaLista;

  public getLista(){
    return this.minhaLista;
  }

  public setLista(lista){
     this.minhaLista=lista;
  }

  constructor(private http:HttpClient, 
              public toastController: ToastController) {
    this.atualizaLista()  
  }

  atualizaLista(){
    this.minhaLista=[] ;
    this.http.get<any[]>("http://localhost/api/consulta.php")
              .subscribe( dados => {
                 dados.forEach( item => {
                  this.minhaLista.push([item.codigo,item.descricao])
                 })
              })
  }
  
  async ngOnInit() {
    
  }

  public async add(valor) {
    this.http.get<any[]>("http://localhost/api/incluir.php?valor="+valor)
              .subscribe( dados => {
                this.atualizaLista();
                this.presentToast("Item incluido!");
              })
  }

  public async remove(indice) {
    this.http.get<any[]>("http://localhost/api/remover.php?codigo="+indice.toString())
              .subscribe( dados => {
                this.atualizaLista();
                this.presentToast("Item removido!");
              })
  }
  async presentToast(mens) {
    const toast = await this.toastController.create({
      message: mens,
      duration: 2000
    });
    toast.present();
  }

  public async limpar() {
    this.http.get<any[]>("http://localhost/api/limpar.php")
              .subscribe( dados => {
                this.atualizaLista();
                this.presentToast("Lista removida!");
              })
  }
  
}
