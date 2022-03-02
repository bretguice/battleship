/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"playerOneBoard\": () => (/* binding */ playerOneBoard),\n/* harmony export */   \"playerTwoBoard\": () => (/* binding */ playerTwoBoard),\n/* harmony export */   \"createGrid\": () => (/* binding */ createGrid)\n/* harmony export */ });\n/* harmony import */ var _factories_playerfactor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factories/playerfactor */ \"./src/factories/playerfactor.js\");\n\nconst playerOneBoard = document.getElementById('player1');\nconst playerTwoBoard = document.getElementById('player2');\n\nfunction createGrid(player, playerboard){\n\n    const playerCode = player.playerName === \"Player 1\" ? \"000\" : \"999\";\n\n    for(let i = 0; i < player.board.boardSize; i++){\n        let cell = document.createElement('div');\n        cell.className = \"gameboard\";\n        cell.id = playerCode + i;\n        cell.setAttribute('data-id', i);\n        const clickLocation = parseInt(cell.getAttribute('data-id'));\n        cell.addEventListener('click', player.board.placeShip.bind(player.board, clickLocation));\n   \n        // cell.addEventListener('click', player.fireShot);\n        playerboard.appendChild(cell)\n    }\n}\n\n\n//# sourceURL=webpack://battleship/./src/dom.js?");

/***/ }),

/***/ "./src/factories/gameboard.js":
/*!************************************!*\
  !*** ./src/factories/gameboard.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _shipfactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shipfactory */ \"./src/factories/shipfactory.js\");\n/* harmony import */ var _playerfactor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./playerfactor */ \"./src/factories/playerfactor.js\");\n\n\n\nclass GameBoard {\n  constructor (size) {\n    this.size = size;\n    this.boardSize = size * size;\n    this.tiles = [];\n    this.dock = [];\n    this.inPlay = [];\n    this.graveyard = [];\n    this.firedShots = [];\n    this.gameOver = false;\n    this.yAxis = true;\n    this.hitMessage = \"\";\n    this.sunkMessage = \"\";\n\n  }\n/*\n Start of game methods\n*/\n\n    setupBoard() {\n      for (let i = 0; i < this.boardSize; i ++) {\n        this.tiles.push({\n          location: i,\n          isShot: false,\n          boatPresent: false,\n          hit: false,\n        });;\n      }\n    }\n\n    createShips(){\n      const carrier = new _shipfactory__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0);\n      const battleShip = new _shipfactory__WEBPACK_IMPORTED_MODULE_0__[\"default\"](1);\n      const submarine = new _shipfactory__WEBPACK_IMPORTED_MODULE_0__[\"default\"](2);\n      const destroyer = new _shipfactory__WEBPACK_IMPORTED_MODULE_0__[\"default\"](3);\n      const patrolBoat = new _shipfactory__WEBPACK_IMPORTED_MODULE_0__[\"default\"](4);\n\n      this.dock.push(carrier, battleShip, submarine, destroyer, patrolBoat);\n\n    }\n\n/*\n Ship placement methods\n*/\n    rotateShip() {\n      // Default axis is y axis.  If default change axis to x.\n      if (this.axis === 'y'){\n        this.axis = 'x';\n      } else if (this.axis === 'x'){\n        this.axis = 'y';\n      }\n      return this.axis;\n    }\n\n    placeShip(location){\n      var clickLocation;\n      var div;\n      var locationArray = [];\n      var iLoc;\n      for (let i = 0; i < this.dock[0].shipLength; i++) {\n        iLoc = this.yAxis ? location + i * this.size : location + i\n        \n       locationArray.push(iLoc);\n       \n      }\n      \n      if(this.checkForCollisions(locationArray)){\n        this.dock[0].locationArr.push(locationArray);\n        this.markShip(locationArray);\n        \n      }else {\n        return\n      } \n      \n    }\n\n    placedShip(clickLocation){\n      \n      //this.createLocationArray(clickLocation);\n      \n    }\n\n    markShip(locationArray){\n      const playerCode = \"000\";\n     \n      \n      locationArray.forEach(loc => {\n        this.tiles[loc].boatPresent = true;\n        const div = document.getElementById(playerCode+loc);\n        div.classList.add('ship');\n        \n      })\n\n      this.inPlay.push(this.dock[0]);\n      this.dock.splice(0, 1);\n   \n    }\n\n    checkForCollisions(locationArray) {\n        const xArrayBumber = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99]\n        let legalLoc;\n        if (locationArray.some((e) => !this.tiles[e])){\n          legalLoc = false;\n        } else if (xArrayBumber.some((n)=>[n, n + 1].every((e) => locationArray.includes(e)))) {\n          legalLoc = false;\n        } else if (locationArray.some((e) => this.tiles[e].boatPresent)){\n          legalLoc = false;\n        } else {\n          legalLoc = true;\n        }\n\n        return legalLoc;\n    }\n\n\n\n/*\n Attack methods\n*/\n    checkLegalMove(location){\n      let legalMove = true;\n      if(this.tiles[location].isShot)  \n      legalMove = false;\n      return legalMove;\n    }\n\n    receiveAttack(location) {\n\n      this.this[location].isShot = true;\n      this.inPlay.forEach(ship => ship.checkHit(location));\n        if(this.inPlay.some(e => e.didHit === true)){\n          this.hitMessage = 'Hit!';\n          if (this.inPlay.some(ship => ship.sunk === true)) {\n            const i = this.inPlay.findIndex(ship => ship.sunk);\n            this.handleSunkShip(this.inPlay[i]); \n            this.inPlay.splice(i,1);\n            this.checkForGameOver();          \n            \n        }\n      } else {\n        this.hitMessage =  'Miss!';\n      }         \n  }\n\n    handleSunkShip(ship) {\n      this.sunkMessage = `${ship.shipType} is sunk`;\n      this.graveyard.push(ship);\n      \n  }\n    \n    checkForGameOver() {\n      this.gameOver = (this.inPlay.length === 0) ? true : false;\n      return this.gameOver;\n    }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameBoard);\n\n\n\n//# sourceURL=webpack://battleship/./src/factories/gameboard.js?");

