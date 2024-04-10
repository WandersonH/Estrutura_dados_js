/*
Fazer um sistema computacional em Linguagem JavaScript para testar o desempenho dos seguintes 
algoritmos de ordenação (deve ser apenas um programa principal sendo todos os métodos 
implementados como funções):
✓ Bubblesort
✓ Seleção direta
✓ Inserção direta
✓ Quicksort

Deve Ser Executado para os seguintes Vetores
- Tamanho do vetor: 100, 1.000, 10.000 e 100.000
- Ordem de entrada dos elementos: crescente, decrescente, aleatória
*/

//------------------Selection Sort------------------

function selecaoDireta(vetor) {
    function encontraMenor(inicio) {
        let menor = inicio;
        for (let j = inicio + 1; j < vetor.length; j++) {
            if (vetor[j] < vetor[menor]) menor = j;
        }
        return menor;
    }

    for (let i = 0; i <= vetor.length - 2; i++) {
        let menor = encontraMenor(i + 1);
        if (vetor[menor] < vetor[i]) {
            [vetor[menor], vetor[i]] = [vetor[i], vetor[menor]];
        }
    }
}

//------------------Insertion Sort------------------

function insercaoDireta(vetor) {
    for (let i = 0; i < vetor.length; i++) {
        let aux = vetor[i];
        let j = i - 1;
        while (j >= 0 && vetor[j] > aux) {
            vetor[j + 1] = vetor[j];
            j--;
        }
        vetor[j + 1] = aux;
    }
}

//------------------Bubble Sort------------------

function bubbleSort(vetor) {
    let trocou;

    do {
        trocou = false;

        // Percurso for tradicional até a PENÚLTIMA posição do vetor
        for (let i = 0; i < vetor.length - 1; i++) {
            if (vetor[i] > vetor[i + 1]) {
                // Efetua a troca entre os elementos
                [vetor[i], vetor[i + 1]] = [vetor[i + 1], vetor[i]];
                trocou = true;
            }
        }
    } while (trocou);
}

//------------------Quick Sort------------------

function quicksort(vetor, left = 0, right = vetor.length - 1) {
    let i = left;
    let j = right;
    let aux;
    let pivotidx = Math.floor((left + right) / 2);
    let pivot = vetor[pivotidx];

    // Particionamento do vetor
    while (i <= j) {
        while (parseInt(vetor[i]) < pivot) {
            i++;
        }
        while (parseInt(vetor[j]) > pivot) {
            j--;
        }
        if (i <= j) {
            aux = vetor[i];
            vetor[i] = vetor[j];
            vetor[j] = aux;
            i++;
            j--;
        }
    }

    // Recursão
    if (left < j) {
        quicksort(vetor, left, j);
    }
    if (i < right) {
        quicksort(vetor, i, right);
    }
    return vetor;
}

// Gerando Vetores
function gerarVetor(tamanho, tipo) {
    let vetor = [];
    if (tipo === 'ordenado') {
        for (let i = 0; i < tamanho; i++) {
            vetor.push(i);
        }
    } else if (tipo === 'inverso') {
        for (let i = tamanho - 1; i >= 0; i--) {
            vetor.push(i);
        }
    } else {
        for (let i = 0; i < tamanho; i++) {
            vetor.push(Math.floor(Math.random() * tamanho));
        }
    }
    return vetor;
}

// Testando os algoritmos de ordenação
const tamanhos = [100, 1000, 10000, 100000];
const tipos = ['ordenado', 'inverso', 'aleatório'];

for (let tamanho of tamanhos) {
    for (let tipo of tipos) {
        let vetor = gerarVetor(tamanho, tipo);

        console.log(`\nOrdenando vetor de tamanho ${tamanho} (${tipo})`);

        // Clone do vetor para cada algoritmo
        let vetorSelecao = vetor.slice();
        let vetorInsercao = vetor.slice();
        let vetorBubble = vetor.slice();
        let vetorQuick = vetor.slice();

        console.time('Seleção Direta');
        selecaoDireta(vetorSelecao);
        console.timeEnd('Seleção Direta');

        console.time('Inserção Direta');
        insercaoDireta(vetorInsercao);
        console.timeEnd('Inserção Direta');

        console.time('Bubble Sort');
        bubbleSort(vetorBubble);
        console.timeEnd('Bubble Sort');

        console.time('Quick Sort');
        quicksort(vetorQuick);
        console.timeEnd('Quick Sort');
    }
}
