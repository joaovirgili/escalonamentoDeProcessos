var flag = [];
var tempo;
var processoAtual;
var processosJson;

function runFifo(processos) {
    processosJson = processos;
    flag = [];
    processoAtual = 0;
    tempo = processosJson[processoAtual].chegada;

    for (let i=0;i<processosJson.length;i++)
        flag.push(false);

    while (flag.length != 0) {
        fifoExecutar(processosJson[processoAtual]);
    }
}

function fifoExecutar (processo) {
    if (processo.chegada <= tempo) {
        for (let i=0;i<processo.execucao;i++) {
            pintarQuadrado(processo.id, tempo, "blue");
            fifoAvancarTempo();
        }
        processoAtual++;
        processo.finalizado = true;
        flag.pop();
    } else fifoAvancarTempo();
}

function fifoChecarChegada() {
    for (let i=processoAtual+1;i<processosJson.length;i++) {
        if (processosJson[i].chegada <= tempo)
            pintarQuadrado(processosJson[i].id, tempo, "green");
    }
}

function fifoAvancarTempo() {
    fifoChecarChegada();
    tempo++;
}

