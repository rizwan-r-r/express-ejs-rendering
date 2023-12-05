window.onload = function () {
  const navigationLinks = document.getElementsByTagName("a");
  const navigationLinksCount = navigationLinks.length;

  for (let i = 0; i < navigationLinksCount; i++) {
    const navLink = navigationLinks[i];
    navLink.onclick = function (event) {
      const url = event.target.attributes['href'].nodeValue;
      makeRequestAndUpdate(url);

      event.preventDefault();
    }
  }

  overrideFormSubmit();
}

function overrideFormSubmit() {
  const forms = document.getElementsByTagName("form");
  const formsCount = forms.length;

  for (let i = 0; i < formsCount; i++) {
    const formElement = forms[i];
    formElement.onsubmit = function (event) {
      const url = event.target.attributes['action'].nodeValue;

      const fd = new FormData(event.target);
      const queryParams = new URLSearchParams(fd).toString();

      makeRequestAndUpdate(`${url}?${queryParams}`);

      event.preventDefault();
    };
  }
}

function makeRequestAndUpdate(url) {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", url, true);

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const partialHtmlResponse = this.responseText;

      document.getElementById('main-area').innerHTML = partialHtmlResponse;
      overrideFormSubmit();
    }
  }

  xhr.send();
}
