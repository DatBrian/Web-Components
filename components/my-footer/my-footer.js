let pathName = new URL(import.meta.url).pathname;
let name = pathName.split('/').pop().replace(".js", "");

export default class myFooter extends HTMLElement {

    static async components() {
        return await (await fetch(pathName.replace(".js", ".html"))).text();
    }
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        console.log("MyFooter funcionando")
    }

    handleEvent(e) {
        (e.type === "click") ? this.click()
            : undefined;
    }

    click() {
        console.log("click footer")
    }

    connectedCallback() {
        Promise.resolve(myFooter.components()).then(html => {
            this.shadowRoot.innerHTML = html;
            this.myButton = this.shadowRoot.querySelector("button");
            this.myButton.addEventListener("click", this.handleEvent.bind(this));
        })
    }
}

customElements.define(name, myFooter);