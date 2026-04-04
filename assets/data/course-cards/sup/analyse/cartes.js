window.registerCourseCardsTheme({
  id: "analyse",
  track: "sup",
  name: "Analyse",
  description: "Suites, convergence uniforme, théorèmes classiques.",
  cards: [
    {
      question: "Énoncer le théorème des accroissements finis.",
      answer: "Si $f$ est continue sur $[a,b]$ et dérivable sur $]a,b[$, alors il existe $c \\in ]a,b[$ tel que $f'(c) = \\frac{f(b)-f(a)}{b-a}$."
    },
    {
      question: "Définir la convergence uniforme d'une suite de fonctions $(f_n)$ vers $f$ sur un ensemble $A$.",
      answer: "La suite $(f_n)$ converge uniformément vers $f$ sur $A$ si $\\sup_{x \\in A} |f_n(x)-f(x)| \\to 0$ lorsque $n \\to +\\infty$."
    },
    {
      question: "Quelle différence principale entre convergence simple et convergence uniforme ?",
      answer: "La convergence simple contrôle chaque point séparément, tandis que la convergence uniforme contrôle l'écart sur tout l'ensemble à la fois."
    }
  ]
});
