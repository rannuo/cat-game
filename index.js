var cat = document.querySelector('.cat');

var food = document.querySelector('.food');


hideEl(food);

window.addEventListener('click', (e) => {
    var x = e.clientX;
    var y = e.clientY;

    putFood(x, y);
    moveCat(x, y)
        .then(eatFood)

});

function eatFood() {
    cat.classList.add('eating');
    setTimeout(() => {
        hideEl(food);
        cat.classList.remove('eating')
    }, 1000);
}
function moveCat(x, y) {
    setPos(cat, x, y);
    return new Promise((resolve) => {
        setTimeout(resolve, 1000)
    });
}

function putFood(x, y) {
    setPos(food, x, y);
    showEl(food);
}


function setPos(el, x, y) {
    el.style.transform = `translate(${x}px, ${y}px)`;
}

function hideEl(el) {
    el.setAttribute('hidden', 'true');
}

function showEl(el) {
    el.removeAttribute('hidden');
}

