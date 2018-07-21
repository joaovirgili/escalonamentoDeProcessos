//GLOBALS
var numProcessos = 0;
var idProcessos = 0;
var processosGrid = document.getElementById("processos-grid");
var processosDiv = document.getElementById("processos-div");

function adicionarProcesso() {
  numProcessos++;
  idProcessos++;

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
  buttonRemover.addEventListener('click', function() {
    if (numProcessos > 2) {
      let removeDiv = this.parentElement.parentElement;
      let removePai = removeDiv.parentElement;
      let last;

      if (removeDiv === removePai.lastChild) last = true;
      removePai.removeChild(removeDiv);

      if (last) removePai.lastChild.removeChild(removePai.lastChild.lastChild);
      
      let execucao = document.getElementById("processo"+this.id);
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
  formDiv.appendChild(criarInputForm("processo"+idProcessos, "chegada", "Tempo de Chegada"));
  formDiv.appendChild(criarInputForm("processo"+idProcessos, "execucao", "Tempo de Execução"));
  formDiv.appendChild(criarInputForm("processo"+idProcessos, "deadline", "Deadline"));
  formDiv.appendChild(criarInputForm("processo"+idProcessos, "prioridade", "Prioridade"));
  
  let form = document.createElement("form");
  form.appendChild(formDiv);

  let processoFormDiv = document.createElement("div");
  if (idProcessos !== 1) divPrincipal.lastChild.appendChild(document.createElement("hr"));
  processoFormDiv.setAttribute("id", "processo-form"+idProcessos);
  processoFormDiv.appendChild(processoFormTitle);
  processoFormDiv.appendChild(form);

  divPrincipal.appendChild(processoFormDiv);
}

function adicionarProcessoExecucao() {
  //Criação da div processo.
  let processo = document.createElement("div");
  processo.setAttribute("class", "row");
  processo.setAttribute("id", "processo" + idProcessos);

  //Criação da div processoCabecalho
  let processoCabecalho = document.createElement("div");
  processoCabecalho.setAttribute("class", "processo-cabecalho");

  //Criação da div processoNome e a tag p
  let processoNome = document.createElement("div");
  let nome = document.createElement("p");
  nome.setAttribute("class", "processo-nome");
  nome.innerHTML = "P"+idProcessos;
  processoNome.appendChild(nome);

  //Append das tags na div processoCabecalho
  processoCabecalho.appendChild(processoNome);
  for (let i=0;i<4;i++) {
    let div = document.createElement("div");
    div.setAttribute("class", "square");
    processoCabecalho.appendChild(div);
  }

  //Criação da div processoExecucao
  let processoExecucao = document.createElement("div");
  processoExecucao.setAttribute("class", "processo-execucao");
  for (let i=0;i<30;i++) {
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
  label.setAttribute("for", processo+"-"+campo);
  label.innerHTML = labelString;
  let input = document.createElement("input");
  input.setAttribute("type", "number");
  input.setAttribute("class", "form-control");
  input.setAttribute("id", processo+"-"+campo);
  div.appendChild(label);
  div.appendChild(input);
  return div;
}

function atualziarNumeroDeProcessos() {
  let numeroInput = document.getElementById("processos-numero-input");
  numeroInput.value = numProcessos;
}

document.getElementById("add-processo").addEventListener('click', adicionarProcesso);

adicionarProcesso();
adicionarProcesso();

