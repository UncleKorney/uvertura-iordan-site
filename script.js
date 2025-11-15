window.onload = () => {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let stars = [];
    for (let i = 0; i < 150; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2 + 1,
            dx: (Math.random() - 0.5) * 0.5,
            dy: (Math.random() - 0.5) * 0.5
        });
    }

    const audio = document.getElementById('audio');
    let audioCtx, analyser, source, dataArray;

    audio.addEventListener('play', () => {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioCtx.createAnalyser();
            source = audioCtx.createMediaElementSource(audio);
            source.connect(analyser);
            analyser.connect(audioCtx.destination);
            analyser.fftSize = 64;
            dataArray = new Uint8Array(analyser.frequencyBinCount);
        }
    });

    function animate() {
        ctx.fillStyle = 'rgba(10,10,20,0.4)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let avg = 0;
        if (analyser) {
            analyser.getByteFrequencyData(dataArray);
            avg = dataArray.reduce((a,b)=>a+b,0)/dataArray.length;
        }

        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.r + avg/100, 0, Math.PI * 2);
            ctx.fillStyle = `hsl(${avg*2}, 100%, 70%)`;
            ctx.shadowBlur = avg/2;
            ctx.shadowColor = `hsl(${avg*2}, 100%, 50%)`;
            ctx.fill();

            star.x += star.dx;
            star.y += star.dy;

            if (star.x < 0 || star.x > canvas.width) star.dx *= -1;
            if (star.y < 0 || star.y > canvas.height) star.dy *= -1;
        });

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
};
