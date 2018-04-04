import { Injectable } from '@angular/core';


@Injectable()
export class CarrinhoProvider {

  constructor() {
  }

  carrinho = [];


  public adicionarCarrinho(produto): void {

    if (this.carrinho.length > 0) {

      let index = this.carrinho.findIndex(x => x.id === produto.id);

      if (index < 0) {

        this.carrinho.push(produto);

      } else {
        this.carrinho[index].qtd = produto.qtd + 1;
      }
    } else {
      this.carrinho.push(produto);
    }
  }

  public getCart() {
    return this.carrinho;
  }

  public calcTotal(){

    let total = 0;

    for (let index = 0; index < this.carrinho.length; index++) {
      const element = this.carrinho[index];

      total += (element.price * element.qtd);
    }

    return total;
  }

  public generateCartForApi(){
    let apiCart = {
      items_id: [],
      items_qtd: []
    };
    for (let index = 0; index < this.carrinho.length; index++) {
      const element = this.carrinho[index];
      apiCart.items_id.push(element.id);
      apiCart.items_qtd.push(element.qtd);
    }
    return apiCart;
  }

  public removerCarrinho(produto): void {
    if (produto.qtd > 1) {
      let index = this.carrinho.findIndex(x => x.id === produto.id);
      this.carrinho[index].qtd = produto.qtd - 1;
    }
  }

  public clearCart(){
    this.carrinho = [];
  }

  public removeElement(element){
    let index = this.carrinho.findIndex(x => x.id === element.id);
    if(index > -1){
      this.carrinho.splice(index, 1);
    }
  }

  checkItemsFilial_Diff(filial_id){
    let index = this.carrinho.findIndex(x => x.filial_id != filial_id);
    return index > -1;
  }

  public getCountCarrinho(): number {
    return this.carrinho.length;
  }

}
