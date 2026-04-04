window.registerKholleTheme({
  id: "series-entieres",
  track: "spe",
  name: "Séries entières",
  description: "Rayon de convergence, somme, dérivation et intégration terme à terme.",
  courseQuestions: [
    "Définir le rayon de convergence d'une série entière $\\sum a_n x^n$.",
    "Énoncer un résultat de dérivation terme à terme d'une série entière à l'intérieur de son disque de convergence."
  ],
  exercises: [
    {
      title: "Exercice fictif SE1",
      track: "spe",
      difficulty: 1,
      statement: "Déterminer le rayon de convergence de la série entière fictive $\\sum_{n \\ge 0} \\frac{n+1}{2^n} x^n$."
    },
    {
      title: "Exercice fictif SE2",
      track: "spe",
      difficulty: 2,
      statement: "Calculer explicitement la somme de la série entière fictive $\\sum_{n \\ge 1} n x^n$ pour $|x|<1$, puis en déduire une expression fermée."
    },
    {
      title: "Exercice fictif SE3",
      track: "spe",
      difficulty: 3,
      statement: "Résoudre une équation différentielle fictive à l'aide d'un développement en série entière et discuter l'unicité de la solution obtenue."
    }
  ]
});
