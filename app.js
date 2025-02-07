const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      battleLog: [],
      isGameRunning: true,
      userWon: false,
      specialAttackTimer: 0,
    };
  },
  methods: {
    heal() {
      hp = Math.floor(Math.random() * 10);
      this.playerHealth += hp;
      this.playerHealth = this.playerHealth > 100 ? 100 : this.playerHealth;
      this.battleLog.unshift(
        `<span class='log--player'>Player</span> heals for <span class='log--heal'>${hp}</span>`
      );
    },
    monsterAttack() {
      damage = Math.floor(Math.random() * 10);
      this.playerHealth -= damage;
      this.battleLog.unshift(
        `<span class='log--monster'>Monster</span> hits player for <span class='log--damage'>${damage}</span>`
      );
    },
    userAttack() {
      damage = Math.floor(Math.random() * 10) + 5;
      this.monsterHealth -= damage;
      this.battleLog.unshift(
        `<span class='log--player'>Player</span> hits monster for <span class='log--damage'>${damage}</span>`
      );
    },
    specialAttack() {
      damage = Math.floor(Math.random() * 10) + 35;
      this.monsterHealth -= damage;
      this.battleLog.unshift(
        `<span class='log--player'>Player</span> hits monster for <span class='log--damage'>${damage}</span>`
      );
      this.specialAttackTimer = -1;
    },
    newGame() {
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.battleLog = [];
      this.isGameRunning = true;
      this.userWon = false;
      this.specialAttackTimer = 0;
    },
    surrender() {
      this.isGameRunning = false;
      this.userWon = false;
    },
    performAction(action) {
      action();
      if (this.monsterHealth > 0) this.monsterAttack();
      this.specialAttackTimer++;
    },
  },
  computed: {
    monsterBarStyles() {
      health = this.monsterHealth > 0 ? this.monsterHealth : 0;
      return health + "%";
    },
    playerBarStyles() {
      health = this.playerHealth > 0 ? this.playerHealth : 0;
      return health + "%";
    },
    gameRunning() {
      if (this.monsterHealth <= 0 || this.playerHealth <= 0) {
        this.isGameRunning = false;
        this.userWon = this.playerHealth > 0;
      }
      return this.isGameRunning;
    },
    specialAttackReady() {
      return this.specialAttackTimer >= 3;
    },
  },
  watch: {},
});
app.mount("#game");
