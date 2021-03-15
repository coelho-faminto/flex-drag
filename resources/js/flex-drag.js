class FlexDrag {
    on_dragover(ev) {
        ev.preventDefault();

        ev.target.style.outline = "3px dashed black";
        ev.target.style.outlineOffset = "6px";

        const elRect = ev.target.getBoundingClientRect();

        this.clear_canvas();

        if (ev.x > elRect.x + (elRect.width * 2) / 3) {
            this.draw_border(
                elRect.x + (elRect.width * 2) / 3,
                elRect.y,
                elRect.width / 3,
                elRect.height,
                "#0000aa"
            );
        } else if (ev.x > elRect.x + elRect.width / 3) {
            this.draw_border(
                elRect.x + elRect.width / 3,
                elRect.y,
                elRect.width / 3,
                elRect.height,
                "#00aa00"
            );
        } else {
            this.draw_border(
                elRect.x,
                elRect.y,
                elRect.width / 3,
                elRect.height,
                "#aa0000"
            );
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
        this.clear_canvas();

        const element_id = ev.dataTransfer.getData("text");
        const element = document.querySelector(
            `[data-drag-id="${element_id}"]`
        );

        if (element) {
            //ev.target.appendChild(element);

            const elRect = ev.target.getBoundingClientRect();

            console.log(elRect);
            console.log(ev);

            if (ev.x > elRect.x + (elRect.width * 2) / 3) {
                ev.target.insertAdjacentElement("afterend", element);
            } else if (ev.x > elRect.x + elRect.width / 3) {
                ev.target.insertAdjacentElement("beforeend", element);
            } else {
                ev.target.insertAdjacentElement("beforebegin", element);
            }

            ev.stopPropagation();
        }
    }

    toggle_edit_mode() {
        document.body.classList.toggle("fdrag-edit-mode");
    }

    on_keydown(ev) {
        if (ev.ctrlKey && ev.keyCode == 0x51) {
            //console.log("pressed CTRL+Q");
            this.toggle_edit_mode();
        }
    }

    resize_canvas() {
        if (!this.canvas) return;

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    clear_canvas() {
        const ctx = this.canvas ? canvas.getContext("2d") : false;

        if (!ctx) return;

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw_border(x, y, w, h, color) {
        const ctx = this.canvas ? canvas.getContext("2d") : false;

        if (!ctx) return;

        ctx.beginPath();

        ctx.fillStyle = "rgba(0, 0, 0, 0.1666)";
        ctx.fillRect(x + 2, y + 2, w - 4, h - 4);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        //ctx.stroke();
    }

    hook_elements() {
        const canvas = document.querySelector("#canvas");
        this.canvas = canvas ? canvas : false;

        window.addEventListener("resize", this.resize_canvas);
        this.resize_canvas();

        //this.draw_border(10, 10, 100, 200);

        var elements = document.querySelectorAll(".fdrag-box");

        elements.forEach((v) => {
            v.addEventListener("dragover", this.on_dragover.bind(this));
            v.addEventListener("dragleave", this.on_dragleave);
            v.addEventListener("dragenter", this.on_dragenter);
            v.addEventListener("dragstart", this.on_dragstart);
            v.addEventListener("drop", this.on_drop.bind(this));
        });

        document.addEventListener("keydown", this.on_keydown.bind(this));
    }

    constructor() {
        this.hook_elements();
    }
}

var flexdrag = new FlexDrag();

export default flexdrag;
