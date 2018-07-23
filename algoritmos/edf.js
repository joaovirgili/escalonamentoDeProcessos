function runEDF(processos) {
    fila = [];
    flag = [];
    tempo = 0;
    processosJson = processos;

    for (let i = 0; i < processosJson.length; i++)
        flag.push(false);

    edfAtualizarFila();
    pintarDeadline();

    while (flag.length != 0) {
        if (fila.length !== 0)
            edfExecutarProcesso();
        else {
            tempo++;
            edfAtualizarFila();
        }
    }
}

function edfExecutarProcesso() {
    processoAtual = fila.splice(0, 1)[0];
    while (processoAtual.quantum > 0 && processoAtual.execucao > 0) {
        if (processoAtual.deadline > 0)
            pintarQuadrado(processoAtual.id, tempo, corExecucao);
        else    
            pintarQuadrado(processoAtual.id, tempo, corDeadline);
        for (let i = 0; i < fila.length; i++) {
            fila[i].deadline--;
            pintarQuadrado(fila[i].id, tempo, corEspera); //pinta os processos da fila.
        }
        processoAtual.execucao--;
        processoAtual.quantum--;
        processoAtual.deadline--;
        tempo++;
        edfAtualizarFila();
    }
    if (processoAtual.execucao == 0) {
        flag.pop();
    } else if (processoAtual.quantum == 0) {
        edfSobrecarga();
        processoAtual.quantum = quantum;
        edfAtualizarFila();
        if (fila.length >0 && processoAtual.deadline === fila[0].deadline) {
          fila.unshift(processoAtual); 
        } else {
            fila.push(processoAtual);
            fila = fila.sort(predicateBy("deadline"));
        }
    }
}

function edfAtualizarFila() {
    for (let i = 0; i < processosJson.length; i++) {
        if (tempo === processosJson[i].chegada)
            fila.push(processosJson[i]);
    }
    fila = fila.sort(predicateBy("deadline"));
}

function edfSobrecarga() {
    pintarQuadrado(processoAtual.id, tempo, corSobrecarga);
    for (let i = 0; i < fila.length; i++) {
        fila[i].deadline--;
        pintarQuadrado(fila[i].id, tempo, corEspera);
    }
    processoAtual.deadline--; 
    tempo++;
    edfAtualizarFila();
}

function pintarDeadline() {
    let processo;
    for (let i=0;i<processosJson.length;i++) {
        processo = document.getElementById("processo"+processosJson[i].id+"execucao").children[1];
        processo.children[processosJson[i].chegada + processosJson[i].deadline-1].style.borderRightColor = "red";
        processo.children[processosJson[i].chegada + processosJson[i].deadline-1].style.borderRightWidth = "5px";
    }
}