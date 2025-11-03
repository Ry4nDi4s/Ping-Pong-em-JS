let leftPaddle;

let rightPaddle;

let ball;

let leftScore = 0;

let rightScore = 0;

let telainicial = false;

function setup() {

  createCanvas(500, 400);

  leftPaddle = new Paddle(true);

  rightPaddle = new Paddle(false);

  ball = new Ball();

}

function draw() {

  background(0);

  if (!telainicial) {
    mostrandotela();
    return;
  }

  leftPaddle.show();

  rightPaddle.show();

  leftPaddle.update();

  rightPaddle.update();

  ball.show();

  ball.update();

  ball.edges();

  ball.checkPaddle(leftPaddle);

  ball.checkPaddle(rightPaddle);

  textSize(25);

  fill(255);

  text(leftScore, width / 4, 60);

  text(rightScore, 3 * width / 4.21, 60);

  text("Jogador 1", width / 4, 30)

  text("Jogador 2", width / 1.4, 30)

  fill("gray");
  rect(250, 0, 3, 400);
  fill("black");
  for (let yAtual = 0, yAtual2 = 10; yAtual < 400, yAtual2 < 400; yAtual += 20, yAtual2 += 20) {
    rect(250, yAtual, 3, 5);
  }
}

class Paddle {

  constructor(isLeft) {

    this.w = 10;

    this.h = 80;

    this.y = height / 2 - this.h / 2;

    this.isLeft = isLeft;

    if (isLeft) {

      this.x = 0;

    } else {

      this.x = width - this.w;

    }

    this.ySpeed = 0;

  }

  show() {

    fill(130);

    rect(this.x, this.y, this.w, this.h);

  }

  update() {

    this.y += this.ySpeed;

    this.y = constrain(this.y, 0, height - this.h);

  }

}

class Ball {

  constructor() {

    this.x = width / 2;

    this.y = height / 2;

    this.radius = 10;

    this.xSpeed = random(6, 7);

    this.ySpeed = random(6, 7);

  }

  show() {

    fill(200);

    ellipse(this.x, this.y, this.radius * 2);

  }

  update() {

    this.x += this.xSpeed;

    this.y += this.ySpeed;

  }

  edges() {

    if (this.y < 0 || this.y > height) {

      this.ySpeed *= -1;

    }

    if (this.x - this.radius < 0) {

      rightScore++;

      this.reset();

    }



    if (this.x + this.radius > width) {

      leftScore++;

      this.reset();

    }

  }

  reset() {

    this.x = width / 2;

    this.y = height / 2;

    this.xSpeed = random(6, 7) * (random() > 0.5 ? 1 : -1);

    this.ySpeed = random(6, 7) * (random() > 0.5 ? 1 : -1);

  }

  checkPaddle(paddle) {

    if (this.x - this.radius < paddle.x + paddle.w &&

      this.x + this.radius > paddle.x &&

      this.y - this.radius < paddle.y + paddle.h &&

      this.y + this.radius > paddle.y) {

      this.xSpeed *= -1;

    }

  }

}

function mostrandotela() {
  fill(255);
  textAlign(CENTER);
  textSize(30);
  text("Ping-Pong JS", width / 2, height / 2 - 20);

  textSize(18);
  text("Pressione ENTER para começar", width / 2, height / 2 + 20);

  textSize(10);
  text("Pressione R para tela inicial", width / 2, height / 2 + 40);

  textSize(10)
  text("Feito por Ry4nDi4s", width / 2, height / 2 + 190);
}

function keyPressed() {

  if (keyCode === UP_ARROW) {

    rightPaddle.ySpeed = -10;

  } else if (keyCode === DOWN_ARROW) {

    rightPaddle.ySpeed = 10;

  }

  if (key === 'w') {

    leftPaddle.ySpeed = -10;

  } else if (key === 's') {

    leftPaddle.ySpeed = 10;

  }
}

function keyReleased() {

  if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) {

    rightPaddle.ySpeed = 0;

  }

  if (key === 'w' || key === 's') {

    leftPaddle.ySpeed = 0;

  }

  if (keyCode === ENTER) {
    telainicial = true;
  }

  if (key === 'r') {
    telainicial = false;
    leftScore = 0;
    rightScore = 0;
  }

}