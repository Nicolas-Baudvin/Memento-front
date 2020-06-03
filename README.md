# Projet Memento

Memento est une application web dont le but est de pouvoir créer des listes de tâches et de les trier comme bon vous semble.
Vous pouvez y inviter vos amis et ainsi partager en temps réel votre tableau de listes.

 1. **But du projet**

J'ai créer ce projet dans le but de monter en compétences sur les technologies citées ci-dessous.
Le site sera en ligne une fois les dernières features sorties (voir [Kanban](#checklist))

 2. **Technologies utilisées**

**Front-end** : REACT.JS - Redux - WEBPACK - Jest/Enzyme - Socket.io

**Back-end** : Node.js - Express.js - MongoDB - Mongoose - Socket.io - Jest

 3. **MVP**

    Voici une liste non exhaustive des fonctionnalités prévues pour la release

    | Fonctionnalité                                                   | Implémentée ?   |
    | ---------------------------------------------------------------- | --------------- |
    | Création d'un tableau de listes                                  | ✔️               |
    | Création de listes                                               | ✔️               |
    | Création de tâches                                               | ✔️               |
    | Attacher un label à une tâche                                    | ✔️               |
    | Modifier/Supprimer le nom d'une liste, d'une tâche, d'un tableau | ✔️               |
    | Système de Drag And Drop pour les listes et les tâches           | ✔️               |
    | Partage de l'état du tableau en temps réel                       | ✔️               |
    | Affichage des membres connectés au tableau                       | ✔️               |
    | Historique des actions effectuées sur le tableau                 | ✔️               |
    | Ajout au favori d'un tableau                                     | ✔️               |
    | Assignation de tâche                                             | ✔️               |
    | Discussion instantanée dans chaque tableau                       | ✔️               |
    | Invitation d'amis à rejoindre son tableau                        | ✔️               |
    | Cryptage des données envoyées entre membres                      | ✔️               |
    | Système de droits                                                | en cours        |
    | Site Responsive                                                  | en cours        |
    | Vrai page d'accueil                                              | en cours (v2 ?) |
    | Connexion avec facebook ou Google                                | en cours (v2 ?) |

 4. **Comment faire tourner le projet chez vous**

    Vous devez tout d'abord posséder [git](https://git-scm.com/) sur votre pc.

    Ces commandes ci dessous sont à rentrer dans la CLI et vous permettront d'importer mes deux projets dans deux dossiers nommés "Memento-back" et "Memento-front".
    ```bash
    git clone https://github.com/Nicolas-Baudvin/Memento-back.git && git clone https://github.com/Nicolas-Baudvin/Memento-back.git
     ```
    Déplacez vous dans les dossiers correspondant, puis on allume tout ! :)
    ```bash
    cd Memento-front && npm start
    ```
    ```bash
    cd Memento-back && npm start
    ```
    Une page internet devrait s'ouvrir directement sur le projet. Si ce n'est pas le cas, ouvrez votre navigateur et rentrez dans la barre d'addresse "localhost:3000"

    Il vous faut ensuite un compte MongoDB Atlas pour pouvoir faire fonctionner le back correctement. En effet, sans base de données, vous remarquerez que l'inscription ne fonctionnera pas ¯\_(ツ)_/¯

    Je vous laisse suivre la très pratique documentation MongoDB sur [leur site](https://www.mongodb.com/cloud/atlas)

    Une fois fait, vous devrez créer une fichier .env à la racine de chaque répertoire. Comme je suis grave sympa, je vous ai fais un petit tableau tout prêt, vous n'aurez qu'à copier chaque champs sur le bon répertoire.

    **Répertoire Front**

        API_URL="http://localhost:5000/api/"
        LOGIN_API_URL="http://localhost:5000/api/auth/login/"
        SIGNUP_API_URL="http://localhost:5000/api/auth/signup/"
        CONTACT_API_URL="http://localhost:5000/api/contact/send/"
        CREATE_NEW_TAB_URL="http://localhost:5000/api/tab/create/"
        SECRET_CRYPTO_KEY="CLE_SUPER_SECURE"
        DELETE_TAB_URL="http://localhost:5000/api/tab/delete/"
        UPDATE_USERNAME_API="http://localhost:5000/api/auth/update-username/"
        UPDATE_EMAIL_API="http://localhost:5000/api/auth/update-email/"
        UPDATE_PASSWORD_API="http://localhost:5000/api/auth/update-password/"
        FORGOT_PASSWORD_API="http://localhost:5000/api/auth/forgot-password/"
        DELETE_LIST_URL="http://localhost:5000/api/list/delete/"
        SKIP_PREFLIGHT_CHECK=true
        NODE_ENV="development"
    
    **Répertoire back**

        MONGO_CONNECTION_LINK="<lien atlas>"
        SECRET_TOKEN_KEY="ANOTHER_SECURE_KEY"
        SECRET_CRYPTO_KEY="CLE_SUPER_SECURE"

N'oubliez pas de rajouter votre lien donnée par MongoDB Atlas lors de la création de votre cluster à la place de \<lien atlas>

Une fois tout cela fait, vous n'avez plus qu'à relancer les processus en faisant 
```bash
npm start
```
sur chaque répertoire


 1. **Liens supplémentaires**

[Le Github Back](https://github.com/Nicolas-Baudvin/Memento-back)

[Le Kanban](https://github.com/users/Nicolas-Baudvin/projects/2)

[Mon Linkedin](https://www.linkedin.com/in/nicolas-baudvin/)

