window.registerKholleTheme({
  id: "analyse",
  track: "sup",
  name: "Analyse",
  description: "Suites, continuité, dérivation, intégration.",
  courseQuestions: [
    "Enoncer le theoreme des valeurs intermediaires."
  ],
  exercises: [
    {
      title: "Mon premier exercice",
      track: "sup",
      difficulty: 1,
      statement: "Soit $f : \\R \\to \\R$ definie par $f(x)=x^2-2$.\nMontrer que l'equation $f(x)=0$ admet une solution dans $[1,2]$.",
      answer: "On remarque que $f$ est continue sur $[1,2]$, avec $f(1)=-1$ et $f(2)=2$.\nOn applique alors le theoreme des valeurs intermediaires."
    }
  ]
});
