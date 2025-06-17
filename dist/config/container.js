"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const AadhaarRepository_1 = require("../repositories/AadhaarRepository");
const AadhaarService_1 = require("../services/AadhaarService");
class Container {
    static getAadhaarRepository() {
        if (!this.aadhaarRepository) {
            this.aadhaarRepository = new AadhaarRepository_1.AadhaarRepository();
        }
        return this.aadhaarRepository;
    }
    static getAadhaarService() {
        if (!this.aadhaarService) {
            this.aadhaarService = new AadhaarService_1.AadhaarService(this.getAadhaarRepository());
        }
        return this.aadhaarService;
    }
}
exports.Container = Container;
