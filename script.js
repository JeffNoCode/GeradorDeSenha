const seletorTamanho = document.querySelector(".tamanho-senha input");
const opcoes = document.querySelectorAll(".opcao input");
const iconeCopiar = document.querySelector(".caixa-input span");
const campoSenha = document.querySelector(".caixa-input input");
const indicadorSenha = document.querySelector(".indicador-senha");
const botaoGerar = document.querySelector(".btn-gerar");

const caracteres = {
    minusculas: "abcdefghijklmnopqrstuvwxyz",
    maiusculas: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numeros: "0123456789",
    simbolos: "!$%&|[](){}:;.,*+-#@<>~"
}

const gerarSenha = () => {
    let senhaEstatica = "",
        senhaAleatoria = "",
        excluirDuplicados = false,
        comprimentoSenha = seletorTamanho.value;

    opcoes.forEach(opcao => {
        if (opcao.checked) {
            if (opcao.id !== "excluir-duplicados" && opcao.id !== "espacos") {
                senhaEstatica += caracteres[opcao.id];
            } else if (opcao.id === "espacos") {
                senhaEstatica += `  ${senhaEstatica}  `;
            } else {
                excluirDuplicados = true;
            }
        }
    });

    for (let i = 0; i < comprimentoSenha; i++) {
        let caractereAleatorio = senhaEstatica[Math.floor(Math.random() * senhaEstatica.length)];
        if (excluirDuplicados) {
            !senhaAleatoria.includes(caractereAleatorio) || caractereAleatorio == " " ? senhaAleatoria += caractereAleatorio : i--;
        } else {
            senhaAleatoria += caractereAleatorio;
        }
    }
    campoSenha.value = senhaAleatoria;

}

const atualizarIndicadorSenha = () => {
    indicadorSenha.id = seletorTamanho.value <= 8 ? "fraca" : seletorTamanho.value <= 16 ? "media" : "forte";
}

const atualizarSeletor = () => {
    document.querySelector(".tamanho-senha span").innerText = seletorTamanho.value;
    gerarSenha();
    atualizarIndicadorSenha();
}
atualizarSeletor();

const copiarSenha = () => {
    navigator.clipboard.writeText(campoSenha.value);
    iconeCopiar.innerText = "check";
    iconeCopiar.style.color = "#4285f4";
    setTimeout(() => {
        iconeCopiar.innerText = "copy_all";
        iconeCopiar.style.color = "#707070";
    }, 1500);
}

iconeCopiar.addEventListener("click", copiarSenha);
seletorTamanho.addEventListener("input", atualizarSeletor);
botaoGerar.addEventListener("click", gerarSenha);

