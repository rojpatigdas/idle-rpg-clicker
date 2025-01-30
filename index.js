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

    // Game loop
    setInterval(() => {
        attack(autoDamage);
    }, 1000);

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
        }
        updateUI();
    }

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

    updateUI();
});