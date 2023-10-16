function coordinateFirstVector() {
    var x1=document.getElementById('x1');
    var y1=document.getElementById('y1'); // это Input
    var z1=document.getElementById('z1');
    var px1=document.getElementById('px1'); // p - абзац
    var py1=document.getElementById('py1'); // p - абзац
    var pz1=document.getElementById('pz1'); // p - абзац

    px1.value=x1.value;
    py1.innerHTML=y1.value;
    pz1.innerHTML=z1.value;
}

function coordinateSecondVector() {
    var x2=document.getElementById('x2'); //  это Input
    var y2=document.getElementById('y2');
    var z2=document.getElementById('z2');
    var px2=document.getElementById('px2'); // p - абзац
    var py2=document.getElementById('py2'); // p - абзац
    var pz2=document.getElementById('pz2'); // p - абзац

    px2.innerHTML=x2.value;
    py2.innerHTML=y2.value;
    pz2.innerHTML=z2.value;
}
//
// var num = document.getElementById('num');
// var rng = document.getElementById('range');
// var view = document.getElementById('view');
// var goods = document.querySelectorAll('.good');
// const set = val => {
//     num.value = val;
//     rng.value = val;
//     view.textContent = val;
//     [...goods].forEach(good => {
//         const options = good.querySelectorAll('.option');
//         [...options].forEach(option => {
//             option.style.display = val >= +option.dataset.from ? 'block': 'none';
//         });
//     });
// }

rng.addEventListener('input', () => set(rng.value));
num.addEventListener('change', () => set(num.value));



// создаем деления на ползунке
let values = [];

$("datalist > option").each((index, item) => {
    values.push($(item).html());
});

let min = (obj) => {
    var a = obj[0];
    for (var i = 1; i < obj.length; i++) {
        if (obj[i] < a) {
            a = obj[i];
        }
    }
    return a;
}

$("input[type='range']").on("input", (e) => {
    let element = $(e.currentTarget);
    let value = element.val();

    let differenceArr = [];
    values.forEach((item, index) => {
        differenceArr.push(Math.abs(item - value));
    });
    let minDifferense = min(differenceArr);
    let newValue = values[differenceArr.indexOf(minDifferense)];
    element.val(newValue);
});