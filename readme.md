# Projet So Pekocko

date de début: 04/02/2021

## Projet 6 du parcours développeur web d'Openclassrooms

### Objectif: Construisez une API sécurisée pour une application d'avis gastronomiques

Créer **l'API back-end** de l'application web de So Pekocko, une entreprise qui fabrique des sauces piquantes. L'application web permet aux utilisateurs d'ajouter leurs sauces préférées et de liker ou disliker les sauces proposées par les autres.

L'API doit pouvoir communiquer avec la partie front-end disponible ici : https://github.com/OpenClassrooms-Student-Center/dwj-projet6
qui peut être clonée et installée en local avec node.js et npm. (pour installer cette partie utiliser les commandes `npm install` puis `npm install node-sass` et lancer l'application avec la commande `ng server` et ouvrir Http://localhost/4200 sur la navigateur)

![Screenshot](readme/sopekocko.png)

### Fonctionnement:

Cet API fonctionne sur le principe d'une **APIrest** et met en place une logique **CRUD**, (Create, Read, Update, Delete) en fonction des autorisations.

L'API est codée en _Javascript_, elle est réalisée en utilisant un _server NodeJS_ et le _framework Express_ pour la création de l'application. La base de données est hébergé par _MongoDB Atlas_ et est gérée via l'interface _Mongoose_.

L'API utilise des pratiques de **code sécurisé** et respecte le RGPD et les standards OWASP en ayant recours aux:

- Chiffrement des mots de passe dans la base de données avec l'algorithme _bcrypt_ et hashage des adresses email
- Principe de pseudonymisation: un id est attribué à chaque utilisateur et seul l'adresse email des utilisateurs est connue (aucun nom, adresse, date de naissance... sont stockés dans la base de donnée)
- Base de données sécurisée grâce au service MongoDB Atlas
- Authentification par jeton requise pour toute action, les jetons sont générés par la technologie _JsonWebToken_

### Utilisation:

1. Cloner le répertoire
2. Installer l'API avec la commande `npm install`
3. Lancer l'API avec la commande `node server` ou `npm start` (l'API se lance à l'addresse: Http://localhost/3000)
4. Une fois la partie front-end lancée, rendez-vous sur Http://localhost/4200 pour intéragir avec le backend.

Si vous souhaitez intéragir avec l'API autrement qu'avec la partie front-end existante, voici la documentation des différentes requêtes possibles : [GuidelinesAPI.pdf](readme/GuidelinesAPI.pdf)

### Exemple d'utilisation:

<p align="center"> 
Aperçu de la page d'accueil après ajout de 3 sauces par les utilisateurs:
    <img src="readme/accueil.png"/> 
    Aperçu de la page d'une sauce ajouté par l'utilisateur connecté:
    <img src="readme/Sauce.png"/> 
</p>
