var balls = [];
var ballRadius = 35;

document.addEventListener("DOMContentLoaded", function() {
  // DOMContentLoaded内でキャンバスとコンテキストを割り当てます。
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var ballRadius = 35; // 画像の半径
  var balls = []; // ボールを保持する配列
  var ballCount = 3; // 生成するボールの数

  // ボールの画像をロード
  var ballImage = new Image();
  ballImage.src = "./src/img/オムそば丼キャラ切り抜き.png";

  // ボールオブジェクトを生成する関数
  function createBall() {
    return {
      x: Math.random() * (canvas.width - ballRadius * 2) + ballRadius,
      y: Math.random() * (canvas.height - ballRadius * 2) + ballRadius,
      dx: (Math.random() - 0.5) * 4,
      dy: (Math.random() - 0.5) * 4,
      rotation: 0,
    };
  }

  // 複数のボールを初期化
  for (var i = 0; i < ballCount; i++) {
    balls.push(createBall());
  }

  function drawBall(ball) {
    ctx.save(); // 現在のコンテキスト状態を保存
    ctx.translate(ball.x, ball.y); // キャンバスの原点をボールの中心に移動
    ctx.rotate((ball.rotation * Math.PI) / 180); // ボールを回転
    ctx.drawImage(
      ballImage,
      -ballRadius,
      -ballRadius,
      ballRadius * 2,
      ballRadius * 2
    );
    ctx.restore(); // コンテキスト状態を復元
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(function (ball) {
      drawBall(ball);

      if (
        ball.x + ball.dx > canvas.width - ballRadius ||
        ball.x + ball.dx < ballRadius
      ) {
        ball.dx = -ball.dx;
      }
      if (
        ball.y + ball.dy > canvas.height - ballRadius ||
        ball.y + ball.dy < ballRadius
      ) {
        ball.dy = -ball.dy;
      }

      ball.x += ball.dx;
      ball.y += ball.dy;
      ball.rotation += 5; // ここで回転角度を増やす
    });

    requestAnimationFrame(draw);
  }

  draw();
});

// ウィンドウがリサイズされたときにキャンバスのサイズを更新する
window.addEventListener('resize', function() {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // サイズ変更後にボールの位置を再計算
    balls.forEach(function(ball) {
      ball.x = Math.random() * (canvas.width - ballRadius * 2) + ballRadius;
      ball.y = Math.random() * (canvas.height - ballRadius * 2) + ballRadius;
    });
  }
});