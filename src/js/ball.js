function createBall(id) {
  return {
    element: document.getElementById(id),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    dx: (Math.random() - 0.5) * 4,
    dy: (Math.random() - 0.5) * 4,
    rotation: 0,
  };
}

const balls = [createBall("ball1"), createBall("ball2"), createBall("ball3")];

function update() {
  balls.forEach((ball) => {
    if (
      ball.x + ball.dx > window.innerWidth - ball.element.offsetWidth ||
      ball.x + ball.dx < 0
    ) {
      ball.dx = -ball.dx;
    }
    if (
      ball.y + ball.dy > window.innerHeight - ball.element.offsetHeight ||
      ball.y + ball.dy < 0
    ) {
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
