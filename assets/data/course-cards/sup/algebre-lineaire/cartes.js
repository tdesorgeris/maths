window.registerCourseCardsTheme({
  id: "algebre-lineaire",
  track: "sup",
  name: "Algèbre linéaire",
  description: "Définitions, diagonalisation, familles libres.",
  cards: [
    {
      question: "Définir une famille libre dans un espace vectoriel.",
      answer: "Une famille $(v_1, \\dots, v_n)$ est libre si l'égalité $\\lambda_1 v_1 + \\cdots + \\lambda_n v_n = 0$ implique $\\lambda_1 = \\cdots = \\lambda_n = 0$."
    },
    {
      question: "Que signifie qu'un endomorphisme est diagonalisable ?",
      answer: "Un endomorphisme est diagonalisable s'il existe une base de l'espace formée de vecteurs propres. Sa matrice dans cette base est donc diagonale."
    },
    {
      question: "Donner un critère simple de diagonalisation via le polynôme scindé.",
      answer: "Si le polynôme caractéristique est scindé et que, pour chaque valeur propre, la dimension de l'espace propre est égale à la multiplicité algébrique, alors l'endomorphisme est diagonalisable."
    }
  ]
});
