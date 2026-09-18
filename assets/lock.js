/* =========================================================
   Verrouillage par mot de passe
  Le mot de passe est le même sur toutes les pages. Il est demandé
  à chaque ouverture d'une page protégée.
   ========================================================= */
(function(){
  const MOT_DE_PASSE = "beautejetaime";

  function normalise(str){
    return str.trim().toLowerCase();
  }

  function afficherContenu(){
    const verrou = document.getElementById("verrou");
    const contenu = document.getElementById("contenu");
    if(verrou) verrou.classList.add("caché");
    if(contenu) contenu.classList.add("visible");
    document.dispatchEvent(new CustomEvent("beaute:deverrouille"));
  }

  function verrouiller(){
    const verrou = document.getElementById("verrou");
    const contenu = document.getElementById("contenu");
    const input = document.getElementById("verrou-input");
    if(verrou) verrou.classList.remove("caché");
    if(contenu) contenu.classList.remove("visible");
    if(input){
      input.value = "";
      input.focus();
    }
  }

  function initVerrou(){
    const form = document.getElementById("verrou-form");
    const input = document.getElementById("verrou-input");
    const erreur = document.getElementById("verrou-erreur");
    const carte = document.getElementById("verrou-carte");

    if(!form) { afficherContenu(); return; }

    form.addEventListener("submit", function(e){
      e.preventDefault();
      if(normalise(input.value) === normalise(MOT_DE_PASSE)){
        afficherContenu();
      } else {
        erreur.textContent = "Mot de passe incorrect, réessaie \u2764";
        carte.classList.remove("secoue");
        void carte.offsetWidth; // relance l'animation
        carte.classList.add("secoue");
        input.value = "";
        input.focus();
      }
    });
  }

  document.addEventListener("DOMContentLoaded", initVerrou);
  window.addEventListener("pageshow", function(e){
    if(e.persisted) verrouiller();
  });
})();

/* =========================================================
   Modales (vidéo / indice)
   ========================================================= */
function ouvrirModale(id){
  const voile = document.getElementById(id);
  if(voile) voile.classList.add("ouvert");
  const video = voile ? voile.querySelector("video") : null;
  if(video){
    video.currentTime = 0;
    video.play().catch(function(){ /* lecture auto bloquée, l'utilisatrice lancera manuellement */ });
  }
}

function fermerModale(id){
  const voile = document.getElementById(id);
  if(voile) voile.classList.remove("ouvert");
  const video = voile ? voile.querySelector("video") : null;
  if(video) video.pause();
}

document.addEventListener("click", function(e){
  const voileClique = e.target.classList && e.target.classList.contains("voile");
  if(voileClique){
    e.target.classList.remove("ouvert");
    const video = e.target.querySelector("video");
    if(video) video.pause();
  }
});
