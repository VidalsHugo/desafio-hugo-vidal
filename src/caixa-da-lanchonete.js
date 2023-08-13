class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens = []) {

        //Validando metodo de pagamento
        if(metodoDePagamento === "dinheiro"
        || metodoDePagamento === "debito"
        || metodoDePagamento === "credito"){

        const cardapio = {
            cafe: { descricao: "Café", valor: 3.00 },
            chantily: { descricao: "Chantily (extra do Café)", valor: 1.50 },
            suco: { descricao: "Suco Natural", valor: 6.20 },
            sanduiche: { descricao: "Sanduíche", valor: 6.50 },
            queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.00 },
            salgado: { descricao: "Salgado", valor: 7.25 },
            combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.50 },
            combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.50 }
        };

        const regexCardapio = {
            cafe: /café/i,
            chantily: /chantily/i,
            suco: /suco/i,
            sanduiche: /sanduiche/i,
            queijo: /queijo/i,
            salgado: /salgado/i,
            combo1: /combo1/i,
            combo2: /combo2/i
        };
        // Expressão regular para capturar o item e a quantidade('item,num')
        const regex = /([^,]+),\s*(\d+)/;
        let extraCafe = false
        let extraSanduiche = false
        let carrinho = []
        let valor = 0
        let noProblem = true

        if(itens.length === 0){
            console.log("Não há itens no carrinho de compra!");
            noProblem = false
        }

        for(const inputString of itens) {
            const match = inputString.match(regex);
            if (match) {
                const itemName = match[1];
                const quantidade = parseInt(match[2], 10);
                if(quantidade === 0){
                    console.log("Quantidade inválida!")
                    noProblem = false
                    break
                }
                if (regexCardapio[itemName]) {
                    carrinho.push(itemName)
                    // item extra de Cafe
                    if(itemName == 'cafe')
                        extraCafe = true
                    // item extra de Sanduiche
                    if(itemName == 'sanduiche')
                        extraSanduiche = true
                    //valor da compra de cada item
                    valor += cardapio[itemName].valor * parseInt(quantidade)
                } 
            } else{
                console.log( "Item inválido!")
                noProblem = false
            }
        }
        //Verificando possibilidade de ter item extra de Sanduiche e/ou Cafe
        carrinho.forEach((e) => {
            if ((e === "chantily" && !extraCafe) || (e === "queijo" && !extraSanduiche)) {
                noProblem = false;
                console.log("Item extra não pode ser pedido sem o principal.");
            }
        })
        if(noProblem){
            let valorFinal = valor;

            if (metodoDePagamento === "dinheiro") {
                valorFinal *= 0.95;
            } else if (metodoDePagamento === "credito") {
                valorFinal *= 1.03;
            }

            console.log(`R$ ${valorFinal.toFixed(2).replace(".", ",")}`);
        }
        }else{
            console.log("Forma de pagamento inválida!")
        }
        return "";
    }
}

new CaixaDaLanchonete()
  .calcularValorDaCompra('credito', ['combo1,1','cafe,2']);

export { CaixaDaLanchonete };
