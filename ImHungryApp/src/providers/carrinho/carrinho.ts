import { Injectable } from '@angular/core';


@Injectable()
export class CarrinhoProvider {

  constructor() {
    console.log('Hello CarrinhoProvider Provider');
  }

  carrinho = [
    
  ];

  public adicionarCarrinho(produto): void{
    this.carrinho.push(produto);
  }

  public getCart(){
    return this.carrinho;
  } 

  public removerCarrinho(): void{
    this.carrinho.splice(1,1);
  }

  public getCountCarrinho(): number{
    return this.carrinho.length;
  }

}
