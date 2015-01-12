var Game = require('./game/game.js');

document.addEventListener('DOMContentLoaded', function() {
    require('./game/components.js');
    Game.start();
});
