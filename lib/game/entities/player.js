ig.module(
    'game.entities.player'
)

    .requires(
        'impact.entity',
        'game.entities.levelchange',
        'game.entities.glasses',
    )
    .defines(function () {

        EntityPlayer = ig.Entity.extend({
            size: {x: 32, y: 32},
            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.NONE,
            collides: ig.Entity.COLLIDES.PASSIVE,
            x: 448,
            y: 232,
            // canMove: true,

            speed: 200,

            animSheet: new ig.AnimationSheet('media/player.png', 32, 32),

            init: function (x, y, settings) {
                this.pos.x = ig.game.posX;
                this.pos.y = ig.game.posY;
                this.parent(x, y, settings);
                this.maxVel = {x: 500, y: 500},

                    // Add the animations
                    this.addAnim('up', .21, [9, 10, 11]);
                this.addAnim('down', .21, [0, 1, 2]);
                this.addAnim('left', .21, [3, 4, 5]);
                this.addAnim('right', .21, [6, 7, 8]);
                this.addAnim('idleup', 0.1, [10]);
                this.addAnim('idledown', 0.1, [1]);
                this.addAnim('idleleft', 0.1, [4]);
                this.addAnim('idleright', 0.1, [7]);
                this.currentAnim = this.anims.idledown;

            },

            update: function () {
                if (ig.game.isChatOpen === true) {
                    ig.game.canMove = false;
                    if (ig.input.pressed('action')) {
                        ig.game.canMove = true;
                        ig.game.isChatOpen = false;
                        ig.game.missionComplete = false;
                        ig.game.chat = "";
                    }
                }
                // this.parent();
                var pnj = ig.game.getEntitiesByType(EntityPnj);
                var self = this;
                if (pnj.length > 0) {
                    pnj.forEach(function (element) {
                        if (self.distanceTo(element) < 50 && ig.input.pressed('action')) {
                            // console.log(element);
                            if (ig.game.quest.length < 1) {
                                element.greeting.play();
                                ig.game.quest.push([element.id, 'phase0']);
                                ig.game.canMove = false;
                                // console.log(element.dialogue);
                                ig.game.chat = element.dialogue;
                                ig.game.chatPosX = element.pos.x;
                                ig.game.chatPosY = element.pos.y;
                                ig.game.isChatOpen = true;
                            } else {
                                ig.game.quest.forEach(function (quete) {
                                    if (quete[0] !== element.id) {
                                        ig.game.quest.push([element.id, 'phase0']);
                                    } else {
                                        if (ig.game.inventory.length > 0) {
                                            ig.game.inventory.forEach(function (item, index, object) {
                                                if (quete[0] === "lunette" && quete[1] === "phase0") {
                                                    quete[1] = "complete";
                                                }
                                                if (item instanceof EntityGlasses) {
                                                    object.splice(index, 1);
                                                    ig.game.quest.forEach(function (quete) {
                                                        if (quete[0] === "lunette") {
                                                            quete[1] = "complete";
                                                        }
                                                    });
                                                    element.dialogue = "Merci d'avoir recuperer mes lunettes !";
                                                    element.complete.play();
                                                    ig.game.chat = element.dialogue;
                                                    ig.game.missionComplete = true;
                                                    ig.game.isChatOpen = true;
                                                }
                                            })
                                        }
                                    }
                                });
                            }
                        }
                    });
                }

                if (ig.input.pressed('inventory')) {
                    ig.game.isInventoryOpen = !ig.game.isInventoryOpen;
                    if (ig.game.isInventoryOpen === true) {
                        console.log(ig.game.inventory);
                    }
                }

                if (ig.input.pressed('quest')) {
                    console.log(ig.game.quest);
                }

                // move left or right
                //
                if (ig.game.canMove === true) {
                    if (ig.input.state('left') && ismove != 1 && ismove != 2 && ismove != 4) {
                        this.vel.x = -this.speed;
                        ismove = 3;
                        this.direction = 3;
                        this.currentAnim = this.anims.left;
                    }
                    else if (ig.input.state('right') && ismove != 1 && ismove != 3 && ismove != 4) {
                        this.vel.x = +this.speed;
                        ismove = 2;
                        this.direction = 2;
                        this.currentAnim = this.anims.right;
                    }
                    else if (ig.input.state('up') && ismove != 3 && ismove != 2 && ismove != 4) {
                        this.vel.y = -this.speed;
                        ismove = 1;
                        this.direction = 1;
                        this.currentAnim = this.anims.up;
                    }
                    else if (ig.input.state('down') && ismove != 1 && ismove != 2 && ismove != 3) {
                        this.vel.y = +this.speed;
                        ismove = 4;
                        this.direction = 4;
                        this.currentAnim = this.anims.down;
                    }
                    else {
                        this.vel.x = 0;
                        this.vel.y = 0;
                        ismove = 0;


                        if (this.direction == 4) {
                            this.currentAnim = this.anims.idledown;
                        }
                        if (this.direction == 3) {
                            this.currentAnim = this.anims.idleleft;
                        }
                        if (this.direction == 2) {
                            this.currentAnim = this.anims.idleright;
                        }
                        if (this.direction == 1) {
                            this.currentAnim = this.anims.idleup;
                        }
                    }
                }


                ////////////////////////////////


                this.parent();
            },

            check: function (other) {
                if (other instanceof EntityGlasses) {
                    other.canPick = true;
                }
            }
        });


    })