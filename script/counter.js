let domHolder = "";
let fixedNumbers = 0;

const countUp = function (from, to, classname) {
    domHolder = document.querySelector(`.${classname}`)
    let current = from;

    let difference = to - from;
    let step = difference * 1 / 50;

    domHolder.innerHTML = from.toFixed(fixedNumbers);

    var id = setInterval(function () {
        current += step;
        if (difference > 0) {
            if (current < to) {
                domHolder.innerHTML = current.toFixed(fixedNumbers);
            } else {
                clearInterval(id);
                domHolder.innerHTML = to.toFixed(fixedNumbers);
            }
        } else {
            if (current > to) {
                domHolder.innerHTML = current.toFixed(fixedNumbers);
            } else {
                clearInterval(id);
                domHolder.innerHTML = to.toFixed(fixedNumbers);
            }
        }
    }, 10);
}