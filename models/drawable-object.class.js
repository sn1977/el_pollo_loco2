class DrawableObject {
    x = 120;
    y = 50;
    height = 150;
    width = 140;
    img;
    imageCache = {};
    currentImage = 0;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.warn('Error loading img', e);
            console.log('Could not load image', this.img.src);
        }

    }

    drawFrame(ctx) {
        // if (this instanceof Chicken || this instanceof Character || this instanceof ChickenSmall || this instanceof Bottle || this instanceof Coin) {
        //     ctx.beginPath();
        //     ctx.lineWidth = '5';
        //     ctx.strokeStyle = 'blue';
        //     ctx.rect(this.x, this.y, this.width, this.height);
        //     ctx.stroke();
        // }
        if (this instanceof Chicken || this instanceof Character || this instanceof ChickenSmall) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red'; // Andere Farbe für den Offset-Rahmen
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top,
                this.width - this.offset.right - this.offset.left,
                this.height - this.offset.bottom - this.offset.top);
            ctx.stroke();
        }
    }
}