//GLOBALS
var numProcessos = 2;
var processosGrid = document.getElementById("processosGrid");
var processosDiv = document.getElementById("processosDiv");

function adicionarProcesso() {
  numProcessos++;

  //Criação da div processo.
  let processo = document.createElement("div");
  processo.setAttribute("class", "row");
  processo.setAttribute("id", "processo" + numProcessos);

  //Criação da div processoCabecalho
  let processoCabecalho = document.createElement("div");
  processoCabecalho.setAttribute("class", "processoCabecalho");

  //Criação da div processoNome e a tag p
  let processoNome = document.createElement("div");
  let nome = document.createElement("p");
  nome.setAttribute("class", "processoNome");
  nome.innerHTML = "P"+numProcessos;
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
  processoExecucao.setAttribute("class", "processoExecucao");
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

