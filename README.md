# SolvoNord Technologies

Portfolio bilingue français/anglais et assistant guidé de demande de service, réunis sur une seule page.

- Compte GitHub : **SolvoNord**
- Dépôt de destination : **https://github.com/SolvoNord/Technologies**
- Courriel public : **support@solvonord.com**
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

Le site accepte jusqu'à **6 photos JPG, PNG ou WebP**, **5 Mo par fichier** et **9 Mo au total**. Cette limite garde une marge sous la limite de 10 Mo de FormSubmit. Les fichiers sont renommés `photo-1`, `photo-2`, etc., avec leur extension; les noms de fichiers d'origine ne sont pas transmis. Le parcours intégré et la version assistant séparée utilisent la même page de retour. Dans un widget, le navigateur ouvre la vérification dans la page entière.

Une réponse positive remplace le questionnaire par une confirmation visible et une référence de demande sur la même page du portfolio. Le paramètre `_next` pointe explicitement vers `/Technologies/?lang=…&receipt=…#demande`. Aucun bouton ne renvoie la même demande depuis la confirmation. Le retour exige le jeton de la demande en cours et refuse les références absentes ou périmées après 30 minutes. Le résumé envoyé reste consultable pour les envois sans navigation; il n'est pas stocké entre les pages. L'ancienne page `assistant/thanks.html` redirige les anciennes confirmations valides vers le portfolio. La confirmation ne garantit pas chaque livraison future dans la boîte de réception et ne confirme aucun rendez-vous.

Le bouton « Ouvrir ma messagerie » a été supprimé du questionnaire. Les coordonnées de contact restent disponibles dans le pied de page. Copier ou télécharger le résumé reste possible dans la section repliable « Conserver une copie ».

Le seul fournisseur configuré est FormSubmit. L'ancien identifiant Formspree a été retiré; aucun envoi parallèle, lien vers un compte Formspree ni basculement automatique n'est utilisé. Le code conserve la possibilité de configurer explicitement un autre formulaire Formspree à l'avenir.

