ig.module(
    'game.entities.rockmove'
)

    .requires(
        'impact.entity',
        'game.entities.levelchange',
    )
    .defines(function () {

        EntityRockmove = ig.Entity.extend({
            size: {x: 32, y: 23},
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.ACTIVE,

            animSheet: new ig.AnimationSheet('media/rockmove.png', 32, 23),

            init: function (x, y, settings) {
                this.parent(x, y, settings);
                this.addAnim('left', 0.1, [0]);
                this.currentAnim = this.anims.left;
            },

            update: function () {
                this.parent();
            },
        });
    });