const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let shapes = [];

// Частицы
for (let i = 0; i < 250; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        dx: (Math.random() - 0.5) * 1.5,
        dy: (Math.random() - 0.5) * 1.5,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`
    });
}

// Вращающиеся фигуры
for (let i = 0; i < 30; i++) {
    shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 30 + 20,
        angle: Math.random() * Math.PI*2,
        speed: (Math.random()-0.5)*0.02,
        color: `hsla(${Math.random()*360},100%,50%,0.5)`
    });
}

function animate() {
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Частицы
    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        // Соединение линиями
        for (let j = i + 1; j < particles.length; j++) {
            let q = particles[j];
            let dist = Math.hypot(p.x - q.x, p.y - q.y);
            if (dist < 100) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(q.x, q.y);
                ctx.strokeStyle = `hsla(${Math.random()*360},100%,50%,0.2)`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }

    // Фигуры
    shapes.forEach(shape => {
        shape.angle += shape.speed;
        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.angle);
        ctx.fillStyle = shape.color;
        ctx.fillRect(-shape.size/2, -shape.size/2, shape.size, shape.size);
        ctx.restore();
    });

    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
