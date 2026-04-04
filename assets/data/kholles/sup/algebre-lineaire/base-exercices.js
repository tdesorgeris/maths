window.registerKholleTheme({
  id: "algebre-lineaire",
  track: "sup",
  name: "Algèbre linéaire",
  description: "Matrices, applications linéaires, diagonalisation.",
  courseQuestions: [
    "Énoncer un critère simple de diagonalisabilité d'un endomorphisme $u \\in \\mathcal{L}(E)$ en dimension finie.",
    "Rappeler la définition d'une famille libre $(v_1, \\dots, v_n)$ et expliquer comment tester si $\\lambda_1 v_1 + \\cdots + \\lambda_n v_n = 0$ implique $\\lambda_1 = \\cdots = \\lambda_n = 0$."
  ],
  exercises: [
    {
      title: "ALG.LIN-001 ",
      track: "sup",
      difficulty: 1,
      statement: "On considère la matrice $A_t = \\begin{pmatrix} 1 & t & 0 \\\\ 0 & 1 & t \\\\ 0 & 0 & 1-t \\end{pmatrix}$. Discuter, selon $t \\in \\mathbb{R}$, la dimension de $\\ker(A_t)$ puis proposer une base de $\\operatorname{Im}(A_t)$."
    },
    {
      title: "ALG.LIN-002",
      track: "sup",
      difficulty: 2,
      statement: "Soit $u$ un endomorphisme fictif vérifiant $u^2 - 3u + 2\\,\\mathrm{Id} = 0$. Montrer que $u$ est diagonalisable puis déterminer les projecteurs spectraux associés."
    },
    {
      title: "ALG.LIN-003",
      track: "sup",
      difficulty: 3,
      statement: "Soit $u$ un endomorphisme de $E$ tel que $(u-\\mathrm{Id})^2(u+2\\,\\mathrm{Id}) = 0$. Décrire les sous-espaces caractéristiques possibles et discuter la trigonalisabilité puis la diagonalisabilité de $u$."
    },
    {
      title: "ALG.LIN-004",
      track: "sup",
      difficulty: 1,
      statement: "Hello World, considérons $f\\in \\mathcal{L}(\\mathbb{R})$."
    },
    {
      title: "ALG.LIN-005",
      track: "sup",
      difficulty: 1,
      statement: "Hello World, considérons $f\\in \\mathcal{L}(\\mathbb{R})$ et $v$ un vecteur orthogonal."
    }
  ]
});
