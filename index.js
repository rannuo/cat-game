class Food {
    constructor(x, y) {
        this.el = document.createElement('div');
        this.el.classList.add('food');
        setPos(this.el, x, y);
        this.x = x;
        this.y = y;
    }

    appear() {
        document.body.appendChild(this.el);
    }

    dispear() {
        document.body.removeChild(this.el);
    }
}

class Cat {
    constructor(x, y) {
        this.el = document.createElement('div');
        this.el.classList.add('cat');
        setPos(this.el, x, y);
        this.x = x;
        this.y = y;
        this.eating = false;
    }

    moveTo(x, y, cb) {
        var distance = calcDistance(this.x ,this.y, x, y);

        this.el.style.transitionDuration = `${distance * 5}ms`;

        this.el.ontransitionend = () => {
            cb();
        };
        setPos(this.el, x, y);
    }

    showEating() {
        this.el.classList.add('eating');
    }

    hideEating() {
        this.el.classList.remove('eating');
    }

    eatFood(food, cb) {
        this.eating = true;

        const onEnd = () => {
            this.showEating();
            setTimeout(() => {
                this.hideEating();
                food.dispear();
                this.eating = false;
                cb();
            }, 500);
        }
        this.moveTo(food.x, food.y, onEnd);
    }
    appear() {
        document.body.appendChild(this.el);
    }

    dispear() {
        document.body.removeChild(this.el);
    }
}

class Game {
    constructor() {
        this.foods = [];
        this.cat = null;
    }
    
    init() {
        this.putCat();
        this.bindEvents();
    }

    bindEvents() {
        window.addEventListener('click', (e) => {
            var x = e.clientX;
            var y = e.clientY;
            this.putFood(x, y);        
        });
    }

    startEat() {
        if (!this.cat.eating) {
            var food = this.foods.shift();
            if (food) {
                this.eatFood(food);
            }    
        }
        
    }

    eatFood(food) {
        this.cat.eatFood(food, () => {
            this.startEat();
        });
    }

    putFood(x, y) {
        var food = new Food(x, y);
        food.appear();
        this.foods.push(food);
        this.startEat();
    }

    putCat() {
        var cat = new Cat(0, 0);
        this.cat = cat;
        this.cat.appear();
    }
}

var game = new Game();

game.init();


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


function calcDistance(x1, y1, x2, y2) {
    return Math.sqrt(
        Math.pow(Math.abs(x2 - x1), 2),
        Math.pow(Math.abs(y2 - y1), 2)
    );
}



function setPos(el, x, y) {
    el.style.transform = `translate(${x}px, ${y}px)`;
}

