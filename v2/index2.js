class Sapper {
    mainGridEl = document.getElementById('main_grid');
    isGameOver = false;
    gameProgress = 0;
    health = 3;
    field = {};

    constructor(fieldSize, bombCount) {
        this.fieldSize = fieldSize ** 2;
        this.bombCount = bombCount;
    };

    init() {

        this.mainGridEl.style.gridTemplateColumns = `repeat(${Math.sqrt(this.fieldSize)}, 50px)`;
        this.mainGridEl.style.gridTemplateRows = `repeat(${Math.sqrt(this.fieldSize)}, 50px)`;

        for (let i = 0; i < this.fieldSize; i++) {
            const divEl = document.createElement('div');

            divEl.className = 'closed';
            divEl.id = `cell_${i + 1}`;
            divEl.num = i + 1;

            divEl.addEventListener('click', (event) => this.lmc(event));
            divEl.addEventListener('contextmenu', (event) => this.rmc(event));

            this.mainGridEl.appendChild(divEl);
        }
    };

    lmc(event) {
        if (this.isGameOver) {
            return false;
        }

        const cellEl = event.target;
        const cell = this.field[cellEl.num];
        if (cellEl.className !== 'open' && cellEl.className !== 'flag') {
            if (cell.bomb) {
                this.health -= 1;
                if (this.health === 0) {
                    this.gameLose();
                }
                this.setClass(cellEl, 'bomb');
                cellEl.innerText = '*';
            } else {
                this.setClass(cellEl, 'open');
                if (cell.count) {
                    this.showCount(cellEl, cell.count);
                } else {
                    this.openEmpty(cellEl.num);
                }
            }
        }
        this.checkWin();
    };

    rmc(event) {
        event.preventDefault();

        if (this.isGameOver) {
            return false;
        }

        const cellEl = event.target;
        if (cellEl.className !== 'open') {
            if (cellEl.className !== 'flag') {
                this.setClass(cellEl, 'flag');
            } else {
                this.setClass(cellEl, 'closed');
            }
        }
        this.checkWin();
    };

    bombGenerator() {
        this.field = {};

        for (let i = 1; i <= this.fieldSize; i++) {
            this.field[i] = {};
        }

        // for (let i = 0; i < this.bombCount; i++) {
        //     const rand = Math.floor(Math.random() * ((this.fieldSize + 1) - 1) + 1);
        //     this.field[rand] = {
        //         bomb: true,
        //     };
        // }

        let i = 0;
        while (i < this.bombCount) {
            const rand = Math.floor(Math.random() * ((this.fieldSize + 1) - 1) + 1);
            if (!Object.hasOwn(this.field, this.field[rand])) {
                this.field[rand] = {
                    bomb: true,
                };
                i++;
            }
        }
    };

    calculationOfNumbers() {
        for (let i = 1; i <= this.fieldSize; i++) {
            if (this.field[i].bomb) {
                continue;
            }
            let count = 0;
            for (const num of this.getNearCells(i)) {
                if (this.field[num].bomb) {
                    count++;
                }
            }

            this.field[i].count = count;
        }
    };

    getNearCells(num) {
        const result = [];
        // result.push(
        //     num + 12,
        //     num - 12,
        // );
        if (num % 12 === 0) {
            result.push(
                num - 12 - 1,
                num - 12,
                -1,
                num - 1,
                0,
                -1,
                num + 12 - 1,
                num + 12,
                -1,

                // num - 1,
                // num + 12 - 1,
                // num - 12 - 1,
            );
        } else if ((num + 11) % 12 === 0) {
            result.push(
                -1,
                num - 12,
                num - 12 + 1,
                -1,
                0,
                num + 1,
                -1,
                num + 12,
                num + 12 + 1,

                // num + 1,
                // num + 12 + 1,
                // num - 12 + 1,
            );
        } else {
            result.push(
                num - 12 - 1,
                num - 12,
                num - 12 + 1,
                num - 1,
                0,
                num + 1,
                num + 12 - 1,
                num + 12,
                num + 12 + 1,
            );

        }
        return result.filter((num) => num >= 1 && num <= this.fieldSize);
    };

    getCellById(id) {
        return document.getElementById(`cell_${id}`);
    };

    openEmpty(cellNum) {
        this.field[cellNum].open = true;
        for (const num of this.getNearCells(cellNum)) {
            if (this.field[num].open) {
                continue;
            }
            if (!this.field[num].bomb) {
                this.setClass(this.getCellById(num), 'open');
                if (this.field[num].count) {
                    this.showCount(this.getCellById(num), this.field[num].count);
                } else {
                    this.openEmpty(num);
                }
            }
        }
    };

    setClass(cellEl, newClass) {
        cellEl.className = newClass;
    };

    checkWin() {
        if (this.isGameOver) {
            return false;
        }
        for (let i = 1; i <= this.fieldSize; i++) {
            const cellEl = this.getCellById(i);
            if (cellEl.className === 'closed') {
                return false;
            }
        }
        this.gameWin();
    };

    gameLose() {
        this.isGameOver = true;
        alert('Game over! You lose.');
        for (const cell in this.field) {
            const el = document.getElementById(`cell_${cell}`);
            if (this.field[cell].bomb) {
                this.setClass(el, 'bomb');
                el.innerText = '*';
            }
        }
    };

    gameWin() {
        this.isGameOver = true;
        alert('Game over! Tou win');
    };

    showCount(cell, count) {
        cell.innerText = count;
        switch (count) {
            case 1:
                cell.style.color = 'blue';
                break;
            case 2:
                cell.style.color = 'green';
                break;
            case 3:
                cell.style.color = 'red';
                break;
            case 4:
                cell.style.color = 'purple';
                break;
            case 5:
                cell.style.color = 'orange';
                break;
            case 6:
                cell.style.color = 'cyan';
                break;
            case 7:
                cell.style.color = 'yellow';
                break;
            case 8:
                cell.style.color = 'black';
                break;
        }
    };

    setCellBg(id) {

    };

    getNearArr(id) {
        const flat = [];
        for (const num of getNearCells(id)) {

            // (num === 0 || getCellById(num).className !== 'close') ? flat.push(0) : flat.push(1);

            if (num === 0 || getCellById(num).className !== 'close') {
                flat.push(0);
            } else {
                flat.push(1);
            }
        }

        const result = flat.slice(0, 3);
        result[3] = a.slice(3, 6);
        result[3][3] = a.slice(-3);
        return result;
    };

    run() {
        this.init();
        this.bombGenerator();
        this.calculationOfNumbers();
        // this.showBombs(); // Только для тестов. Показывает бомбы
    };

    showBombs() {
        for (let i = 1; i <= this.fieldSize; i++) {
            const cellEl = document.getElementById(`cell_${i}`);

            if (this.field[i].bomb) {
                cellEl.innerText = '*';
            }
        }
    }; // Только для тестов. Показывает бомбы
}

const sapper = new Sapper(12, 20);
sapper.run();
