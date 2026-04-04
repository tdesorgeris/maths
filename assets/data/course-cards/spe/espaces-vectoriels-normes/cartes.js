window.registerCourseCardsTheme({
  id: "espaces-vectoriels-normes",
  track: "spe",
  name: "Espaces vectoriels normés",
  description: "Normes, continuité, compacité.",
  cards: [
    {
      question: "Donner la définition d'une norme sur un espace vectoriel réel.",
      answer: "Une norme est une application $N : E \\to \\mathbb{R}_+$ vérifiant, pour tous $x,y \\in E$ et tout $\\lambda \\in \\mathbb{R}$ : $N(x)=0 \\Leftrightarrow x=0$, $N(\\lambda x)=|\\lambda|N(x)$ et $N(x+y) \\le N(x)+N(y)$."
    },
    {
      question: "Quand une application linéaire entre deux EVN est-elle continue ?",
      answer: "Une application linéaire entre deux EVN est continue si et seulement si elle est continue en $0$, ce qui équivaut aussi à être bornée."
    },
    {
      question: "Quel lien entre compacité et dimension finie dans un EVN ?",
      answer: "En dimension finie, une partie est compacte si et seulement si elle est fermée et bornée. Ce résultat est faux en général en dimension infinie."
    }
  ]
});
