Array.prototype.customMap = function (callBack) {
	if (!this.length) throw new Error("Empty array");
	let newArray = [];
	this.forEach((element, index) => {
		if (element != " " || element != "")
			newArray.push(callBack(element, index));
	});
	return newArray;
};

Array.prototype.myCustomReduce = function (callBack, initialValue) {
	if (!this.length && initialValue === undefined)
		throw new Error("Empty array or initials value is undefined");
	let total = initialValue;
	let index = 0;
	if (initialValue === undefined) {
		total = this[0];
		index = 1;
	}

	for (; index < this.length; index++) {
		total = callBack(total, this[index], index, this);
	}

	return total;
};

function customReduce() {
	let input = inputText.value.split(" ");
	const reduce = input.myCustomReduce((total, curr) => {
		return total + curr;
	}, 0);
	console.log(reduce);
	arrayValue.innerHTML = reduce;
}

function customMap() {
	const array = inputText.value.split(" ");
	const result = array.customMap((x, i) => x * 2);
	console.log(result);
	arrayValue.innerHTML = result;
}

function pipe(array_of_functions) {
	return function (category) {
		let result = category;
		array_of_functions.forEach((_function) => {
			let func = _function;
			result = func(result);
		});
		console.log(result);
		return result;
	};
}
