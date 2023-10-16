function coordinateFirstVector() {
    var x1=document.getElementById('x1'); //rng - это Input
    var y1=document.getElementById('y1'); //rng - это Input
    var z1=document.getElementById('z1'); //rng - это Input
    var px1=document.getElementById('px1'); // p - абзац
    var py1=document.getElementById('py1'); // p - абзац
    var pz1=document.getElementById('pz1'); // p - абзац

    px1.innerHTML=x1.value;
    py1.innerHTML=y1.value;
    pz1.innerHTML=z1.value;
}

function coordinateSecondVector() {
    var x2=document.getElementById('x2'); //rng - это Input
    var y2=document.getElementById('y2'); //rng - это Input
    var z2=document.getElementById('z2'); //rng - это Input
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
//
// rng.addEventListener('input', () => set(rng.value));
// num.addEventListener('change', () => set(num.value));
