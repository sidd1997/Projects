class SketchPad {
    constructor(container, size = 400) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.style = `
            background-color:white;
            box-shadow: 0px 0px 10px 2px black;
        `;
        container.appendChild(this.canvas);
        const lineBreak = document.createElement("br");
        container.appendChild(lineBreak);
        container.appendChild(lineBreak);
        this.undoButton = document.createElement("button");
        this.undoButton.innerHTML = "Undo";
        this.undoButton.disabled = true;
        container.appendChild(this.undoButton);
        this.reDrawButton = document.createElement("button");
        this.reDrawButton.innerHTML = "Re-Draw";
        this.reDrawButton.disabled = true;
        container.appendChild(this.reDrawButton);
        this.ctx = this.canvas.getContext("2d");
        this.paths = [];
        this.isDrawing = false;
        this.#addEventListeners();
    }

    reset() {
        this.paths = [];
        this.isDrawing = false;
        this.#redraw();
    }

    #addEventListeners() {
        this.canvas.onmousedown = (evt) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouse = this.#getMouse(evt);
            //console.log(mouse);
            this.paths.push([mouse]);
            this.isDrawing = true;
        }
        this.canvas.onmousemove = (evt) => {
            if (this.isDrawing) {
                const mouse = this.#getMouse(evt);
                const lastPath = this.paths[this.paths.length - 1];
                lastPath.push(mouse);
                //console.log(this.path.length);
                this.#redraw()
            }
        }
        document.onmouseup = () => {
            this.isDrawing = false;
        }
        this.canvas.ontouchstart = (evt) => {
            const loc = evt.touches[0];
            this.canvas.onmousedown(loc);
        }
        this.canvas.ontouchmove = (evt) => {
            const loc = evt.touches[0];
            this.canvas.onmousemove(loc);
        }
        document.ontouchend = () => {
            this.canvas.onmouseup();
        }
        this.undoButton.onclick = () => {
            this.paths.pop();
            this.#redraw();
        }
        this.reDrawButton.onclick = () => {
            this.reset()
        }
    }

    #redraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        draw.paths(this.ctx, this.paths);
        if (this.paths.length > 0) {
            this.undoButton.disabled = false;
            this.reDrawButton.disabled = false;
        }
        else {
            this.undoButton.disabled = true;
            this.reDrawButton.disabled = true;
        }
    }

    #getMouse = (evt) => {
        const rect = this.canvas.getBoundingClientRect();
        return [
            Math.round(evt.clientX - rect.left),
            Math.round(evt.clientY - rect.top)
        ];
    }
}