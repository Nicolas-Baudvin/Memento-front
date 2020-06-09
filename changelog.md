# Changelogs

## V1.2.0 non déployée

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

## V1.1.1

### **Bugs Fix**

- Erreur critique sur la page de l'espace de travail

## V1.1.0

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
