function appendPlaces(place, product) {
    if (!place) {
        place = [];
    }
    const productSplit = String(product).split('');
    for (let index = productSplit.length - 1; index >= 0; index--) {
        place.push(productSplit[index]);
    }
    return place;
}

function getNumberByIndex(number, index) {
    return Number(String(number).split('')[index]);
}

function isCarryAvailable(number) {
    return String(number).split('').length === 2;
}

function multiplicationAlog(multiplicand, multiplier) {
    const aSplit = String(multiplier).split('');
    const bSplit = String(multiplicand).split('');
    let step = 0;
    let place = 0;
    const places = [];
    const result = {};
    for (let i = aSplit.length - 1; i >= 0; i--) {
        const a = aSplit[i];
        let carry = 0;
        place++;
        for (let j = bSplit.length - 1; j >= 0; j--) {
            const b = bSplit[j];
            const multipledValue = b * a + carry;

            let product;
            if (isCarryAvailable(multipledValue)) {
                product = getNumberByIndex(multipledValue, 1);
            } else {
                product = getNumberByIndex(multipledValue, 0);
            }
            if (j === 0) {
                product = multipledValue;
            }
            result[`step${step + 1}`] = {
                place,
                product,
                desc: `(${b} * ${a}) + ${carry} = ${product}`,
            };
            carry = isCarryAvailable(multipledValue) ? getNumberByIndex(multipledValue, 0) : 0;

            places[place - 1] = appendPlaces(places[place - 1], product);
            step++;
        }
        if (place !== aSplit.length) {
            result[`step${step + 1}`] = {
                place: place + 1,
                product: 0,
                desc: `Adding Prepend Zeros`,
            };
            places[place] = appendPlaces(places[place + 1], 0);
            step++;
            for (let index = 1; index < place; index++) {
                result[`step${step + 1}`] = {
                    place: place + 1,
                    product: 0,
                    desc: `Adding Prepend Zeros`,
                };
                places[place] = appendPlaces(places[place], 0);
                step++;
            }
        }
    }
    const maxLengthArrayLengthSize = places[places.length - 1].length;
    let sum = '';
    let carry = 0;
    for (let index = 0; index < maxLengthArrayLengthSize; index++) {
        let rowSum = 0;
        let desc = '';
        for (let j = 0; j < places.length; j++) {
            desc += (Number(places[j][index]) || 0) + ' + ';
            rowSum += Number(places[j][index]) || 0;
        }
        rowSum = rowSum + carry;
        desc = desc + '' + carry + ' = ' + rowSum;
        if (isCarryAvailable(rowSum)) {
            carry = getNumberByIndex(rowSum, 0);
            if (index === maxLengthArrayLengthSize - 1) sum = rowSum + sum;
            else sum = getNumberByIndex(rowSum, 1) + sum;
        } else {
            carry = 0;
            sum = carry + rowSum + sum;
        }
        result[`step${step + 1}`] = {
            product: Number(sum),
            desc,
        };
        step++;
    }
    console.log(result);
}

multiplicationAlog(100, 10);
