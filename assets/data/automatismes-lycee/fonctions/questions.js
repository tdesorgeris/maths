window.registerAutomatismesTheme({
  id: "fonctions",
  name: "Fonctions",
  description: "Images, antécédents, variations, dérivation simple.",
  questions: [
    { question: "Si $f(x)=2x+1$, quelle est l'image de $3$ ?", choices: ["$5$", "$6$", "$7$", "$8$"], answer: 2, explanation: "On remplace $x$ par $3$ : $f(3)=2\\times3+1=7$." },
    { question: "Si $f(x)=x^2$, quel est un antécédent de $9$ ?", choices: ["$3$", "$2$", "$1$", "$0$"], answer: 0, explanation: "On cherche $x$ tel que $x^2=9$ ; parmi les choix proposés, $3$ convient." },
    { question: "La fonction affine $f(x)=-4x+2$ est :", choices: ["croissante", "constante", "décroissante", "positive"], answer: 2, explanation: "Le coefficient directeur est négatif ($-4$), donc la fonction est décroissante." },
    { question: "La dérivée de $f(x)=x^2$ est :", choices: ["$x$", "$2x$", "$x^2$", "$2$"], answer: 1, explanation: "La dérivée de $x^2$ est $2x$." },
    { question: "Si $f(x)=3x-2$, alors $f(0)=$", choices: ["$-2$", "$0$", "$2$", "$3$"], answer: 0, explanation: "On calcule $f(0)=3\\times0-2=-2$." },
    { question: "Une fonction dont la dérivée est positive sur un intervalle est :", choices: ["décroissante", "croissante", "nulle", "négative"], answer: 1, explanation: "Une dérivée positive traduit une fonction croissante sur l'intervalle considéré." },
    { question: "Le coefficient directeur de $f(x)=5x-1$ vaut :", choices: ["$-1$", "$1$", "$5$", "$6$"], answer: 2, explanation: "Dans une fonction affine $ax+b$, le coefficient directeur est $a$, ici $5$." },
    { question: "Si $f(x)=x^2-1$, alors $f(2)=$", choices: ["$3$", "$2$", "$5$", "$1$"], answer: 0, explanation: "On remplace $x$ par $2$ : $f(2)=2^2-1=4-1=3$." },
    { question: "La courbe de $f(x)=x^2$ est une :", choices: ["droite", "hyperbole", "parabole", "ellipse"], answer: 2, explanation: "La représentation graphique d'une fonction du second degré est une parabole." },
    { question: "Si $f(x)=\\dfrac{1}{x}$, alors $f(2)=$", choices: ["$2$", "$\\dfrac{1}{2}$", "$-2$", "$4$"], answer: 1, explanation: "On calcule $f(2)=\\dfrac{1}{2}$." },
    { question: "La dérivée de $f(x)=3x+7$ est :", choices: ["$0$", "$3$", "$7$", "$3x$"], answer: 1, explanation: "La dérivée d'une fonction affine $ax+b$ est la constante $a$, ici $3$." },
    { question: "Si $f$ est croissante sur un intervalle, alors pour $a<b$ :", choices: ["$f(a)>f(b)$", "$f(a)=f(b)$", "$f(a)<f(b)$", "$f(a)\\le 0$"], answer: 2, explanation: "Par définition d'une fonction croissante, l'ordre est conservé : $a<b$ implique $f(a)<f(b)$." }
  ]
});
