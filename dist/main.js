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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"playerOneBoard\": () => (/* binding */ playerOneBoard),\n/* harmony export */   \"playerTwoBoard\": () => (/* binding */ playerTwoBoard),\n/* harmony export */   \"rotateButton\": () => (/* binding */ rotateButton),\n/* harmony export */   \"createGrid\": () => (/* binding */ createGrid),\n/* harmony export */   \"setOppoBoard\": () => (/* binding */ setOppoBoard)\n/* harmony export */ });\n/* harmony import */ var _src_gameplay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/gameplay */ \"./src/gameplay.js\");\n/* harmony import */ var _factories_playerfactor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./factories/playerfactor */ \"./src/factories/playerfactor.js\");\n\n\nconst playerOneBoard = document.getElementById('player1');\nconst playerTwoBoard = document.getElementById('player2');\nconst rotateButton = document.getElementById('rotate');\n\n\nfunction createGrid(playerboard){\n\n    \n    const playerCode = _src_gameplay__WEBPACK_IMPORTED_MODULE_0__.players[0].playerName === \"Player 1\" ? \"000\" : \"999\";\n\n    for(let i = 0; i < _src_gameplay__WEBPACK_IMPORTED_MODULE_0__.players[0].board.boardSize; i++){\n        let cell = document.createElement('div');\n        cell.className = \"gameboard\";\n        cell.id = playerCode + i;\n        cell.setAttribute('data-id', i);\n        const clickLocation = parseInt(cell.getAttribute('data-id'));\n        cell.addEventListener('click', _src_gameplay__WEBPACK_IMPORTED_MODULE_0__.players[0].board.placeShip.bind(_src_gameplay__WEBPACK_IMPORTED_MODULE_0__.players[0].board, clickLocation));\n        playerboard.appendChild(cell)\n    }\n}\n\nfunction setOppoBoard(playerboard){\n    const playerCode = _src_gameplay__WEBPACK_IMPORTED_MODULE_0__.players[1].playerName === \"Player 1\" ? \"000\" : \"999\";\n\n    for(let i = 0; i < _src_gameplay__WEBPACK_IMPORTED_MODULE_0__.players[1].board.boardSize; i++){\n        let cell = document.createElement('div');\n        cell.className = \"gameboard\";\n        cell.id = playerCode + i;\n        cell.setAttribute('data-id', i);\n        const clickLocation = parseInt(cell.getAttribute('data-id'));\n        cell.addEventListener('click', _src_gameplay__WEBPACK_IMPORTED_MODULE_0__.players[1].fireShot.bind(_src_gameplay__WEBPACK_IMPORTED_MODULE_0__.players[1].board, clickLocation));\n\n        playerboard.appendChild(cell)\n    }\n\n}\n\n\n//# sourceURL=webpack://battleship/./src/dom.js?");

/***/ }),

