var Game = function() {
};

Game.prototype.start = function() {
    // Initialize and start the game
    Crafty.init(480, 320);
    Crafty.background('green');
};

module.exports = new Game();
