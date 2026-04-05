# Sources LaTeX

Ce dossier contient les sources `.tex` destinees a alimenter ensuite le site.

Principe retenu :
- on redige les contenus mathematiques en LaTeX ici
- on garde les PDF publies dans `documents/`
- on garde les donnees du site dans `assets/data/`
- plus tard, un script pourra convertir ces sources `.tex` vers les fichiers JavaScript utilises par le site

Organisation :
- `common/` : macros communes et conventions de redaction
- `kholles/` : sources pour le generateur de kholles
- `course-cards/` : sources pour `Connais-tu ton cours ?`
- `automatismes-lycee/` : sources pour le quiz d'automatismes

Regles conseillees :
- rester sur des macros simples et reutilisables
- eviter les packages exotiques si l'on veut ensuite reutiliser le contenu dans MathJax
- rediger chaque contenu dans un bloc bien delimite pour faciliter une future conversion automatique

Premier flux disponible :
- les kholles peuvent etre converties avec `python3 scripts/convert_kholles.py`
- les fichiers sources attendus sont dans `sources/latex/kholles/`
- les fichiers generes sont ecrits dans `assets/data/kholles/`
