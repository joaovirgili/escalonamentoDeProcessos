function runFifo(processos) {
    processosJson = processos;
    flag = [];
    fila = [];
    tempo = 0;

    for (let i = 0; i < processosJson.length; i++)
        flag.push(false);

    fifoAtualizarFila();

    while (flag.length != 0) {
        if (fila.length > 0)
            fifoExecutar();
        else {
            tempo++;
            fifoAtualizarFila();
        }
    }

    exibirResultado(turnAround/numProcessos);
}

function fifoExecutar(processo) {
    processoAtual = fila.splice(0, 1)[0];

    while (processoAtual.execucao > 0) {
        pintarQuadrado(processoAtual.id, tempo, corExecucao);
        for (let i = 0; i < fila.length; i++) pintarQuadrado(fila[i].id, tempo, corEspera);
        processoAtual.execucao--;
        tempo++;
        fifoAtualizarFila();
    }
    flag.pop();
}


function fifoAtualizarFila() {
    for (let i = 0; i < processosJson.length; i++) {
        if (tempo === processosJson[i].chegada)
            fila.push(processosJson[i]);
    }
}
