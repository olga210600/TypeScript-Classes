interface IParams {
    name     : string;
    damage   : number;
    hp       : number;
    strength : number;
    agility  : number;
}

class FighterClass {
    public numberOfLosses : number;
    public name           : string;
    public damage         : number;
    public hp             : number;
    public strength       : number;
    public agility        : number;
    public numberOfWins   : number;

    constructor(params: IParams) {
        this.name           = params.name;
        this.damage         = params.damage;
        this.hp             = params.hp;
        this.strength       = params.strength;
        this.agility        = params.agility;
        this.numberOfWins   = 0;
        this.numberOfLosses = 0;
    }

    get getName(): string {
        return this.name;
    }

    get getDamage(): number {
        return this.damage;
    }

    get getHealth(): number {
        return this.hp;
    }

    get getStrength(): number {
        return this.strength;
    }

    get getAgility(): number {
        return this.agility;
    }

    get getNumberOfWins(): number {
        return this.numberOfWins;
    }

    get getNumberOfLosses(): number {
        return this.numberOfLosses;
    }

    hitFighter(defender: FighterClass) {
        defender.dealDamage(this.getDamage);
        console.log(`${this.getName} makes ${this.getDamage} damage ${defender.getName}`);
    }

    probabilitySuccessfulBattle(): boolean {
        const hitProbability = 100 - (this.strength + this.agility);
        const hitFighter     = (Math.random() * 100) <= hitProbability;
        return hitFighter;
    }

    attack(defender: FighterClass): void {
        if (this.probabilitySuccessfulBattle()) {
            this.hitFighter(defender);
        } else {
            console.log(`${this.name} attack missed`);
        }
    }

    logCombatHistory(): void {
        console.log(`Name: ${this.getName} , Wins: ${this.getNumberOfWins}, Losses: ${this.getNumberOfLosses}`);
    }

    heal(value: number): void {
        if (this.getHealth + value > this.hp) {
            this.hp = value
        } else {
            this.hp = this.getHealth + value;
        }
    }

    dealDamage(value: number): void {
        if (this.getHealth - value < 0) {
            this.hp = 0
        } else {
            this.hp = this.getHealth - value;
        }
    }

    addWin(): void {
        this.numberOfWins = this.getNumberOfWins + 1;
    }

    addLoss(): void {
        this.numberOfLosses = this.getNumberOfLosses + 1;
    }
}

const firstFighterClass = new FighterClass({
    name     : "Maximus",
    damage   : 20,
    hp       : 100,
    strength : 20,
    agility  : 15
});

const secondFighterClass = new FighterClass({
    name     : "Commodus",
    damage   : 25,
    hp       : 90,
    strength : 25,
    agility  : 20
});

function getResultBattle(): void {
    if (firstFighterClass.getHealth === secondFighterClass.getHealth) {
        firstFighterClass.addLoss();
        secondFighterClass.addLoss();
        console.log('The battle is over with no winners.Both opponents fell in battle!');
    } else if (firstFighterClass.getHealth > 0) {
        console.log(`${firstFighterClass.getName} has won!`);
        firstFighterClass.addWin();
        secondFighterClass.addLoss();
    } else {
        console.log(`${secondFighterClass.getName} has won!`);
        secondFighterClass.addWin();
        firstFighterClass.addLoss();
    }
}

function loopСondition(): void {
    while (firstFighterClass.getHealth > 0 && secondFighterClass.getHealth > 0) {
        firstFighterClass.attack(secondFighterClass);
        secondFighterClass.attack(firstFighterClass);
    }
}

function battle(firstFighterClass: FighterClass, secondFighterClass: FighterClass) {
    if (firstFighterClass.getHealth === 0 || secondFighterClass.getHealth === 0) {
        firstFighterClass.getHealth === 0 ? console.log(`${firstFighterClass.getName} is dead and can't fight `) : console.log(`${secondFighterClass.getName} is dead and can't fight`);
    } else {
        loopСondition();
        getResultBattle();
    }
}

console.log(battle(firstFighterClass, secondFighterClass));
console.log(firstFighterClass.getHealth);
console.log(secondFighterClass.getHealth);
console.log(battle(firstFighterClass, secondFighterClass));
console.log(secondFighterClass.heal(50));
console.log(secondFighterClass.getHealth);
console.log(firstFighterClass.logCombatHistory());
console.log(secondFighterClass.getStrength);

export {}