/***/ }),

/***/ "./src/factories/playerfactor.js":
/*!***************************************!*\
  !*** ./src/factories/playerfactor.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/factories/gameboard.js\");\n\n\nclass Player {\n  constructor(playerName, type) {\n    this.playerName = playerName;\n    this.type = type;\n    this.turn = false;\n    this.board = new _gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"](10);\n  }\n\n    changeTurn() {\n      // If turn property is false, change to true. Else if turn property is true, change to false\n      (this.turn = this.turn === false ? true : this.turn !== true);\n      return this.turn;\n    }\n\n    fireShot(location, gameboard) {\n      if(!gameboard.firedShots.includes(location)){\n        gameboard.firedShots.push(location);\n        gameboard.receiveAttack(location);\n      } else {\n        // game controller to go back to attack phaze\n        return false\n      }\n    }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n\n//# sourceURL=webpack://battleship/./src/factories/playerfactor.js?");

/***/ }),

/***/ "./src/factories/shipfactory.js":
/*!**************************************!*\
  !*** ./src/factories/shipfactory.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _shiptype__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shiptype */ \"./src/shiptype.js\");\n\n\nclass Ship {\n  constructor (i) {\n    this.shipLength = _shiptype__WEBPACK_IMPORTED_MODULE_0__[\"default\"][i].shipLength;\n    this.shipType = _shiptype__WEBPACK_IMPORTED_MODULE_0__[\"default\"][i].type;\n    this.locationArr = [];\n    this.hitLocation = [];\n    this.didHit = false;\n    this.sunk = false;\n  }\n\n    isSunk() {\n      if (this.locationArr.every((e) => this.hitLocation.includes(e)) === true) {\n        this.sunk = true;\n      } else {\n        this.sunk = false;\n      }\n\n      return this.sunk;\n        \n    }\n\n\n    checkHit(firedLocation) {\n      // assign true of false value to hit status\n       if (this.locationArr.includes(firedLocation)){\n         this. didHit = true;\n         this.hitLocation.push(firedLocation);\n         this.isSunk();\n       } else {\n         this.didHit = false;\n       }\n\n    }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);\n\n\n//# sourceURL=webpack://battleship/./src/factories/shipfactory.js?");

