import { Injectable } from '@angular/core';


@Injectable()
export class CarrinhoProvider {

  constructor() {
    console.log('Hello CarrinhoProvider Provider');
  }

  carrinho = { array: [], total: 0.00};
  cartForApi = [];


  public adicionarCarrinho(produto): void {

    if (this.carrinho.array.length > 0) {

      let index = this.carrinho.array.findIndex(x => x.id === produto.id);

      if (index < 0) {

        this.carrinho.array.push(produto);
        this.carrinho.total = this.carrinho.total + (produto.price * 1);

      } else {
        this.carrinho.array[index].qtd = produto.qtd + 1;
        this.carrinho.total = (produto.price * produto.qtd);
      }
    } else {
      this.carrinho.array.push(produto);
      this.carrinho.total = produto.price * produto.qtd;
    }
  }

  public getCart() {
    return this.carrinho;
  }

  public generateCartForApi(){
    return '';
  }

  public removerCarrinho(produto): void {
    if (produto.qtd > 1) {
      let index = this.carrinho.array.findIndex(x => x.id === produto.id);
      this.carrinho.array[index].qtd = produto.qtd - 1;
      this.carrinho.total = this.carrinho.total - produto.price;
    }
  }

  public getCountCarrinho(): number {
    return this.carrinho.array.length;
  }

}
