/* =========================================================
   Paillettes dorées — fond animé discret sur canvas
   ========================================================= */
(function(){
  function demarrer(){
    const canvas = document.getElementById("paillettes");
    if(!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, particules;

    const prefereMoinsAnim = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function taille(){
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function creerParticules(){
      const nombre = Math.max(30, Math.min(70, Math.floor((w * h) / 26000)));
      particules = Array.from({length: nombre}, function(){
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.6 + 0.4,
          baseAlpha: Math.random() * 0.5 + 0.15,
          phase: Math.random() * Math.PI * 2,
          vitesseScintillement: Math.random() * 0.02 + 0.008,
          vy: -(Math.random() * 0.12 + 0.03),
          vx: (Math.random() - 0.5) * 0.06
        };
      });
    }

    function dessiner(t){
      ctx.clearRect(0, 0, w, h);
      particules.forEach(function(p){
        const alpha = p.baseAlpha * (0.5 + 0.5 * Math.sin(t * p.vitesseScintillement + p.phase));
        ctx.beginPath();
        ctx.fillStyle = "rgba(212,175,106," + alpha.toFixed(3) + ")";
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        p.y += p.vy;
        p.x += p.vx;
        if(p.y < -5){ p.y = h + 5; p.x = Math.random() * w; }
        if(p.x < -5) p.x = w + 5;
        if(p.x > w + 5) p.x = -5;
      });
      if(!prefereMoinsAnim) requestAnimationFrame(dessiner);
    }

    taille();
    creerParticules();
    window.addEventListener("resize", function(){ taille(); creerParticules(); });

    if(prefereMoinsAnim){
      dessiner(0);
    } else {
      requestAnimationFrame(dessiner);
    }
  }

  document.addEventListener("DOMContentLoaded", demarrer);

  /* Petite explosion de confettis dorés, déclenchée une fois
     au déverrouillage d'une page (moment ponctuel et orchestré) */
  window.explosionConfettis = function(){
    const canvas = document.getElementById("paillettes");
    if(!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width, h = canvas.height;
    const couleurs = ["#d4af6a", "#f2d9a8", "#e3b6c2", "#f6ecd9"];
    const confettis = Array.from({length: 60}, function(){
      return {
        x: w/2 + (Math.random()-0.5) * 60,
        y: h * 0.25,
        vx: (Math.random()-0.5) * 6,
        vy: Math.random() * -6 - 2,
        g: 0.15 + Math.random() * 0.08,
        taille: Math.random() * 4 + 2,
        couleur: couleurs[Math.floor(Math.random()*couleurs.length)],
        vie: 90 + Math.random() * 30
      };
    });

    function anime(){
      confettis.forEach(function(c){
        c.x += c.vx;
        c.y += c.vy;
        c.vy += c.g;
        c.vie -= 1;
        if(c.vie <= 0) return;
        ctx.globalAlpha = Math.max(c.vie / 100, 0);
        ctx.fillStyle = c.couleur;
        ctx.fillRect(c.x, c.y, c.taille, c.taille);
      });
      ctx.globalAlpha = 1;
      if(confettis.some(function(c){ return c.vie > 0; })){
        requestAnimationFrame(anime);
      }
    }
    anime();
  };
})();
