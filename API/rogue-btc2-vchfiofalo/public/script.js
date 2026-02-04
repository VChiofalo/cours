let currentGame = null;
let adminToken = null;

// --- Admin Auth ---

async function registerAdmin() {
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    try {
        const res = await fetch('/admin/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (res.ok) {
            alert('Admin registered!');
            updateAdminStatus();
        } else alert(data.error);
    } catch(e) {
        alert('Error: ' + e.message);
    }
}

async function loginAdmin() {
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    try {
        const res = await fetch('/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (res.ok || res.status === 200) {
            adminToken = data.token;
            alert('Admin logged in!');
            updateAdminStatus();
        } else {
            alert(data.error);
        }
    } catch(e) {
        alert('Error: ' + e.message);
    }
}

function updateAdminStatus() {
    const statusDiv = document.getElementById('adminStatus');
    if (!statusDiv) {
        const div = document.createElement('div');
        div.id = 'adminStatus';
        document.body.insertBefore(div, document.body.firstChild);
    }
    document.getElementById('adminStatus').innerText = adminToken ? 'Admin connecté' : 'Admin non connecté';
}

// --- Player Management (plus besoin d'admin connecté) ---

async function createPlayer() {
    const name = document.getElementById('playerName').value;
    const headers = { 'Content-Type': 'application/json' };
    if (adminToken) headers['Authorization'] = `Bearer ${adminToken}`;

    const res = await fetch('/players', {
        method: 'POST',
        headers,
        body: JSON.stringify({ name })
    });
    const player = await res.json();
    if (res.ok) loadPlayers();
    else alert(player.error);
}

async function loadPlayers() {
    const headers = {};
    if (adminToken) headers['Authorization'] = `Bearer ${adminToken}`;

    const res = await fetch('/players', { headers });
    const players = await res.json();
    const select = document.getElementById('playerSelect');
    select.innerHTML = '';
    players.forEach(p => {
        const option = document.createElement('option');
        option.value = p.id;
        option.text = p.name;
        select.add(option);
    });
}

// --- Game Management ---

async function createGame() {
    const playerId = document.getElementById('playerSelect').value;
    const res = await fetch('/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId })
    });
    currentGame = await res.json();
    showGameStatus();
}

async function move() {
    const res = await fetch(`/games/${currentGame.id}/move`, { method: 'POST' });
    const game = await res.json();
    currentGame = game;
    showGameStatus();
}

async function attack() {
    const res = await fetch(`/games/${currentGame.id}/attack`, { method: 'POST' });
    const game = await res.json();
    currentGame = game;
    showGameStatus();
}

// --- Display Game Status ---

function showGameStatus() {
    const div = document.getElementById('gameStatus');
    if (!currentGame) return;

    if (currentGame.status !== 'playing') {
        alert(`Game ${currentGame.status.toUpperCase()}!`);
        currentGame = null;
        div.innerHTML = '';
        return;
    }

    const room = currentGame.rooms[currentGame.currentRoomIndex];
    div.innerHTML = `
        Player: ${currentGame.player.name} | HP: ${currentGame.player.hp} <br>
        Current Room: ${room.id} <br>
        Monsters: ${room.monsters.map(m => `${m.name} (${m.hp} HP)`).join(', ')}
    `;
}

// --- Init ---
updateAdminStatus();
loadPlayers();