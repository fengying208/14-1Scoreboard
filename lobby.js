function startMatch() {
    // 獲取輸入值
    const p1Name = document.getElementById('p1-input').value || "選手 1";
    const p2Name = document.getElementById('p2-input').value || "選手 2";
    const raceTo = document.getElementById('race-input').value || 5;

    // 存入 localStorage
    localStorage.setItem('billiards_p1', p1Name);
    localStorage.setItem('billiards_p2', p2Name);
    localStorage.setItem('billiards_race', raceTo);

    // 跳轉到計分板頁面
    window.location.href = 'Scoreboard.html';
}