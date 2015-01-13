var _ = require('lodash');

Crafty.scenes = {};

// Game scene
Crafty.scene('Game', function() {
    // Keep track of occupied tiles
    Crafty.scenes.Game = {
        occupiedTiles: createOccupiedArray(Game.mapGrid)
    };

    // Playable character
    Crafty.e('Player')
        .grid(Game.mapGrid)
        .at(Game.player.x, Game.player.y);
    occupy(Game.player.x, Game.player.y);

    // Map
    createMap(Game.mapGrid);

    // Events
    this.bind('VillageVisited', showVictory);
}, function() {
    this.unbind('VillageVisited', showVictory);
});

var createOccupiedArray = function(mapGrid) {
    var rangeX = _.range(mapGrid.width);
    var rangeY = _.range(mapGrid.height);
    return _.map(rangeX, function(x) {
        return _.map(rangeY, function(y) {
            return false;
        });
    });
};

var isOccupied = function(x, y) {
    return Crafty.scenes.Game.occupiedTiles[x][y];
};

var occupy  = function(x, y) {
    Crafty.scenes.Game.occupiedTiles[x][y] = true;
};

var createMap = function(mapGrid) {
    var rangeX = _.range(mapGrid.width);
    var rangeY = _.range(mapGrid.height);
    var tilesCoord = _.flatten(_.map(rangeX, function(x) {
        return _.map(rangeY, function(y) {
            return {x: x, y: y};
        });
    }));

    generateTrees(mapGrid, tilesCoord);
    generateBushes(mapGrid, tilesCoord);
    generateVillages(mapGrid, tilesCoord);
};

var isAtEdge = function(x, y, width, height) {
    return x === 0 || x === (width - 1) ||
        y === 0 || y === (height - 1);
};

var generateTrees = function(mapGrid, tilesCoord) {
    _.chain(tilesCoord)
        .filter(function(t) {
            return isAtEdge(t.x, t.y, mapGrid.width, mapGrid.height);
        }).each(function(t) {
            if (!isOccupied(t.x, t.y)) {
                Crafty.e('Tree').grid(mapGrid).at(t.x, t.y);
                occupy(t.x, t.y);
            }
        });
};

var generateBushes = function(mapGrid, tilesCoord) {
    _.chain(tilesCoord)
        .filter(function(t) {
            return (Math.random() < 0.06) && !isAtEdge(t.x, t.y, mapGrid.width, mapGrid.height);
        }).each(function(t) {
            if (!isOccupied(t.x, t.y)) {
                Crafty.e('Bush').grid(mapGrid).at(t.x, t.y);
                occupy(t.x, t.y);
            }
        });
};

var getVillagesCoord = function(tilesCoord) {
    var v = _.chain(tilesCoord)
        .filter(function(t) {
            return (Math.random() < 0.02) && !isOccupied(t.x, t.y);
        }).take(5)
        .value();

    if (v.length === 5) {
        return v;
    } else {
        return getVillagesCoord(tilesCoord);
    }
};

var generateVillages = function(mapGrid, tilesCoord) {
    _.chain(getVillagesCoord(tilesCoord))
        .each(function(t) {
            Crafty.e('Village').grid(mapGrid).at(t.x, t.y);
            occupy(t.x, t.y);
        });
};

var showVictory = function() {
    if (!Crafty('Village').length) {
        Crafty.scene('Victory');
    }
};

// Victory scene
Crafty.scene('Victory', function() {
    Crafty.e('2D, DOM, Text')
        .attr({x: 0, y: 0})
        .text('Victory!')
        .css(Game.textStyle);

    // Events
    this.bind('KeyDown', resetGame);
}, function() {
    this.unbind('KeyDown', resetGame);
});

var resetGame = function() {
    Crafty.scene('Game');
};

// Loading scene
Crafty.scene('Loading', function() {
    Crafty.e('2D, DOM, Text')
        .attr({x:0, y: Game.getHeight() / 2, w: Game.getWidth()})
        .text('Loading ...')
        .css(Game.textStyle);

    // Load assets
    Crafty.load(['res/16x16_forest_1.gif',
                 'res/hunter.png',
                 'res/dook_knock_3x.mp3',
                 'res/door_knock_3x.ogg',
                 'res/door_knock_3x.acc'], function() {
                     // Map
                     Crafty.sprite(16, 'res/16x16_forest_1.gif', {
                         sprite_tree: [0, 0],
                         sprite_bush: [1, 0],
                         sprite_village: [0, 1]
                     });

                     // Player
                     Crafty.sprite(16, 'res/hunter.png', {
                         sprite_player: [0, 2]
                     });

                     // Sounds
                     Crafty.audio.add({
                         knock: ['res/door_knock_3x.mp3',
                                 'res/door_knock_3x.ogg',
                                 'res/door_knock_3x.acc']
                     });

                     // Start the game
                     Crafty.scene('Game');
                 });
});