/***/ }),

/***/ "./src/gamecontroller.js":
/*!*******************************!*\
  !*** ./src/gamecontroller.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"gameStateArr\": () => (/* binding */ gameStateArr),\n/* harmony export */   \"playerSetup\": () => (/* binding */ playerSetup),\n/* harmony export */   \"cpuSetup\": () => (/* binding */ cpuSetup),\n/* harmony export */   \"playerAttack\": () => (/* binding */ playerAttack),\n/* harmony export */   \"playerResult\": () => (/* binding */ playerResult),\n/* harmony export */   \"cpuAttack\": () => (/* binding */ cpuAttack),\n/* harmony export */   \"cpuResult\": () => (/* binding */ cpuResult),\n/* harmony export */   \"gameState\": () => (/* binding */ gameState),\n/* harmony export */   \"changeGameState\": () => (/* binding */ changeGameState)\n/* harmony export */ });\nconst gameStateArr = ['player setup', 'cpu setup', 'player attack', 'player result', 'cpu attack', 'cpu result'];\nconst [playerSetup, cpuSetup, playerAttack, playerResult, cpuAttack, cpuResult] = gameStateArr;\n// eslint-disable-next-line import/no-mutable-exports\nlet gameState = playerSetup;\n\nfunction changeGameState(){\n\n    if(gameState === playerSetup){\n        gameState = cpuSetup;         \n    } else if (gameState === cpuSetup) {\n        gameState = playerAttack;\n    } else if (gameState === playerAttack) {\n        gameState = playerResult;\n    } else if (gameState === playerResult) {\n        gameState = cpuAttack;\n    } else if (gameState === cpuAttack) {\n        gameState = cpuResult;\n    } else if (gameState === cpuResult) {\n        gameState = playerAttack;\n    }\n}\n    \n\n\n\n//# sourceURL=webpack://battleship/./src/gamecontroller.js?");

/***/ }),

/***/ "./src/gameplay.js":
/*!*************************!*\
  !*** ./src/gameplay.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n/* harmony import */ var _factories_playerfactor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./factories/playerfactor */ \"./src/factories/playerfactor.js\");\n/* harmony import */ var _gamecontroller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gamecontroller */ \"./src/gamecontroller.js\");\n\n\n\n\nvar player = new _factories_playerfactor__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('Player 1', \"player\");\nvar player2 = new _factories_playerfactor__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('Player 2', \"cpu\");\n\nplayer.board.setupBoard();\nplayer2.board.setupBoard();\nplayer.board.createShips();\nplayer2.board.createShips();\n\n(0,_dom__WEBPACK_IMPORTED_MODULE_0__.createGrid)(player, _dom__WEBPACK_IMPORTED_MODULE_0__.playerOneBoard);\n// createGrid(player2, playerTwoBoard); \n\n\n\n\n\n\n\n\n//# sourceURL=webpack://battleship/./src/gameplay.js?");

/***/ }),

/***/ "./src/shiptype.js":
/*!*************************!*\
  !*** ./src/shiptype.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst shipType = [\n  {\n    type: 'Carrier',\n    shipLength: 5,\n  },\n  {\n    type: 'Battleship',\n    shipLength: 4,\n  },\n  {\n    type: 'Submarine',\n    shipLength: 3,\n  },\n  {\n    type: 'Destroyer',\n    shipLength: 3,\n  },\n  {\n    type: 'Patrol Boat',\n    shipLength: 2,\n  },\n];\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (shipType);\n\n\n//# sourceURL=webpack://battleship/./src/shiptype.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/gameplay.js");
/******/ 	
/******/ })()
;