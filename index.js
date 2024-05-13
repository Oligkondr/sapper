const mainGridEl = document.getElementById('main_grid');
const fieldSize = 144;
const bombCount = 15;

const gameOver = () => {
    alert('Game over! You win.');
}

const setClass = (cellEl, newClass) => {
   cellEl.className = newClass;
}
// Заполнение грида плитками
for (let i = 0; i < fieldSize; i++) {
    const divEl = document.createElement('div');

    divEl.className = 'closed';
    divEl.id = `cell_${i + 1}`;
    divEl.num = i + 1;

    // при нажатии ЛКМ
    divEl.addEventListener('click', function (event) {
        const cellEl = event.target;
        const cell = field[cellEl.num];
        if (cellEl.className !== 'open') {
            if (cell.bomb) {
                gameLose();
            } else {
                setClass(cellEl, 'open')
                if (cell.count) {
                    cellEl.innerText = cell.count;
                } else {
                    openEmpty(cellEl.num);
                }
            }
        }
        checkWin();
    })

    // Смена цвета при нажатии ПКМ
    divEl.addEventListener('contextmenu', function (event) {
        event.preventDefault();
        const cellEl = event.target;
        if (cellEl.className !== 'open') {
            if (cellEl.className !== 'flag') {
                setClass(divEl, 'flag');
            } else {
                setClass(divEl, 'closed');
            }
        }
        checkWin();
    })

    mainGridEl.appendChild(divEl);
}

const getNearCells = (num) => {
    const result = []
    result.push(
        num + 12,
        num - 12,
    )
    if (num % 12 === 0) {
        result.push(
            num - 1,
            num + 12 - 1,
            num - 12 - 1,
        )
    } else if ((num + 11) % 12 === 0) {
        result.push(
            num + 1,
            num + 12 + 1,
            num - 12 + 1,
        )
    } else {
        result.push(
            num + 1,
            num - 1,
            num + 12 + 1,
            num + 12 - 1,
            num - 12 - 1,
            num - 12 + 1,
        )

    }
    return result.filter(num => num >= 1 && num <= fieldSize);
}

// Генератор бомб
const field = {};

for (let i = 1; i <= fieldSize; i++) {
    field[i] = {};
}

for (let i = 0; i < bombCount; i++) {
    const rand = Math.floor(Math.random() * ((fieldSize + 1) - 1) + 1);
    field[rand] = {
        bomb: true,
    };
}


// Заполнение цифрами
for (let i = 1; i <= fieldSize; i++) {
    if (field[i].bomb) {
        continue;
    }
    let count = 0;
    for (const num of getNearCells(i)) {
        if (field[num].bomb) {
            count++;
        }
    }

    field[i].count = count;
}

const gameLose = () => {
    alert('Game over! You lose.');
    for (const cell in field) {
        const el = document.getElementById(`cell_${cell}`);
        if (field[cell].bomb) {
            setClass(el, 'bomb');
            el.innerText = '*';
        }
    }
}

const getCellById = (id) => {
    return document.getElementById(`cell_${id}`)
}

const openEmpty = (cellNum) => {
    field[cellNum].open = true
    for (const num of getNearCells(cellNum)) {
        if (field[num].open) {
            continue;
        }
        if (!field[num].bomb) {
            setClass(getCellById(num), 'open');
            if (field[num].count) {
                getCellById(num).innerText = field[num].count;
            } else {
                openEmpty(num);
            }
        }
    }
}

const checkWin = () => {
    for (let i = 1; i <= fieldSize; i++) {
        const cellEl = getCellById(i)
        if (cellEl.className === 'closed') {
            return false;
        }
    }
    gameOver();
}

// !! Технический !! Показывает координаты
// divEl.innerText = `${divEl.coord_x} / ${divEl.coord_y}`;

// !! Технический !! Показывает расположение бомб и цифр
// for (let i = 1; i <= fieldSize; i++) {
//     const cellEl = document.getElementById(`cell_${i}`);
//
//     if (field[i].bomb) {
//         cellEl.innerText = '*';
//     }
//     if (field[i].count) {
//         cellEl.innerText = field[i].count;
//     }
// }
