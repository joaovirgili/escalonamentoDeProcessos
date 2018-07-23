var flag;
var tempo;
var processosJson;
var fila;
var processoAtual;

function runSjf(processos) {
    processosJson = processos;
    flag = [];
    tempo = 0;
    fila = [];

    for (let i = 0; i < processosJson.length; i++) //Adiciona um marcado para cada processo. Quando não houver mais marcadores, todos os processos foram finalizados.
        flag.push(false);

    atualizarFila(); //Ao inciar, atualiza a fila.

    while (flag.length != 0) { //Enquanto ainda há processos
        if (fila.length !== 0)
            sjfExecutarProcesso();
        else {
            tempo++;
            atualizarFila();
        }
    }
}

//Execução do processo.
//Remove o primeiro projeto da fila e o executa.
//Realiza um laço zerando o tempo de execução do processo e atualizando o tempo e a fila.
function sjfExecutarProcesso() {
    processoAtual = fila.splice(0,1)[0];
    while (processoAtual.execucao > 0) {
        pintarQuadrado(processoAtual.id, tempo, "blue");
        for (let i=0;i<fila.length;i++) pintarQuadrado(fila[i].id, tempo, "green"); //pinta os processos da fila.
        processoAtual.execucao--;
        tempo++;
        atualizarFila();
    }
    flag.pop();
}

//Atualiza a fila de processos, ordenando-a pelo menor tamanho de execução.
//A cada tempo que passa, realiza a checagem se um processo novo entrará na fila.
function atualizarFila() {
    for (let i=0;i<processosJson.length;i++) {
        if (tempo === processosJson[i].chegada)
            fila.push(processosJson[i]);
    }
    fila = fila.sort(predicateBy("execucao"));
}

