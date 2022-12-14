import {
  auth,
  provider
} from './firebase'

function convertToText(res) {
  if (res.ok) {
    return res.text();
  } else {
    throw new Error('Bad Response');
  }
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
  // const pokeBall = document.getElementById('pokeball-animation');
  const firstName = document.getElementById('firstName');
  const logOutUser = document.getElementById('logOut');
  const logOutText = document.getElementById('logOutText');
  const userName = window.localStorage.getItem('user');

  // console.log(userName);
  // We want to display user information only if there is information to display
  if (userName != ' ') {
    firstName.innerHTML = userName;
    logOutText.innerHTML = 'Get out';
    logOutUser.addEventListener('click', logOut);
    document.getElementById('logOut').style.display = 'block';
  } else{
    logOutUser.addEventListener('click', singIn);
    logOutText.innerHTML = 'Get in';
    document.getElementById('logOut').style.display = 'block';
  }

}

const singIn = () => {
  auth.signInWithPopup(provider).then(result => {
    //console.log(result.user.photoURL);
    window.localStorage.setItem('id', result.user.uid);
    window.localStorage.setItem('user', result.user.displayName.split(' ')[0]);
    window.localStorage.setItem('full-Name', result.user.displayName);
    window.localStorage.setItem('photo-prof', result.user.photoURL);

    window.location.href = document.URL;
  })

}

const logOut = () => {
  auth.signOut()
  //window.localStorage.setItem('user', '');
  window.localStorage.setItem('id', ' ');
  window.localStorage.setItem('user', ' ');
  window.localStorage.setItem('full-Name', ' ');
  window.localStorage.setItem('photo-prof', ' ');
  document.getElementById('logOut').style.display = 'none';
  //window.location.href = document.URL;
  window.location.href = 'http://localhost:5173';
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
