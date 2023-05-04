let pathName = new URL(import.meta.url).pathname;
let name = pathName.split('/').pop().replace(".js", "");

export default class myNav extends HTMLElement {

    static async components() {
        return await (await fetch(pathName.replace(".js", ".html"))).text();
    }
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        console.log("myNav funcionando")
    }

    handleEvent(e) {
        (e.type === "click") ? this.click()
            : undefined;
    }

    click() {
        console.log("click nav")
    }

    connectedCallback() {
        Promise.resolve(myNav.components()).then(html => {
            this.shadowRoot.innerHTML = html;
            this.myButton = this.shadowRoot.querySelector("button");
            this.myButton.addEventListener("click", this.handleEvent.bind(this));
        })
    }
}

customElements.define(name, myNav);