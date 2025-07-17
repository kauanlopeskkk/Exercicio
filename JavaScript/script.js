`use strict`;
const preencherFormulario = (endereco) => {
    document.getElementById("Logradouro").value = endereco.logradouro || "";
    document.getElementById("Bairro").value = endereco.bairro || "";
    document.getElementById("Cidade").value = endereco.localidade || "";
    document.getElementById("Estado").value = endereco.uf || "";

    localStorage.setItem("enderecoSalvo",JSON.stringify(endereco))
}
const limparFormulario = () => {
 
  localStorage.removeItem("enderecoSalvo"); 
};
document.addEventListener("DOMContentLoaded", () => {
  const enderecoSalvo = localStorage.getItem("enderecoSalvo");
  if (enderecoSalvo) {
    preencherFormulario(JSON.parse(enderecoSalvo));
  }
});

function eNumero(numero) {
    return /^[0-9]/.test(numero);
}

const cepValido = (cep) => cep.length === 8 && eNumero(cep)

const pesquisarCep = async() => {
 const cep = document.getElementById("CEP").value;
 const url = `https://viacep.com.br/ws/${cep}/json/`;
 if (cepValido (cep)){
try {

const dados = await fetch(url)
 const endereco = await dados.json()
 if (endereco.hasOwnProperty("erro")) {
    document.getElementById("Logradouro").value = "CEP nao encontrado";
 } else {
    preencherFormulario(endereco);
 }
   }  catch (erro) {
        console.error("Erro ao buscar o CEP:", erro);
    }
  } else {
    document.getElementById("CEP").value = `CEP inválido: ${cep.length} dígitos`;
  }
}

document.getElementById("CEP").addEventListener("focusout", pesquisarCep);