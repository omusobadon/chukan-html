function updateImage() {
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var img = document.getElementById('responsive-image');
    
    if (width < 768) {
        img.src = './src/img/オムそば丼キャラ切り抜き.png';
    } else {
        img.src = './src/img/オムそば丼キャラ.png';
    }
}

window.addEventListener('resize', updateImage);
updateImage(); // 初期ロード時にも実行
