let tetris = document.createElement('div');
tetris.classList.add('tetris');
for (let i = 1; i < 181; i++) {
    let excel = document.createElement('div');
    excel.classList.add('excel');
    tetris.appendChild(excel);
}

let main = document.getElementsByClassName('main')[0];
main.appendChild(tetris);

let excel = document.getElementsByClassName('excel');
let i = 0;

for (let y = 18; y > 0; y--) {
    for (let x = 1; x < 11; x++) {
        excel[i].setAttribute('posX', x);
        excel[i].setAttribute('posY', y);
        i++;
    }
}

let x = 5, y = 15;

let mainArr = [
    //палка
    {
        main: [
            [0, 1],
            [0, 2],
            [0, 3]
        ],
        d90: [
            [-1, 1],
            [0, 0],
            [1, -1],
            [2, -2]
        ],
        d180: [
            [1, -1],
            [0, 0],
            [-1, 1],
            [-2, 2]
        ],
        d270: [
            [-1, 1],
            [0, 0],
            [1, -1],
            [2, -2]
        ],
        d360: [
            [1, -1],
            [0, 0],
            [-1, 1],
            [-2, 2]
        ]
    },

    //квадрат
    {
        main: [
            [1, 0],
            [0, 1],
            [1, 1]
        ],
        d90: [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ],
        d180: [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ],
        d270: [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ],
        d360: [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ]
    },
    // г н право
    {
        main: [
            [1, 0],
            [0, 1],
            [0, 2]
        ],
        d90: [
            [0, 0],
            [-1, 1],
            [1, 0],
            [2, -1]
        ],
        d180: [
            [1, -1],
            [1, -1],
            [-1, 0],
            [-1, 0]
        ],
        d270: [
            [-1, 0],
            [0, -1],
            [2, -2],
            [1, -1]
        ],
        d360: [
            [0, -1],
            [0, -1],
            [-2, 0],
            [-2, 0]
        ]
    },
    // г н лево
    {
        main: [
            [1, 0],
            [1, 1],
            [1, 2]
        ],
        d90: [
            [0, 0],
            [0, 0],
            [1, -1],
            [-1, -1]
        ],
        d180: [
            [0, -1],
            [-1, 0],
            [-2, 1],
            [1, 0]
        ],
        d270: [
            [2, 0],
            [0, 0],
            [1, -1],
            [1, -1]
        ],
        d360: [
            [-2, 0],
            [1, -1],
            [0, 0],
            [-1, 1]
        ]
    },
    {
        //молния влево
        main: [
            [1, 0],
            [-1, 1],
            [0, 1]
        ],
        d90: [
            [0, -1],
            [-1, 0],
            [2, -1],
            [1, 0]
        ],
        d180: [
            [0, 0],
            [1, -1],
            [-2, 0],
            [-1, -1]
        ],
        d270: [
            [0, -1],
            [-1, 0],
            [2, -1],
            [1, 0]
        ],
        d360: [
            [0, 0],
            [1, -1],
            [-2, 0],
            [-1, -1]
        ]
    },
    //молния вправо
    {
        main: [
            [1, 0],
            [1, 1],
            [2, 1]
        ],
        d90: [
            [2, -1],
            [0, 0],
            [1, -1],
            [-1, 0]
        ],
        d180: [
            [-2, 0],
            [0, -1],
            [-1, 0],
            [1, -1]
        ],
        d270: [
            [2, -1],
            [0, 0],
            [1, -1],
            [-1, 0]
        ],
        d360: [
            [-2, 0],
            [0, -1],
            [-1, 0],
            [1, -1]
        ]
    },
    // танк
    {
        main: [
            [1, 0],
            [2, 0],
            [1, 1],
        ],
        d90: [
            [1, -1],
            [0, 0],
            [0, 0],
            [0, 0]
        ],
        d180: [
            [0, 0],
            [-1, 0],
            [-1, 0],
            [1, -1]
        ],
        d270: [
            [1, -1],
            [1, -1],
            [1, -1],
            [0, 0]
        ],
        d360: [
            [-2, 0],
            [0, -1],
            [0, -1],
            [-1, -1]
        ]
    }
];

let currentFigure;
let figureBody;
let rorate = 90;

function create() {
    function getRandom() {
        return Math.round(Math.random() * (mainArr.length - 1));
    }
    rorate = 90;
    function getFigureBody() {
        let body = [];
        let first = document.querySelector(`[posX = "${x}"][posY = "${y}"]`);
        first.classList.add('figure');
        body.push(first);
        let figure = mainArr[currentFigure].main;
        for (let i = 0; i < figure.length; i++) {
            let item = document.querySelector(`[posX = "${x + figure[i][0]}"][posY = "${y + figure[i][1]}"]`);
            item.classList.add('figure');
            body.push(item)
        }
        return body;
    }
    currentFigure = getRandom();
    figureBody = getFigureBody();
}
create();

