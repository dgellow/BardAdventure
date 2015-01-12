var _ = require('lodash');

// Game scene
Crafty.scene('Game', function() {
    // Playable character
    Crafty.e('Player').grid(Game.mapGrid).at(5, 5);

    // Map
    createMap(Game.mapGrid);

    // Events
    this.bind('VillageVisited', showVictory);
}, function() {
    this.unbind('VillageVisited', showVictory);
});

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
            Crafty.e('Tree').grid(mapGrid).at(t.x, t.y);
        });
};

var generateBushes = function(mapGrid, tilesCoord) {
    _.chain(tilesCoord)
        .filter(function(t) {
            return (Math.random() < 0.06) && !isAtEdge(t.x, t.y, mapGrid.width, mapGrid.height);
        }).each(function(t) {
            Crafty.e('Bush').grid(mapGrid).at(t.x, t.y);
        });
};

var generateVillages = function(mapGrid, tilesCoord) {
    _.chain(tilesCoord)
        .filter(function(t) {return (Math.random() < 0.02);})
        .take(5)
        .each(function(t) {
            Crafty.e('Village').grid(mapGrid).at(t.x, t.y);
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
        .text('Victory!');

    // Events
    this.bind('KeyDown', resetGame);
}, function() {
    this.unbind('KeyDown', resetGame);
});

var resetGame = function() {
    Crafty.scene('Game');
};
