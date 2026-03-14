import * as localStorage from "../js/storage";

const elements = document.querySelectorAll('input', 'textarea', 'select');

fillForm()

function fillForm() {
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];

        var temp = document.querySelectorAll('#'+element['id']);
        temp = localStorage.getLocalValue(element['id']);
    }
}


//submit.addEventListener('click', changeDataForm);

function changeDataForm() {

}