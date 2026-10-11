# SolvoNord Technologies

Portfolio bilingue français/anglais et assistant guidé de demande de service, réunis sur une seule page.

- Compte GitHub : **SolvoNord**
- Dépôt de destination : **https://github.com/SolvoNord/Technologies**
- Courriel : **solvonord@gmail.com**
- Site public : **https://solvonord.github.io/Technologies/**

Site publié et vérifié le 11 octobre 2026, en français et en anglais. GitHub Pages utilise la branche `main`, dossier racine, avec HTTPS activé. Ce dépôt est indépendant de l'ancien portfolio.

## Publication sur GitHub Pages

1. Ajouter les fichiers de ce dossier à la branche `main` du dépôt `SolvoNord/Technologies`, en conservant le dossier `assistant/`.
2. Dans **Settings → Pages**, choisir **Deploy from a branch**, puis **main** et **/(root)**, et enregistrer.
3. Attendre la fin du déploiement indiqué dans **Actions** puis ouvrir l'adresse fournie par GitHub Pages.
4. Vérifier les versions française et anglaise, la navigation, le questionnaire et l'envoi d'une demande fictive depuis le site public.

Le site est entièrement statique, sans compilation ni clé d'API payante. Les chemins relatifs sont compatibles avec le sous-dossier `/Technologies/`.

## Envoi des demandes et photos

Le fournisseur actif est **FormSubmit**, avec le destinataire `solvonord@gmail.com`. Le propriétaire a confirmé l'activation du formulaire par courriel. `assistant/config.js` contient `provider: "formsubmit"`, `formsubmitActivated: true` et `testMode: false`.

« Envoyer directement » transmet le résumé édité, le consentement et les images sélectionnées à FormSubmit, sans ouvrir une messagerie. Le site accepte jusqu'à **3 photos JPG, PNG ou WebP**, **5 Mo par fichier** et **9 Mo au total**. Cette limite garde une marge sous la limite de 10 Mo de FormSubmit. Les fichiers sont renommés `photo-1`, `photo-2`, etc., avec leur extension; les noms de fichiers d'origine ne sont pas transmis.

Après une réponse positive du service, le questionnaire est remplacé par une confirmation visible, une référence de demande et le résumé envoyé. Le bouton d'envoi disparaît pour éviter les doublons. Une erreur ou une réponse incertaine conserve les réponses et les photos pour permettre leur récupération. La confirmation du service ne prouve pas la livraison dans la boîte de réception et ne confirme aucun rendez-vous.

« Ouvrir ma messagerie » prépare seulement un courriel; le visiteur doit ajouter ses photos et cliquer sur Envoyer dans sa messagerie. Un lien `mailto:` n'envoie pas de message depuis le site.

L'ancien identifiant Formspree `mqpelgwz` reste disponible comme configuration de secours explicite, sans envoi parallèle ni bascule automatique. Pour l'utiliser, régler `provider: "formspree"`. Avec `formspreeUploads: false`, aucun sélecteur de photos ne promet un téléversement indisponible. Ne régler cette option à `true` que pour un formulaire dont l'abonnement prend réellement en charge les fichiers.

Documentation du fournisseur : [envoi AJAX](https://formsubmit.co/ajax-documentation), [fichiers et configuration](https://formsubmit.co/documentation). Aucun secret ne doit être ajouté au site public.

## Confidentialité et fonctionnement

Sept parcours : dépannage TI/réseau, Wi-Fi, câblage, imprimante, sécurité, devis et autre. Questions conditionnelles, validation, résumé modifiable, consentement avant envoi et version mobile.

Les réponses et photos restent en mémoire dans la page jusqu'à l'envoi direct, qui les transmet au fournisseur indiqué dans la notice de confidentialité. Aucun stockage persistant, cookie de suivi ou outil d'analyse n'est ajouté par le site. Ne jamais demander de mots de passe, codes MFA, clés d'accès ou informations sensibles. Les visiteurs doivent éviter les documents confidentiels et les données sensibles dans leurs photos.

Le formulaire applique un champ piège, un délai minimal, une limitation des envois répétés et un verrou pendant/après l'envoi. Les protections du fournisseur restent nécessaires; les contrôles du navigateur ne constituent pas une protection serveur. Aucune protection du fournisseur n'est désactivée par la configuration.

## Modifier le contenu

- `index.html` : structure et métadonnées de la page.
- `site.js` : textes du portfolio FR/EN.
- `site.css` : apparence du portfolio.
- `assistant/content.js` : questions, messages et traductions.
- `assistant/app.js` : questionnaire, validation et envoi.
- `assistant/config.js` : fournisseur actif, activation, configuration Formspree de secours et bandeau de test; ne jamais y ajouter de secret.

`assistant/index.html` et les fichiers `widget*` fournissent aussi des présentations facultatives du même questionnaire. Le portfolio principal contient déjà le formulaire complet.

## English

A bilingual portfolio and guided service request form for SolvoNord Technologies. The site is published at **https://solvonord.github.io/Technologies/** and was verified on October 11, 2026. GitHub Pages deploys the `main` branch / root of **SolvoNord/Technologies**, with HTTPS enabled.

Direct requests use the owner's activated **FormSubmit** address, `solvonord@gmail.com`, including up to three actual JPG/PNG/WebP files (5 MB each, 9 MB combined). After service acceptance, a dedicated confirmation replaces the form and displays the request reference, uploaded photo count and exact submitted summary. Duplicate submission is blocked. Service acceptance does not guarantee inbox delivery or confirm an appointment. The email-app option only prepares a message; visitors must attach photos themselves when using that option. Formspree remains an explicitly configurable fallback, with uploads disabled unless the selected plan supports them.
