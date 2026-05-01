let combo = [0, 0, 0, 0];
function change(i, v) {
    combo[i] = (combo[i] + v + 10) % 10;
    document.getElementById(`d${i}`).innerText = combo[i];
}
function unlock() {
    if(combo.join('') === '2718') {
        window.location.href = 'historia.html';
    } else {
        alert("Esa no es nuestra clave ❤️");
    }
}