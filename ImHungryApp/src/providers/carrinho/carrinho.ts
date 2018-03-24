import { Injectable } from '@angular/core';


@Injectable()
export class CarrinhoProvider {

  constructor() {
    console.log('Hello CarrinhoProvider Provider');
  }

  carrinho = [];
  exist = false;

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

  public removerCarrinho(produto): void {
    this.carrinho.splice(1, 1);
  }

  public getCountCarrinho(): number {
    return this.carrinho.length;
  }

}
