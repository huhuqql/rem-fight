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
        blastRadius: 0,
        blastAudio: {
            default: null,
            type: cc.AudioClip
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.startTime = 0.5;
        this.time = 0;
        this.blastAnimation();
        this.hitBoss = false;
    },

    blastAnimation(){
        this.playBlastSound();
        var animationComponent = this.getComponent(cc.Animation);
        var animState = animationComponent.play('blast');
        animState.speed = 1 ;
    },

    detectMonster(){
        var scene = this.node.parent;
        var children = scene.children;
        var playerPos = scene.getChildByName("rem").getPosition();

        var boss = scene.getChildByName("boss");
        // console.log(boss);
        if(boss != null){
            if(!this.hitBoss){
                if(Math.abs(this.node.y - boss.y) <= this.node.width/2 + boss.height/2 
                && Math.abs(this.node.x - boss.x) <= this.node.width/2 + boss.width/2){
                    console.log("击中BOSS");
                    this.hitBoss = true;
                    boss.getComponent("Boss").life--;
                }
            }
        }

        for (var i = 0; i < children.length; ++i) {
            var tempMonster = children[i];
            if(tempMonster.name == "hulk-1"){
                var monsterPos = cc.v2(tempMonster.x, tempMonster.y);
                var dist = this.node.position.sub(monsterPos).mag();

                if(dist < 45 + children[i].width/2){
                    scene.removeChild(children[i]);
                }
            }
        }
    },

    playBlastSound(){
        cc.audioEngine.play(this.blastAudio, false, 0.1);
    },

    start () {

    },

    update (dt) {
        this.detectMonster();
        if(this.time > this.startTime){
            this.node.destroy();
        }
        this.time += dt;
    },
});
