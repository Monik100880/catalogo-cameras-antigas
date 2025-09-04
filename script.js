// Array para armazenar os dados das câmeras
let cameras = JSON.parse(localStorage.getItem("cameras")) || [];

// Ao carregar a página, já exibe as câmeras salvas
window.onload = function () {
  exibirCameras();
};

// Função para salvar a câmera
function salvarCamera() {
  const marca = document.getElementById("marca").value.trim();
  const modelo = document.getElementById("modelo").value.trim();
  const ano = document.getElementById("ano").value.trim();
  const pais = document.getElementById("pais").value.trim();
  const raridade = document.getElementById("raridade").value.trim();
  const valor = document.getElementById("valor").value.trim();
  const numero = document.getElementById("numero").value.trim();
  const inputImagem = document.getElementById("imagemFile");

  if (!marca || !modelo || !ano || !pais || !raridade || !valor || !numero) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  if (inputImagem.files && inputImagem.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const imagemDataUrl = e.target.result;
      adicionarCamera(marca, modelo, ano, pais, raridade, valor, numero, imagemDataUrl);
    };

    reader.readAsDataURL(inputImagem.files[0]);
  } else {
    const imagemPadrao = "https://via.placeholder.com/150x100?text=Sem+Foto";
    adicionarCamera(marca, modelo, ano, pais, raridade, valor, numero, imagemPadrao);
  }
}

// Função que adiciona a câmera no array e atualiza a exibição
function adicionarCamera(marca, modelo, ano, pais, raridade, valor, numero, imagem) {
  const novaCamera = { marca, modelo, ano, pais, raridade, valor, numero, imagem };
  cameras.push(novaCamera);
  salvarLocal();
  exibirCameras();
  document.getElementById("formCamera").reset();
}

// Salva no localStorage
function salvarLocal() {
  localStorage.setItem("cameras", JSON.stringify(cameras));
}

// Exibe as câmeras na tela
function exibirCameras() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  cameras.forEach((cam, index) => {
    lista.innerHTML += `
      <div class="item">
        <img src="${cam.imagem}" alt="Foto da câmera" width="150">
        <p><strong>Marca:</strong> ${cam.marca}</p>
        <p><strong>Modelo:</strong> ${cam.modelo}</p>
        <p><strong>Ano:</strong> ${cam.ano}</p>
        <p><strong>País:</strong> ${cam.pais}</p>
        <p><strong>Raridade:</strong> ${cam.raridade}</p>
        <p><strong>Valor:</strong> R$ ${cam.valor}</p>
        <p><strong>Número:</strong> ${cam.numero}</p>
        <button onclick="excluirCamera(${index})">🗑️ Excluir</button>
      </div>
    `;
  });
}

// Função para excluir uma câmera
function excluirCamera(index) {
  if (confirm("Tem certeza que deseja excluir esta câmera?")) {
    cameras.splice(index, 1);
    salvarLocal();
    exibirCameras();
  }
}

// função para exportar relatorio
function exportarCSV() {
  const dados = [
    ['Marca', 'Modelo', 'Ano'],
    ['Canon', 'AE-1', '1976'],
    ['Nikon', 'F2', '1971']
  ];

  let csv = dados.map(linha => linha.join(',')).join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "maquinas.csv";
  link.click();
}
