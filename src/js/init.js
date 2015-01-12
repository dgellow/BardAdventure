Game = require('./game/game.js');

document.addEventListener('DOMContentLoaded', function() {
    require('./game/scenes.js');
    require('./game/components.js');
    Game.start();
});
