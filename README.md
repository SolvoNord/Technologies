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

Le fournisseur actif est **FormSubmit**, avec le destinataire `solvonord@gmail.com`. Le propriétaire a confirmé l'activation du formulaire et la réception d'une véritable pièce jointe pour le test natif **SN-20261011-1APJE70**, le 11 octobre 2026. `assistant/config.js` contient `provider: "formsubmit"`, `formsubmitActivated: true`, `formsubmitUploadMode: "native"` et `testMode: false`.

Sans photo, « Envoyer ma demande » transmet le résumé édité et le consentement en arrière-plan, sans ouvrir une messagerie. Avec des photos, « Continuer et envoyer avec les photos » utilise un formulaire natif `multipart/form-data` vers `https://formsubmit.co/solvonord@gmail.com` : le visiteur termine la vérification anti-spam FormSubmit, puis revient sur la confirmation SolvoNord. Ne pas envoyer les fichiers au point d'accès `/ajax/` : nos tests ont confirmé l'arrivée du texte sans les pièces jointes avec cette méthode.

Le site accepte jusqu'à **3 photos JPG, PNG ou WebP**, **5 Mo par fichier** et **9 Mo au total**. Cette limite garde une marge sous la limite de 10 Mo de FormSubmit. Les fichiers sont renommés `photo-1`, `photo-2`, etc., avec leur extension; les noms de fichiers d'origine ne sont pas transmis. Le parcours intégré et la version assistant séparée utilisent la même page de retour. Dans un widget, le navigateur ouvre la vérification dans la page entière.

Sans photo, une réponse positive du service remplace le questionnaire par une confirmation visible, une référence de demande et le résumé envoyé. Avec photos, le retour du service ouvre `assistant/thanks.html`, avec la référence et le nombre de fichiers transmis. Aucun bouton ne renvoie la même demande depuis la confirmation. La page de retour exige le jeton de la demande en cours et refuse les références absentes ou périmées après 30 minutes. La confirmation du service ne garantit pas chaque livraison future dans la boîte de réception et ne confirme aucun rendez-vous.

« Ouvrir ma messagerie » prépare seulement un courriel; le visiteur doit ajouter ses photos et cliquer sur Envoyer dans sa messagerie. Un lien `mailto:` n'envoie pas de message depuis le site.

L'ancien identifiant Formspree `mqpelgwz` reste disponible comme configuration de secours explicite, sans envoi parallèle ni bascule automatique. Pour l'utiliser, régler `provider: "formspree"`. Avec `formspreeUploads: false`, aucun sélecteur de photos ne promet un téléversement indisponible. Ne régler cette option à `true` que pour un formulaire dont l'abonnement prend réellement en charge les fichiers.

Documentation du fournisseur : [envoi AJAX](https://formsubmit.co/ajax-documentation), [fichiers et configuration](https://formsubmit.co/documentation). Aucun secret ne doit être ajouté au site public.

## Confidentialité et fonctionnement

Sept parcours : dépannage TI/réseau, Wi-Fi, câblage, imprimante, sécurité, devis et autre. Questions conditionnelles, validation, résumé modifiable, consentement avant envoi et version mobile.

Les réponses et photos restent en mémoire dans la page jusqu'à l'envoi direct, qui les transmet au fournisseur indiqué dans la notice de confidentialité. Pour reconnaître le retour après vérification, `sessionStorage` conserve seulement la référence, un jeton de confirmation, la langue, le nombre de fichiers, l'heure et l'état de la demande. Aucun texte de demande, coordonnée ou fichier n'est enregistré dans ce stockage. Aucun cookie de suivi ou outil d'analyse n'est ajouté par le site. Ne jamais demander de mots de passe, codes MFA, clés d'accès ou informations sensibles. Les visiteurs doivent éviter les documents confidentiels et les données sensibles dans leurs photos.

Le formulaire applique un champ piège, un délai minimal, une limitation des envois répétés et un verrou pendant/après l'envoi. Les protections du fournisseur restent nécessaires; les contrôles du navigateur ne constituent pas une protection serveur. Aucune protection du fournisseur n'est désactivée par la configuration.

## Modifier le contenu

- `index.html` : structure et métadonnées de la page.
- `site.js` : textes du portfolio FR/EN.
- `site.css` : apparence du portfolio.
- `assistant/content.js` : questions, messages et traductions.
- `assistant/app.js` : questionnaire, validation et envoi.
- `assistant/config.js` : fournisseur actif, activation, configuration Formspree de secours et bandeau de test; ne jamais y ajouter de secret.
- `assistant/thanks.html`, `thanks.js`, `thanks.css` : confirmation bilingue après vérification des demandes avec photos.

`assistant/index.html` et les fichiers `widget*` fournissent aussi des présentations facultatives du même questionnaire. Le portfolio principal contient déjà le formulaire complet.

## English

A bilingual portfolio and guided service request form for SolvoNord Technologies. The site is published at **https://solvonord.github.io/Technologies/** and was verified on October 11, 2026. GitHub Pages deploys the `main` branch / root of **SolvoNord/Technologies**, with HTTPS enabled.

Requests use the owner's activated **FormSubmit** address, `solvonord@gmail.com`. Text-only requests keep the on-page AJAX confirmation. Photo requests use the standard native multipart form endpoint, pass through the provider's spam verification and return to the bilingual SolvoNord receipt page. The AJAX endpoint must not be used for files: it acknowledged the request but did not deliver attachments in our tests. The owner confirmed receipt of the native test image **SN-20261011-1APJE70**. Limits: three JPG/PNG/WebP files, 5 MB each and 9 MB combined. Only non-content receipt metadata is stored for the browser session. Service acceptance does not guarantee each future inbox delivery or confirm an appointment. The email-app option requires manually attaching photos. Formspree remains an explicitly configurable fallback.
