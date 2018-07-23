function runSjf(processos) {
    processosJson = processos;
    flag = [];
    fila = [];
    tempo = 0;

    for (let i = 0; i < processosJson.length; i++) //Adiciona um marcado para cada processo. Quando não houver mais marcadores, todos os processos foram finalizados.
        flag.push(false);

    sjfAtualizarFila(); //Ao inciar, atualiza a fila.

    while (flag.length != 0) { //Enquanto ainda há processos
        if (fila.length !== 0)
            sjfExecutarProcesso();
        else {
            tempo++;
            sjfAtualizarFila();
        }
    }

    exibirResultado(turnAround/numProcessos);
}

//Execução do processo.
//Remove o primeiro projeto da fila e o executa.
//Realiza um laço zerando o tempo de execução do processo e atualizando o tempo e a fila.
function sjfExecutarProcesso() {
    processoAtual = fila.splice(0,1)[0];
    while (processoAtual.execucao > 0) {
        pintarQuadrado(processoAtual.id, tempo, corExecucao);
        for (let i=0;i<fila.length;i++) pintarQuadrado(fila[i].id, tempo, corEspera); //pinta os processos da fila.
        processoAtual.execucao--;
        tempo++;
        sjfAtualizarFila();
    }
    flag.pop();
}

//Atualiza a fila de processos, ordenando-a pelo menor tamanho de execução.
//A cada tempo que passa, realiza a checagem se um processo novo entrará na fila.
function sjfAtualizarFila() {
    for (let i=0;i<processosJson.length;i++) {
        if (tempo === processosJson[i].chegada)
            fila.push(processosJson[i]);
    }
    fila = fila.sort(predicateBy("execucao"));
}

