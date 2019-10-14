"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _web3 = _interopRequireDefault(require("web3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getWeb3 = function getWeb3() {
  return new Promise(function (resolve, reject) {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var web3, _web, provider, _web2;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!window.ethereum) {
                _context.next = 13;
                break;
              }

              web3 = new _web3["default"](window.ethereum);
              _context.prev = 2;
              _context.next = 5;
              return window.ethereum.enable();

            case 5:
              // Acccounts now exposed
              resolve(web3);
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](2);
              reject(_context.t0);

            case 11:
              _context.next = 14;
              break;

            case 13:
              // Legacy dapp browsers...
              if (window.web3) {
                // Use Mist/MetaMask's provider.
                _web = window.web3;
                console.log("Injected web3 detected.");
                resolve(_web);
              } // Fallback to localhost; use dev console port by default...
              else {
                  provider = new _web3["default"].providers.HttpProvider("http://127.0.0.1:8545");
                  _web2 = new _web3["default"](provider);
                  console.log("No web3 instance injected, using Local web3.");
                  resolve(_web2);
                }

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 8]]);
    })));
  });
};

var _default = getWeb3;
exports["default"] = _default;