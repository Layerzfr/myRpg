/*
This entity calls ig.game.loadLevel() when its triggeredBy() method is called -
usually through an EntityTrigger entity.


Keys for Weltmeister:

level
	Name of the level to load. E.g. "LevelTest1" or just "test1" will load the 
	'LevelTest1' level.
*/

ig.module(
    'game.entities.levelchange'
)
    .requires(
        'impact.entity',
        'impact.game',
    )
    .defines(function () {

        EntityLevelchange = ig.Entity.extend({
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(0, 0, 255, 0.7)',

            size: {x: 32, y: 480},
            level: null,
            levelPosX: 448,
            levelPosY: 232,
            checkAgainst: ig.Entity.TYPE.A,

            triggeredBy: function (entity, trigger) {
                if (this.level) {

                    var levelName = this.level.replace(/^(Level)?(\w)(\w*)/, function (m, l, a, b) {
                        return a.toUpperCase() + b;
                    });

                    ig.game.loadLevelDeferred(ig.global['Level' + levelName]);
                }
            },

            check: function (other) {
                if (other instanceof EntityPlayer) {
                    if (this.level) {
                        ig.game.posX = other.pos.x;
                        ig.game.posY = other.pos.y;
                        var levelName = this.level.replace(/^(Level)?(\w)(\w*)/, function (m, l, a, b) {
                            return a.toUpperCase() + b;
                        });
                        ig.game.level = levelName;
                        ig.game.loadLevel(ig.global['Level' + levelName], this.spawn, ig.game.quest);
                    }
                }
            },

            update: function () {
            }
        });

    });