let stats = {
    p1: { total: 0, inning: 0, fouls: 0 },
    p2: { total: 0, inning: 0, fouls: 0 }
};

let seconds = 0;
let pressTimer;
let isLongPress = false;
const LONG_PRESS_DURATION = 600; // 長按判斷時間 (毫秒)

window.onload = function() {
    // 從 localStorage 讀取大廳設定的資料
    const p1Saved = localStorage.getItem('billiards_p1') || "選手 1";
    const p2Saved = localStorage.getItem('billiards_p2') || "選手 2";
    const raceSaved = localStorage.getItem('billiards_race') || 5;

    // 將資料寫入 HTML
    document.getElementById('p1-name').innerText = p1Saved;
    document.getElementById('p2-name').innerText = p2Saved;
    document.getElementById('race-display').innerText = raceSaved;

    initTouchLogic(); // 初始化觸控監聽
    // 啟動計時器
    startTimer();
};

function initTouchLogic() {
    const clickables = document.querySelectorAll('.clickable');

    clickables.forEach(el => {
        const handleStart = (e) => {
            isLongPress = false;
            const player = el.getAttribute('data-player');
            const type = el.getAttribute('data-type');

            pressTimer = setTimeout(() => {
                isLongPress = true;
                changeValue(player, type, -1); // 長按觸發扣分
                if (navigator.vibrate) navigator.vibrate(50); // 手機震動回饋
            }, LONG_PRESS_DURATION);
        };

        const handleEnd = (e) => {
            clearTimeout(pressTimer);
            if (!isLongPress) {
                const player = el.getAttribute('data-player');
                const type = el.getAttribute('data-type');
                changeValue(player, type, 1); // 短按觸發加分
            }
            e.preventDefault(); // 防止觸發預設 click
        };

        const handleCancel = () => {
            clearTimeout(pressTimer);
        };

        // 監聽觸控事件 (平板/手機)
        el.addEventListener('touchstart', handleStart, { passive: false });
        el.addEventListener('touchend', handleEnd, { passive: false });
        el.addEventListener('touchmove', handleCancel);

        // 監聽滑鼠事件 (電腦測試用)
        el.addEventListener('mousedown', handleStart);
        el.addEventListener('mouseup', handleEnd);
        el.addEventListener('mouseleave', handleCancel);
    });
}

function changeValue(player, type, val) {
    stats[player][type] += val;
    if (stats[player][type] < 0) stats[player][type] = 0;

    const targetId = player + '-' + type;
    const element = document.getElementById(targetId);
    if (element) {
        element.innerText = stats[player][type];
    }

    const nextBtn = document.getElementById('next-inning-btn');
    const totalInningScore = stats.p1.inning + stats.p2.inning;
    nextBtn.style.display = (totalInningScore === 14) ? 'block' : 'none';

    if (val > 0 && (type === 'inning' || type === 'total')) {
        document.getElementById('p1-area').classList.toggle('breaking', player === 'p1');
        document.getElementById('p2-area').classList.toggle('breaking', player === 'p2');
    }
}

/**
 * 變動分數與檢查邏輯
 */
function changeValue(player, type, val) {
    stats[player][type] += val;
    // 確保數值不小於 0
    if (stats[player][type] < 0) stats[player][type] = 0;

    // 更新介面顯示
    const targetId = player + '-' + type;
    const element = document.getElementById(targetId);
    if (element) {
        element.innerText = stats[player][type];
    }

    // 檢查「下一局」按鈕顯示條件：兩邊單局得分相加等於 14
    const nextBtn = document.getElementById('next-inning-btn');
    const totalInningScore = stats.p1.inning + stats.p2.inning;
    
    if (totalInningScore === 14) {
        nextBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'none';
    }

    // 擊球方高亮切換：只有在加分時才切換進攻方
    if (val > 0 && (type === 'inning' || type === 'total')) {
        document.getElementById('p1-area').classList.toggle('breaking', player === 'p1');
        document.getElementById('p2-area').classList.toggle('breaking', player === 'p2');
    }
}

/**
 * 結算下一局：將單局得分與犯規併入總分
 */
function processNextInning() {
    ['p1', 'p2'].forEach(p => {
        // 公式：新總分 = 舊總分 + 單局得分 - 犯規次數
        stats[p].total = Math.max(0, stats[p].total + stats[p].inning - stats[p].fouls);
        
        // 單局數據歸零
        stats[p].inning = 0;
        stats[p].fouls = 0;

        // 同步 UI
        document.getElementById(p + '-total').innerText = stats[p].total;
        document.getElementById(p + '-inning').innerText = 0;
        document.getElementById(p + '-fouls').innerText = 0;
    });

    // 結算後隱藏按鈕
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

function returnToLobby() {
    if(confirm("確定要結束比賽並返回主大廳嗎？")) {
        window.location.href = 'index.html';
    }
}