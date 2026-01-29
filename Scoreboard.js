let stats = {
    p1: { total: 0, inning: 0, fouls: 0 },
    p2: { total: 0, inning: 0, fouls: 0 }
};

let seconds = 0;

window.onload = function() {
    startTimer();
};

function changeValue(player, type, val) {
    // 更新數據
    stats[player][type] += val;
    if (stats[player][type] < 0) stats[player][type] = 0;

    // 更新介面顯示
    const elementId = player + '-' + type;
    const targetElement = document.getElementById(elementId);
    if (targetElement) {
        targetElement.innerText = stats[player][type];
    }

    // 只有在增加「單局分數」或「總分」時，才切換擊球者高亮
    if (val > 0 && (type === 'inning' || type === 'total')) {
        document.getElementById('p1-area').classList.toggle('breaking', player === 'p1');
        document.getElementById('p2-area').classList.toggle('breaking', player === 'p2');
    }
}

// 清除單局邏輯 (通常在一局結束後按下)
function resetInning() {
    ['p1', 'p2'].forEach(p => {
        stats[p].inning = 0;
        stats[p].fouls = 0;
        document.getElementById(p + '-inning').innerText = 0;
        document.getElementById(p + '-fouls').innerText = 0;
    });
}

// ...其餘計時器與全螢幕功能保持不變...