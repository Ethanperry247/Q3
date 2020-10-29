
class Textview extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // const infoBar = document.createElement("div"); // 
        // infoBar.classList.add("banner");
        // this.appendChild()
        this.style.gridColumn = "2 / 3";
        this.style.gridRow = "1 / 2";
        this.innerHTML = `
        <div class="banner">
            <p>Information</p>
            <p>Other Info</p>
        </div>
        <div class="divider"></div>`;
    }

    createChart() {

    }

    get value() {
        return this.getAttribute('value');
    }
    
    set value(newValue) {
        this.setAttribute('value', newValue);
    }
}

window.customElements.define('text-view', Textview);