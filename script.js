let angle = 0;
let size = 600;
let w = 2;
let h = 2;
let acc = 0;
let acc2 = 0.005;
let scale = size / w;

const arr = [];
const images = [];

function preload() {
    for(let i = 0; i < 4; i++) {
        img = loadImage(`./${i + 1}.jpg`);
        images.push(img);
    }
}

function setup() {
    const canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    canvas.parent("#app");
}

function draw() {
    if(frameCount % 100 === 0) {
        arr.length = 0;

        w = Math.floor(random(2, 4));
        h = w;
        scale = size / w;
        img = images[Math.floor(Math.random() * images.length)];

        for(let i = 0; i < w; i++) {
            for(let j = 0; j < h; j++) {
                let point = {
                    x: scale * i, 
                    y: scale * j, 
                    u: (1 / w) * i, 
                    v: (1 / h) * j,
                    angle: random(-360, 360),
                    acc: random(-10.0, 10.0),
                    acc2: random(-5.0, 5.0)
                };
                arr.push(point);
    
                point = {
                    x: scale * (i + 1), 
                    y: scale * j, 
                    u: (1 / w) * (i + 1), 
                    v: (1 / h) * j,
                    angle: random(-360, 360),
                    acc: random(-10.0, 10.0),
                    acc2: random(-5.0, 5.0)
                }
                arr.push(point);
    
                point = {
                    x: scale * (i + 1), 
                    y: scale * (j + 1), 
                    u: (1 / w) * (i + 1), 
                    v: (1 / h) * (j + 1),
                    angle: random(-360, 360),
                    acc: random(-10.0, 10.0),
                    acc2: random(-5.0, 5.0)
                };
                arr.push(point);
    
                point = {
                    x: scale * i, 
                    y: scale * (j + 1), 
                    u: (1 / w) * i, 
                    v: (1 / h) * (j + 1),
                    angle: random(-360, 360),
                    acc: random(-10.0, 10.0),
                    acc2: random(-5.0, 5.0)
                };
                arr.push(point);
            }
        }
    }

    background(255);
    texture(img);
    textureMode(NORMAL);
    
    // beginShape();
    //     vertex(200 * 0, 200 * 0, 0.0, 0.0);
    //     vertex(200 * 1, 200 * 0, 0.5, 0.0);
    //     vertex(200 * 1, 200 * 1, 0.5, 0.5);
    //     vertex(200 * 0, 200 * 1, 0.0, 0.5);
    // endShape(CLOSE);

    // beginShape();
    //     vertex(200 * 1, 200 * 0, 0.5, 0.0);
    //     vertex(200 * 2, 200 * 0, 1.0, 0.0);
    //     vertex(200 * 2, 200 * 1, 1.0, 0.5);
    //     vertex(200 * 1, 200 * 1, 0.5, 0.5);
    // endShape(CLOSE);

    // beginShape();
    //     vertex(200 * 1, 200 * 1, 0.5, 0.5);
    //     vertex(200 * 2, 200 * 1, 1.0, 0.5);
    //     vertex(200 * 2, 200 * 2, 1.0, 1.0);
    //     vertex(200 * 1, 200 * 2, 0.5, 1.0);
    // endShape(CLOSE);

    // beginShape();
    //     vertex(200 * 0, 200 * 1, 0.0, 0.5);
    //     vertex(200 * 1, 200 * 1, 0.5, 0.5);
    //     vertex(200 * 1, 200 * 2, 0.5, 1.0);
    //     vertex(200 * 0, 200 * 2, 0.0, 1.0);
    // endShape(CLOSE);

    translate(-scale * w / 2, -scale * h / 2);

    // for(let i = 0; i < w; i++) {
    //     for(let j = 0; j < h; j++) {
    //         beginShape();
    //             vertex(
    //                 scale * i, 
    //                 scale * j, 
    //                 (1 / w) * i, (1 / h) * j
    //             );
    //             vertex(
    //                 scale * (i + 1), 
    //                 scale * j, 
    //                 (1 / w) * (i + 1), (1 / h) * j
    //             );
    //             vertex(
    //                 scale * (i + 1), 
    //                 scale * (j + 1), 
    //                 (1 / w) * (i + 1), (1 / h) * (j + 1)
    //             );
    //             vertex(
    //                 scale * i, 
    //                 scale * (j + 1), 
    //                 (1 / w) * i, (1 / h) * (j + 1)
    //             );
    //         endShape();
    //     }
    // }

    for(let i = 0; i < arr.length; i++) {
        if(i + 3 < arr.length) {
            beginShape();
                vertex(arr[i].x, arr[i].y, arr[i].u, arr[i].v);
                vertex(arr[i + 1].x, arr[i + 1].y, arr[i + 1].u, arr[i + 1].v);
                vertex(arr[i + 2].x, arr[i + 2].y, arr[i + 2].u, arr[i + 2].v);
                vertex(arr[i + 3].x, arr[i + 3].y, arr[i + 3].u, arr[i + 3].v);
            endShape(CLOSE);
        }
    }

    for(let i = 0; i < arr.length; i++) {
        arr[i].angle += arr[i].acc;
        arr[i].x += cos(radians(arr[i].angle)) * acc;
        arr[i].y += sin(radians(arr[i].angle)) * acc;
    }

    acc += acc2;
}