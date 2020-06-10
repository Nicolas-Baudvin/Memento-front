# Changelogs

## V1.3.2 mise à jour déployée le 10/06/2020 à 14h35 ✔️

### **Correctifs UI/UX**

- Le sous titre sur la page de connexion pouvait être coupé en deux sur certains écrans de smartphone.
- Les icones de l'entête sont désormais plus petites sur les plus petits écrans.
- Le bouton de fermeture était mal placé sur certains écrans dans la modale "Mon Compte"
- Le lien de retour était mal placé sur certains écrans sur la page Mentions Légales

## V1.3.1 mise à jour déployée le 10/06/2020 à 13h34 ✔️

### **Bugs Fix**

- Lors d'un glissé déposé des tâches, leurs déplacements pouvaient être désynchronisés

## V1.3.0 mise à jour déployée ✔️

### **Nouvelles Fonctionnalités**

- Page changelogs.
- Un pieds de page contenant un lien vers les changelogs et les informations de contact.
- Page Mentions Légales

### **Corrections UI/UX**

- Suppression de l'icone du formulaire d'ajout de liste pour un texte plus conçis.
- Un tooltip indique désormais plus clairement qu'une intéraction est possible sur le titre d'une liste.
- Ajout d'une icone de chargement sur les boutons pour les processus un peu long (envoie d'email)
- Certains formulaires de mot de passe affichaient ces derniers en clair.
- Certains messages d'erreur n'apportaient pas beaucoup d'aide...
- Un effet visuel montre qu'il est possible d'intérargir avec les listes et les tâches

## V1.2.0 mise à jour déployée ✔️

### **Bugs Fix**

- Erreur 503 sur le menu des tableaux à cause d'un timeout serveur
- Correction orthographique
- Le liens d'invitation était corrompu et nécessitait un refresh manuel
- Les favoris ne se mettaient pas correctement à jour dans le menu des tableaux
- Les toolstips de l'entête étaient anormalement animés, ce qui retardait l'information.
- Listes fantômes quand on navigue entre plusieurs tableaux
- Tables fantômes quand on switch de compte
- Timeout serveur lors d'une mise à jour du pseudo si le pseudo est déjà utilisé.
- Lors de la confirmation de la suppression de tab, il était affiché "Cancel" au lieu de "Annuler"
- Les mots long sont désormais coupés dans le chat
- En modifiant le nom des tâches, on ne pouvait excéder 25 caractères
- Il suffit désormais du survoler le bouton d'aide pour voir apparaître le tooltip
- Lors d'un glissé déposé d'une tâche ou d'une liste, il était possible sous certaines conditions que cette action s'annulait.

### **Nouvelles Fonctionnalités**

- Page de chargement avant d'accéder au workspace

## V1.1.1 mise à jour déployée ✔️

### **Bugs Fix**

- Erreur critique sur la page de l'espace de travail

## V1.1.0 mise à jour déployée ✔️

### **Bugs Fix**

- Système de favoris : Les tableaux sont désormais correctement ajouté comme favori et correctement supprimé.
- Tâches : Les mots reviennent à la ligne s'ils sont trop long et ne dépassent plus de la tâche.
- Listes : Les Titres ont désormais la bonne taille.
- Formulaire changement de nom de listes : Les formulaires ont désormais la bonne taille.
- Formulaire ajout de liste : Le formulaire a désormais la bonne taille en résolution 1920 * 1080 pixels.
- Les liens et boutons inutiles ont été supprimés du site.
- En-tête : Les boutons sont désormais plus gros et possèdent un tooltip.
- Liens d'invitation : Retrait de l'icône.
- Correction orthographique.
- Menu : La description des actions ne dépassent pas la largeur du conteneur parent.
- Menu : La lettre intitiale dans la bulle est désormais correctement centrée.
- Menu : Remplacement du bouton de dépliement du menu par un autre plus accessible.
- Menu : déploiement du menu plus propre.

### **Nouvelles Fonctionnalités**

- Oubli de mot de passe.
- Changement d'email.
- Site Responsive

### **Bugs Connus**

- Erreur 503 sur la récupération des favoris sur le menu des tableaux.
- Les favoris du menu des tableaux ne se suppriment pas sans refresh manuel
- Erreur page blanche dans l'espace de travail
- Liens d'invitation invalide (nécessite un refresh manuel)
- Tooltip animé dans le header.
