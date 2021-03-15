class FlexDrag {
    on_dragover(ev) {
        ev.preventDefault();

        ev.target.style.outline = "3px dashed black";
        ev.target.style.outlineOffset = "6px";

        const elRect = ev.target.getBoundingClientRect();

        if (ev.x > elRect.left + elRect.width / 2) {
            //console.log("insert after...");
        } else {
            //console.log("insert before...");
        }
    }

    on_dragleave(ev) {
        ev.target.style.outline = "0";
    }

    on_dragenter(ev) {
        //
    }

    on_dragstart(ev) {
        ev.dataTransfer.setData(
            "text/plain",
            ev.target.parentNode.parentNode.parentNode.getAttribute(
                "data-drag-id"
            )
        );

        ev.dataTransfer.setDragImage(
            ev.target.parentNode.parentNode.parentNode,
            0,
            0
        );
    }

    on_drop(ev) {
        ev.preventDefault();

        ev.target.style.outline = "0";

        const element_id = ev.dataTransfer.getData("text");
        const element = document.querySelector(
            `[data-drag-id="${element_id}"]`
        );

        if (element) {
            //ev.target.appendChild(element);

            const elRect = ev.target.getBoundingClientRect();

            console.log(elRect);
            console.log(ev.target);

            if (ev.x > elRect.left + elRect.width / 2) {
                ev.target.insertAdjacentElement("beforebegin", element);

                console.log("before..");
            } else {
                ev.target.insertAdjacentElement("afterend", element);

                console.log("after...");
            }
        }
    }

    on_keydown(ev) {
        if (ev.ctrlKey && ev.keyCode == 0x51) {
            //console.log("pressed CTRL+Q");
            document.body.classList.toggle("fdrag-edit-mode");
        }
    }

    hook_elements() {
        var elements = document.querySelectorAll(".fdrag-box");

        elements.forEach((v) => {
            v.addEventListener("dragover", this.on_dragover);
            v.addEventListener("dragleave", this.on_dragleave);
            v.addEventListener("dragenter", this.on_dragenter);
            v.addEventListener("dragstart", this.on_dragstart);
            v.addEventListener("drop", this.on_drop);
        });

        document.addEventListener("keydown", this.on_keydown);
    }

    constructor() {
        console.log("test");
        this.hook_elements();
    }
}

var flexdrag = new FlexDrag();

export default flexdrag;
