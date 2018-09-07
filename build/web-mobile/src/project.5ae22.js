window.__require=function t(e,i,s){function n(h,a){if(!i[h]){if(!e[h]){var c=h.split("/");if(c=c[c.length-1],!e[c]){var r="function"==typeof __require&&__require;if(!a&&r)return r(c,!0);if(o)return o(c,!0);throw new Error("Cannot find module '"+h+"'")}}var d=i[h]={exports:{}};e[h][0].call(d.exports,function(t){return n(e[h][1][t]||t)},d,d.exports,t,e,i,s)}return i[h].exports}for(var o="function"==typeof __require&&__require,h=0;h<s.length;h++)n(s[h]);return n}({Apple:[function(t,e,i){"use strict";cc._RF.push(e,"39da8sVk25K4JtkhXW2DzGE","Apple"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){this.node.on(cc.Node.EventType.TOUCH_MOVE,function(t){this.opacity=100;var e=t.touch.getDelta();this.x+=e.x,this.y+=e.y},this.node),this.node.on(cc.Node.EventType.TOUCH_END,function(){this.opacity=255},this.node)},update:function(t){}}),cc._RF.pop()},{}],Blast:[function(t,e,i){"use strict";cc._RF.push(e,"ac998Rpcn9NP6xiJ0fecwLX","Blast"),cc.Class({extends:cc.Component,properties:{blastRadius:0,blastAudio:{default:null,type:cc.AudioClip}},onLoad:function(){this.startTime=.5,this.time=0,this.blastAnimation(),this.hitBoss=!1},blastAnimation:function(){this.playBlastSound(),this.getComponent(cc.Animation).play("blast").speed=1},detectMonster:function(){var t=this.node.parent,e=t.children,i=(t.getChildByName("rem").getPosition(),t.getChildByName("boss"));null!=i&&(this.hitBoss||Math.abs(this.node.y-i.y)<=this.node.width/2+i.height/2&&Math.abs(this.node.x-i.x)<=this.node.width/2+i.width/2&&(console.log("\u51fb\u4e2dBOSS"),this.hitBoss=!0,i.getComponent("Boss").life--));for(var s=0;s<e.length;++s){var n=e[s];if("hulk-1"==n.name){var o=cc.v2(n.x,n.y);this.node.position.sub(o).mag()<45+e[s].width/2&&t.removeChild(e[s])}}},playBlastSound:function(){cc.audioEngine.play(this.blastAudio,!1,.1)},start:function(){},update:function(t){this.detectMonster(),this.time>this.startTime&&this.node.destroy(),this.time+=t}}),cc._RF.pop()},{}],Bomb:[function(t,e,i){"use strict";cc._RF.push(e,"5b110SG0G1OForU9nED70KW","Bomb"),cc.Class({extends:cc.Component,properties:{blastPrefab:{default:null,type:cc.Prefab}},explode:function(){var t=cc.scaleBy(.5,1.3);return cc.sequence(t,t,t)},produceBlast:function(){var t=cc.instantiate(this.blastPrefab);this.parent.addChild(t),t.setPosition(this.node.getPosition()),this.node.destroy()},onLoad:function(){this.timer=0,this.end=1.5,this.node.runAction(this.explode())},start:function(){this.parent=this.node.parent},update:function(t){this.timer>=this.end&&(this.timer=0,this.produceBlast()),this.timer+=t}}),cc._RF.pop()},{}],Boss:[function(t,e,i){"use strict";cc._RF.push(e,"22143XCitVFyq1E65CMLtQz","Boss"),cc.Class({extends:cc.Component,properties:{jumpHeight:0,jumpDuration:0,maxMoveSpeed:0,accel:0,bulletPrefab:{default:null,type:cc.Prefab},redBulletPrefab:{default:null,type:cc.Prefab}},onLoad:function(){this.jumpAction=this.setJumpAction(),this.node.runAction(this.jumpAction),this.accLeft=!1,this.accRight=!1,this.xSpeed=0,this.ySpeed=0,this.timer=0,this.intervalTime=6,this.skillTimer=0,this.skillIntervalTime=3,this.life=100},move:function(){},setJumpAction:function(){var t=cc.moveBy(this.jumpDuration,cc.v2(0,this.jumpHeight)).easing(cc.easeCubicActionOut()),e=cc.moveBy(this.jumpDuration,cc.v2(0,-this.jumpHeight)).easing(cc.easeCubicActionIn());return cc.sequence(t,e)},produceBullet:function(){var t=cc.instantiate(this.bulletPrefab);this.node.parent.addChild(t),t.setPosition(this.node.x,this.node.y)},moveToRandomPosition:function(){var t=2*(Math.random()-.5)*(this.node.parent.getChildByName("newbg").width/2-50),e=2*(Math.random()-.5)*(this.node.parent.getChildByName("newbg").height/2-50);this.moveToPosition(t,e)},moveToPlayer:function(){console.log("\u671d\u73a9\u5bb6\u79fb\u52a8");var t=this.node.parent;this.sceneWidth=t.width/2,this.sceneHeight=t.height/2;var e=t.getChildByName("rem");this.xSpeed=e.x-this.node.x,this.ySpeed=e.y-this.node.y;var i=this.xSpeed,s=1,n=1;this.xSpeed<0&&(s=-1),this.ySpeed<0&&(n=-1);Math.abs(this.xSpeed)<Math.abs(this.ySpeed)?(this.xSpeed=this.xSpeed*Math.abs(100/this.ySpeed),this.ySpeed=100*n):(this.ySpeed=this.ySpeed*Math.abs(100/this.xSpeed),this.xSpeed=100*s),setTimeout(function(){this.stopMoving()}.bind(this),i/this.xSpeed*1e3)},stopMoving:function(){this.xSpeed=0,this.ySpeed=0},produceRedBullet:function(){if(null!=this.node){var t=cc.instantiate(this.redBulletPrefab);this.node.parent.addChild(t),t.setPosition(this.node.x,this.node.y)}},start:function(){},update:function(t){this.life<=0&&(this.life=100,this.node.destroy()),this.timer>this.intervalTime&&(this.moveToPlayer(),this.timer=0,console.log("\u53d1\u5c04\uff01")),this.skillTimer>=this.skillIntervalTime&&0==this.xSpeed&&(this.produceRedBullet(),setTimeout(function(){this.produceRedBullet()}.bind(this),300),setTimeout(function(){this.produceRedBullet()}.bind(this),600),setTimeout(function(){this.produceRedBullet()}.bind(this),900),setTimeout(function(){this.produceRedBullet()}.bind(this),1200),setTimeout(function(){this.produceRedBullet()}.bind(this),1500),setTimeout(function(){this.produceRedBullet()}.bind(this),1800),this.skillTimer=0),this.skillTimer+=t,this.timer+=t,this.accLeft?this.xSpeed-=this.accel*t:this.accRight&&(this.xSpeed+=this.accel*t),Math.abs(this.xSpeed)>this.maxMoveSpeed&&(this.xSpeed=this.maxMoveSpeed*this.xSpeed/Math.abs(this.xSpeed)),this.node.x+=this.xSpeed*t,this.node.y+=this.ySpeed*t}}),cc._RF.pop()},{}],Bullet:[function(t,e,i){"use strict";cc._RF.push(e,"15155QQaOJDE5jxdW+wtZ1K","Bullet");var s=t("Player");cc.Class({extends:cc.Component,properties:{bulletWidth:0,speed:0},onLoad:function(){this.move=!1,this.xSpeed=0,this.ySpeed=0},getPlayerPosition:function(){return player.getPosition()},start:function(){var t=this.node.parent;this.sceneWidth=t.width/2,this.sceneHeight=t.height/2;var e=t.getChildByName("rem");this.xSpeed=e.x-this.node.x,this.ySpeed=e.y-this.node.y;var i=1,s=1;this.xSpeed<0&&(i=-1),this.ySpeed<0&&(s=-1);Math.abs(this.xSpeed)<Math.abs(this.ySpeed)?(this.xSpeed=this.xSpeed*Math.abs(200/this.ySpeed),this.ySpeed=200*s):(this.ySpeed=this.ySpeed*Math.abs(200/this.xSpeed),this.xSpeed=200*i),this.move=!0},detectPlayer:function(){var t=this.node.parent,e=t.getChildByName("rem"),i=e.getPosition();this.node.position.sub(i).mag()<this.node.width/2&&(e.getComponent(s).wasDamaged=!0,t.removeChild(this.node))},update:function(t){this.detectPlayer(),this.move&&(this.node.y+=this.ySpeed*t,this.node.x+=this.xSpeed*t),(this.node.x<-this.sceneWidth||this.node.x>this.sceneWidth||this.node.y<-this.sceneHeight||this.node.y>this.sceneHeight)&&(this.node.destroy(),console.log("bullet removed"))}}),cc._RF.pop()},{Player:"Player"}],Chatbox:[function(t,e,i){"use strict";cc._RF.push(e,"a4b4a5EurBC56fdJ46aDqEo","Chatbox");var s=t("Game");cc.Class({extends:cc.Component,properties:{catAvatarPrefab:{default:null,type:cc.Prefab},remAvatarPrefab:{default:null,type:cc.Prefab},hulkAvatarPrefab:{default:null,type:cc.Prefab}},onLoad:function(){this.timer=0,this.timeInterval=3,this.script,this.labelNode=new cc.Node("node");var t=this;0==s.scene?(s.scene=1,s.curScript=0,cc.loader.loadRes("startScene",function(e,i){t.script=i.json,console.log(t.script),t.updateDialog()})):(s.curScript=0,cc.loader.loadRes("endScene",function(e,i){t.script=i.json,console.log(t.script),t.updateDialog()}))},updateDialog:function(){if(console.log(s.curScript),console.log(this.script.length),s.curScript>=this.script.length)this.node.destroy();else{var t=this.script[s.curScript];"Rem"==t.Figure?this.showRemAvatar():"Cat"==t.Figure||"???"==t.Figure?this.showCatAvatar():this.showHulkAvatar();var e=this.labelNode.addComponent(cc.Label);e.string=this.script[s.curScript].Script,e.fontSize=16,e.lineHeight=20,e.horizontalalign="LEFT",e.overflow="RESIZE_HEIGHT",e.width=380;var i=new cc.Color(0,0,0),n=this.node.x,o=this.node.y+this.node.height-35;this.labelNode.width=380,this.labelNode.height=200,this.labelNode.position=cc.v2(n,o-this.labelNode.height/2+20),this.labelNode.color=i,this.labelNode.parent=this.node}},showHulkAvatar:function(){this.clearAvatar();var t=cc.instantiate(this.hulkAvatarPrefab);this.node.addChild(t);var e=this.node.x-this.node.width/2+t.width-8,i=this.node.y+this.node.height+t.height/2-2;t.setPosition(cc.v2(e,i))},showCatAvatar:function(){this.clearAvatar();var t=cc.instantiate(this.catAvatarPrefab);this.node.addChild(t);var e=this.node.x-this.node.width/2+t.width-8,i=this.node.y+this.node.height+t.height/2-2;t.setPosition(cc.v2(e,i))},showRemAvatar:function(){this.clearAvatar();var t=cc.instantiate(this.remAvatarPrefab);this.node.addChild(t);var e=this.node.x-this.node.width/2+t.width-9,i=this.node.y+this.node.height+t.height/2-2;t.setPosition(cc.v2(e,i))},clearAvatar:function(){this.node.removeAllChildren()},start:function(){},update:function(t){this.timer>=this.timeInterval&&(this.timer=0,s.curScript++,this.updateDialog()),this.timer+=t}}),cc._RF.pop()},{Game:"Game"}],Game:[function(t,e,i){"use strict";cc._RF.push(e,"74cefI+miRBX4aO/UYCBjWd","Game");var s=t("Player");e.exports={curScript:0,scene:0},cc.Class({extends:cc.Component,properties:{ground:{default:null,type:cc.Node},player:{default:null,type:cc.Node},monster1Prefab:{default:null,type:cc.Prefab},bossPrefab:{default:null,type:cc.Prefab},blastPrefab:{default:null,type:cc.Prefab},chatBoxPrefab:{default:null,type:cc.Prefab},guideCatPrefab:{default:null,type:cc.Prefab},instructionDisplay:{default:null,type:cc.Label},startBGMAudio:{default:null,type:cc.AudioClip},bgmAudio:{default:null,type:cc.AudioClip}},getaBlastLocation:function(){var t=this.player.getPosition(),e=this.player.getComponent(s);switch(e.faceDirection){case"left":t.x-=100,e.leftOnSkill=!0;break;case"right":t.x+=100,e.rightOnSkill=!0;break;case"front":t.y-=100,e.frontOnSkill=!0;break;case"back":t.y+=100,e.backOnSkill=!0}return t},getMonsterPosition:function(){var t=2*(Math.random()-.5)*(this.node.getChildByName("newbg").width/2-50),e=2*(Math.random()-.5)*(this.node.getChildByName("newbg").height/2-50);return cc.v2(t,e)},showMonster1:function(){var t=cc.instantiate(this.monster1Prefab);this.node.addChild(t),t.setPosition(this.getMonsterPosition())},showBoss:function(){var t=cc.instantiate(this.bossPrefab);this.node.addChild(t);var e=this.node.x-this.node.width/2,i=this.node.y-100;t.setPosition(cc.v2(e,i))},produceBlast:function(){console.log(this.node.children);var t=cc.instantiate(this.blastPrefab);this.node.addChild(t),t.setPosition(this.getaBlastLocation())},showChatBox:function(){var t=cc.instantiate(this.chatBoxPrefab);this.node.addChild(t),t.setPosition(cc.v2(this.node.x-this.node.width/2,this.node.y-3*this.node.height/4))},showGuideCat:function(){var t=cc.instantiate(this.guideCatPrefab);this.node.addChild(t),t.setPosition(cc.v2(this.player.x+450,this.player.y))},playStartBGMSound:function(){this.bgm=cc.audioEngine.play(this.startBGMAudio,!1,.7)},playBGMSound:function(){this.bgm=cc.audioEngine.play(this.bgmAudio,!1,.7)},stopSound:function(){cc.audioEngine.stop(this.bgm)},onLoad:function(){this.score=0,this.timer=0,this.timeInterval=3,this.difficultyTimer=0,this.difficultyInterval=20,this.end=60,this.monsterRespawnSpeed=1,this.lose=!1,this.gameStart=!1,this.bossFight=!1},onDestroy:function(){cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this)},onKeyDown:function(t){switch(t.keyCode){case cc.macro.KEY.j:this.produceBlast();break;case cc.macro.KEY.u:this.clearScene(),this.letGameStart();break;case cc.macro.KEY.r:this.gameStart||this.restartGame()}},letGameStart:function(){if(!this.gameStart){console.log("\u6e38\u620f\u5f00\u59cb"),this.gameStart=!0,null==this.node.getChildByName("guide")&&this.showGuideCat();var t=this.node.getChildByName("guide").getComponent("GuideCat");t.timer=0,t.timeInterval=5,this.instructionDisplay.string="WASD to control move\n\r J to use skill",this.stopSound(),this.playBGMSound()}},playerAction:function(t){var e=this.player.getComponent(s);1==t&&(e.moveAround=!0)},update:function(t){if(this.gameStart){if(this.lose){for(;;){if(null==(e=this.node.getChildByName("hulk-1")))break;this.node.removeChild(e)}for(;;){if(null==(e=this.node.getChildByName("bullet")))break;this.node.removeChild(e)}for(;;){var e;if(null==(e=this.node.getChildByName("red-bullet")))break;this.node.removeChild(e)}return this.node.removeChild(this.node.getChildByName("boss")),this.gameStart=!1,void(this.instructionDisplay.string="You lost. \n\rPress R to restart")}if(this.end<=0){if(this.bossFight||(this.showBoss(),this.bossFight=!0),null==this.node.getChildByName("hulk-1")&&null==this.node.getChildByName("boss"))this.node.getChildByName("guide").getComponent("GuideCat").timeInterval=9999,this.gameStart=!1,this.endScene(),this.instructionDisplay.string="The end of Demo..."}else{if(this.timer>=this.timeInterval){this.timer=0;for(var i=0;i<this.monsterRespawnSpeed;i++)console.log("\u602a\u7269\u51fa\u73b0"),this.showMonster1()}this.difficultyTimer>=this.difficultyInterval&&(this.instructionDisplay.string="",this.difficultyTimer=0,this.monsterRespawnSpeed++),this.difficultyTimer+=t,this.timer+=t,this.end-=t}}},endScene:function(){this.showChatBox()},restartGame:function(){this.stopSound(),this.score=0,this.timer=0,this.timeInterval=3,this.difficultyTimer=0,this.difficultyInterval=30,this.end=90,this.monsterRespawnSpeed=1,this.lose=!1,this.gameStart=!1,this.letGameStart()},startScene:function(){this.playerAction(1),setTimeout(function(){this.gameStart||(this.showChatBox(),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this),this.instructionDisplay.string="Press U to skip...")}.bind(this),7e3),setTimeout(function(){this.gameStart||this.showGuideCat()}.bind(this),15e3),setTimeout(function(){this.gameStart||this.letGameStart()}.bind(this),30500)},clearScene:function(){this.node.removeChild(this.node.getChildByName("chatbox"))},start:function(){this.playStartBGMSound(),setTimeout(function(){this.startScene()}.bind(this),1e3)}}),cc._RF.pop()},{Player:"Player"}],GuideCat:[function(t,e,i){"use strict";cc._RF.push(e,"a176al6fVlCz4rU4ziDZTOQ","GuideCat"),cc.Class({extends:cc.Component,properties:{bombPrefab:{default:null,type:cc.Prefab},catAudio:{default:null,type:cc.AudioClip},speed:0,upSpeed:0,downSpeed:0,leftSpeed:0,rightSpeed:0},leftAnimation:function(){var t=this.getComponent(cc.Animation).play("cat-left-move");t.speed=.7,t.repeatCount=1/0},rightAnimation:function(){var t=this.getComponent(cc.Animation).play("cat-right-move");t.speed=.7,t.repeatCount=1/0},disappearAnimation:function(){return cc.fadeOut(1)},moveLeft:function(){this.xSpeed=-this.speed,this.leftAnimation()},stopMoving:function(){this.xSpeed=0,this.ySpeed=0,this.getComponent(cc.Animation).stop()},onLoad:function(){console.log("\u732b\u732b\u51fa\u73b0"),this.timer=0,this.xSpeed=0,this.ySpeed=0,this.timeInterval=9999,this.audioTimer=15,this.moveLeft(),this.playCatSound(),setTimeout(function(){this.stopMoving()}.bind(this),3e3)},start:function(){},dropBomb:function(){var t=cc.instantiate(this.bombPrefab);this.node.parent.addChild(t),t.setPosition(this.node.getPosition())},findMonster:function(){var t=this.node.parent.getChildByName("hulk-1");null!=t?this.moveToPosition(t.x,t.y):this.moveToRandomPosition()},moveToRandomPosition:function(){var t=2*(Math.random()-.5)*(this.node.parent.getChildByName("newbg").width/2-50),e=2*(Math.random()-.5)*(this.node.parent.getChildByName("newbg").height/2-50);this.moveToPosition(t,e)},moveToPosition:function(t,e){this.xSpeed=t-this.node.x,this.ySpeed=e-this.node.y,this.xSpeed=this.xSpeed/2,this.ySpeed=this.ySpeed/2,this.xSpeed<0?this.leftAnimation():this.rightAnimation(),setTimeout(function(){this.stopMoving()}.bind(this),2e3)},playCatSound:function(){cc.audioEngine.play(this.catAudio,!1,.3)},update:function(t){this.timer>=this.timeInterval&&(this.timer=0,this.findMonster(),setTimeout(function(){this.dropBomb()}.bind(this),3e3)),this.audioTimer<=0&&(console.log("\u732b\u53eb"),this.playCatSound(),this.audioTimer=15),this.timer+=t,this.audioTimer-=t;this.node.parent;this.node.x+=this.xSpeed*t,this.node.y+=this.ySpeed*t}}),cc._RF.pop()},{}],Menu:[function(t,e,i){"use strict";cc._RF.push(e,"54157hFmjVPfr1dvdATO5RD","Menu"),cc.Class({extends:cc.Component,properties:{},toScene:function(){cc.director.loadScene("game")},start:function(){}}),cc._RF.pop()},{}],Monter1:[function(t,e,i){"use strict";cc._RF.push(e,"10701bvrwRGxL5qnMfPYmP6","Monter1"),cc.Class({extends:cc.Component,properties:{jumpHeight:0,jumpDuration:0,maxMoveSpeed:0,accel:0,bulletPrefab:{default:null,type:cc.Prefab}},onLoad:function(){this.jumpAction=this.setJumpAction(),this.node.runAction(this.jumpAction),this.accLeft=!1,this.accRight=!1,this.xSpeed=0,this.timer=0,this.intervalTime=3},move:function(){},setJumpAction:function(){var t=cc.moveBy(this.jumpDuration,cc.v2(0,this.jumpHeight)).easing(cc.easeCubicActionOut()),e=cc.moveBy(this.jumpDuration,cc.v2(0,-this.jumpHeight)).easing(cc.easeCubicActionIn());return cc.sequence(t,e)},produceBullet:function(){if(null!=this.node){var t=cc.instantiate(this.bulletPrefab);this.node.parent.addChild(t),t.setPosition(this.node.x,this.node.y)}},hulkSmash:function(){this.getComponent(cc.Animation).play("hulk-skill").speed=1.5},start:function(){},update:function(t){this.timer>this.intervalTime&&(this.hulkSmash(),this.produceBullet(),this.timer=0,console.log("\u53d1\u5c04\uff01")),this.timer+=t,this.accLeft?this.xSpeed-=this.accel*t:this.accRight&&(this.xSpeed+=this.accel*t),Math.abs(this.xSpeed)>this.maxMoveSpeed&&(this.xSpeed=this.maxMoveSpeed*this.xSpeed/Math.abs(this.xSpeed)),this.node.x+=this.xSpeed*t}}),cc._RF.pop()},{}],Player:[function(t,e,i){"use strict";cc._RF.push(e,"2d44bdoVrpE7ptMAaP3Lb+e","Player"),cc.Class({extends:cc.Component,properties:{lifePrefab:{default:null,type:cc.Prefab},speed:0,upSpeed:0,downSpeed:0,leftSpeed:0,rightSpeed:0},update:function(t){this.node.x+=this.leftSpeed*t,this.node.x+=this.rightSpeed*t,this.node.x<-this.scene.width/2&&(this.node.x=-this.scene.width/2),this.node.x>this.scene.width/2&&(this.node.x=this.scene.width/2),this.node.y+=this.upSpeed*t,this.node.y+=this.downSpeed*t,this.node.y<-this.scene.height/2&&(this.node.y=-this.scene.height/2),this.node.y>this.scene.height/2&&(this.node.y=this.scene.height/2),this.moveAround&&(this.moveAroundAnimation(),this.moveAround=!1),this.wasDamaged&&(this.node.runAction(this.blinkAnimation()),this.wasDamaged=!1),this.frontOnSkill?(this.frontBlast(),this.frontOnSkill=!1):this.leftOnSkill?(this.leftBlast(),this.leftOnSkill=!1):this.rightOnSkill?(this.rightBlast(),this.rightOnSkill=!1):this.backOnSkill&&(this.backBlast(),this.backOnSkill=!1)},onLoad:function(){this.xSpeed=0,this.movingState=!1,this.moveFront=!1,this.moveBack=!1,this.moveLeft=!1,this.moveRight=!1,this.faceDirection="front",this.frontOnSkill=!1,this.leftOnSkill=!1,this.rightOnSkill=!1,this.backOnSkill=!1,this.wasDamaged=!1,this.moveAround=!1,this.lifes=new Array,this.heart=2,this.scene=this.node.parent.getChildByName("newbg")},onDestroy:function(){cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this)},onKeyDown:function(t){switch(t.keyCode){case cc.macro.KEY.a:this.leftSpeed=-this.speed,this.moveLeft=!0,0==this.movingState&&(this.movingState=!0,this.leftAnimation(),this.faceDirection="left");break;case cc.macro.KEY.d:this.rightSpeed=this.speed,this.moveRight=!0,0==this.movingState&&(this.movingState=!0,this.rightAnimation(),this.faceDirection="right");break;case cc.macro.KEY.w:this.upSpeed=this.speed,this.moveBack=!0,0==this.movingState&&(this.movingState=!0,this.backAnimation(),this.faceDirection="back");break;case cc.macro.KEY.s:this.downSpeed=-this.speed,this.moveFront=!0,0==this.movingState&&(this.movingState=!0,this.frontAnimation(),this.faceDirection="front")}},onKeyUp:function(t){switch(t.keyCode){case cc.macro.KEY.a:this.leftSpeed=0,this.moveLeft=!1,this.moveRight?(this.rightAnimation(),this.faceDirection="right"):this.moveFront?(this.frontAnimation(),this.faceDirection="front"):this.moveBack?(this.backAnimation(),this.faceDirection="back"):this.moveLeft?(this.leftAnimation(),this.faceDirection="left"):(this.stopAnimation(),this.movingState=!1);break;case cc.macro.KEY.d:this.rightSpeed=0,this.moveRight=!1,this.moveRight?(this.rightAnimation(),this.faceDirection="right"):this.moveFront?(this.frontAnimation(),this.faceDirection="front"):this.moveBack?(this.backAnimation(),this.faceDirection="back"):this.moveLeft?(this.leftAnimation(),this.faceDirection="left"):(this.stopAnimation(),this.movingState=!1);break;case cc.macro.KEY.w:this.upSpeed=0,this.moveBack=!1,this.moveRight?(this.rightAnimation(),this.faceDirection="right"):this.moveFront?(this.frontAnimation(),this.faceDirection="front"):this.moveBack?(this.backAnimation(),this.faceDirection="back"):this.moveLeft?(this.leftAnimation(),this.faceDirection="left"):(this.stopAnimation(),this.movingState=!1);break;case cc.macro.KEY.s:this.downSpeed=0,this.moveFront=!1,this.moveRight?(this.rightAnimation(),this.faceDirection="right"):this.moveFront?(this.frontAnimation(),this.faceDirection="front"):this.moveBack?(this.backAnimation(),this.faceDirection="back"):this.moveLeft?(this.leftAnimation(),this.faceDirection="left"):(this.stopAnimation(),this.movingState=!1);break;case cc.macro.KEY.r:this.heart<0&&this.restartGame()}},restartGame:function(){this.lifes=new Array,this.heart=2,this.showLifes()},frontAnimation:function(){var t=this.getComponent(cc.Animation).play("front-move");t.speed=.9,t.repeatCount=1/0},leftAnimation:function(){var t=this.getComponent(cc.Animation).play("left-move");t.speed=.9,t.repeatCount=1/0},rightAnimation:function(){var t=this.getComponent(cc.Animation).play("right-move");t.speed=.9,t.repeatCount=1/0},backAnimation:function(){var t=this.getComponent(cc.Animation).play("back-move");t.speed=.9,t.repeatCount=1/0},stopAnimation:function(){this.getComponent(cc.Animation).stop()},frontBlast:function(){this.getComponent(cc.Animation).play("front-blast").speed=1,setTimeout(function(){this.refreshAnimation()}.bind(this),200)},leftBlast:function(){this.getComponent(cc.Animation).play("left-blast").speed=1,setTimeout(function(){this.refreshAnimation()}.bind(this),200)},rightBlast:function(){this.getComponent(cc.Animation).play("right-blast").speed=1,setTimeout(function(){this.refreshAnimation()}.bind(this),200)},backBlast:function(){this.getComponent(cc.Animation).play("back-blast").speed=1,setTimeout(function(){this.refreshAnimation()}.bind(this),200)},blinkAnimation:function(){console.log("\u88ab\u6253\u4e2d\u5566");var t=cc.fadeIn(.2),e=cc.fadeOut(.2);return this.lifes[this.heart].destroy(),this.heart--,console.log(this.node.parent.getComponent("Game")),this.heart<0&&(this.node.parent.getComponent("Game").lose=!0,console.log("\u8f93\u4e86")),cc.repeat(cc.sequence(e,t),4)},showLifes:function(){for(var t=0;t<3;t++){var e=cc.instantiate(this.lifePrefab);this.node.parent.addChild(e);var i=this.node.parent.x-this.node.parent.width/2-20+20*t,s=this.node.parent.y-40;e.setPosition(cc.v2(i,s)),this.lifes[t]=e}},moveAroundAnimation:function(){this.leftSpeed=-80,this.leftAnimation(),setTimeout(function(){this.leftSpeed=0,this.stopAnimation()}.bind(this),1e3),setTimeout(function(){this.rightSpeed=80,this.rightAnimation()}.bind(this),2e3),setTimeout(function(){this.rightSpeed=0,this.stopAnimation()}.bind(this),3e3),setTimeout(function(){this.upSpeed=80,this.backAnimation()}.bind(this),4e3),setTimeout(function(){this.upSpeed=0,this.stopAnimation()}.bind(this),5e3),setTimeout(function(){this.downSpeed=-80,this.frontAnimation()}.bind(this),6e3),setTimeout(function(){this.downSpeed=0,this.stopAnimation(),this.gameStart(),this.showLifes()}.bind(this),7e3)},refreshAnimation:function(){this.movingState&&(this.moveRight?(this.rightAnimation(),this.faceDirection="right"):this.moveFront?(this.frontAnimation(),this.faceDirection="front"):this.moveBack?(this.backAnimation(),this.faceDirection="back"):this.moveLeft&&(this.leftAnimation(),this.faceDirection="left"))},gameStart:function(){cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this)},start:function(){}}),cc._RF.pop()},{}],RedBullet:[function(t,e,i){"use strict";cc._RF.push(e,"72e8eDS3gVHC7YZ9X9IgBWL","RedBullet");var s=t("Player");cc.Class({extends:cc.Component,properties:{bulletWidth:0,speed:0},onLoad:function(){this.move=!1,this.xSpeed=0,this.ySpeed=0},getPlayerPosition:function(){return player.getPosition()},start:function(){var t=this.node.parent;this.sceneWidth=t.width/2,this.sceneHeight=t.height/2;var e=t.getChildByName("rem");this.xSpeed=e.x-this.node.x,this.ySpeed=e.y-this.node.y;var i=1,s=1;this.xSpeed<0&&(i=-1),this.ySpeed<0&&(s=-1);Math.abs(this.xSpeed)<Math.abs(this.ySpeed)?(this.xSpeed=this.xSpeed*Math.abs(200/this.ySpeed),this.ySpeed=200*s):(this.ySpeed=this.ySpeed*Math.abs(200/this.xSpeed),this.xSpeed=200*i),this.move=!0},detectPlayer:function(){var t=this.node.parent,e=t.getChildByName("rem"),i=e.getPosition();this.node.position.sub(i).mag()<this.node.width/2&&(e.getComponent(s).wasDamaged=!0,t.removeChild(this.node))},update:function(t){this.detectPlayer(),this.move&&(this.node.y+=this.ySpeed*t,this.node.x+=this.xSpeed*t),(this.node.x<-this.sceneWidth||this.node.x>this.sceneWidth||this.node.y<-this.sceneHeight||this.node.y>this.sceneHeight)&&(this.node.destroy(),console.log("bullet removed"))}}),cc._RF.pop()},{Player:"Player"}],Tutorial:[function(t,e,i){"use strict";cc._RF.push(e,"a3068vCvKFG97ijJ+lCdgZ7","Tutorial"),cc.Class({extends:cc.Component,properties:{},start:function(){}}),cc._RF.pop()},{}],newGameButton:[function(t,e,i){"use strict";cc._RF.push(e,"336aeJPymtOAZ1yeMLxwIkM","newGameButton"),cc.Class({extends:cc.Component,properties:{},start:function(){}}),cc._RF.pop()},{}]},{},["Apple","Blast","Bomb","Boss","Bullet","Chatbox","Game","GuideCat","Menu","Monter1","Player","RedBullet","Tutorial","newGameButton"]);