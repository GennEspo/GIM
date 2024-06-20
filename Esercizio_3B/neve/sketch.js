let snowflakes = [];
let snowLayer = []; // Array per gestire lo strato di neve visibile
let snowLayerHeight = 0; // Altezza iniziale dello strato di neve
let snowLayerIncrement = 0.5; // Incremento più lento dell'altezza dello strato di neve
let minSpeed = 2.5; // Velocità minima di caduta
let maxSpeed = 5; // Velocità massima di caduta
let snowing = false; // Flag per gestire l'accumulo dello strato di neve

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke(); // Nessun contorno per i cerchi
    frameRate(30); // Riduciamo il frame rate per rendere il movimento più discontinuo

    // Creiamo inizialmente 200 fiocchi di neve con posizioni casuali
    for (let i = 0; i < 400; i++) {
        snowflakes.push(createSnowflake());
    }
}

function draw() {
    background(0); // Sfondo nero per contrasto

    // Disegna e aggiorna la posizione di ogni fiocco di neve
    for (let i = snowflakes.length - 1; i >= 0; i--) {
        let flake = snowflakes[i];
        fill(255, flake.alpha); // Opacità dinamica per un effetto di dissolvenza
        ellipse(flake.x, flake.y, flake.size); // Disegna un cerchio per il fiocco di neve
        flake.y += flake.speed; // Aggiorna la posizione verticale per il movimento di caduta
        flake.alpha -= 0.3; // Riduce gradualmente l'opacità per simulare la dissolvenza più lentamente

        // Se l'opacità è troppo bassa o il fiocco è fuori schermo, rimuovilo dall'array
        if (flake.alpha <= 0 || flake.y > height) {
            snowflakes.splice(i, 1); // Rimuove il fiocco di neve dall'array
        } else if (!snowing && flake.y >= height - flake.size) {
            // Quando il primo fiocco raggiunge il margine inferiore, inizia ad accumulare lo strato di neve
            snowing = true;
        }
    }

    // Aggiungi un nuovo fiocco di neve ogni 0.5 secondi finché non raggiungiamo il numero desiderato
    if (frameCount % 15 === 0 && snowflakes.length < 400) {
        snowflakes.push(createSnowflake());
    }

    // Disegna lo strato di neve visibile
    if (snowing) {
        snowLayerHeight += snowLayerIncrement; // Aumenta l'altezza dello strato di neve

        // Se l'altezza dello strato di neve supera l'altezza della finestra, riempila completamente
        if (snowLayerHeight > height) {
            snowLayerHeight = height;
        }

        snowLayer.push({
            x: 0,
            y: height - snowLayerHeight,
            size: width // Larghezza dello strato di neve pari alla larghezza della finestra
        });

        // Disegna lo strato di neve
        for (let flake of snowLayer) {
            fill(255);
            rect(flake.x, flake.y, flake.size, flake.size); // Disegna un rettangolo per lo strato di neve
        }
    }
}

function createSnowflake() {
    return {
        x: random(width), // Posizione orizzontale casuale
        y: random(-height, 0), // Posizione verticale sopra la finestra
        size: random(8, 20), // Dimensione casuale del fiocco di neve
        speed: random(minSpeed, maxSpeed), // Velocità casuale di caduta del fiocco di neve
        alpha: random(180, 255) // Opacità casuale iniziale
    };
}
