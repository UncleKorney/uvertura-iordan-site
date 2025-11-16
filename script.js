const canvas = document.getElementById('scene-canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const particles = [];
const particleCount = 120;

class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.size = Math.random() * 3 + 1;
        this.color = `hsl(${Math.random()*360},80%,60%)`;
    }
    update() {
        this.x += this.vx; this.y += this.vy;
        if(this.x>width||this.x<0||this.y>height||this.y<0) this.reset();
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

for(let i=0;i<particleCount;i++) particles.push(new Particle());

function animate(){
    ctx.clearRect(0,0,width,height);

    const gradient = ctx.createLinearGradient(0,0,width,height);
    gradient.addColorStop(0,'#1a1a1a');
    gradient.addColorStop(0.5,'#220044');
    gradient.addColorStop(1,'#330066');
    ctx.fillStyle=gradient;
    ctx.fillRect(0,0,width,height);

    for(let i=0;i<particles.length;i++){
        let p1=particles[i]; p1.update(); p1.draw();
        for(let j=i+1;j<particles.length;j++){
            let p2=particles[j];
            let dx=p1.x-p2.x; let dy=p1.y-p2.y;
            let dist=Math.sqrt(dx*dx+dy*dy);
            if(dist<100){
                ctx.beginPath();
                ctx.strokeStyle=`hsla(${Math.random()*360},80%,60%,0.2)`;
                ctx.moveTo(p1.x,p1.y); ctx.lineTo(p2.x,p2.y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize',()=>{
    width=canvas.width=window.innerWidth;
    height=canvas.height=window.innerHeight;
});

window.addEventListener('mousemove',(e)=>{
    particles.forEach(p=>{
        const dx=Math.abs(p.x-e.clientX);
        const dy=Math.abs(p.y-e.clientY);
        if(dx<100 && dy<100) p.color=`hsl(${Math.random()*360},100%,70%)`;
    });
});
