var _ = require('lodash');

var Game = function() {
    this.mapGrid = {
        width: 24,
        height: 16,
        tileWidth: 16,
        tileHeight: 16
    };
};

Game.prototype.start = function() {
    // Initialize and start the game
    Crafty.init(this.getWidth(), this.getHeight());
    Crafty.background('rgb(249, 223, 125)');

    // Place trees
    generateForest(this.mapGrid);
};

Game.prototype.getWidth = function() {
    return this.mapGrid.width * this.mapGrid.tileWidth;
};

Game.prototype.getHeight = function() {
    return this.mapGrid.height * this.mapGrid.tileHeight;
};

var generateForest = function(mapGrid) {
    var rangeX = _.range(mapGrid.width);
    var rangeY = _.range(mapGrid.height);
    var tilesCoord = _.flatten(_.map(rangeX, function(x) {
        return _.map(rangeY, function(y) {
            return {x: x, y: y};
        });
    }));

    generateTrees(mapGrid, tilesCoord);
    generateBushes(mapGrid, tilesCoord);
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

module.exports = new Game();
