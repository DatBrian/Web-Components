let pathName = new URL(import.meta.url).pathname;
let name = pathName.split('/').pop().replace(".js", "");

export default class myHeader extends HTMLElement {

    static async components() {
        return await (await fetch(pathName.replace(".js", ".html"))).text();
    }
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        console.log("MyHeader funcionando")
    }

    handleEvent(e) {
        (e.type === "click") ? this.click()
            : undefined;
    }

    click() {
        console.log("Click Header")
    }

    connectedCallback() {
        Promise.resolve(myHeader.components()).then(html => {
            this.shadowRoot.innerHTML = html;
            this.myButton = this.shadowRoot.querySelector("button");
            this.myButton.addEventListener("click", this.handleEvent.bind(this));
        })
    }
}

customElements.define(name, myHeader);