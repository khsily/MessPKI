"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PKIContract =
/*#__PURE__*/
function () {
  function PKIContract(web3Data) {
    _classCallCheck(this, PKIContract);

    this.web3 = web3Data.web3;
    this.account = web3Data.accounts[0] || [];
    this.contract = web3Data.contract;
  }

  _createClass(PKIContract, [{
    key: "onAccChange",
    value: function onAccChange(callback) {
      var _this = this;

      this.web3.currentProvider.publicConfigStore.on('update', function (v) {
        if (_this.currentAcc.toUpperCase() !== v.selectedAddress.toUpperCase()) {
          if (callback) callback(v);
        }
      });
    }
  }, {
    key: "isAdmin",
    value: function () {
      var _isAdmin = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var owner;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.contract.methods.owner().call();

              case 2:
                owner = _context.sent;
                return _context.abrupt("return", owner === this.currentAcc);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function isAdmin() {
        return _isAdmin.apply(this, arguments);
      }

      return isAdmin;
    }()
    /**
     * 
     * @param {Object} data : 유저 데이터 객체 스트링
     * @param {String} hash : 암호화된 데이터 해시
     */

  }, {
    key: "append",
    value: function () {
      var _append = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(data, hash) {
        var res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.contract.methods.append(data, hash).call({
                  from: this.currentAcc
                });

              case 2:
                res = _context2.sent;
                _context2.next = 5;
                return this.contract.methods.append(data, hash).send({
                  from: this.currentAcc
                });

              case 5:
                return _context2.abrupt("return", res);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function append(_x, _x2) {
        return _append.apply(this, arguments);
      }

      return append;
    }()
    /**
     * 
     * @param {String} certId : append() 메서드를 통해 리턴된 certId 값
     * @param {*} sign : sign 해시
     * @param {*} expiry : 서명 유지 시간 (초단위)
     */

  }, {
    key: "sign",
    value: function () {
      var _sign2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(certId, _sign) {
        var expiry,
            res,
            _args3 = arguments;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                expiry = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : 3000;
                _context3.next = 3;
                return this.contract.methods.sign(certId, _sign, expiry).call({
                  from: this.currentAcc
                });

              case 3:
                res = _context3.sent;
                _context3.next = 6;
                return this.contract.methods.sign(certId, _sign, expiry).send({
                  from: this.currentAcc
                });

              case 6:
                return _context3.abrupt("return", res);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function sign(_x3, _x4) {
        return _sign2.apply(this, arguments);
      }

      return sign;
    }()
  }, {
    key: "getCertInfo",
    value: function () {
      var _getCertInfo = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(certId) {
        var res;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.contract.methods.registry(certId).call();

              case 2:
                res = _context4.sent;
                return _context4.abrupt("return", res);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getCertInfo(_x5) {
        return _getCertInfo.apply(this, arguments);
      }

      return getCertInfo;
    }()
  }, {
    key: "revoke",
    value: function () {
      var _revoke = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(certId) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.contract.methods.revoke(certId).send({
                  from: this.currentAcc
                });

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function revoke(_x6) {
        return _revoke.apply(this, arguments);
      }

      return revoke;
    }()
  }, {
    key: "getSignInfo",
    value: function () {
      var _getSignInfo = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(signId) {
        var res;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.contract.methods.signings(signId).call();

              case 2:
                res = _context6.sent;
                return _context6.abrupt("return", res);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getSignInfo(_x7) {
        return _getSignInfo.apply(this, arguments);
      }

      return getSignInfo;
    }()
  }, {
    key: "isSignatureValid",
    value: function () {
      var _isSignatureValid = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(signId) {
        var res;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.contract.methods.isSignatureValid(signId).call();

              case 2:
                res = _context7.sent;
                return _context7.abrupt("return", res);

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function isSignatureValid(_x8) {
        return _isSignatureValid.apply(this, arguments);
      }

      return isSignatureValid;
    }()
  }, {
    key: "currentAcc",
    get: function get() {
      return this.account;
    }
  }]);

  return PKIContract;
}();

var _default = PKIContract;
exports["default"] = _default;