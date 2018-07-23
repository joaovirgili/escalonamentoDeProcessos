//GLOBALS
var numProcessos = 0;
var idProcessos = 0;
var processosAtuais = [];
var processosGrid = document.getElementById("processos-grid");
var processosDiv = document.getElementById("processos-div");
var corEspera = "#ffc107";
var corExecucao = "#28a745";
var corSobrecarga = "#dc3545";
var corDeadline = "#343a40";
var flag;
var tempo;
var processosJson;
var fila;
var processoAtual;
var quantum;
var sobrecarga;



function limparExecucao() {
  let linhas = document.getElementsByClassName("processo-execucao");
  for (let i = 0; i < linhas.length; i++) {
    if (i != linhas.length - 1)
      for (let j = 0; j < linhas[i].children.length; j++) {
        linhas[i].children[j].style.backgroundColor = "white";
        linhas[i].children[j].style.border = "1px solid black";
      }
  }
}

function adicionarProcesso() {
  numProcessos++;
  idProcessos++;
  processosAtuais.push(idProcessos);

  atualziarNumeroDeProcessos();
  adicionarProcessoExecucao();
  adicionarProcessoForm();
}

function adicionarProcessoForm() {
  let divPrincipal = document.getElementById("processos-form-div");

  let title = document.createElement("h5");
  title.setAttribute("class", "float-left");
  title.innerHTML = "Processo " + idProcessos;

  let buttonRemover = document.createElement("button");
  buttonRemover.id = idProcessos;
  buttonRemover.setAttribute("class", "btn btn-danger float-right");
  buttonRemover.innerText = "Remover";
  buttonRemover.addEventListener('click', function () {
    if (numProcessos > 2) {
      let removeDiv = this.parentElement.parentElement;
      let removePai = removeDiv.parentElement;
      let last;

      if (removeDiv === removePai.lastChild) last = true;
      removePai.removeChild(removeDiv);

      if (last) removePai.lastChild.removeChild(removePai.lastChild.lastChild);

      let execucao = document.getElementById("processo" + this.id + "execucao");
      execucao.parentElement.removeChild(execucao);

      numProcessos--;
      atualziarNumeroDeProcessos();
    }
  });

  let processoFormTitle = document.createElement("div");
  processoFormTitle.setAttribute("class", "processo-form-title");
  processoFormTitle.appendChild(title);
  processoFormTitle.appendChild(buttonRemover);

  let formDiv = document.createElement("div");
  formDiv.setAttribute("class", "form-row");
  formDiv.appendChild(criarInputForm("processo" + idProcessos, "chegada", "Tempo de Chegada"));
  formDiv.appendChild(criarInputForm("processo" + idProcessos, "execucao", "Tempo de Execução"));
  formDiv.appendChild(criarInputForm("processo" + idProcessos, "deadline", "Deadline"));
  formDiv.appendChild(criarInputForm("processo" + idProcessos, "prioridade", "Prioridade"));

  let form = document.createElement("form");
  form.appendChild(formDiv);

  let processoFormDiv = document.createElement("div");
  if (idProcessos !== 1) divPrincipal.lastChild.appendChild(document.createElement("hr"));
  processoFormDiv.setAttribute("id", "processo" + idProcessos);
  processoFormDiv.appendChild(processoFormTitle);
  processoFormDiv.appendChild(form);

  divPrincipal.appendChild(processoFormDiv);
}

function adicionarProcessoExecucao() {
  //Criação da div processo.
  let processo = document.createElement("div");
  processo.setAttribute("class", "row");
  processo.setAttribute("id", "processo" + idProcessos + "execucao");

  //Criação da div processoCabecalho
  let processoCabecalho = document.createElement("div");
  processoCabecalho.setAttribute("class", "processo-cabecalho");

  //Criação da div processoNome e a tag p
  let processoNome = document.createElement("div");
  let nome = document.createElement("p");
  nome.setAttribute("class", "processo-nome");
  nome.innerHTML = "P" + idProcessos;
  processoNome.appendChild(nome);

  //Append das tags na div processoCabecalho
  processoCabecalho.appendChild(processoNome);
  for (let i = 0; i < 4; i++) {
    let div = document.createElement("div");
    div.setAttribute("class", "square text-center");
    processoCabecalho.appendChild(div);
  }

  //Criação da div processoExecucao
  let processoExecucao = document.createElement("div");
  processoExecucao.setAttribute("class", "processo-execucao");
  for (let i = 0; i < 30; i++) {
    let div = document.createElement("div");
    div.setAttribute("class", "square");
    processoExecucao.appendChild(div);
  }

  //Append do cabecalho e execucao à div processo
  processo.appendChild(processoCabecalho);
  processo.appendChild(processoExecucao);

  //Append da div processo à div principal
  processosDiv.appendChild(processo);
}

