var paraStar = document.getElementById('star');
var paraBall = document.getElementById('ball');

var countStars = 0;
var countBalls = 0;

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

function random(min,max) {
    var num = Math.floor(Math.random()*(max-min)) + min;
    return num;
}

function Shape(x, y, velX, velY, exists) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
}

function Star(x, y, velX, velY, exists, color, size) {
    Shape.call(this, x, y, velX, velY, exists);

    this.color = color;
    this.size = size;
}

Star.prototype = Object.create(Shape.prototype);
Star.prototype.constructor = Star;

Star.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.moveTo(this.x + (this.size/2) , this.y + 1);
    ctx.lineTo(this.x + (this.size * 2/3), this.y + (this.size/3));
    ctx.lineTo(this.x + this.size, this.y + (this.size/3));
    ctx.lineTo(this.x + (this.size * 3/4), this.y + (this.size * 2/3));
    ctx.lineTo(this.x + (this.size * 4/5), this.y + this.size);
    ctx.lineTo(this.x + (this.size/2), this.y + (this.size * 4/5));
    ctx.lineTo(this.x + (this.size * 1/5), this.y + this.size);
    ctx.lineTo(this.x + (this.size/4), this.y + (this.size * 2/3));
    ctx.lineTo(this.x + 1, this.y + (this.size/3));
    ctx.lineTo(this.x + (this.size/3), this.y + (this.size/3));
    ctx.lineTo(this.x + (this.size/2), this.y + 1);
    ctx.closePath();
    ctx.fill();
}

Star.prototype.update = function() {
    if((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }
    if((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }
    if((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }
    if((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
};

Star.prototype.collisionDetect = function() {
    for(var j = 0; j < stars.length; j++) {
        if(!(this === stars[j])) {
            var dx = this.x - stars[j].x;
            var dy = this.y - stars[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + stars[j].size && stars[j].exists) {
                stars[j].color = this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
            }
        }
    }
};

function EvilCircle(x, y, exists) {
    Shape.call(this, x, y, 20, 20, exists);

    this.color = 'white';
    this.size = 10;
}

function Ball(x, y, velX, velY, exists, color, size) {
    Shape.call(this, x, y, velX, velY, exists);

    this.color = color;
    this.size = size;
}

Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;
  
Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
};

Ball.prototype.update = function() {
    if((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }
    if((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }
    if((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }
    if((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }
    this.x += this.velX;
    this.y += this.velY;
};
  
Ball.prototype.collisionDetect = function() {
    for(var j = 0; j < balls.length; j++) {
        if(!(this === balls[j])) {
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size && balls[j].exists) {
                balls[j].color = this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
            }
        }
    }
};

EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;
  
EvilCircle.prototype.draw = function() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
};
  
EvilCircle.prototype.checkBounds = function() {
    if((this.x + this.size) >= width) {
        this.x -= this.size;
    }
    if((this.x - this.size) <= 0) {
        this.x += this.size;
    }
    if((this.y + this.size) >= height) {
        this.y -= this.size;
    }
    if((this.y - this.size) <= 0) {
        this.y += this.size;
    }
};

EvilCircle.prototype.setControls = function() {
    var _this = this;
    window.onkeydown = function(e) {
        if(e.keyCode === 65) { // a
            _this.x -= _this.velX;
        } else if(e.keyCode === 68) { // d
            _this.x += _this.velX;
        } else if(e.keyCode === 87) { // w
            _this.y -= _this.velY;
        } else if(e.keyCode === 83) { // s
            _this.y += _this.velY;
        }
    };
};

EvilCircle.prototype.collisionDetect = function() {
    for(var j = 0; j < stars.length; j++) {
        if( stars[j].exists ) {
            var dx = this.x - stars[j].x;
            var dy = this.y - stars[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + stars[j].size) {
                stars[j].exists = false;
                countStars--;
                paraStar.textContent = 'Star count: ' + countStars;
            }
        }
    }

    for(var j = 0; j < balls.length; j++) {
        if( balls[j].exists ) {
          var dx = this.x - balls[j].x;
          var dy = this.y - balls[j].y;
          var distance = Math.sqrt(dx * dx + dy * dy);
    
          if (distance < this.size + balls[j].size) {
            balls[j].exists = false;
            countBalls--;
            paraBall.textContent = 'Ball count: ' + countBalls;
          }
        }
      }
};

var stars = [];
var balls = [];

var evil = new EvilCircle(random(0,width), random(0,height), true);
evil.setControls();

function loop() {
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0,0,width,height);
  
    while(stars.length < 25) {
        var size = random(10,20);
        var star = new Star(
            random(0 + size,width - size),
            random(0 + size,height - size),
            random(-7,7),
            random(-7,7),
            true,
            'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
            size
        );
        stars.push(star);
        countStars++;
        paraStar.textContent = 'Star count: ' + countStars;
    }
  
    for(var i = 0; i < stars.length; i++) {
        if(stars[i].exists) {
            stars[i].draw();
            stars[i].update();
            stars[i].collisionDetect();
        }
    }

    while(balls.length < 25) {
        var size = random(10,20);
        var ball = new Ball(
            random(0 + size,width - size),
            random(0 + size,height - size),
            random(-7,7),
            random(-7,7),
            true,
            'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
            size
        );
        balls.push(ball);
        countBalls++;
        paraBall.textContent = 'Ball count: ' + countBalls;
    }

    for(var i = 0; i < balls.length; i++) {
        if(balls[i].exists) {
            balls[i].draw();
            balls[i].update();
            balls[i].collisionDetect();
        }
    }

    evil.draw();
    evil.checkBounds();
    evil.collisionDetect();
  
    requestAnimationFrame(loop);
}

loop();