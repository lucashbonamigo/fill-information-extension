// ... (início do seu index.js mantido igual) ...

async function consoleClass() {
    let tabs = await browser.tabs.query({ active: true, currentWindow: true });
    let tab = tabs[0]; // Pegamos a primeira aba da matriz

    // CORREÇÃO: Nome completo da API
    await browser.scripting.executeScript({
        target: { tabId: tab.id },
        func: lerCamposDaPagina,
    });
}

function lerCamposDaPagina() {
    var nameFields = document.querySelectorAll(".-_W-159");
    alert("Encontrei " + nameFields.length + " campo(s)!");

    for (let i = 0; i < nameFields.length; i++) {
        const element = nameFields[i];
        alert("O valor do campo " + i + " é: " + element.value); 
    }
}