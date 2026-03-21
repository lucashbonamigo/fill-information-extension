const elements = document.querySelectorAll('input, textarea, select');
const submit = document.querySelector("#btnSalvar");

fillForm();

submit.addEventListener('click', saveFormInLocalStorage);

function saveFormInLocalStorage() {
    let dataToSave = {};

    // Coleta o ID e o Valor de cada campo na tela
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (element.id) {
            dataToSave[element.id] = element.value;
        }
    }

    browser.storage.local.set(dataToSave).then(() => {
        alert("Configurações salvas com sucesso!");
    });
}

function fillForm() {
    browser.storage.local.get(null).then((savedData) => {
        
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            if (element.id && savedData[element.id]) {
                element.value = savedData[element.id];
            }
        }
    });
}