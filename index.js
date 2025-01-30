$(document).ready(function() {
    // Game state
    let gameState = {
        gold: 0,
        damage: 1,
        autoDamage: 0,
        monsterHealth: 10,
        maxMonsterHealth: 10,
        damageUpgradeCost: 10,
        autoClickerCost: 50,
        damageLevel: 1,
        autoClickerLevel: 0,
        currentMonster: null
    };

    const monsters = [
        { name: "Maddie", image: './assets/img/maddie.png' },
        { name: "Ambessa", image: './assets/img/Ambessa.png' },
        { name: "Finn", image: './assets/img/Finn.png' }
    ];

    // Save system
    function saveGame() {
        const saveData = {
            ...gameState,
            currentMonsterName: gameState.currentMonster.name
        };
        localStorage.setItem('rpgClickerSave', JSON.stringify(saveData));
    }

    function loadGame() {
        const savedData = localStorage.getItem('rpgClickerSave');
        if (savedData) {
            const loadedData = JSON.parse(savedData);
            
            // Update game state
            gameState = {
                ...loadedData,
                currentMonster: monsters.find(m => m.name === loadedData.currentMonsterName) || monsters[0]
            };
            
            // Update monster display
            $('#monster').css('background-image', `url(${gameState.currentMonster.image})`);
            $('#monsterName').text(gameState.currentMonster.name);
        }
    }

    function spawnNewMonster() {
        gameState.currentMonster = monsters[Math.floor(Math.random() * monsters.length)];
        $('#monster').css('background-image', `url(${gameState.currentMonster.image})`);
        $('#monsterName').text(gameState.currentMonster.name);
    }

    function updateUI() {
        $('#gold').text(gameState.gold);
        $('#damage').text(gameState.damage);
        $('#autoDamage').text(gameState.autoDamage);
        $('#health').css('width', (gameState.monsterHealth / gameState.maxMonsterHealth * 100) + '%');
        
        $('#damageCost').text(gameState.damageUpgradeCost);
        $('#damageLevel').text(gameState.damageLevel);
        $('#autoClickerCost').text(gameState.autoClickerCost);
        $('#autoClickerLevel').text(gameState.autoClickerLevel);
    }

    function attack(amount) {
        gameState.monsterHealth -= amount;
        if (gameState.monsterHealth <= 0) {
            gameState.gold += Math.floor(gameState.maxMonsterHealth / 2);
            gameState.monsterHealth = gameState.maxMonsterHealth;
            gameState.maxMonsterHealth = Math.floor(gameState.maxMonsterHealth * 1.2);
            spawnNewMonster();
        }
        updateUI();
        saveGame();
    }

    // Game systems
    function setupEventListeners() {
        $('#monster').click(() => attack(gameState.damage));
        
        $('#damageUpgrade').click(() => {
            if (gameState.gold >= gameState.damageUpgradeCost) {
                gameState.gold -= gameState.damageUpgradeCost;
                gameState.damage += 2;
                gameState.damageLevel++;
                gameState.damageUpgradeCost = Math.floor(gameState.damageUpgradeCost * 1.5);
                updateUI();
                saveGame();
            }
        });

        $('#autoClicker').click(() => {
            if (gameState.gold >= gameState.autoClickerCost) {
                gameState.gold -= gameState.autoClickerCost;
                gameState.autoDamage += 1;
                gameState.autoClickerLevel++;
                gameState.autoClickerCost = Math.floor(gameState.autoClickerCost * 2);
                updateUI();
                saveGame();
            }
        });
    }

    // Initialize game
    function init() {
        loadGame();
        if (!gameState.currentMonster) {
            spawnNewMonster();
        } else {
            $('#monster').css('background-image', `url(${gameState.currentMonster.image})`);
            $('#monsterName').text(gameState.currentMonster.name);
        }
        
        // Auto-save every 30 seconds
        setInterval(saveGame, 30000);
        
        // Auto-attack loop
        setInterval(() => attack(gameState.autoDamage), 1000);
        
        setupEventListeners();
        updateUI();
    }

    init();
});