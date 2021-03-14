class FlexDrag {
    on_dragover(ev) {
        console.log(ev);
        ev.preventDefault();
    }

    hook_elements() {
        var elements = document.querySelectorAll(".fdrag-container");

        elements.forEach((v) => {
            v.addEventListener("dragover", this.on_dragover)
        });
    }

    constructor() {
        console.log("test");
        this.hook_elements();
    }
}

var flexdrag = new FlexDrag();

export default flexdrag;
