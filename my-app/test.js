let count = 0;
for (let i = 0; i < 10001; i++) {
	for(let j of [...String(i)]) {
		j == 0 ? count++ : '' 
	};
};
console.log(count);
let obj = {
	a: [1,23,4],
	b: [2,3,4]
}
let arr = Object.values(obj);
console.log(arr)