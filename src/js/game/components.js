Crafty.c('Grid', {
    init: function() {},
    grid: function(gridOptions) {
        this.attr({
            w: gridOptions.tileWidth,
            h: gridOptions.tileHeight,
            grid: gridOptions
        });
        return this;
    },

    at: function(x, y) {
        var width = this.grid.tileWidth;
        var height = this.grid.tileHeight;
        if (x === undefined || y === undefined) {
            return {x: this.x / width, y: this.y / height};
        } else {
            this.attr({x: x * width, y: y * height});
            return this;
        }
    }
});

Crafty.c('Actor', {
    init: function() {
        this.requires('2D, Canvas, Grid');
    }
});

Crafty.c('Tree', {
    init: function() {
        this.requires('Actor, Color');
        this.color('rgb(20, 125, 40)');
    }
});

Crafty.c('Bush', {
    init: function() {
        this.requires('Actor, Color');
        this.color('rgb(20, 185, 40)');
    }
});

Crafty.c('Player', {
    init: function() {
        this.requires('Actor, Fourway, Color')
            .fourway(4)
            .color('rgb(20, 75, 40)');
    }
});