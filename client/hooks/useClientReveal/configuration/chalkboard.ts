const path = "";

const chalkboard = {
  boardmarkerWidth: 3,
  chalkWidth: 7,
  chalkEffect: 1.0,
  storage: null,
  src: null,
  readOnly: undefined,
  transition: 800,
  theme: "chalkboard",
  background: ["rgba(127,127,127,.1)", path + "img/blackboard.png"],
  grid: { color: "rgb(50,50,10,0.5)", distance: 80, width: 2 },
  eraser: { src: path + "img/sponge.png", radius: 20 },
  boardmarkers: [
    {
      color: "rgba(100,100,100,1)",
      cursor: "url(" + path + "img/boardmarker-black.png), auto",
    },
    {
      color: "rgba(30,144,255, 1)",
      cursor: "url(" + path + "img/boardmarker-blue.png), auto",
    },
    {
      color: "rgba(220,20,60,1)",
      cursor: "url(" + path + "img/boardmarker-red.png), auto",
    },
    {
      color: "rgba(50,205,50,1)",
      cursor: "url(" + path + "img/boardmarker-green.png), auto",
    },
    {
      color: "rgba(255,140,0,1)",
      cursor: "url(" + path + "img/boardmarker-orange.png), auto",
    },
    {
      color: "rgba(150,0,20150,1)",
      cursor: "url(" + path + "img/boardmarker-purple.png), auto",
    },
    {
      color: "rgba(255,220,0,1)",
      cursor: "url(" + path + "img/boardmarker-yellow.png), auto",
    },
  ],
  chalks: [
    {
      color: "rgba(255,255,255,0.5)",
      cursor: "url(" + path + "img/chalk-white.png), auto",
    },
    {
      color: "rgba(96, 154, 244, 0.5)",
      cursor: "url(" + path + "img/chalk-blue.png), auto",
    },
    {
      color: "rgba(237, 20, 28, 0.5)",
      cursor: "url(" + path + "img/chalk-red.png), auto",
    },
    {
      color: "rgba(20, 237, 28, 0.5)",
      cursor: "url(" + path + "img/chalk-green.png), auto",
    },
    {
      color: "rgba(220, 133, 41, 0.5)",
      cursor: "url(" + path + "img/chalk-orange.png), auto",
    },
    {
      color: "rgba(220,0,220,0.5)",
      cursor: "url(" + path + "img/chalk-purple.png), auto",
    },
    {
      color: "rgba(255,220,0,0.5)",
      cursor: "url(" + path + "img/chalk-yellow.png), auto",
    },
  ],
};

export default chalkboard;
