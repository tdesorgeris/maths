window.registerCourseCardsTheme({
  id: "series-entieres",
  track: "spe",
  name: "Séries entières",
  description: "Rayon de convergence et opérations classiques.",
  cards: [
    {
      question: "Définir le rayon de convergence d'une série entière $\\sum a_n x^n$.",
      answer: "C'est le réel $R \\in [0,+\\infty]$ tel que la série converge absolument pour $|x|<R$ et diverge pour $|x|>R$."
    },
    {
      question: "Que peut-on dire de la dérivation terme à terme d'une série entière ?",
      answer: "À l'intérieur du disque de convergence, une série entière est dérivable terme à terme et sa dérivée a le même rayon de convergence."
    },
    {
      question: "Donner un exemple classique de somme de série entière.",
      answer: "Pour $|x|<1$, on a $\\sum_{n \\ge 0} x^n = \\frac{1}{1-x}$."
    }
  ]
});
