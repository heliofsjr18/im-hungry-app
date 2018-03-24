import { Injectable } from '@angular/core';


@Injectable()
export class CarrinhoProvider {

  constructor() {
    console.log('Hello CarrinhoProvider Provider');
  }

  carrinho = [];
  cartForApi = [];
  qtdCart = 0;

  public adicionarCarrinho(produto): void {
    if (this.carrinho.length > 0) {
      let index = this.carrinho.findIndex(x => x.id === produto.id);
      if (index < 0) {
        this.carrinho.push(produto);
        this.cartForApi.push({ id: produto.id, qtd: 1 });
      } else {
        this.carrinho[index].qtd = produto.qtd + 1;
        let indexCAPI = this.cartForApi.findIndex(x => x.id === produto.id);
        this.cartForApi[indexCAPI].qtd = this.carrinho[index].qtd;
      }
    } else {
      this.carrinho.push(produto);
      this.cartForApi.push({ id: produto.id, qtd: 1 });
    }
    this.qtdCart = this.qtdCart + 1;
  }

  public getCart() {
    return this.carrinho;
  }

  public removerCarrinho(produto): void {
    if (produto.qtd > 1) {
      let index = this.carrinho.findIndex(x => x.id === produto.id);
      this.carrinho[index].qtd = produto.qtd - 1;

      this.qtdCart = this.qtdCart - 1;

      let indexCAPI = this.cartForApi.findIndex(x => x.id === produto.id);
      this.cartForApi[indexCAPI].qtd = this.carrinho[index].qtd;
    }
  }

  public getCountCarrinho(): number {
    //return this.carrinho.length;
    return this.qtdCart;
  }

}
