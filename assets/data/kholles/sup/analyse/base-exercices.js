window.registerKholleTheme({
  id: "analyse",
  track: "sup",
  name: "Analyse",
  description: "Suites, séries, continuité, dérivation, intégration.",
  courseQuestions: [
    "Énoncer le théorème des accroissements finis pour $f : [a,b] \\to \\mathbb{R}$ et donner une conséquence classique sur la monotonie.",
    "Donner la définition de la convergence uniforme d'une suite de fonctions $(f_n)$ vers $f$ sur un intervalle $I$."
  ],
  exercises: [
    {
      title: "Exercice fictif B1",
      track: "sup",
      difficulty: 1,
      statement: "Étudier la convergence d'une suite définie par la relation fictive $u_{n+1} = f(u_n)$, où $f(x) = \\frac{x+2}{x+3}$, puis proposer un encadrement de sa limite."
    },
    {
      title: "Exercice fictif B2",
      track: "sup",
      difficulty: 2,
      statement: "Déterminer la nature de la série de fonctions fictive $\\sum_{n \\ge 1} \\frac{x^n}{n^2}$, puis discuter la convergence uniforme sur le segment $[0,1]$."
    },
    {
      title: "Exercice fictif B3",
      track: "sup",
      difficulty: 3,
      statement: "Étudier la convergence uniforme de la suite de fonctions fictive $f_n(x) = n x e^{-nx}$ sur $[0,+\\infty[$, puis discuter la convergence de l'intégrale de $f_n$."
    }
  ]
});
