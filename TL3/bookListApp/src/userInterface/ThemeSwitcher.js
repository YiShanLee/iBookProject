class ThemeSwitcher {
  coonstructor() {
    this.theme = "default";

    document
    .querySelector("#jumbotron-icon")
    .addEventListener("click", switchTheme);
  }
 

  switchTheme() {
    this.addLoadingScreen();

    setTimeout(() => {
      const $stylesheet = document.querySelector("#stylesheet");
      if (theme === "default") {
        $stylesheet.setAttribute("href", "css/bootstrap.dark.css");
        theme = "dark";
      } else {
        $stylesheet.setAttribute("href", "css/bootstrap.default.css");
        theme = "default";
      }
    }, 1000);
  }

 

  addLoadingScreen() {
    const $loadingScreen = document.createElement("div");
    $loadingScreen.setAttribute(
      "style",
      "height: 100vh; width: 100vw; position: absolute; top: 0; background: white"
    );

    // align spinner horizontal and vertical in center
    $loadingScreen.classList.add(
      "d-flex",
      "justify-content-center",
      "align-items-center"
    );

    $loadingScreen.innerHTML = `
    <div style="width: 200px">
        <div class="spinner-grow" style="width: 150px; height: 150px; color: #78C2AD" role="status">
            
        </div>
    </div>
    `;

    const $body = document.querySelector("body");
    $body.appendChild($loadingScreen);

    // removes loading screen after 3000ms
    setTimeout(() => {
      $loadingScreen.remove();
    }, 3000);
  }


}

export {ThemeSwitcher};