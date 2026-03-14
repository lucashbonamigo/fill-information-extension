import {setLocalValue, getLocalValue} from '../../storage';

const btn = document.querySelector('#btn');
const dateInput = document.querySelector("#dateInput");
const dataDeHoje = new Date();

const dataFormatada = dataDeHoje.toISOString().split('T')[0];

dateInput.value = dataFormatada;

btn.addEventListener('click', consoleClass);

async function consoleClass() {
    let [tab] = await browser.tabs.query({ active: true, currentWindow: true });

   let results = await browser.scr({
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
