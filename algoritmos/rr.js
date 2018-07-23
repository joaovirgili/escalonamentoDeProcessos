function runRoundRobin(processos) {
    fila = [];
    flag = [];
    tempo = 0;
    processosJson = processos;

    for (let i = 0; i < processosJson.length; i++)
        flag.push(false);

    rrAtualizarFila();

    while (flag.length != 0) {
        if (fila.length !== 0)
            rrExecutarProcesso();
        else {
            tempo++;
            rrAtualizarFila();
        }
    }
}

function rrExecutarProcesso() {
    processoAtual = fila.splice(0, 1)[0];
    while (processoAtual.quantum > 0 && processoAtual.execucao > 0) {
        pintarQuadrado(processoAtual.id, tempo, corExecucao);
        for (let i = 0; i < fila.length; i++) pintarQuadrado(fila[i].id, tempo, corEspera); //pinta os processos da fila.
        processoAtual.execucao--;
        processoAtual.quantum--;
        tempo++;
        rrAtualizarFila();
    }
    if (processoAtual.execucao == 0) {
        flag.pop();
    } else if (processoAtual.quantum == 0) {
        rrSobrecarga();
        processoAtual.quantum = quantum;
        // fila.push(processoAtual);
        if (fila.length > 0 && processoAtual.prioridade >= fila[0].prioridade) {
            fila.unshift(processoAtual);
        } else {
            fila.push(processoAtual);
            fila = fila.sort(predicateByMaior("prioridade"));
        }
    }
}

function rrAtualizarFila() {
    for (let i = 0; i < processosJson.length; i++) {
        if (tempo === processosJson[i].chegada)
            fila.push(processosJson[i]);
    }
    fila = fila.sort(predicateByMaior("prioridade"));
}

function rrSobrecarga() {
    pintarQuadrado(processoAtual.id, tempo, corSobrecarga);
    for (let i = 0; i < fila.length; i++) pintarQuadrado(fila[i].id, tempo, corEspera);
    tempo++;
    rrAtualizarFila();
}