function criarInputForm(processo, campo, labelString) {
  let div = document.createElement("div");
  div.setAttribute("class", "col");
  let label = document.createElement("label");
  label.setAttribute("for", processo + "-" + campo);
  label.innerHTML = labelString;
  let input = document.createElement("input");
  input.setAttribute("type", "number");
  input.setAttribute("class", "form-control");
  input.setAttribute("id", processo + "-" + campo);
  div.appendChild(label);
  div.appendChild(input);
  return div;
}

function atualziarNumeroDeProcessos() {
  let numeroInput = document.getElementById("processos-numero-input");
  numeroInput.value = numProcessos;
}

function predicateBy(prop) {
  return function (a, b) {
    if (a[prop] > b[prop]) {
      return 1;
    } else if (a[prop] < b[prop]) {
      return -1;
    }
    return 0;
  }
}

function predicateByMaior(prop) {
  return function (a, b) {
    if (a[prop] < b[prop]) {
      return 1;
    } else if (a[prop] > b[prop]) {
      return -1;
    }
    return 0;
  }
}

function checarCampos() {
  let processosJson = [];
  let inputSobrecarga = document.getElementById("sobrecarga");
  let inputQuantum = document.getElementById("quantum");

  if (inputSobrecarga.value === "" || inputSobrecarga.value < 0) {
    return "Campo sobrecarga inválido."
  } else if (inputQuantum.value === "" || inputQuantum.value < 0) {
    return "Campo Quantum inválido."
  }
  quantum = parseInt(inputQuantum.value);
  sobrecarga = parseInt(inputSobrecarga.value);

  let processos = document.getElementById("processos-form-div");
  for (let i = 0; i < processos.children.length; i++) {
    let processoId = processos.children[i].id.slice(-1);

    let inputChegada = document.getElementById(processos.children[i].id + "-chegada");
    let inputExecucao = document.getElementById(processos.children[i].id + "-execucao");
    let inputDeadline = document.getElementById(processos.children[i].id + "-deadline");
    let inputPrioridade = document.getElementById(processos.children[i].id + "-prioridade");

    if (inputChegada.value === "" || inputChegada.value < 0) {
      return "Campo Tempo de Chegada do Processo " + processoId + " inválido";
    } else if (inputExecucao.value === "" || inputExecucao.value <= 0) {
      return "Campo Tempo de Execução do Processo " + processoId + " inválido";
    } else if (inputDeadline.value === "" || inputDeadline.value <= 0) {
      return "Campo Deadline do Processo " + processoId + " inválido";
    } else if (inputPrioridade.value === "" || inputPrioridade.value < 0) {
      return "Campo Prioridade do Processo " + processoId + " inválido";
    }

    let processo = {
      "id": parseInt(processoId),
      "chegada": parseInt(inputChegada.value),
      "execucao": parseInt(inputExecucao.value),
      "deadline": parseInt(inputDeadline.value),
      "prioridade": parseInt(inputPrioridade.value),
      "finalizado": false,
      "quantum": quantum,
    };

    processosJson.push(processo);
  }
  for (let i = 0; i < processosJson.length; i++) {
    let cabecalho = document.getElementById("processo" + processosJson[i].id + "execucao").children[0];
    cabecalho.children[1].innerHTML = processosJson[i].chegada;
    cabecalho.children[2].innerHTML = processosJson[i].execucao;
    cabecalho.children[3].innerHTML = processosJson[i].deadline;
    cabecalho.children[4].innerHTML = processosJson[i].prioridade;
  }

  return processosJson.sort(predicateBy("chegada"));
}

function pintarQuadrado(processoId, coluna, cor) {
  setTimeout(() => {
    let processo = document.getElementById("processo" + processoId + "execucao").children[1];
    processo.children[coluna].style.backgroundColor = cor;
    
  }, tempo*1000);
}

document.getElementById("add-processo").addEventListener('click', adicionarProcesso);

document.getElementById("iniciar-execucao").addEventListener('click', function () {
  let processosJson = checarCampos();
  if (processosJson instanceof Array) {
    limparExecucao();
    let algoritmoSelect = document.getElementById("algoritmoSelect");
    if (algoritmoSelect.value === "1") runFifo(processosJson);
    else if (algoritmoSelect.value === "2") runSjf(processosJson);
    else if (algoritmoSelect.value === "3") runRoundRobin(processosJson);
    else if (algoritmoSelect.value === "4") runEDF(processosJson);
  } else {
    alert(processosJson);
  }
});

//Inicia com 2 processos
adicionarProcesso();
adicionarProcesso();