let score = 0;
let input = document.getElementsByTagName('input')[0];
input.value = `Ваши очки: ${score}`;

function getCordinates() {
    return [
        [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')],
        [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')],
        [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')],
        [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')]
    ]
}

function move() {
    let moveFlag = true;
    let cordinates = getCordinates();

    for (let i = 0; i < cordinates.length; i++) {
        if (cordinates[i][1] == 1 ||
            document.querySelector(`[posX = "${cordinates[i][0]}"][posY = "${cordinates[i][1] - 1}"]`).classList.contains('set')) {
            moveFlag = false;
            break;
        }
    }

    if (moveFlag) {
        removeFigure();
        let newFigureBody = [];
        for (let i = 0; i < figureBody.length; i++) {
            newFigureBody.push(document.querySelector(`[posX = "${cordinates[i][0]}"][posY = "${cordinates[i][1] - 1}"]`));
        }
        figureBody = newFigureBody;
        addFigure();
    } else {
        for (let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.remove('figure');
            figureBody[i].classList.add('set');
        }

        for (let i = 1; i < 15; i++) {
            let count = 0;
            for (let k = 1; k < 11; k++) {
                if (document.querySelector(`[posX = "${k}"][posY = "${i}"]`).classList.contains('set')) {
                    count++;
                    if (count === 10) {
                        score += 10;
                        input.value = `Ваши очки: ${score}`;
                        for (let m = 1; m < 11; m++) {
                            document.querySelector(`[posX = "${m}"][posY = "${i}"]`).classList.remove('set');
                        }
                        let set = document.querySelectorAll('.set');
                        let newSet = [];
                        for (let s = 0; s < set.length; s++) {
                            let setCordinates = [set[s].getAttribute('posX'), set[s].getAttribute('posY')];
                            if (setCordinates[1] > i) {
                                set[s].classList.remove('set');
                                newSet.push(document.querySelector(`[posX = "${setCordinates[0]}"][posY = "${setCordinates[1] - 1}"]`));
                            }
                        }
                        for (let a = 0; a < newSet.length; a++) {
                            newSet[a].classList.add('set');
                        }
                        i--;
                    }
                }
            }
        }
        for (let n = 1; n < 11; n++) {
            if (document.querySelector(`[posX = "${n}"][posY = "15"]`).classList.contains('set')) {
                clearInterval(interval);
                alert("Игра окончена");
                break
            }
        }
        create();
    }
}

let interval = setInterval(() => {
    move();
}, 500);

let flag = true;
window.addEventListener('keydown', function({ keyCode }) {
    let cordinates = getCordinates();

    switch (keyCode + "") {
        case '37':
            getNewState(-1);
            break;
        case '39':
            getNewState(1);
            break;
        case '40':
            move();
            break;
        case '38':
            onRorate();
            break;
    }

    function getNewState(a) {
        flag = true;

        let figureNew = [];
        for (let i = 0; i < figureBody.length; i++) {
            figureNew.push(document.querySelector(`[posX = "${+cordinates[i][0] + a}"][posY = "${cordinates[i][1]}"]`));
        }
        for (let i = 0; i < figureNew.length; i++) {
            if (!figureNew[i] || figureNew[i].classList.contains('set')) {
                flag = false;
            }
        }
        if (flag == true) {
            removeFigure();
            figureBody = figureNew;
            addFigure();
        }
    }

    function onRorate() {
        flag = true;

        let figureNew = [];
        let rorateCordinate = mainArr[currentFigure]["d" + rorate];
        for (let i = 0; i < figureBody.length; i++) {
            figureNew.push(document.querySelector(`[posX = "${+cordinates[i][0] + +rorateCordinate[i][0]}"][posY = "${+cordinates[i][1] + +rorateCordinate[i][1]}"]`));
        }
        for (let i = 0; i < figureNew.length; i++) {
            if (!figureNew[i] || figureNew[i].classList.contains('set')) {
                flag = false;
            }
        }
        if (flag == true) {
            removeFigure();
            figureBody = figureNew;
            addFigure();

            if (rorate === 360) {
                rorate = 90;
            } else {
                rorate += 90;
            }
        }
    }
});

function removeFigure() {
    for (let i = 0; i < figureBody.length; i++) {
        figureBody[i].classList.remove('figure');
    }
}

function addFigure() {
    for (let i = 0; i < figureBody.length; i++) {
        figureBody[i].classList.add('figure');
    }
}

