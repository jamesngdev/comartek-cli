function toCamelCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

const toSnakeCase = (str = '') => {
    const strArr = str.split(' ');
    const snakeArr = strArr.reduce((acc, val) => {
        return acc.concat(val.toLowerCase());
    }, []);
    return snakeArr.join('_');
};

function toPascalCase(string) {
    return `${string}`
        .toLowerCase()
        .replace(new RegExp(/[-_]+/, 'g'), ' ')
        .replace(new RegExp(/[^\w\s]/, 'g'), '')
        .replace(
            new RegExp(/\s+(.)(\w*)/, 'g'),
            ($1, $2, $3) => `${$2.toUpperCase() + $3}`
        )
        .replace(new RegExp(/\w/), s => s.toUpperCase());
}


module.exports = {
    toCamelCase,
    toSnakeCase,
    toPascalCase
}