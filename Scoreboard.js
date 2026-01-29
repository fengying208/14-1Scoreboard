let p1Score = 0, p2Score = 0;

function startGame() {
    document.getElementById('p1-name').innerText = document.getElementById('p1-input').value || "選手 1";
    document.getElementById('p2-name').innerText = document.getElementById('p2-input').value || "選手 2";
    document.getElementById('race-display').innerText = document.getElementById('race-input').value;
    document.getElementById('lobby').style.display = 'none';
}

function changeScore(player, val) {
    if(player === 'p1') {
        p1Score += val;
        document.getElementById('p1-total').innerText = p1Score;
        // 切換開球方視覺效果
        document.getElementById('p1-area').classList.add('breaking');
        document.getElementById('p2-area').classList.remove('breaking');
    } else {
        p2Score += val;
        document.getElementById('p2-total').innerText = p2Score;
        document.getElementById('p2-area').classList.add('breaking');
        document.getElementById('p1-area').classList.remove('breaking');
    }
}

function resetGame() {
    if(confirm("確定要重置比賽嗎？")) location.reload();
}

function toggleFull() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}