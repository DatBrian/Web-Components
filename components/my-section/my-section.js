let pathName = new URL(import.meta.url).pathname;
let name = pathName.split('/').pop().replace(".js", "");

export default class mySection extends HTMLElement {

    static async components() {
        return await (await fetch(pathName.replace(".js", ".html"))).text();
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        console.log("MySection funcionando")
    }

    handleEvent(e) {
        (e.type === "click") ? this.click()
            : undefined;
    }

    click() {
        console.log("click section")
    }

    connectedCallback() {
        Promise.resolve(mySection.components()).then(html => {
            this.shadowRoot.innerHTML = html;
            this.myButton = this.shadowRoot.querySelector("button");
            this.myButton.addEventListener("click", this.handleEvent.bind(this));
        })
    }

}

customElements.define(name, mySection);