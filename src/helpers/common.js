export function getFromLocalStorage(item) {
    return JSON.parse(localStorage.getItem(item))
}

export function saveToLocalStorage(key, item) {
    localStorage.setItem(key, JSON.stringify(item));
}