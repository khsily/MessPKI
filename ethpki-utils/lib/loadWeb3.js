"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getWeb = _interopRequireDefault(require("./getWeb3"));

var _PKI = _interopRequireDefault(require("../contracts/PKI.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var loadWeb3 =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var web3, accounts, networkId, deployedNetwork, contract;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _getWeb["default"])();

          case 3:
            web3 = _context.sent;
            _context.next = 6;
            return web3.eth.getAccounts();

          case 6:
            accounts = _context.sent;
            _context.next = 9;
            return web3.eth.net.getId();

          case 9:
            networkId = _context.sent;
            deployedNetwork = _PKI["default"].networks[networkId];
            contract = new web3.eth.Contract(_PKI["default"].abi, deployedNetwork && deployedNetwork.address); // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.

            return _context.abrupt("return", {
              web3: web3,
              accounts: accounts,
              contract: contract
            });

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](0);
            // Catch any errors for any of the above operations.
            alert("Failed to load web3, accounts, or contract. Check console for details.");
            console.error(_context.t0);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 15]]);
  }));

  return function loadWeb3() {
    return _ref.apply(this, arguments);
  };
}();

var _default = loadWeb3;
exports["default"] = _default;