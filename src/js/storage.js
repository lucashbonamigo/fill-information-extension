const myStorage = localStorage;

export function getLocalValue(label, value){
    return localStorage.getItem(label, value);
}

export function setLocalValue(label, valeu){
    localStorage.setItem(label, valeu);
}