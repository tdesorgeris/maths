window.registerAutomatismesTheme({
  id: "calcul-litteral",
  name: "Calcul littéral",
  description: "Développement, factorisation, puissances et fractions.",
  questions: [
    { question: "Développer $(x+3)^2$.", choices: ["$x^2+9$", "$x^2+6x+9$", "$2x+9$", "$x^2+3x+9$"], answer: 1, explanation: "On utilise l'identité remarquable $(a+b)^2=a^2+2ab+b^2$ avec $a=x$ et $b=3$." },
    { question: "Factoriser $4x^2-9$.", choices: ["$(2x-3)^2$", "$(2x-3)(2x+3)$", "$(4x-9)(x+1)$", "$(x-3)(4x+3)$"], answer: 1, explanation: "C'est une différence de deux carrés : $4x^2-9=(2x)^2-3^2=(2x-3)(2x+3)$." },
    { question: "Simplifier $\\dfrac{x^3}{x}$ pour $x\\neq 0$.", choices: ["$x^2$", "$x^4$", "$1$", "$3x$"], answer: 0, explanation: "On soustrait les exposants : $\\dfrac{x^3}{x}=x^{3-1}=x^2$." },
    { question: "Quelle est la valeur de $2^{-3}$ ?", choices: ["$-8$", "$\\dfrac{1}{8}$", "$8$", "$\\dfrac{1}{6}$"], answer: 1, explanation: "Un exposant négatif inverse la puissance : $2^{-3}=\\dfrac{1}{2^3}=\\dfrac{1}{8}$." },
    { question: "Réduire $3x-5+2x+1$.", choices: ["$5x-4$", "$5x+4$", "$x-4$", "$6x-6$"], answer: 0, explanation: "On regroupe les termes de même nature : $3x+2x=5x$ et $-5+1=-4$." },
    { question: "Résoudre $5x=20$.", choices: ["$x=4$", "$x=5$", "$x=15$", "$x=25$"], answer: 0, explanation: "On divise les deux membres par $5$ : $x=\\dfrac{20}{5}=4$." },
    { question: "Développer $2(x-4)$.", choices: ["$2x-4$", "$2x-8$", "$x-8$", "$2x+8$"], answer: 1, explanation: "On distribue le $2$ à chaque terme : $2\\times x=2x$ et $2\\times(-4)=-8$." },
    { question: "Factoriser $6x+12$.", choices: ["$6(x+2)$", "$12(x+1)$", "$3(x+4)$", "$6(x-2)$"], answer: 0, explanation: "Le facteur commun est $6$ : $6x+12=6(x+2)$." },
    { question: "Calculer $\\dfrac{3}{4}+\\dfrac{1}{4}$.", choices: ["$\\dfrac{4}{8}$", "$1$", "$\\dfrac{3}{8}$", "$\\dfrac{1}{2}$"], answer: 1, explanation: "Les dénominateurs sont égaux, on additionne les numérateurs : $\\dfrac{3}{4}+\\dfrac{1}{4}=\\dfrac{4}{4}=1$." },
    { question: "Quelle expression est égale à $(a+b)(a-b)$ ?", choices: ["$a^2-b^2$", "$a^2+b^2$", "$2ab$", "$a^2-2ab+b^2$"], answer: 0, explanation: "On reconnaît l'identité remarquable $(a+b)(a-b)=a^2-b^2$." },
    { question: "Simplifier $\\dfrac{2x^2}{4x}$ pour $x\\neq 0$.", choices: ["$\\dfrac{x}{2}$", "$2x$", "$\\dfrac{x^2}{2}$", "$\\dfrac{1}{2x}$"], answer: 0, explanation: "On simplifie le coefficient puis la puissance : $\\dfrac{2}{4}\\times\\dfrac{x^2}{x}=\\dfrac{1}{2}x$." },
    { question: "Résoudre $x-7=5$.", choices: ["$x=-2$", "$x=12$", "$x=2$", "$x=35$"], answer: 1, explanation: "On ajoute $7$ aux deux membres : $x=5+7=12$." }
  ]
});
