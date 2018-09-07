"use strict";
cc._RF.push(module, '2d44bdoVrpE7ptMAaP3Lb+e', 'Player');
// scripts/Player.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html


cc.Class({
    extends: cc.Component,

    properties: {
        lifePrefab: {
            default: null,
            type: cc.Prefab
        },

        speed: 0,
        upSpeed: 0,
        downSpeed: 0,
        leftSpeed: 0,
        rightSpeed: 0
    },

    update: function update(dt) {
        this.node.x += this.leftSpeed * dt;
        this.node.x += this.rightSpeed * dt;
        if (this.node.x < -this.scene.width / 2) this.node.x = -this.scene.width / 2;
        if (this.node.x > this.scene.width / 2) this.node.x = this.scene.width / 2;
        this.node.y += this.upSpeed * dt;
        this.node.y += this.downSpeed * dt;
        if (this.node.y < -this.scene.height / 2) this.node.y = -this.scene.height / 2;
        if (this.node.y > this.scene.height / 2) this.node.y = this.scene.height / 2;

        if (this.moveAround) {
            this.moveAroundAnimation();
            this.moveAround = false;
        }

        if (this.wasDamaged) {
            this.node.runAction(this.blinkAnimation());
            this.wasDamaged = false;
        }

        if (this.frontOnSkill) {
            this.frontBlast();
            this.frontOnSkill = false;
        } else if (this.leftOnSkill) {
            this.leftBlast();
            this.leftOnSkill = false;
        } else if (this.rightOnSkill) {
            this.rightBlast();
            this.rightOnSkill = false;
        } else if (this.backOnSkill) {
            this.backBlast();
            this.backOnSkill = false;
        }
    },

    onLoad: function onLoad() {
        this.xSpeed = 0;
        this.movingState = false;
        this.moveFront = false;
        this.moveBack = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.faceDirection = "front";
        this.frontOnSkill = false;
        this.leftOnSkill = false;
        this.rightOnSkill = false;
        this.backOnSkill = false;
        this.wasDamaged = false;
        this.moveAround = false;
        this.lifes = new Array();
        this.heart = 2;
        this.scene = this.node.parent.getChildByName("newbg");
    },

    onDestroy: function onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    onKeyDown: function onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.leftSpeed = -this.speed;
                this.moveLeft = true;
                if (this.movingState == false) {
                    this.movingState = true;
                    this.leftAnimation();
                    this.faceDirection = 'left';
                }
                break;
            case cc.macro.KEY.d:
                this.rightSpeed = this.speed;
                this.moveRight = true;
                if (this.movingState == false) {
                    this.movingState = true;
                    this.rightAnimation();
                    this.faceDirection = 'right';
                }
                break;
            case cc.macro.KEY.w:
                this.upSpeed = this.speed;
                this.moveBack = true;
                if (this.movingState == false) {
                    this.movingState = true;
                    this.backAnimation();
                    this.faceDirection = 'back';
                }
                break;
            case cc.macro.KEY.s:
                this.downSpeed = -this.speed;
                this.moveFront = true;
                if (this.movingState == false) {
                    this.movingState = true;
                    this.frontAnimation();
                    this.faceDirection = 'front';
                }
                break;
        }
    },
    onKeyUp: function onKeyUp(event) {
        // unset a flag when key released
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.leftSpeed = 0;
                this.moveLeft = false;
                if (this.moveRight) {
                    this.rightAnimation();
                    this.faceDirection = 'right';
                } else if (this.moveFront) {
                    this.frontAnimation();
                    this.faceDirection = 'front';
                } else if (this.moveBack) {
                    this.backAnimation();
                    this.faceDirection = 'back';
                } else if (this.moveLeft) {
                    this.leftAnimation();
                    this.faceDirection = 'left';
                } else {
                    this.stopAnimation();
                    this.movingState = false;
                }
                break;
            case cc.macro.KEY.d:
                this.rightSpeed = 0;
                this.moveRight = false;
                if (this.moveRight) {
                    this.rightAnimation();
                    this.faceDirection = 'right';
                } else if (this.moveFront) {
                    this.frontAnimation();
                    this.faceDirection = 'front';
                } else if (this.moveBack) {
                    this.backAnimation();
                    this.faceDirection = 'back';
                } else if (this.moveLeft) {
                    this.leftAnimation();
                    this.faceDirection = 'left';
                } else {
                    this.stopAnimation();
                    this.movingState = false;
                }
                break;
            case cc.macro.KEY.w:
                this.upSpeed = 0;
                this.moveBack = false;
                if (this.moveRight) {
                    this.rightAnimation();
                    this.faceDirection = 'right';
                } else if (this.moveFront) {
                    this.frontAnimation();
                    this.faceDirection = 'front';
                } else if (this.moveBack) {
                    this.backAnimation();
                    this.faceDirection = 'back';
                } else if (this.moveLeft) {
                    this.leftAnimation();
                    this.faceDirection = 'left';
                } else {
                    this.stopAnimation();
                    this.movingState = false;
                }
                break;
            case cc.macro.KEY.s:
                this.downSpeed = 0;
                this.moveFront = false;
                if (this.moveRight) {
                    this.rightAnimation();
                    this.faceDirection = 'right';
                } else if (this.moveFront) {
                    this.frontAnimation();
                    this.faceDirection = 'front';
                } else if (this.moveBack) {
                    this.backAnimation();
                    this.faceDirection = 'back';
                } else if (this.moveLeft) {
                    this.leftAnimation();
                    this.faceDirection = 'left';
                } else {
                    this.stopAnimation();
                    this.movingState = false;
                }
                break;
            case cc.macro.KEY.r:
                if (this.heart < 0) this.restartGame();
                break;

        }
    },
    restartGame: function restartGame() {
        this.lifes = new Array();
        this.heart = 2;
        this.showLifes();
    },
    frontAnimation: function frontAnimation() {
        var animationComponent = this.getComponent(cc.Animation);
        var animState = animationComponent.play('front-move');
        animState.speed = 0.9;
        animState.repeatCount = Infinity;
    },
    leftAnimation: function leftAnimation() {
        var animationComponent = this.getComponent(cc.Animation);
        var animState = animationComponent.play('left-move');
        animState.speed = 0.9;
        animState.repeatCount = Infinity;
    },
    rightAnimation: function rightAnimation() {
        var animationComponent = this.getComponent(cc.Animation);
        var animState = animationComponent.play('right-move');
        animState.speed = 0.9;
        animState.repeatCount = Infinity;
    },
    backAnimation: function backAnimation() {
        var animationComponent = this.getComponent(cc.Animation);
        var animState = animationComponent.play('back-move');
        animState.speed = 0.9;
        animState.repeatCount = Infinity;
    },
    stopAnimation: function stopAnimation() {
        var animationComponent = this.getComponent(cc.Animation);
        animationComponent.stop();
    },
    frontBlast: function frontBlast() {
        var animationComponent = this.getComponent(cc.Animation);
        var animState = animationComponent.play('front-blast');
        animState.speed = 1;
        setTimeout(function () {
            this.refreshAnimation();
        }.bind(this), 200);
    },
    leftBlast: function leftBlast() {
        var animationComponent = this.getComponent(cc.Animation);
        var animState = animationComponent.play('left-blast');
        animState.speed = 1;
        setTimeout(function () {
            this.refreshAnimation();
        }.bind(this), 200);
    },
    rightBlast: function rightBlast() {
        var animationComponent = this.getComponent(cc.Animation);
        var animState = animationComponent.play('right-blast');
        animState.speed = 1;
        setTimeout(function () {
            this.refreshAnimation();
        }.bind(this), 200);
    },
    backBlast: function backBlast() {
        var animationComponent = this.getComponent(cc.Animation);
        var animState = animationComponent.play('back-blast');
        animState.speed = 1;
        setTimeout(function () {
            this.refreshAnimation();
        }.bind(this), 200);
    },
    blinkAnimation: function blinkAnimation() {
        console.log("被打中啦");
        var fadeIn = cc.fadeIn(0.2);
        var fadeOut = cc.fadeOut(0.2);
        this.lifes[this.heart].destroy();
        this.heart--;
        console.log(this.node.parent.getComponent("Game"));
        if (this.heart < 0) {
            this.node.parent.getComponent("Game").lose = true;
            console.log("输了");
        }
        return cc.repeat(cc.sequence(fadeOut, fadeIn), 4);
    },
    showLifes: function showLifes() {
        for (var i = 0; i < 3; i++) {
            var life = cc.instantiate(this.lifePrefab);
            this.node.parent.addChild(life);
            var posX = this.node.parent.x - this.node.parent.width / 2 - 20 + i * 20;
            var posY = this.node.parent.y - 40;
            life.setPosition(cc.v2(posX, posY));
            this.lifes[i] = life;
        }
    },
    moveAroundAnimation: function moveAroundAnimation() {
        this.leftSpeed = -80;
        this.leftAnimation();

        setTimeout(function () {
            this.leftSpeed = 0;
            this.stopAnimation();
        }.bind(this), 1000);

        setTimeout(function () {
            this.rightSpeed = 80;
            this.rightAnimation();
        }.bind(this), 2000);

        setTimeout(function () {
            this.rightSpeed = 0;
            this.stopAnimation();
        }.bind(this), 3000);

        setTimeout(function () {
            this.upSpeed = 80;
            this.backAnimation();
        }.bind(this), 4000);

        setTimeout(function () {
            this.upSpeed = 0;
            this.stopAnimation();
        }.bind(this), 5000);

        setTimeout(function () {
            this.downSpeed = -80;
            this.frontAnimation();
        }.bind(this), 6000);

        setTimeout(function () {
            this.downSpeed = 0;
            this.stopAnimation();
            this.gameStart();
            this.showLifes();
        }.bind(this), 7000);
    },
    refreshAnimation: function refreshAnimation() {
        if (this.movingState) {
            if (this.moveRight) {
                this.rightAnimation();
                this.faceDirection = 'right';
            } else if (this.moveFront) {
                this.frontAnimation();
                this.faceDirection = 'front';
            } else if (this.moveBack) {
                this.backAnimation();
                this.faceDirection = 'back';
            } else if (this.moveLeft) {
                this.leftAnimation();
                this.faceDirection = 'left';
            }
        }
    },
    gameStart: function gameStart() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },


    // fireBlast() {
    //     var scene = cc.director.getScene();
    //     var loc = this.node.getPosition();
    //     var blast = cc.instantiate(this.blast);
    //     bullet.position = touchLoc;
    //     bullet.active = true;
    //     scene.addChild(bullet);
    // },

    start: function start() {}
});

cc._RF.pop();