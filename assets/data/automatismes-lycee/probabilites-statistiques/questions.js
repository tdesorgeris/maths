window.registerAutomatismesTheme({
  id: "probabilites-statistiques",
  name: "Probabilités et statistiques",
  description: "Moyenne, médiane, fréquences, probabilités simples.",
  questions: [
    { question: "La moyenne de $2, 4, 6$ est :", choices: ["$3$", "$4$", "$5$", "$6$"], answer: 1, explanation: "La moyenne vaut $\\dfrac{2+4+6}{3}=\\dfrac{12}{3}=4$." },
    { question: "La médiane de la série $1, 3, 4, 9, 10$ est :", choices: ["$3$", "$4$", "$5$", "$9$"], answer: 1, explanation: "La série est ordonnée et contient 5 valeurs : la valeur centrale est donc $4$." },
    { question: "La probabilité d'obtenir pile en lançant une pièce équilibrée est :", choices: ["$0$", "$\\dfrac{1}{4}$", "$\\dfrac{1}{2}$", "$1$"], answer: 2, explanation: "Une pièce équilibrée a deux issues équiprobables, donc $P(\\text{pile})=\\dfrac{1}{2}$." },
    { question: "La somme des probabilités d'une loi vaut toujours :", choices: ["$0$", "$1$", "$10$", "$100$"], answer: 1, explanation: "Les probabilités de toutes les issues d'une loi se somment toujours à $1$." },
    { question: "Dans un dé équilibré à 6 faces, la probabilité d'obtenir un nombre pair est :", choices: ["$\\dfrac{1}{6}$", "$\\dfrac{1}{3}$", "$\\dfrac{1}{2}$", "$\\dfrac{2}{3}$"], answer: 2, explanation: "Les nombres pairs sont 2, 4 et 6 : 3 issues favorables sur 6, soit $\\dfrac{1}{2}$." },
    { question: "L'étendue d'une série vaut :", choices: ["maximum + minimum", "maximum - minimum", "moyenne - médiane", "effectif total"], answer: 1, explanation: "L'étendue mesure l'écart entre la plus grande et la plus petite valeur : maximum moins minimum." },
    { question: "Une fréquence est comprise entre :", choices: ["$-1$ et $1$", "$0$ et $1$", "$0$ et $10$", "$1$ et $100$"], answer: 1, explanation: "Une fréquence est une proportion, donc elle appartient toujours à l'intervalle $[0,1]$." },
    { question: "Si un événement est certain, sa probabilité vaut :", choices: ["$0$", "$\\dfrac{1}{2}$", "$1$", "$2$"], answer: 2, explanation: "Un événement certain se réalise toujours, donc sa probabilité est égale à $1$." },
    { question: "La moyenne de $5, 5, 5, 5$ est :", choices: ["$4$", "$5$", "$10$", "$20$"], answer: 1, explanation: "Quand toutes les valeurs sont identiques, la moyenne est cette valeur commune : ici $5$." },
    { question: "Si deux événements sont contraires, alors la somme de leurs probabilités vaut :", choices: ["$0$", "$1$", "$2$", "$10$"], answer: 1, explanation: "Deux événements contraires couvrent toutes les issues possibles, donc leurs probabilités se complètent à $1$." },
    { question: "Dans un tableau d'effectifs, l'effectif total est :", choices: ["la somme des effectifs", "la moyenne des effectifs", "le plus grand effectif", "la médiane"], answer: 0, explanation: "L'effectif total correspond à l'addition de tous les effectifs de la série." },
    { question: "La probabilité d'obtenir un multiple de 3 avec un dé équilibré à 6 faces est :", choices: ["$\\dfrac{1}{6}$", "$\\dfrac{1}{3}$", "$\\dfrac{1}{2}$", "$\\dfrac{2}{3}$"], answer: 1, explanation: "Les multiples de 3 sur un dé sont 3 et 6 : 2 issues favorables sur 6, soit $\\dfrac{1}{3}$." }
  ]
});
