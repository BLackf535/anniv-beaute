# Site anniversaire — pour ma Beauté 🎁

Un site statique (pas besoin de build) avec 6 pages :

| Fichier        | Contenu                                                         |
|----------------|------------------------------------------------------------------|
| `index.html`   | Page principale — message + bouton photos + vidéo + indice 1    |
| `photos.html`  | 20 photos souvenirs qui tombent (accessible depuis l'index)     |
| `page2.html`   | 100 raisons de l'aimer + vidéo + indice 2 (à mettre dans QR #1) |
| `page3.html`   | Message d'amour + vidéo + indice 3 (à mettre dans QR #2)        |
| `page4.html`   | Message sur l'amitié + vidéo + indice 4 (à mettre dans QR #3)   |
| `page5.html`   | Message final façon cahier manuscrit (à mettre dans QR #4)      |

Mot de passe de toutes les pages : **beautejetaime** (modifiable dans `assets/lock.js`, ligne `MOT_DE_PASSE`).
Le mot de passe est redemandé à chaque ouverture ou actualisation d'une page, ainsi qu'après un retour depuis le cache du navigateur.

⚠️ Ce verrouillage est simple (côté navigateur) : il empêche un visiteur normal de lire le contenu sans le mot de passe, mais ce n'est pas un vrai système de sécurité. Largement suffisant pour ce cadeau.

## 1. Avant de déployer — à personnaliser

- **Photos** : dans `index.html` (bouton) et `photos.html`, remplace les liens `https://picsum.photos/seed/...` du tableau `photos` par tes vraies photos. Le plus simple : mets tes 20 images dans le dossier `photos/` (déjà créé) et référence-les comme `photos/photo1.jpg`, `photos/photo2.jpg`, etc.
- **Vidéos** : mets tes fichiers vidéo dans le dossier `videos/` en les nommant `video1.mp4`, `video2.mp4`, `video3.mp4`, `video4.mp4` (ou change les chemins dans chaque page). Compresse-les si possible (HandBrake, ou un site en ligne) pour qu'elles chargent vite en 4G.
- **Indice du restaurant** (`page4.html`) : cherche le commentaire `⚠️ À compléter` et remplace `[nom du restaurant à compléter]` et `[heure à compléter]` une fois que tu as choisi le lieu.
- **Textes** : tous les messages sont modifiables directement dans le HTML (cherche les balises `<p>` dans la section `.texte`) si tu veux ajouter des souvenirs précis à vous deux.

## 2. Déployer gratuitement sur Vercel

**Option la plus simple (sans ligne de commande) :**

1. Va sur [vercel.com](https://vercel.com) et crée un compte gratuit (avec Google ou GitHub).
2. Sur le tableau de bord, clique sur **"Add New" → "Project"**.
3. Choisis **"Deploy without Git"** / glisse-dépose directement le dossier `beaute-anniversaire` complet dans la zone d'import (Vercel propose un glisser-déposer de dossier local).
4. Laisse les réglages par défaut (c'est un site statique, aucun "build command" n'est nécessaire) et clique sur **Deploy**.
5. Après quelques secondes, Vercel te donne une adresse du type `https://beaute-anniversaire.vercel.app`.

**Tes liens seront alors :**
- Page principale (à envoyer directement) : `https://ton-projet.vercel.app/`
- QR code 1 → `https://ton-projet.vercel.app/page2.html`
- QR code 2 → `https://ton-projet.vercel.app/page3.html`
- QR code 3 → `https://ton-projet.vercel.app/page4.html`
- QR code 4 → `https://ton-projet.vercel.app/page5.html`

*(Alternative pour les habitués : héberger le dossier sur un dépôt GitHub, puis "Import Project" depuis GitHub dans Vercel — le déploiement se refait automatiquement à chaque modification.)*

## 3. Générer les QR codes

Une fois le site en ligne, génère un QR code par lien (page2, page3, page4, page5) sur un site gratuit comme [qr-code-generator.com](https://www.qr-code-generator.com) ou [qrcode-monkey.com](https://www.qrcode-monkey.com), télécharge les images, et imprime-les (ou affiche-les) aux 4 endroits physiques concernés.

## 4. Tester avant le jour J

Ouvre chaque page sur ton propre téléphone (en 4G, pas juste en wifi chez toi) pour vérifier que tout se charge bien, que le mot de passe fonctionne, et que les vidéos se lancent correctement.
