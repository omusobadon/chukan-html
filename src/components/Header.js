const headerTemplate = `
  <header>
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light bg-opacity-50 fixed-top">
        <div class="container">
          <img
            class="navbar-brand"
            href="./index.html"
            src="./src/img/オムそば丼キャラ切り抜き.png"
          ></img>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mx-3 gap-4">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  aria-current="page"
                  href="./index.html"
                >
                  ホーム
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link active"
                  aria-current="page"
                  href="./Docs.html"
                >
                  Docs
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link active"
                  aria-current="page"
                  href="./Member.html"
                >
                  メンバー詳細
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <style>
    .headers img{
      max-width: 5%;
      max-height: 5%;
    }
    
    @media screen and (max-width: 976px) {
      .headers img{
        max-width: 13%;
        max-height: 13%;
      }
    }
    </style>    
  </header>
`;

function loadHeader() {
  document.getElementById("header-container").innerHTML = headerTemplate;
}

// ページ読み込み時にヘッダーを挿入
document.addEventListener("DOMContentLoaded", loadHeader);
