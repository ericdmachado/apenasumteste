var GameTeste = function()
{
    var fps                 = this.fps                    = 60;
    var canvas              = this.canvas;
    var context             = this.context;
    var pointers            = this.pointers               = [];
    var joystick            = this.joystick               = 1;
    var devicePixelRatio    = this.devicePixelRatio       = 1;
    var backingStoreRatio   = this.backingStoreRatio      = 1;
    var ratio               = this.ratio                  = 1;
    var half                = this.half                   = {};
    var leftPointerID       = this.leftPointerID          = -1;
    var ship                = this.ship                   = new SpaceShip();
    var leftPointerPos      = this.leftPointerPos         = new Vector2(0,0);
    var leftPointerStartPos = this.leftPointerStartPos    = new Vector2(0,0);
    var leftVector          = this.leftVector             = new Vector2(0,0);
    var firebtn             = this.firebtn;
    var joystickbtn         = this.joystickbtn;
    var stars               = this.stars                  = new Starfield();
    var score               = this.score                  = new Score(0);
    var asteroids           = this.asteroids              = [];
    var lastTime            = this.lastTime               = Date.now();
    var gameTime            = this.gameTime               = 0.0001;
    var fase                = this.fase                   = 1;
    var endTime             = this.endTime                = Date.now() + 30000;
    var isGameOver          = this.isGameOver             = false;
    var sounds              = this.sounds                 = false;
    var life                = this.life                   = 3;
    var stats               = this.stats                  = new Stats();
    var spriteAsteroid      = this.spriteAsteroid;
    var audioPath           = this.audioPath              = 'assets/sounds/';
    var manifest            = this.manifest               = [{id: 'shot', src: 'shot.ogg'}, {id: 'explosion', src: 'explosion.ogg'}, {id: 'musicfx', src: 'musicfx.ogg'}];
    var keycodes            = this.keycodes               = {32: 'space', 87: 'up', 83: 'down'};
    var keystatus           = this.keystatus              = {};
    var mute                = this.mute                   = true;
    var self                = this.self                   = this;


    this.setPixelRatio = function()
    {
        this.devicePixelRatio   = window.devicePixelRatio                   || 1;
        this.backingStoreRatio  = this.context.webkitBackingStorePixelRatio ||
                                  this.context.mozBackingStorePixelRatio    ||
                                  this.context.msBackingStorePixelRatio     ||
                                  this.context.oBackingStorePixelRatio      ||
                                  this.context.backingStorePixelRatio       || 1;

        this.ratio = this.devicePixelRatio / this.backingStoreRatio;


        if (this.devicePixelRatio !== this.backingStoreRatio) 
        {
            var oldWidth            = this.canvas.width;
            var oldHeight           = this.canvas.height;

                this.canvas.width        = oldWidth * this.ratio;
                this.canvas.height       = oldHeight * this.ratio;

                this.canvas.style.width  = oldWidth + 'px';
                this.canvas.style.height = oldHeight + 'px';

            this.context.scale(this.ratio, this.ratio);
        }
        else
        {
            this.canvas.width        = this.getWidth();
            this.canvas.height       = this.getHeight();
        }
    }

    this.createFireButton = function()
    {
        this.context.drawImage(this.firebtn, 0, 0, this.firebtn.width, this.firebtn.height, this.getWidth()-110, this.getHeight()-110, 80, 80);
    }

    this.createJoystickButton = function(x,y)
    {
        this.context.beginPath(); 
        this.context.lineWidth = 2;
        this.context.arc(this.leftPointerStartPos.x, this.leftPointerStartPos.y, 25,0,Math.PI*2,true); 
        this.context.stroke();
        this.context.strokeStyle = "rgba(255,255,255,0.4)";
        this.context.fillStyle = 'rgba(255,255,255,0.3)';
        this.context.fill();

        this.context.beginPath(); 
        this.context.lineWidth = 1;
        this.context.arc(this.leftPointerStartPos.x, this.leftPointerStartPos.y, 48,0,Math.PI*2,true);
        this.context.stroke();
        this.context.strokeStyle = "rgba(255,255,255,0.4)";
        this.context.fillStyle = 'rgba(255,255,255,0.1)';
        this.context.fill();

        this.context.beginPath(); 
        this.context.lineWidth = 1;
        this.context.arc(this.leftPointerStartPos.x, this.leftPointerStartPos.y, 50,0,Math.PI*2,true);
        this.context.stroke();
        this.context.strokeStyle = "rgba(255,255,255,0.4)";
        this.context.fillStyle = 'rgba(255,255,255,0.1)';
        this.context.fill();
        
        this.context.drawImage(this.joystickbtn, 0, 0, this.joystickbtn.width, this.joystickbtn.height, x-30, y-30, 60, 60);
    }

    this.setControlPos = function(pos)
    {
        this.leftPointerStartPos.x = 70;
        this.leftPointerStartPos.y = this.getHeight() - 70;

        var x = this.leftPointerStartPos.x;
        var y = this.leftPointerStartPos.y;


        var radius = 28;
        var scale = radius / Math.sqrt(Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2));

        var posY = Math.round((pos.y - y) * scale + y);
        var posX = Math.round((pos.x - x) * scale + x);

        var nPos = {
            x: (posX-this.leftPointerStartPos.x) ? (posX-this.leftPointerStartPos.x) : 0,
            y: (posY-(this.leftPointerStartPos.y)) ? (posY-(this.leftPointerStartPos.y)) : 0
        }

        //console.log('Move: '+ nPos.x +'/'+ nPos.y);

        this.ship.targetVel.copyFrom(this.leftVector);
        this.ship.targetVel.multiplyEq(0.15);

        //stage.draw();
        this.ship.update();

        with(this.ship.pos)
        {
            if(y < 8)
            {
                y = 8; 
            }
            else if (y > self.getHeight() - self.ship.canvas.offsetHeight)
            {
                y = self.getHeight() - self.ship.canvas.offsetHeight; 
            }
        }

        if(scale < 1)
            return {
                y: posY,
                x: posX
            };
        else 
            return pos;
    }

    this.loadSettings = function()
    {   
        //
        var self = this;

        //
        if(!window.devicePixelRatio) window.devicePixelRatio = Number((window.screen.deviceXDPI / window.screen.logicalXDPI).toFixed(1));

        //
        window.onorientationchange = window.onresize = function(){
            //
            $('#init .wrapper').css({ marginTop: -Math.round(($('#init .wrapper').height() / 2) - 20)});

            //
            self.resize();
        };

        //
        for (var code in this.keycodes) this.keystatus[keycodes[ code ]] = false;
        
        //
        this.canvas  = document.getElementById('the-responsive-game');
        this.context = this.canvas.getContext('2d');

        //
        this.setPixelRatio();

        //
        this.half.width  = this.getWidth() / 2;
        this.half.height = this.getHeight() / 2;

        //
        var initBtn = document.getElementById('btn-init');
            initBtn.addEventListener('click', function(){
                $('#init').hide();
                self.start();
                self.resize();
            });

        var reInitBtn = document.getElementById('btn-reinit');
            reInitBtn.addEventListener('click', function(){
                $('#gameover').hide();
                self.restart();
                self.resize();
            });


        //
        var scoreBtn1 = document.getElementById('btn-placar');
            scoreBtn1.addEventListener('click', function(){
                self.getHighScore();
            });

        var scoreBtn2 = document.getElementById('btn-placar-2');
            scoreBtn2.addEventListener('click', function(){
                self.getHighScore();   
            });

        var scoreClose = document.getElementById('score-close');
            scoreClose.addEventListener('click', function(){
                $('#highscore').removeClass('show');
            });


        //
        var gameContainer = document.getElementById('game-container');
        //    gameContainer.appendChild( this.stats.domElement );
            gameContainer.appendChild( this.stars.starMinCanvas );
            gameContainer.appendChild( this.stars.starMaxCanvas );
            gameContainer.appendChild( this.ship.canvas );
        
        //
        this.pointers = [];

        //
        this.leftPointerStartPos.x = 70;
        this.leftPointerStartPos.y = this.getHeight() - 70;

        //
        this.ship.main = this;

        //createCanvas();
        this.canvas.addEventListener('pointerdown', this.mousedown, false);
        this.canvas.addEventListener('pointermove', this.mousemove, false);
        this.canvas.addEventListener('pointerup',   this.mouseup,   false);
        this.canvas.addEventListener('pointerout',  this.mouseup,   false);

        //
        document.addEventListener('keydown',        this.onkeydown, false);
        document.addEventListener('keyup',          this.onkeyup, false);

    }

    this.getHighScore = function()
    {
        $.ajax({ type: 'GET', url: 'ranking', dataType: "json" }).done(self.showScore);
    }

    this.showScore = function(score)
    {
        $('#highscore').addClass('show');
        $('#highscore .top10').html('');

        $.each(score.users, function(count){
            $('#highscore .top10').append('<li><span class="score-counter">'+ (count + 1) +'<i>&ordm;</i></span><span class="score-user-picture"><img src="'+ (this.go_score_user_image) +'" alt=""></span><span class="score-name">'+ this.go_score_value +'</span><span class="score-val">'+ this.go_score_user_mail +'</span></li>');
        });
    }

    this.onkeydown = function(evt)
    {
        var keyCode = (evt.keyCode) ? evt.keyCode : evt.charCode;

        if(keyCode == 38 || keyCode == 40) evt.preventDefault();

        if (self.keycodes[keyCode])
        {
            evt.preventDefault();
            self.keystatus[self.keycodes[keyCode]] = true;
        }
    }


    this.onkeyup = function(evt)
    {
        var keyCode = (evt.keyCode) ? evt.keyCode : evt.charCode;
        
        if (self.keycodes[keyCode])
        {
            evt.preventDefault();
            self.keystatus[self.keycodes[keyCode]] = false;
        }
    }


    this.hideAddressBar = function()
    {
        if(!window.location.hash)
        {
            if(this.getHeight() < window.outerHeight) document.body.style.height = (window.outerHeight + 50) + 'px';
            setTimeout( function(){ window.scrollTo(0, 1); }, 100 );
        }
    }


    this.getWidth = function()
    {
        return document.documentElement.clientWidth;
    }

    this.getHeight = function()
    {
        return document.documentElement.clientHeight;
    }

    this.resize = function()
    {
        //
        this.hideAddressBar();

        this.canvas.width   = window.innerWidth;
        this.canvas.height  = window.innerHeight;

        //
        this.leftPointerStartPos.x = 70;
        this.leftPointerStartPos.y = this.getHeight() - 70;

        //
        this.setPixelRatio();

        //
        this.stars.resize();
        
        //
        window.scrollTo(0, 0);
    }


    this.loadAssets = function(file, callback)
    {
        var self = this;
        var imageObj = new Image();
            imageObj.onload = function() 
            {
                if(callback) 
                {
                    self.callback = callback;
                    self.callback(this);
                }
            }
            imageObj.src = file;

        return this;
    }

    this.start = function()
    {
        setTimeout(function(){
            var spaceship = document.getElementById('spaceship');

                spaceship.setAttribute('data-status', 'actived');

            var styleStr = "translate3d("+(130)+"px, "+ (( self.getHeight() / 2 )-20)+"px, 0px) rotate(0deg)";
                spaceship.style.webkitTransform = spaceship.style.MozTransform = spaceship.style.OTransform = spaceship.style.transform = styleStr;

        }, 1600);


        console.log("start");

        $('#game-score').show();
        $('.game-life').show();


        this.leftPointerStartPos.x = 70;
        this.leftPointerStartPos.y = this.getHeight() - 70;

        this.update();
    }


    this.intro = function()
    {

    }

    this.collides = function(x, y, r, b, x2, y2, r2, b2) {
        return !(r <= x2 || x > r2 ||
                 b <= y2 || y > b2);
    }

    this.boxCollides = function(pos, size, pos2, size2) {
        return this.collides(pos.x, pos.y,
                        pos.x + size.width, pos.y + size.height,
                        pos2.x, pos2.y,
                        pos2.x + size2.width, pos2.y + size2.height);
    }


    this.checkCollisions = function()
    {
        for(var a = 0; a < this.asteroids.length; a++)
        {
            var pos     = {x: this.asteroids[a].x, y: this.asteroids[a].y};
            var size    = {width: this.asteroids[a].scale, height: this.asteroids[a].scale};
            
            for(var b = 0; b < this.ship.bullets.length; b++)
            {
                var pos2 = {x: this.ship.bullets[b].x, y: this.ship.bullets[b].y};
                var size2 = {width: this.ship.bullets[b].width, height: this.ship.bullets[b].height};


                if(this.boxCollides(pos, size, pos2, size2))
                {
                    this.asteroids.splice(a, 1);
                    a--;

                    this.ship.bullets.splice(b, 1);
                        


                    if(!self.mute) createjs.Sound.play("explosion");
                    //navigator.vibrate([100,30,100,30,100,200,200,30,200,30,200,200,100,30,100,30,100]);



                    this.score.getPoints((size.width * 100) / 120);

                    break;
                }
            }

            var player = {
                    pos: {x: 120, y: this.ship.pos.y},
                    size: {width: 10, height: 10}
                };

                //console.log(pos, size, player.pos, player.size, boxCollides(pos, size, player.pos, player.size));

            if(this.boxCollides(pos, size, player.pos, player.size)) 
            {
                //console.log(life);
                this.asteroids.splice(a, 1);
                a--;
                this.life--;

                if(!this.life)
                {
                    this.gameover();
                }

                $('.game-life .lifes i:first').remove();
            }
        }


        //life
    }

    this.update = function()
    {
        //
        var self  = this;

        //
        //self.stats.begin();

        //
        var time = new Date(this.endTime - Date.now());

        //
        this.life = $('.game-life .lifes').children().length;

        //
        var now = Date.now();
        var dt = (now - this.lastTime) / 1000.000;

        //
        this.gameTime += dt;

        //
        self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);

        //
        this.stars.move(this.context, this.ship.pos.x, this.ship.pos.y);

        //
        //console.log(Math.random() < 1 - Math.pow(.993, this.gameTime));

        //
        if(Math.random() < 1 - Math.pow(.993, this.gameTime))
        {
            this.asteroids.push(new Asteroid(self, self.getWidth(), Math.random() * self.getHeight()-60));
        }

        if(self.keystatus.space && !self.isGameOver)
        {
            setTimeout(function(){
                self.ship.fire();
            }, 200);
        }
        if(self.keystatus.up && !self.isGameOver)
        {
            self.ship.pos.y -= 6;
        }
        if(self.keystatus.down && !self.isGameOver)
        {
            self.ship.pos.y += 6;
        }

        if(self.keystatus.space || self.keystatus.up || self.keystatus.down)
        {
            if(!self.isGameOver)
            {
                with(self.ship.pos)
                {
                    if(y < 8)
                    {
                        y = 8; 
                    }
                    else if (y > (self.getHeight() - self.ship.canvas.offsetHeight))
                    {
                        y = self.getHeight() - self.ship.canvas.offsetHeight;
                    }
                }

                self.ship.update();
            }
        }

        //
        this.asteroids.forEach(function(asteroid){
            asteroid.update();
            asteroid.draw();
        });
        this.asteroids = this.asteroids.filter(function(asteroid) {
            return asteroid.active;
        });

        //
        if(!this.isGameOver) this.checkCollisions();

        //
        this.ship.draw();
        
        //
        if(!this.isGameOver) self.createFireButton();
        if(!self.pointers.length && !this.isGameOver) self.createJoystickButton(self.leftPointerStartPos.x, self.leftPointerStartPos.y);

        //
        self.pointers = self.pointers.slice(0, 2);

        //
        for(var i = 0; i < self.pointers.length; i++)
        {
            //
            var pointer = self.pointers[i];

            //
            if(pointer.identifier != self.leftPointerID && self.pointers.length == 1) self.createJoystickButton(self.leftPointerStartPos.x, self.leftPointerStartPos.y);
        

            //
            if(pointer.identifier == self.leftPointerID)
            {
                var n = {
                        x: pointer.clientX,
                        y: pointer.clientY
                    } 

                    var p = self.setControlPos(n);

                if(!this.isGameOver) self.createJoystickButton(p.x, p.y);
            }
        }

        //
        //self.stats.end();

        //
        this.lastTime = Date.now();

        //REQUEST ANIMATION FRAME
        var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
        
        if(!requestAnimationFrame){
            window.setTimeout(function(){self.update();}, 1000/60)
        }else{
            requestAnimationFrame(function(){
                self.update();
            });
        }
    }


    this.init = function(restart)
    {
        var self = this;

        navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
        
        //APPEND GAME HTML
        $('#game-container').html($('#game-tmpl').html());

        if(!restart) 
        {
            $('#init').show();
            setTimeout(function(){
                if(!self.mute) createjs.Sound.play("musicfx");
            }, 200);
        }

        self.loadSettings();
    }

    this.mouseup = function(evt)
    {
        self.createFireButton();

        self.pointers = evt.getPointerList();
        self.pointers = self.pointers.slice(0,2);

        if (self.pointers.length == 0)
        {
            self.leftPointerID = -1;

            if (evt.pointerType == PointerTypes.pointer) 
            {
                self.leftVector.reset(0,0);
            }
        }
    }


    this.mousemove = function(evt)
    {
        evt.preventDefault();

        self.pointers = evt.getPointerList();
        self.pointers = self.pointers.slice(0,2);

        for(var i = 0; i < self.pointers.length; i++)
        {
            var pointer = self.pointers[i];

            if(self.leftPointerID == pointer.identifier)
            {
                self.leftPointerPos.reset(pointer.clientX, pointer.clientY); 
                self.leftVector.copyFrom(self.leftPointerPos); 
                self.leftVector.minusEq(self.leftPointerStartPos);

                break;
            }
        }
    }


    this.mousedown = function(evt)
    {
        self.pointers = evt.getPointerList();
        self.pointers = self.pointers.slice(0,2);

        for(var i = 0; i < self.pointers.length; i++)
        {
            var pointer = self.pointers[i];

            if((self.leftPointerID<0) && (pointer.clientX < self.half.width))
            {
                self.leftPointerID = pointer.identifier;

                self.leftPointerStartPos.reset(pointer.clientX, pointer.clientY);
                self.leftPointerPos.copyFrom(self.leftPointerStartPos);
                self.leftVector.reset(0,0);

                continue;
            }
            else
            {
                if(!self.isGameOver) 
                {
                    self.ship.fire();
                }
                console.log("ship.fire");
            }
        }
    }


    this.loadSounds = function()
    {
        if (!createjs.Sound.initializeDefaultPlugins()) {return;}
        createjs.Sound.alternateExtensions = ["mp3"];
        createjs.Sound.registerManifest(this.manifest, this.audioPath);


        createjs.Sound.addEventListener("fileload", function(){
            this.load
            self.sounds = true;
            self.load();
        });
    }


    this.load = function()
    {
        if(this.sounds)
        {
            this.loadAssets('assets/img/gameui/btn-fire.png', function(file){
                this.firebtn = file;

                this.loadAssets('assets/img/gameui/btn-joystick.png', function(file){
                    this.joystickbtn = file;

                    this.loadAssets('assets/img/gameui/bkg-asteroid.png', function(file){
                        this.spriteAsteroid = file;

                        //
                        this.init();
                    });
                });
            });
        }
        else
        {
            this.loadSounds();
        }
    }


    this.restart = function()
    {
        var fps                 = this.fps                    = 60;
        var canvas              = this.canvas;
        var context             = this.context;
        var pointers            = this.pointers               = [];
        var joystick            = this.joystick               = 1;
        var devicePixelRatio    = this.devicePixelRatio       = 1;
        var backingStoreRatio   = this.backingStoreRatio      = 1;
        var ratio               = this.ratio                  = 1;
        var half                = this.half                   = {};
        var leftPointerID       = this.leftPointerID          = -1;
        //var ship                = this.ship                   = new SpaceShip();
        var leftPointerPos      = this.leftPointerPos         = new Vector2(0,0);
        var leftPointerStartPos = this.leftPointerStartPos    = new Vector2(0,0);
        var leftVector          = this.leftVector             = new Vector2(0,0);
        //var firebtn             = this.firebtn;
        //var joystickbtn         = this.joystickbtn;
        var stars               = this.stars                  = new Starfield();
        var score               = this.score                  = new Score(0);
        var asteroids           = this.asteroids              = [];
        var lastTime            = this.lastTime               = Date.now();
        var gameTime            = this.gameTime               = 0.0001;
        var fase                = this.fase                   = 1;
        var endTime             = this.endTime                = Date.now() + 30000;
        var isGameOver          = this.isGameOver             = false;
        var life                = this.life                   = 3;
        var stats               = this.stats                  = new Stats();
        var self                = this.self                   = this;

        for(var i = 0; i < 3; i++)
        {
            $('.game-life .lifes').append('<i class="ui-icon icon-heart"></i>');
        }

        this.init(true);

        $('#spaceship').show();
        $('#game-score').show();
        $('.game-life').show();
    }


    this.gameover = function()
    {
        this.isGameOver = true;
        this.ship.pos.x = -300;
        this.ship.pos.y = -300;

        this.isGameOver = true;

        $('#gameover .wrapper').css({
            marginTop: -Math.round(($('#gameover .wrapper').height() / 2) + 60)
        });
        $('#gameover').show();
        $('#spaceship').hide();
        $('#game-score').hide();
        $('.game-life').hide();

        $('#ponto-placar-final').text(this.score.getScore() +' pontos');


        $.ajax({
            type: 'POST',
            data: {kng: self.lambda(), csrftk: $('#csrftk').val()},
            url: 'ranking',
            dataType: "json"
        }).done(function(data){
            
            console.log(data);

        });
    }


    this.lambda = function()
    {
        var l = String(self.score.getScore()).toString().length;
        var g = parseInt(self.score.getScore()).toString();
        var a = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
        var s = [];
        
        for(var i=0;i<l;i++)
        {
            var cc = String(parseInt($('div.py').data().py / g[i])).toString();
            var ss = [];
            for(var j = 0; j<cc.length;j++)ss.push(a[cc[j]]);
            s.push(ss.join(''));
        }

        return s.join('%dx%');
    }
}