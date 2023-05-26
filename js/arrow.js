let arrowIcon = document.getElementById('upArrow');
let container = document.querySelector('[data-container]');
let theme = sessionStorage.getItem('div');

if(theme != null) {
    arrowIcon.classList.toggle('arrowRotation');
    container.classList.toggle('hideContainer');
} 

let preload = document.querySelector('preload');


arrowIcon.onclick = () => {
    let theme = sessionStorage.getItem('div');

    if(theme != null) {
        sessionStorage.removeItem('div');
    } else {
        sessionStorage.setItem('div', 'switch');
    }

    container.classList.toggle('hideContainer');
    arrowIcon.classList.toggle('arrowRotation');
}

