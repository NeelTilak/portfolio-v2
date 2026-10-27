/**
 * Neural Network Constellation Canvas Background
 * Interactive particle graph simulating neural pathways and synapses
 */

(function () {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 140 };

  const PARTICLE_COUNT = 55;
  const CONNECTION_DISTANCE = 130;
  const PARTICLE_COLOR = 'rgba(139, 92, 246, 0.7)';
  const LINE_COLOR = '139, 92, 246';
  const CYAN_COLOR = '6, 182, 212';

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1.2;
      this.isCyan = Math.random() > 0.75;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const directionX = (dx / dist) * force * 1.5;
          const directionY = (dy / dist) * force * 1.5;
          this.x -= directionX;
          this.y -= directionY;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.isCyan ? 'rgba(6, 182, 212, 0.85)' : PARTICLE_COLOR;
      ctx.shadowBlur = 6;
      ctx.shadowColor = this.isCyan ? 'rgba(6, 182, 212, 0.6)' : 'rgba(139, 92, 246, 0.6)';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function init() {
    resize();
    particles = [];
    const count = width < 768 ? 32 : PARTICLE_COUNT;
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECTION_DISTANCE) {
          const alpha = 1 - dist / CONNECTION_DISTANCE;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          const color = particles[a].isCyan || particles[b].isCyan ? CYAN_COLOR : LINE_COLOR;
          ctx.strokeStyle = `rgba(${color}, ${alpha * 0.22})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    connectParticles();

    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    resize();
    init();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  init();
  animate();
})();