Documentation du fournisseur : [envoi AJAX](https://formsubmit.co/ajax-documentation), [fichiers et configuration](https://formsubmit.co/documentation). Aucun secret ne doit être ajouté au site public.

## Confidentialité et fonctionnement

Sept parcours : dépannage TI/réseau, Wi-Fi, câblage, imprimante, sécurité, devis et autre. Questions conditionnelles, validation, résumé modifiable, consentement avant envoi et version mobile.

Les réponses et photos restent en mémoire dans la page jusqu'à l'envoi direct, qui les transmet au fournisseur indiqué dans la notice de confidentialité. Pour reconnaître le retour après vérification, `sessionStorage` conserve seulement la référence, un jeton de confirmation, la langue, le nombre de fichiers, l'heure et l'état de la demande. Aucun texte de demande, coordonnée ou fichier n'est enregistré dans ce stockage. Le portfolio utilise Cloudflare Web Analytics sans cookies de suivi, comme décrit ci-dessous. Ne jamais demander de mots de passe, codes MFA, clés d'accès ou informations sensibles. Les visiteurs doivent éviter les documents confidentiels et les données sensibles dans leurs photos.

## Statistiques de fréquentation

Cloudflare Web Analytics est configuré pour `solvonord.github.io` dans le compte Cloudflare du propriétaire. Le script officiel est installé une seule fois dans `index.html`, pour les versions française et anglaise du portfolio. L’offre Web Analytics est gratuite; aucun transfert du domaine ou de l’hébergement n’est nécessaire. Le jeton du script est un identifiant public de site, pas une clé d’API.

Dans Cloudflare : **Observability → Analytics → Web analytics → solvonord.github.io**. Choisir la période et conserver le filtre **Exclude Bots: Yes**. Les statistiques commencent à l’installation et ne reconstituent pas les visites passées. Une visite ne correspond pas nécessairement à une personne unique; les bloqueurs et l’échantillonnage peuvent modifier les totaux. Les visites du propriétaire et les vérifications du site peuvent aussi être comptées.

L’option `spa: false` évite de traiter la navigation interne du portfolio ou du questionnaire comme de nouvelles pages. Aucun événement de formulaire, réponse, coordonnée ou fichier n’est ajouté aux données analytiques. Cloudflare ne journalise pas les paramètres de requête. La politique `strict-origin-when-cross-origin` fournit l’origine requise par le service sans transmettre le chemin ni les paramètres dans l’en-tête Referer des requêtes externes. La CSP autorise uniquement le script officiel et son point de collecte en plus des services existants. La notice de confidentialité du portfolio explique ces statistiques en FR/EN.

Documentation : [Cloudflare Web Analytics](https://developers.cloudflare.com/web-analytics/), [installation et confidentialité](https://developers.cloudflare.com/web-analytics/about/), [FAQ et limites de mesure](https://developers.cloudflare.com/web-analytics/faq/).

Le formulaire applique un champ piège, un délai minimal, une limitation des envois répétés et un verrou pendant/après l'envoi. Les protections du fournisseur restent nécessaires; les contrôles du navigateur ne constituent pas une protection serveur. Aucune protection du fournisseur n'est désactivée par la configuration.

Les références suivent le format `SN-AAAAMMJJ-XXXXXXX` : la date est en UTC et le suffixe est un nombre aléatoire de 32 bits issu de `crypto.getRandomValues`, encodé en base 36 sur sept caractères. Il sert au suivi des demandes et ne constitue ni un numéro de facture ni une preuve d’authenticité.

## Google Search Console et statistiques

La propriété Search Console est validée pour `https://solvonord.github.io/Technologies/`. Conserver la balise de vérification de `index.html` et `sitemap.xml`. Google a accepté la demande d’indexation de la page le 12 octobre 2026; cela ne garantit pas sa présence ni sa position dans les résultats.

La carte FR/EN décrit les cookies et technologies facultatives en langage courant : mesurer la fréquentation et améliorer la navigation. Elle propose deux boutons de même visibilité, **Accepter** et **Refuser**, et ouvre la politique de confidentialité locale. Les fournisseurs, les durées et la modification du choix sont expliqués dans cette politique. Aucune personnalisation publicitaire n’est activée. Le formulaire reste utilisable dans les deux cas. Cloudflare Web Analytics continue de fonctionner sans cookies de suivi.

Le flux GA4 `G-8HCFSX3ZVC` ne charge son script qu’après accord explicite ou lecture d’un accord enregistré encore valide. La préférence `solvonord-analytics-choice-v2` expire après 180 jours. Aucun accord n’est présumé à partir de l’ancienne intégration retirée. Les cookies de cette intégration sont limités au domaine hôte et au chemin `/Technologies/`, avec une durée de 30 jours. Le refus arrête la mesure Google et supprime ces cookies. Le choix reste modifiable dans le pied de page et dans Confidentialité. Les aperçus locaux ne transmettent rien à GA4.

La mesure couvre les visites et des actions générales : clic de contact, début de demande et confirmation d’envoi. Aucun contenu de formulaire, coordonnée, nom de fichier, référence ou jeton de retour n’est inclus dans les événements. L’URL transmise est fixe, sans paramètres ni fragment; le référent est réduit à son origine. Les fonctions publicitaires et Google Signals sont désactivés. Les mesures améliorées du flux ont été désactivées lors de sa création. Les événements antérieurs à l’accord ne sont pas rejoués.

Le formulaire conserve six photos maximum, les mêmes limites de taille et le même transport FormSubmit. Aucun service d’envoi, hébergement, compte ou abonnement n’a été remplacé.

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

The form has one **Send my request** button and uses the owner's activated **FormSubmit** address, `solvonord@gmail.com`. Text-only requests show an on-page confirmation. Photo requests pass through the provider's verification and return to the same portfolio page with a confirmation and reference. The owner confirmed receipt of the native test image **SN-20261011-1APJE70**. Limits: six JPG/PNG/WebP files, 5 MB each and 9 MB combined. Only non-content receipt metadata is stored for the session. The email-app submission button and old Formspree destination have been removed. A direct email contact link remains available. Portfolio services now include cable management and a residential project featuring CAT6, HDMI, Ajax Home Security System and Sonos.

## Identité visuelle

Le logo approuvé le 13 octobre 2026 est le fichier JPEG fourni par le propriétaire : globe connecté, bouclier et cadenas, nom SolvoNord Technologies et slogan « Écoute, disponibilité et accompagnement ». `assistant/solvonord-logo-original.jpg` conserve le fichier exact. Les fichiers `mark.svg`, `solvonord-logo-horizontal.svg` et `solvonord-logo.svg` sont des cadres SVG qui intègrent les pixels JPEG d’origine pour les formats icône, navigation et signature complète. Il ne s’agit pas de nouveaux tracés vectoriels. Depuis le 14 octobre, le même logo horizontal sans slogan figure dans la navigation et le pied de page, ainsi que sur les pages du formulaire. Le symbole seul reste utilisé dans l’assistant et la favicon. Le cadre complet historique ne figure plus sur les pages. Cette identité remplace les propositions de monogramme SN. Le vert de marque confirmé par le propriétaire est **#015F41**. La palette est centralisée dans `assistant/brand.css`. Tous les verts pleins utilisent **#015F41**, pour les accents de l’interface, boutons au repos et au survol, onglets FR/EN, pictogrammes, progression et états sélectionnés. Les anciens verts sauge, olive et clair sont remplacés par ce vert sur fond clair, ou du blanc sur fond vert. Les fonds secondaires et bordures sont neutres. Les survols se distinguent par un contour ou un soulignement. Le JPEG fourni reste conservé tel quel. Les contenus de présentation sont originaux et limités aux services déclarés par le propriétaire; les sites de référence n’ont fourni aucun témoignage, chiffre, logo de partenaire ou engagement de disponibilité.


## Présentation simplifiée du 14 octobre 2026

Navigation : Accueil, Services, Réalisations, Contact. La page propose un visuel d’accueil, une introduction courte, six services, huit réalisations, les étapes d’intervention et le formulaire existant. Chaque réalisation utilise un élément natif `details` accessible au clavier. Les liens `#projet-N` ouvrent le projet concerné; le changement de langue conserve les projets ouverts. Les descriptions détaillées et les coordonnées de contact du propriétaire sont conservées.

Le logo horizontal sans slogan est identique dans l’en-tête et le pied de page. Les boutons et accents restent au vert #015F41. Le texte blanc de l’accueil est placé sur un visuel sombre pour conserver sa lisibilité.

Le visuel d’accueil est une illustration générée, clairement identifiée comme telle, et non une photo de réalisation. Son origine et son prompt sont documentés dans [assets/README.md](assets/README.md). Les photos du site de référence n’ont pas été copiées. Les photos avant/après réelles pourront être ajoutées lorsque le propriétaire les fournira.


## Galerie générale et courriel professionnel — 14 octobre 2026

Les trois photos de préparation et d’installation du point d’accès industriel figurent dans la section autonome « Sur le terrain ». Elles ne sont associées à aucune fiche projet. Chaque projet pourra recevoir ses propres photographies et précisions plus tard. Les légendes et la visionneuse restent bilingues.

Tous les liens de contact publics utilisent `support@solvonord.com`. `email` configure ce contact; `formsubmitRecipient` indique séparément la boîte de réception activée pour les demandes. Ne remplacer cette dernière qu’après confirmation de son activation FormSubmit.
