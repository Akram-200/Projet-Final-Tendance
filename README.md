# Portfolio Projet Final

Projet full stack réalisé avec :

React  
Tailwind CSS  
Node.js et Express  
Socket.IO  
WebRTC  
SQLite  
JWT  
Docker  

---

## Déploiement en ligne

Frontend :  
https://projet-final-tendance.vercel.app  

Backend :  
https://portfolio-projet-server0.onrender.com  

Swagger :  
https://portfolio-projet-server0.onrender.com/api/docs  

Health check :  
https://portfolio-projet-server0.onrender.com/health  

---

## Lancer le projet en local

Cloner le projet :

git clone https://github.com/Akram-200/Projet-Final-Tendance

Puis :

cd Projet-Final-Tendance

Lancer avec Docker :

docker-compose up --build

Frontend : http://localhost:5173  
Backend : http://localhost:5000  

---

## Compte admin

email : admin@example.com  
password : admin123  

---

## Fonctionnalités

Portfolio professionnel avec sections :
Accueil  
À propos  
Compétences  
Projets  
Expérience  
Contact  

Chargement dynamique des données via API REST  

API sécurisée avec JWT  

Chat en temps réel avec :
pseudo utilisateur  
messages en direct  
nombre d’utilisateurs connectés  
indicateur de frappe  

Appel vidéo WebRTC avec :
caméra et micro  
flux local et distant  
mute  
désactivation caméra  
fin d’appel  

Documentation API avec Swagger  

---

## Tester le projet

### Tester l’API

Ouvrir :

/health → vérifier que le serveur fonctionne  

/api/projects → voir les projets  

/api/docs → documentation Swagger  

---

### Tester le chat

Ouvrir deux onglets du site  

Entrer deux pseudos  

Envoyer des messages  

---

### Tester la vidéo

Ouvrir deux onglets  

Entrer la même room  

Cliquer sur démarrer  

Autoriser caméra et micro  

---

## Variables d’environnement

### Frontend (Vercel)

VITE_API_URL  
VITE_SOCKET_URL  

### Backend (Render)

CLIENT_URL  
JWT_SECRET  
ADMIN_EMAIL  
ADMIN_PASSWORD  

---

## Technologies utilisées

Frontend :
React  
Vite  
Tailwind CSS  

Backend :
Node.js  
Express  

Temps réel :
Socket.IO  

Vidéo :
WebRTC  

Base de données :
SQLite  

Authentification :
JWT  

Conteneurisation :
Docker  

---

## Présentation

Ce projet démontre :

la création d’un frontend moderne avec React  
la mise en place d’une API REST avec Express  
l’utilisation de Socket.IO pour le temps réel  
l’utilisation de WebRTC pour la vidéo  
la sécurisation avec JWT  
le déploiement avec Vercel et Render  
l’utilisation de Docker pour simplifier l’exécution  

---

## Auteur

Akram Naamane
