$(document).ready(function() {
    let gold = 0;
    let damage = 1;
    let autoDamage = 0;
    let monsterHealth = 10;
    let maxMonsterHealth = 10;
    let damageUpgradeCost = 10;
    let autoClickerCost = 50;
    let damageLevel = 1;
    let autoClickerLevel = 0;

    const monsters = [
        { name: "Maddie", image: './assets/img/maddie.png' },
        { name: "Ambessa", image: './assets/img/Ambessa.png' },
        { name: "Finn", image: './assets/img/Finn.png' }
    ];

    function spawnNewMonster() {
        const randomMonster = monsters[Math.floor(Math.random() * monsters.length)];
        $('#monster').css('background-image', `url(${randomMonster.image})`);
        $('#monsterName').text(randomMonster.name);
    }

    function updateUI() {
        $('#gold').text(gold);
        $('#damage').text(damage);
        $('#autoDamage').text(autoDamage);
        $('#health').css('width', (monsterHealth / maxMonsterHealth * 100) + '%');
        
        $('#damageCost').text(damageUpgradeCost);
        $('#damageLevel').text(damageLevel);
        $('#autoClickerCost').text(autoClickerCost);
        $('#autoClickerLevel').text(autoClickerLevel);
    }

    function attack(amount) {
        monsterHealth -= amount;
        if (monsterHealth <= 0) {
            gold += Math.floor(maxMonsterHealth / 2);
            monsterHealth = maxMonsterHealth;
            maxMonsterHealth = Math.floor(maxMonsterHealth * 1.2);
            spawnNewMonster();
        }
        updateUI();
    }

    // Game loop
    setInterval(() => {
        attack(autoDamage);
    }, 1000);

    $('#monster').click(() => {
        attack(damage);
    });

    $('#damageUpgrade').click(() => {
        if (gold >= damageUpgradeCost) {
            gold -= damageUpgradeCost;
            damage += 2;
            damageLevel++;
            damageUpgradeCost = Math.floor(damageUpgradeCost * 1.5);
            updateUI();
        }
    });

    $('#autoClicker').click(() => {
        if (gold >= autoClickerCost) {
            gold -= autoClickerCost;
            autoDamage += 1;
            autoClickerLevel++;
            autoClickerCost = Math.floor(autoClickerCost * 2);
            updateUI();
        }
    });

    // Initialize first monster
    spawnNewMonster();
    updateUI();
});