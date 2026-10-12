# SolvoNord Technologies

Portfolio bilingue français/anglais et assistant guidé de demande de service, réunis sur une seule page.

- Compte GitHub : **SolvoNord**
- Dépôt de destination : **https://github.com/SolvoNord/Technologies**
- Courriel : **solvonord@gmail.com**
- Dénomination de la société confirmée par le propriétaire : **9512-6173 Québec inc.** (distincte d’un NEQ).
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

Le bouton unique « Envoyer ma demande » transmet le résumé édité et le consentement. Sans photo, l'envoi se fait en arrière-plan. Avec des photos, un formulaire natif `multipart/form-data` utilise `https://formsubmit.co/solvonord@gmail.com` : le visiteur termine la vérification anti-spam, puis revient directement au portfolio, section demande, où s'affiche la confirmation. Le formulaire n'affiche aucun détail technique sur ce transport. Ne pas envoyer les fichiers au point d'accès `/ajax/` : nos tests ont confirmé l'arrivée du texte sans les pièces jointes avec cette méthode.

Le site accepte jusqu'à **3 photos JPG, PNG ou WebP**, **5 Mo par fichier** et **9 Mo au total**. Cette limite garde une marge sous la limite de 10 Mo de FormSubmit. Les fichiers sont renommés `photo-1`, `photo-2`, etc., avec leur extension; les noms de fichiers d'origine ne sont pas transmis. Le parcours intégré et la version assistant séparée utilisent la même page de retour. Dans un widget, le navigateur ouvre la vérification dans la page entière.

Une réponse positive remplace le questionnaire par une confirmation visible et une référence de demande sur la même page du portfolio. Le paramètre `_next` pointe explicitement vers `/Technologies/?lang=…&receipt=…#demande`. Aucun bouton ne renvoie la même demande depuis la confirmation. Le retour exige le jeton de la demande en cours et refuse les références absentes ou périmées après 30 minutes. Le résumé envoyé reste consultable pour les envois sans navigation; il n'est pas stocké entre les pages. L'ancienne page `assistant/thanks.html` redirige les anciennes confirmations valides vers le portfolio. La confirmation ne garantit pas chaque livraison future dans la boîte de réception et ne confirme aucun rendez-vous.

Le bouton « Ouvrir ma messagerie » a été supprimé du questionnaire. Le lien de contact par courriel reste disponible à côté du formulaire et dans le pied de page. Copier ou télécharger le résumé reste possible dans la section repliable « Conserver une copie ».

Le seul fournisseur configuré est FormSubmit. L'ancien identifiant Formspree a été retiré; aucun envoi parallèle, lien vers un compte Formspree ni basculement automatique n'est utilisé. Le code conserve la possibilité de configurer explicitement un autre formulaire Formspree à l'avenir.

Documentation du fournisseur : [envoi AJAX](https://formsubmit.co/ajax-documentation), [fichiers et configuration](https://formsubmit.co/documentation). Aucun secret ne doit être ajouté au site public.

## Confidentialité et fonctionnement

Sept parcours : dépannage TI/réseau, Wi-Fi, câblage, imprimante, sécurité, devis et autre. Questions conditionnelles, validation, résumé modifiable, consentement avant envoi et version mobile.

Les réponses et photos restent en mémoire dans la page jusqu'à l'envoi direct, qui les transmet au fournisseur indiqué dans la notice de confidentialité. Pour reconnaître le retour après vérification, `sessionStorage` conserve seulement la référence, un jeton de confirmation, la langue, le nombre de fichiers, l'heure et l'état de la demande. Aucun texte de demande, coordonnée ou fichier n'est enregistré dans ce stockage. Aucun cookie de suivi ou outil d'analyse n'est ajouté par le site. Ne jamais demander de mots de passe, codes MFA, clés d'accès ou informations sensibles. Les visiteurs doivent éviter les documents confidentiels et les données sensibles dans leurs photos.

Le formulaire applique un champ piège, un délai minimal, une limitation des envois répétés et un verrou pendant/après l'envoi. Les protections du fournisseur restent nécessaires; les contrôles du navigateur ne constituent pas une protection serveur. Aucune protection du fournisseur n'est désactivée par la configuration.

Les références suivent le format `SN-AAAAMMJJ-XXXXXXX` : la date est en UTC et le suffixe est un nombre aléatoire de 32 bits issu de `crypto.getRandomValues`, encodé en base 36 sur sept caractères. Il sert au suivi des demandes et ne constitue ni un numéro de facture ni une preuve d’authenticité.

## Modifier le contenu

- `index.html` : structure et métadonnées de la page.
- `site.js` : textes du portfolio FR/EN.
- `site.css` : apparence du portfolio.
- `assistant/content.js` : questions, messages et traductions.
- `assistant/app.js` : questionnaire, validation et envoi.
- `assistant/config.js` : fournisseur actif, activation, configuration Formspree facultative et mode de test; ne jamais y ajouter de secret.
- `assistant/thanks.html`, `thanks.js`, `thanks.css` : confirmation bilingue après vérification des demandes avec photos.

`assistant/index.html` et les fichiers `widget*` fournissent aussi des présentations facultatives du même questionnaire. Le portfolio principal contient déjà le formulaire complet.

## English

A bilingual portfolio and guided service request form for SolvoNord Technologies. The site is published at **https://solvonord.github.io/Technologies/** and was verified on October 11, 2026. GitHub Pages deploys the `main` branch / root of **SolvoNord/Technologies**, with HTTPS enabled.

The form has one **Send my request** button and uses the owner's activated **FormSubmit** address, `solvonord@gmail.com`. Text-only requests show an on-page confirmation. Photo requests pass through the provider's verification and return to the same portfolio page with a confirmation and reference. The owner confirmed receipt of the native test image **SN-20261011-1APJE70**. Limits: three JPG/PNG/WebP files, 5 MB each and 9 MB combined. Only non-content receipt metadata is stored for the session. The email-app submission button and old Formspree destination have been removed. A direct email contact link remains available. Portfolio services now include cable management and a residential project featuring CAT6, HDMI, Ajax Home Security System and Sonos.

## Identité visuelle

`assistant/mark.svg` est le symbole vectoriel SolvoNord : un N composé de connexions, prolongé par une flèche vers le nord. Le vert profond reprend la couleur principale du site; le vert clair met en valeur le chemin du réseau. Ce fichier sert aussi de favicon. Les contenus de présentation sont originaux et limités aux services déclarés par le propriétaire; les sites de référence n’ont fourni aucun témoignage, chiffre, logo de partenaire ou engagement de disponibilité.
