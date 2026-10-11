# SolvoNord Technologies

Portfolio bilingue français/anglais et assistant guidé de demande de service, réunis sur une seule page.

- Compte GitHub : **SolvoNord**
- Dépôt de destination : **https://github.com/SolvoNord/Technologies**
- Courriel : **solvonord@gmail.com**
- Adresse prévue après activation de GitHub Pages : **https://solvonord.github.io/Technologies/**

Cette adresse n'est pas annoncée comme active avant publication et vérification. Ce dépôt est indépendant de l'ancien portfolio.

## Publication sur GitHub Pages

1. Ajouter les fichiers de ce dossier à la branche `main` du dépôt `SolvoNord/Technologies`, en conservant le dossier `assistant/`.
2. Dans **Settings → Pages**, choisir **Deploy from a branch**, puis **main** et **/(root)**, et enregistrer.
3. Attendre la fin du déploiement indiqué dans **Actions** puis ouvrir l'adresse fournie par GitHub Pages.
4. Vérifier les versions française et anglaise, la navigation, le questionnaire et l'envoi d'une demande fictive depuis le site public.

Le site est entièrement statique, sans compilation ni clé d'API payante. Les chemins relatifs sont compatibles avec le sous-dossier `/Technologies/`.

## Formulaire de test

Le formulaire fourni par le propriétaire est configuré dans `assistant/config.js` : `https://formspree.io/f/mqpelgwz`. `testMode: true` affiche une invitation à utiliser des renseignements fictifs.

Le 11 octobre 2026, Formspree a accepté une demande fictive envoyée depuis la prévisualisation locale, référence **SN-20261011-01**, sans ouverture d'Outlook. La réception en boîte et le destinataire configuré dans Formspree restent à vérifier par le propriétaire. Une confirmation Formspree n'est pas une confirmation de livraison du courriel ou de rendez-vous.

Avant utilisation par les clients : vérifier le destinataire `solvonord@gmail.com`, les protections anti-spam et les limites du service, tester depuis l'adresse publique, puis passer `testMode` à `false` lorsque la réception est confirmée.

« Envoyer directement » transmet le résumé édité et le consentement à Formspree. « Ouvrir ma messagerie » prépare un courriel; le visiteur doit lui-même cliquer sur Envoyer dans sa messagerie. Un lien `mailto:` n'envoie pas de message depuis le site.

## Confidentialité et fonctionnement

Sept parcours : dépannage TI/réseau, Wi-Fi, câblage, imprimante, sécurité, devis et autre. Questions conditionnelles, validation, résumé modifiable, consentement avant envoi et version mobile.

Les réponses restent en mémoire dans la page jusqu'à l'envoi. Aucun stockage persistant, cookie de suivi ou outil d'analyse n'est ajouté. Ne jamais demander de mots de passe, codes MFA, clés d'accès ou informations sensibles. Les photos sélectionnées sont uniquement des aperçus locaux : elles ne sont ni téléversées à Formspree ni jointes automatiquement au courriel.

Le formulaire applique un champ piège, un délai minimal et une limitation des envois répétés. Les protections du service Formspree restent nécessaires; les contrôles du navigateur ne constituent pas une protection serveur.

## Modifier le contenu

- `index.html` : structure et métadonnées de la page.
- `site.js` : textes du portfolio FR/EN.
- `site.css` : apparence du portfolio.
- `assistant/content.js` : questions, messages et traductions.
- `assistant/app.js` : questionnaire, validation et envoi.
- `assistant/config.js` : identifiant public Formspree, courriel et bandeau de test; ne jamais y ajouter de secret.

`assistant/index.html` et les fichiers `widget*` fournissent aussi des présentations facultatives du même questionnaire. Le portfolio principal contient déjà le formulaire complet.

## English

A bilingual portfolio and guided service request form for SolvoNord Technologies. Publish the contents of this folder to the `main` branch of **SolvoNord/Technologies**, then enable GitHub Pages from `main` / root. The intended website address is **https://solvonord.github.io/Technologies/**; verify deployment before sharing it as a live site.

The owner's test Formspree endpoint is already configured. One local test was accepted, reference **SN-20261011-01**; inbox delivery still needs owner verification. Keep test mode enabled until delivery is confirmed. The email-app option only prepares a message. Photos remain local and are not attached automatically.