/***/ "./src/factories/gameboard.js":
/*!************************************!*\
  !*** ./src/factories/gameboard.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _shipfactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shipfactory */ \"./src/factories/shipfactory.js\");\n/* harmony import */ var _playerfactor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./playerfactor */ \"./src/factories/playerfactor.js\");\n/* harmony import */ var _gamecontroller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../gamecontroller */ \"./src/gamecontroller.js\");\n/* harmony import */ var _gameplay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../gameplay */ \"./src/gameplay.js\");\n\n\n\n\n\nclass GameBoard {\n  constructor (size) {\n    this.size = size;\n    this.boardSize = size * size;\n    this.tiles = [];\n    this.dock = [];\n    this.inPlay = [];\n    this.graveyard = [];\n    this.firedShots = [];\n    this.gameOver = false;\n    this.yAxis = true;\n    this.turn = false;\n    this.hit = false;\n    this.sunkMessage = \"\";\n\n  }\n/*\n Start of game methods\n*/\n\n    setupBoard() {\n      for (let i = 0; i < this.boardSize; i ++) {\n        this.tiles.push({\n          location: i,\n          isShot: false,\n          boatPresent: false,\n          hit: false,\n        });\n      }\n    }\n\n    createShips(){\n      const carrier = new _shipfactory__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0);\n      const battleShip = new _shipfactory__WEBPACK_IMPORTED_MODULE_0__[\"default\"](1);\n      const submarine = new _shipfactory__WEBPACK_IMPORTED_MODULE_0__[\"default\"](2);\n      const destroyer = new _shipfactory__WEBPACK_IMPORTED_MODULE_0__[\"default\"](3);\n      const patrolBoat = new _shipfactory__WEBPACK_IMPORTED_MODULE_0__[\"default\"](4);\n\n      this.dock.push(carrier, battleShip, submarine, destroyer, patrolBoat);\n\n    }\n\n/*\n Ship placement methods\n*/\n    rotateShip() {\n      this.yAxis = this.yAxis === false ? true : false;\n      return this.yAxis;\n    \n    }\n\n    placeShip(location){\n      if(_gamecontroller__WEBPACK_IMPORTED_MODULE_2__.gameState === _gamecontroller__WEBPACK_IMPORTED_MODULE_2__.playerSetup){\n      var locationArray = this.createLocationArray(location);\n      \n      if(this.checkForCollisions(locationArray)){\n        locationArray.forEach(loc => this.dock[0].locationArr.push(loc));\n        this.markShip(locationArray);\n\n        if (this.dock.length === 0){\n          (0,_gamecontroller__WEBPACK_IMPORTED_MODULE_2__.changeGameState)();\n          _gameplay__WEBPACK_IMPORTED_MODULE_3__.players[0].changeTurn()\n          _gameplay__WEBPACK_IMPORTED_MODULE_3__.players[1].cpuAttack();\n        }\n        \n      } else {\n        return\n      } \n      }\n    }\n\n    createLocationArray(location){\n        var locationArray = [];\n        var iLoc;\n        for (let i = 0; i < this.dock[0].shipLength; i++) {\n\n          if (this.yAxis === true){\n            iLoc = location + i * this.size;\n          } else {\n            iLoc =  location + i\n          }\n          \n          \n        locationArray.push(iLoc);\n        \n    }\n\n    return locationArray;\n  }\n\n   \n    markShip(locationArray){\n      const playerCode = \"000\";\n      \n      locationArray.forEach(loc => {\n        this.tiles[loc].boatPresent = true;\n        const div = document.getElementById(playerCode+loc);\n        div.classList.add('ship');\n      })\n\n      this.inPlay.push(this.dock[0]);\n      this.dock.splice(0, 1);  \n    }\n\n    checkForCollisions(locationArray) {\n        const xArrayBumber = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99]\n        let legalLoc;\n        if (locationArray.some((e) => !this.tiles[e])){\n          legalLoc = false;\n        } else if (xArrayBumber.some((n)=>[n, n + 1].every((e) => locationArray.includes(e)))) {\n          legalLoc = false;\n        } else if (locationArray.some((e) => this.tiles[e].boatPresent)){\n          legalLoc = false;\n        } else {\n          legalLoc = true;\n        }\n\n        return legalLoc;\n    }\n\n\n\n/*\n Attack methods\n*/\n    checkLegalMove(location){\n      let legalMove = true;\n      if(this.tiles[location].isShot)  \n      legalMove = false;\n      return legalMove;\n    }\n\n    receiveAttack(player, location) {\n      const playerCode = player.playerName === \"Player 1\" ? \"000\" : \"999\"\n      const div = document.getElementById(playerCode+location);\n      div.classList.add('fired');\n\n      this.tiles[location].isShot = true;\n      this.inPlay.forEach(ship => ship.checkHit(location));\n        if(this.inPlay.some(e => e.didHit === true)){\n          this.hit = true;\n          div.classList.add('hit');\n          if (this.inPlay.some(ship => ship.sunk === true)) {\n            console.log('sunk')\n            const i = this.inPlay.findIndex(ship => ship.sunk);\n            this.handleSunkShip(this.inPlay[i]); \n            this.inPlay.splice(i,1);\n            _gameplay__WEBPACK_IMPORTED_MODULE_3__.players[0].board.checkForGameOver();          \n            _gameplay__WEBPACK_IMPORTED_MODULE_3__.players[1].board.checkForGameOver();\n        }\n      } else {\n        this.hit =  false;\n        div.classList.add('miss');_gameplay__WEBPACK_IMPORTED_MODULE_3__.players[0].board\n      }         \n      _gameplay__WEBPACK_IMPORTED_MODULE_3__.players[0].changeTurn();\n      _gameplay__WEBPACK_IMPORTED_MODULE_3__.players[1].changeTurn();\n\n  }\n\n    handleSunkShip(ship) {\n      this.graveyard.push(ship);      \n  }\n    \n    checkForGameOver() {\n      console.log('start game over test')\n      this.gameOver = (this.graveyard.length === 5) ? true : false;\n      if(this.gameOver){\n        console.log('game over')\n        const endScreen = document.getElementById('game-over').style.visibility = \"visible\"\n\n      }\n      return this.gameOver;\n    }\n\n/*\nCPU Setup\n*/\n    getRandomNumber(min, max){\n      return Math.floor(Math.random() * (max - min) +min);\n    }\n\n    setupCpuShips(){\n      while(this.inPlay.length < 5){\n      var random = this.getRandomNumber(0, 100);\n      let axisTest = this.getRandomNumber(0,2);\n      this.yAxis = axisTest === 0 ? true : false;\n      var locationArray = this.createLocationArray(random);\n\n      if(this.checkForCollisions(locationArray)){\n        locationArray.forEach(loc => this.dock[0].locationArr.push(loc));\n        this.inPlay.push(this.dock[0]);\n        this.dock.splice(0, 1);\n        \n      } else {\n        this.setupCpuShips();\n      }\n      \n      }\n      (0,_gamecontroller__WEBPACK_IMPORTED_MODULE_2__.changeGameState)();\n\n      }\n\n  \n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameBoard);\n\n\n\n//# sourceURL=webpack://battleship/./src/factories/gameboard.js?");

/***/ }),

