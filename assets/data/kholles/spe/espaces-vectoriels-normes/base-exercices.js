window.registerKholleTheme({
  id: "espaces-vectoriels-normes",
  track: "spe",
  name: "Espaces vectoriels normés",
  description: "Normes, suites, compacité, applications linéaires continues.",
  courseQuestions: [
    "Donner la définition d'une norme sur un espace vectoriel réel et rappeler l'inégalité triangulaire.",
    "Énoncer la définition de la continuité d'une application linéaire entre deux espaces vectoriels normés."
  ],
  exercises: [
    {
      title: "Exercice fictif EVN1",
      track: "spe",
      difficulty: 1,
      statement: "Montrer, sur un exemple fictif simple de $\\mathbb{R}^2$, que deux normes usuelles sont équivalentes et comparer leurs boules unités."
    },
    {
      title: "Exercice fictif EVN2",
      track: "spe",
      difficulty: 2,
      statement: "Étudier la continuité de l'application fictive $u : C([0,1]) \\to \\mathbb{R}$ définie par $u(f) = \\int_0^1 f(t)\\,dt$ pour différentes normes sur $C([0,1])$."
    },
    {
      title: "Exercice fictif EVN3",
      track: "spe",
      difficulty: 3,
      statement: "Dans un espace vectoriel normé fictif, étudier si une suite bornée admet nécessairement une sous-suite convergente, puis préciser le rôle de la dimension finie."
    }
  ]
});
