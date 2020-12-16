// create a test data set of valid users
require("dotenv").config();
require("../config/mongo"); // fetch the db connection

const GameModel = require("./../models/Game");
// const TagModel = require("./../models/Tag");

const games = [
  {
    name: "Metal Gear Solid",
    platform: ["Playstations", "PC"],
    description:
      "You are Snake, a government agent on a mission to regain control of a secret nuclear weapons base from terrorist hands. Lightly armed and facing an army of foes, Snake must avoid firefights in order to survive. If Snake can locate them he can utilize advanced hardware, ranging from silenced pistols to ground-to-air missiles. Enemies react to sight and sound - so stay quiet and stay in the shadows. State-of-the-art graphics: textures, transparencies, models and explosions. Taut, gripping story with multiple endings - a truly cinematic experience. ",
    image:
      "https://media.senscritique.com/media/000017816998/source_big/Metal_Gear_Solid.png",
    price: 9.99,
    category: ["action", "shooter", "infiltration"],
    // id_tags: "",
  },
  {
    name: "Animal Crossing: New Horizons",
    platform: ["Switch"],
    description:
      "If the hustle and bustle of modern life's got you down, Tom Nook has a new business venture up his sleeve that he knows you'll adore: the Nook Inc. Deserted Island Getaway Package! Sure, you've crossed paths with colorful characters near and far. Had a grand time as one of the city folk. May've even turned over a new leaf and dedicated yourself to public service! But deep down, isn't there a part of you that longs for…freedom? Then perhaps a long walk on the beach of a deserted island, where a rich wealth of untouched nature awaits, is just what the doctor ordered! Peaceful creativity and charm await as you roll up your sleeves and make your new life whatever you want it to be. Collect resources and craft everything from creature comforts to handy tools. Embrace your green thumb as you interact with flowers and trees in new ways. Set up a homestead where the rules of what goes indoors and out no longer apply. Make friends with new arrivals, enjoy the seasons, pole-vault across rivers as you explore, and more!",
    image:
      "https://s1.gaming-cdn.com/images/products/4809/orig/animal-crossing-new-horizons-switch-cover.jpg",
    price: 59.99,
    category: ["RPG", "adventure"],
    // id_tags: "",
  },
  {
    name: "Cyberpunk 2077",
    platform: ["Playstations", "PC", "Xbox"],
    description:
      "Cyberpunk 2077 is a science fiction game loosely based on the role-playing game Cyberpunk 2020.      The game is set in the year 2077 in a fictional futuristic metropolis Night City in California. In the world of the game, there are developed cybernetic augmentations that enhance people's strength, agility, and memory. The city is governed by corporations. Many jobs are taken over by the robots, leaving a lot of people poor and homeless. Night City has a roaring underworld, with black markets, underground surgeons, drug dealers, and street gangs abound. The main protagonist is fully customizable, including his or her sex and appearance, and goes by the nickname V. He or she is an underground mercenary who does `dirty business` for the various contractors. An NPC companion named Jackie joins the protagonist early at the game, and various other companions may join the player on certain missions as the plot demands. However, the game has no parties and no companion system. The player controls V from the first person view, with the third-person view used for cutscenes only. The protagonist can travel across the city on feet or using various vehicles, in a manner some observers compared to GTA series. There are many options for the character customization, including three character classes, and a variety of augmentations V can install to enhance his or her abilities.",
    image: "https://images.igdb.com/igdb/image/upload/t_1080p/co1rft.jpg",
    price: 69.99,
    category: ["action", "shooter", "infiltration", "adventure", "RPG"],
    // id_tags: "",
  },
  {
    name: "Shadow of the Tomb Raider",
    platform: ["Playstations", "PC", "Xbox"],
    description:
      "Experience Lara Croft's defining moment as she becomes the Tomb Raider. In Shadow of the Tomb Raider, Lara must master a deadly jungle, overcome terrifying tombs, and persevere through her darkest hour. As she races to save the world from a Maya apocalypse, Lara will ultimately be forged into the Tomb Raider she is destined to be. Survive and Thrive In the Deadliest Place on Earth: Master an unforgiving jungle setting in order to survive. Explore underwater environments filled with crevasses and deep tunnel systems. Become One With the Jungle: Lara must use the jungle to her advantage to strike suddenly and disappear like a jaguar, use mud as camouflage, and instill fear in enemies to sow chaos. Discover Brutal Tombs: Terrifying tombs, filled with deadly puzzles, require advanced traversal techniques to be accessed. Uncover Living History: Discover a hidden city and explore the biggest Tomb Raider hub ever.",
    image:
      "https://flitcha.com/wp-content/uploads/2020/05/2b2a4aa095bd0eade2854c4b929642a9_390x400_1x-0.jpg",
    price: 39.99,
    category: ["action", "adventure"],
    // id_tags: "",
  },
  {
    name: "Forza Horizon 4",
    platform: ["Xbox", "PC"],
    description:
      "Forza Horizon 4 is the eleventh game in the Forza franchise of racing games and the fourth in the Horizon subseries. Forza Horizon 4 takes place in a shared open world that is loosely based on the United Kingdom. Up to 72 players can share a server at which they participate in races together. They can also purchase in-game homes, which allow the players to unlock faster cars and driver perks. The drivers are customizable up to their clothing and emotions.     Forza Horizon 4 has a dynamic change of weather and seasons that change on a weekly basis. The weather conditions are synchronized and shared by all players on the same server. The weather and seasons alter the environment and thus the gameplay. Conditions like snow, mud, and ice can influence not only the driving style but also which areas and routes are accessible during which season. Most notably, the players can drive on the ice when lakes and rivers freeze.      Forza Horizon 4 features more than 450 vehicles that are licensed by over one hundred car manufacturers. Among the few notable manufacturers that were not included because of licensing problems are Toyota and Lexus. Although the game is oriented towards online multiplayer gameplay, it also has a single player and local multiplayer modes. The game also introduces a level editor mode called Route Creator that allows the players to design and customize new routes.",
    image: "https://gameroom.lt/14052/forza-horizon-4.jpg",
    price: 59.99,
    category: ["racing"],
    // id_tags: "",
  },
  {
    name: "Crash Bandicoot N. Sane Trilogy",
    platform: ["Playstations", "PC"],
    description:
      "Your favorite marsupial, Crash Bandicoot™, is back! He's enhanced, entranced and ready-to-dance with the N. Sane Trilogy game collection. Now you can experience Crash Bandicoot like never before. Spin, jump, wump and repeat as you take on the epic challenges and adventures through the three games that started it all, Crash Bandicoot™, Crash Bandicoot™ 2: Cortex Strikes Back and Crash Bandicoot™ 3: Warped. Relive all your favorite Crash moments in their fully-remastered graphical glory and get ready to put some UMPH in your WUMP!Crash Bandicoot™ N.Experience the notorious Stormy Ascent level from the original Crash Bandicoot game. Previously unfinished and unreleased, this level will challenge even the most hardcore of Crash fans! Do you have what it takes to tackle the fast retracting steps, vial throwing lab assistants, flying birds, moving platforms and iron spikes?Crash Bandicoot N. Play the first-ever NEW level built for the original trilogy's gameplay in almost 20 years. Drawing inspiration from the cut `Waterfall Level` from the first Crash Bandicoot game, Future Tense features several puzzles from the original level set in the futuristic setting from Crash Bandicoot 3: Warped. Discover a whole new level of difficulty for Crash Bandicoot N. Sane Trilogy as you dodge rockets, destroy robots and leaps lasers while ascending a massive futuristic skyscraper.",
    image:
      "https://images.g2a.com/newlayout/323x433/1x1x0/d36ccffca82f/5b3ca576ae653a80b5390f53",
    price: 29.99,
    category: ["adventure"],
    // id_tags: "",
  },
];
async function insertGames() {
  try {
    await GameModel.deleteMany(); // empty the styles db collection
    const inserted = await GameModel.insertMany(games); // insert docs in db
    console.log(`seed games done : ${inserted.length} documents inserted !`);
    console.log(inserted);
  } catch (err) {
    console.error(err);
  }
}
// username; gamename
// malek; jeu1
// malek; jeu7
// ilyes; jeu6
// ilyes; jeu7
// male; jeu 9
// selectionner "malek"

insertGames();
// const tags = [
//   {
//     label: "Cool",
//   },
//   {
//     label: "Brolife",
//   },
//   {
//     label: "Funny",
//   },
// ];

// async function insertTags() {
//   try {
//     await TagModel.deleteMany(); // empty the styles db collection
//     const inserted = await TagModel.insertMany(tags); // insert docs in db
//     console.log(`seed tags done : ${inserted.length} documents inserted !`);
//     console.log(inserted);
//   } catch (err) {
//     console.error(err);
//   }
// }
// insertTags();
