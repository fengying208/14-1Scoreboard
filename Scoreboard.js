let stats = {
    p1: { total: 0, inning: 0, fouls: 0 },
    p2: { total: 0, inning: 0, fouls: 0 }
};

let seconds = 0;

// 頁面載入後直接開始
window.onload = function() {
    startTimer();
};

function changeValue(player, type, val) {
    stats[player][type] += val;
    if (stats[player][type] < 0) stats[player][type] = 0;

    const elementId = player + '-' + (type === 'total' ? 'total' : (type === 'inning' ? 'inning' : 'fouls'));
    document.getElementById(elementId).innerText = stats[player][type];

    // 切換發球方亮邊
    document.getElementById('p1-area').classList.toggle('breaking', player === 'p1');
    document.getElementById('p2-area').classList.toggle('breaking', player === 'p2');
}

function resetInning() {
    ['p1', 'p2'].forEach(p => {
        stats[p].inning = 0;
        stats[p].fouls = 0;
        document.getElementById(p + '-inning').innerText = 0;
        document.getElementById(p + '-fouls').innerText = 0;
    });
}

function startTimer() {
    setInterval(() => {
        seconds++;
        let m = Math.floor(seconds / 60);
        let s = seconds % 60;
        document.getElementById('timer').innerText = 
            (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
    }, 1000);
}

function toggleFull() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}