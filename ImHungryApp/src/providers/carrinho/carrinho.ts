import { Injectable } from '@angular/core';


@Injectable()
export class CarrinhoProvider {

  constructor() {
    console.log('Hello CarrinhoProvider Provider');
  }

  carrinho = [{name: 'a'}, {name: 'b'}];

  public adicionarCarrinho(produto): void{
    this.carrinho.push(produto);
  }

  public removerCarrinho(): void{
    this.carrinho.splice(1,1);
  }

  public getCountCarrinho(): number{
    return this.carrinho.length;
  }

}
