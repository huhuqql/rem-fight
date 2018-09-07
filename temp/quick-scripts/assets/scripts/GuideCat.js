(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/GuideCat.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a176al6fVlCz4rU4ziDZTOQ', 'GuideCat', __filename);
// scripts/GuideCat.js

'use strict';

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

        bombPrefab: {
            default: null,
            type: cc.Prefab
        },

        catAudio: {
            default: null,
            type: cc.AudioClip
        },

        speed: 0,
        upSpeed: 0,
        downSpeed: 0,
        leftSpeed: 0,
        rightSpeed: 0
    },

    leftAnimation: function leftAnimation() {
        var animationComponent = this.getComponent(cc.Animation);
        var animState = animationComponent.play('cat-left-move');
        animState.speed = 0.7;
        animState.repeatCount = Infinity;
    },
    rightAnimation: function rightAnimation() {
        var animationComponent = this.getComponent(cc.Animation);
        var animState = animationComponent.play('cat-right-move');
        animState.speed = 0.7;
        animState.repeatCount = Infinity;
    },
    disappearAnimation: function disappearAnimation() {
        var fadeOut = cc.fadeOut(1);
        return fadeOut;
    },
    moveLeft: function moveLeft() {
        this.xSpeed = -this.speed;
        this.leftAnimation();
    },
    stopMoving: function stopMoving() {
        this.xSpeed = 0;
        this.ySpeed = 0;
        var animationComponent = this.getComponent(cc.Animation);
        animationComponent.stop();
    },


    // moveRight(){
    //     this.rightSpeed = -this.speed;
    //     this.rightAnimation();
    // },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        console.log("猫猫出现");
        this.timer = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.timeInterval = 9999;
        this.audioTimer = 15;

        this.moveLeft();
        this.playCatSound();
        setTimeout(function () {
            this.stopMoving();
        }.bind(this), 3000);
    },
    start: function start() {},
    dropBomb: function dropBomb() {
        var bomb = cc.instantiate(this.bombPrefab);
        this.node.parent.addChild(bomb);
        bomb.setPosition(this.node.getPosition());
    },
    findMonster: function findMonster() {
        var monster = this.node.parent.getChildByName("hulk-1");
        if (monster != null) {
            this.moveToPosition(monster.x, monster.y);
        } else {
            this.moveToRandomPosition();
        }
    },
    moveToRandomPosition: function moveToRandomPosition() {
        var randX = (Math.random() - 0.5) * 2 * (this.node.parent.getChildByName("newbg").width / 2 - 50);
        var randY = (Math.random() - 0.5) * 2 * (this.node.parent.getChildByName("newbg").height / 2 - 50);

        this.moveToPosition(randX, randY);
    },
    moveToPosition: function moveToPosition(mX, mY) {
        this.xSpeed = mX - this.node.x;
        this.ySpeed = mY - this.node.y;

        // var xSpeedSign = 1;
        // var ySpeedSign = 1;
        // if (this.xSpeed < 0) xSpeedSign = -1;
        // if (this.ySpeed < 0) ySpeedSign = -1;

        this.xSpeed = this.xSpeed / 2;
        this.ySpeed = this.ySpeed / 2;

        if (this.xSpeed < 0) this.leftAnimation();else this.rightAnimation();

        // if (Math.abs(this.xSpeed) < Math.abs(this.ySpeed)) {
        //     this.xSpeed = this.xSpeed * Math.abs(maxSpeed / this.ySpeed);
        //     this.ySpeed = ySpeedSign * maxSpeed;
        // }
        // else {
        //     this.ySpeed = this.ySpeed * Math.abs(maxSpeed / this.xSpeed);
        //     this.xSpeed = xSpeedSign * maxSpeed;
        // }

        setTimeout(function () {
            this.stopMoving();
        }.bind(this), 2000);
    },
    playCatSound: function playCatSound() {
        cc.audioEngine.play(this.catAudio, false, 0.3);
    },
    update: function update(dt) {
        if (this.timer >= this.timeInterval) {
            this.timer = 0;
            this.findMonster();
            setTimeout(function () {
                this.dropBomb();
            }.bind(this), 3000);
        }

        if (this.audioTimer <= 0) {
            console.log("猫叫");
            this.playCatSound();
            this.audioTimer = 15;
        }

        this.timer += dt;
        this.audioTimer -= dt;

        var scene = this.node.parent;

        this.node.x += this.xSpeed * dt;
        this.node.y += this.ySpeed * dt;
        // if(this.node.x < -scene.width/2) this.node.x = -scene.width/2;
        // if(this.node.x > scene.width/2) this.node.x = scene.width/2;
        // this.node.y += this.upSpeed * dt;
        // this.node.y += this.downSpeed * dt;
        // if(this.node.y < -scene.height/2) this.node.y = -scene.height/2;
        // if(this.node.y > scene.height/2) this.node.y = scene.height/2;
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=GuideCat.js.map
        