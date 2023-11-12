function createBall(id) {
  const element = document.getElementById(id);
  const ballSize = 80; // CSSで設定されたボールのサイズに合わせて調整
  return {
    element: element,
    x: Math.random() * (window.innerWidth - ballSize),
    y: Math.random() * (window.innerHeight - ballSize),
    dx: (Math.random() - 0.5) * 4,
    dy: (Math.random() - 0.5) * 4,
    rotation: 0,
  };
}


const balls = [createBall("ball1"), createBall("ball2"), createBall("ball3")];

function update() {
  balls.forEach((ball) => {
    const ballWidth = ball.element.offsetWidth;
    const ballHeight = ball.element.offsetHeight;

    if (ball.x + ball.dx > window.innerWidth - ballWidth || ball.x + ball.dx < 0) {
      ball.dx = -ball.dx;
    }
    if (ball.y + ball.dy > window.innerHeight - ballHeight || ball.y + ball.dy < 0) {
      ball.dy = -ball.dy;
    }

    ball.x += ball.dx;
    ball.y += ball.dy;
    ball.rotation += 5;

    ball.element.style.left = ball.x + "px";
    ball.element.style.top = ball.y + "px";
    ball.element.style.transform = `rotate(${ball.rotation}deg)`;
  });

  requestAnimationFrame(update);
}

update();
