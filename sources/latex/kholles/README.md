# Kholles

Un fichier `.tex` correspond idealement a un theme.

Exemple de parcours :
- `sup/analyse/base-exercices.tex`
- `sup/algebre-lineaire/base-exercices.tex`
- `spe/espaces-vectoriels-normes/base-exercices.tex`

On peut y mettre :
- les questions de cours
- les exercices
- les corriges ou indications
- les metadonnees utiles : niveau, theme, difficulte

Format retenu :
- `\theme{...}` : identifiant du theme, par exemple `analyse`
- `\track{...}` : `sup` ou `spe`
- `\name{...}` : nom affiche sur le site, optionnel
- `\description{...}` : description courte, optionnelle
- `\questioncours{id}{...}` : une question de cours
- `\exercice{id}{...}` : un exercice

Dans un bloc `\exercice{...}{...}`, on utilise :
- `\difficulty{1}` ou `2` ou `3`
- `\title{...}` : optionnel, sinon le script met `Exercice <id>`
- `\statement{...}` : enonce affiche sur le site
- `\answer{...}` : reserve pour la suite

Commande de conversion :
- `python3 scripts/convert_kholles.py`
