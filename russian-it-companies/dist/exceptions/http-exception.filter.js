"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
var common_1 = require("@nestjs/common");
var rxjs_1 = require("rxjs");
var HttpExceptionFilter = /** @class */ (function () {
    function HttpExceptionFilter() {
    }
    HttpExceptionFilter.prototype.catch = function (exception, host) {
        var ctx = host.switchToRpc().getContext();
        return (0, rxjs_1.throwError)(function () { return new common_1.HttpException(exception.message, exception.getStatus()); });
    };
    HttpExceptionFilter = __decorate([
        (0, common_1.Catch)(common_1.HttpException)
    ], HttpExceptionFilter);
    return HttpExceptionFilter;
}());
exports.HttpExceptionFilter = HttpExceptionFilter;
//# sourceMappingURL=http-exception.filter.js.map