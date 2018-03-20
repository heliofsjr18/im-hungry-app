import { Injectable } from '@angular/core';


@Injectable()
export class CarrinhoProvider {

  constructor() {
    console.log('Hello CarrinhoProvider Provider');
  }

  carrinho = [

  ];

  public adicionarCarrinho(produto): void {
    //1. Verificar se existe este produto (id) no carrinho

    //se sim: qtd + 1 a partir do id;

    //se não add:
    this.carrinho.push(produto);
  }

  public getCart() {
    return this.carrinho;
  }

  public removerCarrinho(produto): void {
    //1. Verificar se existe este produto (id) no carrinho

    //se sim e qtd == 1 Não faz nada
    //se sim e qqtd > 1 : qtd - 1 a partir do id;

    //se não add:
    this.carrinho.splice(1, 1);
  }

  public getCountCarrinho(): number {
    return this.carrinho.length;
  }

}
