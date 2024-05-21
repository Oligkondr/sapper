// const x = [1, 2, 3, [6, 7, 8, [11, 12, 13]]];
// console.log(x[1]);
// console.log(x[3]);
// console.log(x[3][3]);
// console.log(x[3][3][1]);
// const nearArr = [1, 1, 1, [1, 0, 1, [1, 1, 1]]];

const a = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // --> [1,2,3,[4,5,6,[7,8,9]]]
const one = a.slice(0, 3);
const two = a.slice(3, 6);
const three = a.slice(-3);
two.push(three);
one.push(two);
// console.log(one);

const b = a.slice(0, 3);
b[3] = a.slice(3, 6);
b[3][3] = a.slice(-3);
// console.log(b);

// console.log((a.slice(3)));

const result = a.slice(0, 3);
const second = a.slice(3);
for (let i = 0; i < second.length; i++) {
    if (i % 3 === 0) {
        result[3] = [];
        result[3].push(second[i]);
    } else if (i === 5) {
        result[3][3] = [];
        result[3][3].push(second[i]);
    }
}
// console.log(result);


let h = 0.69
const j = 0.69
// console.log(h += j)

const q = {34: {bomb: true}};
const w = 34
// console.log(q[w]);
// console.log(Object.hasOwn(q, 34));

const e = [1, 2, 3, 4, 5, 6, 7, 8, 9]
for (const id of e) {
    console.log(id)
}