/***/ "./src/factories/playerfactor.js":
/*!***************************************!*\
  !*** ./src/factories/playerfactor.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _gamecontroller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../gamecontroller */ \"./src/gamecontroller.js\");\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ \"./src/factories/gameboard.js\");\n/* harmony import */ var _gameplay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../gameplay */ \"./src/gameplay.js\");\n\n\n\n\nclass Player {\n  constructor(playerName, type) {\n    this.playerName = playerName;\n    this.type = type;\n    this.turn = false;\n    this.board = new _gameboard__WEBPACK_IMPORTED_MODULE_1__[\"default\"](10);\n  }\n\n\n    changeTurn() {\n      this.turn = this.turn === false ? true : false;\n    }\n\n    fireShot(location) {\n      const player = _gameplay__WEBPACK_IMPORTED_MODULE_2__.players[1];\n      if (_gamecontroller__WEBPACK_IMPORTED_MODULE_0__.gameState === _gamecontroller__WEBPACK_IMPORTED_MODULE_0__.attack && _gameplay__WEBPACK_IMPORTED_MODULE_2__.players[0].turn === true){\n        if(!player.board.firedShots.includes(location)){\n          player.board.firedShots.push(location);\n          player.board.receiveAttack(player, location);\n          _gameplay__WEBPACK_IMPORTED_MODULE_2__.players[1].cpuAttack();\n      \n        } else {\n          return false\n        }\n    }\n  }\n\n  cpuAttack(){\n      const player = _gameplay__WEBPACK_IMPORTED_MODULE_2__.players[0];\n      if (_gamecontroller__WEBPACK_IMPORTED_MODULE_0__.gameState === _gamecontroller__WEBPACK_IMPORTED_MODULE_0__.attack && _gameplay__WEBPACK_IMPORTED_MODULE_2__.players[1].turn === true){\n        const location = this.board.getRandomNumber(0, 100)\n        if(!player.board.firedShots.includes(location)){\n          player.board.firedShots.push(location);\n          player.board.receiveAttack(player, location);\n        } else {\n          this.cpuAttack(player);\n      }\n    }\n    \n\n  }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n\n//# sourceURL=webpack://battleship/./src/factories/playerfactor.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"gameStateArr\": () => (/* binding */ gameStateArr),\n/* harmony export */   \"cpuSetup\": () => (/* binding */ cpuSetup),\n/* harmony export */   \"playerSetup\": () => (/* binding */ playerSetup),\n/* harmony export */   \"attack\": () => (/* binding */ attack),\n/* harmony export */   \"gameState\": () => (/* binding */ gameState),\n/* harmony export */   \"changeGameState\": () => (/* binding */ changeGameState)\n/* harmony export */ });\n/* harmony import */ var _src_gameplay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/gameplay */ \"./src/gameplay.js\");\n\n\nconst gameStateArr = [ 'cpu setup','player setup', 'attack'];\nconst [cpuSetup, playerSetup, attack] = gameStateArr;\nlet gameState = cpuSetup;\n\nfunction changeGameState(){\n\n    if(gameState === cpuSetup){\n        gameState = playerSetup;         \n    } else if (gameState === playerSetup && _src_gameplay__WEBPACK_IMPORTED_MODULE_0__.players[0].board.dock.length === 0 && _src_gameplay__WEBPACK_IMPORTED_MODULE_0__.players[1].board.dock.length === 0 ) {\n        gameState = attack;\n    } \n}\n    \n\n\n\n//# sourceURL=webpack://battleship/./src/gamecontroller.js?");

/***/ }),

/***/ "./src/gameplay.js":
/*!*************************!*\
  !*** ./src/gameplay.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"players\": () => (/* binding */ players)\n/* harmony export */ });\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n/* harmony import */ var _factories_playerfactor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./factories/playerfactor */ \"./src/factories/playerfactor.js\");\n/* harmony import */ var _gamecontroller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gamecontroller */ \"./src/gamecontroller.js\");\n\n\n\n\nvar player = new _factories_playerfactor__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('Player 1', \"player\");\nvar player2 = new _factories_playerfactor__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('Player 2', \"cpu\");\nconst players = [player, player2];\n_dom__WEBPACK_IMPORTED_MODULE_0__.rotateButton.addEventListener('click', player.board.rotateShip.bind(player.board))\n\nplayer.board.setupBoard();\nplayer2.board.setupBoard();\nplayer.board.createShips();\nplayer2.board.createShips();\nconsole.log(_gamecontroller__WEBPACK_IMPORTED_MODULE_2__.gameState)\n;(0,_dom__WEBPACK_IMPORTED_MODULE_0__.createGrid)(_dom__WEBPACK_IMPORTED_MODULE_0__.playerOneBoard);\n(0,_dom__WEBPACK_IMPORTED_MODULE_0__.setOppoBoard)(_dom__WEBPACK_IMPORTED_MODULE_0__.playerTwoBoard); \nplayer2.board.setupCpuShips();\n\nconsole.log(_gamecontroller__WEBPACK_IMPORTED_MODULE_2__.gameState)\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://battleship/./src/gameplay.js?");

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
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/gameplay.js");
/******/ 	
/******/ })()
;