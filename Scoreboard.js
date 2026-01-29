let stats = {
    p1: { total: 0, inning: 0, fouls: 0 },
    p2: { total: 0, inning: 0, fouls: 0 }
};

let seconds = 0;

window.onload = function() {
    startTimer();
};

/**
 * 變動分數與檢查邏輯
 */
function changeValue(player, type, val) {
    stats[player][type] += val;
    if (stats[player][type] < 0) stats[player][type] = 0;

    // 更新介面
    document.getElementById(player + '-' + type).innerText = stats[player][type];

    // 檢查「下一局」按鈕顯示條件 (總分 14 點亮)
    const nextBtn = document.getElementById('next-inning-btn');
    if (stats.p1.inning + stats.p2.inning === 14) {
        nextBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'none';
    }

    // 擊球方高亮 (加分時切換)
    if (val > 0 && (type === 'inning' || type === 'total')) {
        document.getElementById('p1-area').classList.toggle('breaking', player === 'p1');
        document.getElementById('p2-area').classList.toggle('breaking', player === 'p2');
    }
}

/**
 * 結算下一局
 */
function processNextInning() {
    ['p1', 'p2'].forEach(p => {
        // 結算公式：總分 = 總分 + 單局得分 - 犯規次數 (不小於 0)
        stats[p].total = Math.max(0, stats[p].total + stats[p].inning - stats[p].fouls);
        
        // 歸零單局資訊
        stats[p].inning = 0;
        stats[p].fouls = 0;

        // 同步畫面
        document.getElementById(p + '-total').innerText = stats[p].total;
        document.getElementById(p + '-inning').innerText = 0;
        document.getElementById(p + '-fouls').innerText = 0;
    });

    // 結算後按鈕隱藏
    document.getElementById('next-inning-btn').style.display = 'none';
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