const btn = document.querySelector('#btnEntry');
const dateInput = document.querySelector("#dateInput");
const dataDeHoje = new Date();
const dataFormatada = dataDeHoje.toISOString().split('T')[0];

dateInput.value = dataFormatada;

btn.addEventListener('click', consoleClass);

async function consoleClass() {
    let tabs = await browser.tabs.query({ active: true, currentWindow: true });
    let tab = tabs[0];

    let savedData = await browser.storage.local.get(null);

    await browser.scripting.executeScript({
        target: { tabId: tab.id },
        func: lerCamposDaPagina,
        args: [savedData]
    });
}

async function lerCamposDaPagina(savedData) {
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    var nameFields = document.querySelectorAll('textarea, [data-automation-id="textInput"], [aria-haspopup="listbox"]');
    alert("Encontrei " + nameFields.length + " campo(s)!");

    for (let i = 0; i < nameFields.length; i++) {
        const element = nameFields[i];

        if (i === 0) {
            element.value = savedData.nome || "";
            element.dispatchEvent(new Event('input', { bubbles: true }));
            element.dispatchEvent(new Event('change', { bubbles: true }));
        }
        else if (i === 1) {
            element.value = savedData.matricula || "";
            element.dispatchEvent(new Event('input', { bubbles: true }));
            element.dispatchEvent(new Event('change', { bubbles: true }));
        }
        else if (element.getAttribute('aria-haspopup') === 'listbox') {
            element.click();

            await sleep(300);

            let textoDesejado = (i === 2) ? savedData.equipe : "Correção de Ponto";

            let todasOpcoes = document.querySelectorAll('span');
            let opcaoCorreta = Array.from(todasOpcoes).find(
                span => span.textContent.trim() === textoDesejado
            );

            if (opcaoCorreta) {
                opcaoCorreta.click();
            } else {
                console.log("Não consegui achar a opção na lista:", textoDesejado);
            }
        }
    }
    let buttonProx = document.querySelector('[data-automation-id="nextButton"]');

    if (buttonProx) {
        buttonProx.click();
        await sleep(300);
    } else {
        console.log("Botão Next não encontrado na tela!");
    }


    var nameFieldsPage2 = document.querySelectorAll('input, [data-automation-id="textInput"], [aria-haspopup="listbox"]');

    for (let i = 0; i < nameFieldsPage2.length; i++) {
        const element = nameFieldsPage2[i];

        if (i === 0) {
            element.value = dateInput || "";
            element.dispatchEvent(new Event('input', { bubbles: true }));
            element.dispatchEvent(new Event('change', { bubbles: true }));
        }
        else if (element.getAttribute('aria-haspopup') === 'listbox') {
            element.click();
            await sleep(300);

            let textoDesejado = "";

            if (i === 1) {
                textoDesejado = "Entrada";
            } else if (i === 2 && savedData.horaEntrada) {
                textoDesejado = savedData.horaEntrada.split(":")[0].trim();
            } else if (i === 3 && savedData.horaEntrada) {
                textoDesejado = savedData.horaEntrada.split(":")[1].trim();
            }

            let todasOpcoes = document.querySelectorAll('span');
            let opcaoCorreta = Array.from(todasOpcoes).find(span => span.textContent.trim() === textoDesejado);

            if (opcaoCorreta) {
                opcaoCorreta.click();
            } else {
                console.log("Não consegui achar a opção na lista:", textoDesejado);
            }
        }
    }
}