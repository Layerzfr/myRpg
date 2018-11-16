ig.module(
    'game.entities.glasses'
)

    .requires(
        'impact.entity',
        'game.entities.levelchange',
    )
    .defines(function () {

        EntityGlasses = ig.Entity.extend({
            size: {x: 25, y: 16},
            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.FIXED,
            canPick: false,
            sound: null,

            animSheet: new ig.AnimationSheet('media/glasses.png', 32, 32),

            init: function (x, y, settings) {
                this.parent(x, y, settings);
                this.id = "Lunettes";
                this.addAnim('left', 0.1, [1]);
                this.currentAnim = this.anims.left;
                this.sound = new ig.Sound('media/sound/metal-small1.ogg');
            },

            update: function () {
                var player = ig.game.getEntitiesByType(EntityPlayer)[0];
                if (this.distanceTo(player) < 40 && ig.input.pressed('action')) {
                    ig.game.inventory.push(this);
                    this.sound.volume = 0.5;
                    this.sound.play();
                    ig.game.quest.forEach(function (quete) {
                        if (quete[0] === "lunette") {
                            quete[1] = "phase1";
                        }
                    });
                    this.kill();
                }
                this.parent();
            },

        });


    });