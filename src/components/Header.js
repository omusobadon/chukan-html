const headerTemplate = `
  <header>
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light bg-opacity-50 fixed-top">
        <div class="container">
          <a class="navbar-brand" href="./index.html"></a>
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
            <ul class="navbar-nav gap-4">
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
  </header>
`;

function loadHeader() {
  document.getElementById("header-container").innerHTML = headerTemplate;
}

// ページ読み込み時にヘッダーを挿入
document.addEventListener("DOMContentLoaded", loadHeader);
