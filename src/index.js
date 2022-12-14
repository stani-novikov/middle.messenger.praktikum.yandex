import authorization from "./pages/authorization/authorization.hbs"
import registration from "./pages/registration/registration.hbs"
import {authorization_context} from "./pages/authorization/context"
import {registration_context} from "./pages/registration/context"

const rootElement = document.getElementById('app');
const pagesMap = {
    authorization,
    registration
}
const contextMap = {
    authorization_context,
    registration_context
}

function renderPage(page, context) {
    rootElement.innerHTML = pagesMap[page](context);
    setInputCallback();
}

function setInputCallback() {
    const fields = document.querySelectorAll('.field__input');
    if (fields && fields.length) {
        fields.forEach((el) => {
            el.addEventListener('blur', (e) => {
                if (e.target.value !== '') {
                    e.target.classList.add('field__active')
                } else {
                    e.target.classList.remove('field__active')
                }
            })
        })
    }
}

window.addEventListener('DOMContentLoaded', () => {;
    renderPage('authorization', authorization_context)
})

window.addEventListener('click', (e) => {
    e.preventDefault();
    const path = e.target.pathname;
    if (path !== undefined) {
        const newPath = path.split('/')[1];
        renderPage(newPath, contextMap[`${newPath}_context`]);
    }
})
