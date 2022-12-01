function convertToText(res) {
    if (res.ok) {
        return res.text();
    } else {
        throw new Error('Bad Response');
    }
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
    qs(selector).addEventListener('touchend', (event) => {
        event.preventDefault();
        callback();
    });
    qs(selector).addEventListener('click', callback);
}

export function getParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}

export function renderWithTemplate(template, parent, data, callback) {

    let clone = template.content.cloneNode(true);
    if (callback) {
        clone = callback(clone, data);

    }
    parent.appendChild(clone);

}

export async function loadTemplate(path) {
    const html = await fetch(path).then(convertToText);
    const template = document.createElement('template');
    template.innerHTML = html;
    return template;

}
// load the header and footer
export async function loadHeaderFooter() {
    const header = await loadTemplate('../partials/header.html');
    const footer = await loadTemplate('../partials/footer.html');
    const headerElement = document.getElementById('main-header');
    const footerElement = document.getElementById('main-footer');
    renderWithTemplate(header, headerElement);
    renderWithTemplate(footer, footerElement);
    const pokeBall = document.getElementById('pokeball-animation');
}

export function renderListWithTemplate(template, parent, list, callback) {

    if (!list)
        return false;

    list.forEach(item => {
        const clone = template.content.cloneNode(true);
        const templateWithData = callback(clone, item);
        parent.appendChild(templateWithData);
    })
}