"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAadhaarData = void 0;
const parseAadhaarData = (frontText, backText) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    const nameRegex = /([A-Z][a-z]+\s+[A-Z][a-z]+(\s+[A-Z][a-z]+)?)/;
    const dobRegex = /(?:DOB\s*[:]\s*)(\d{2}\/\d{2}\/\d{4})/i;
    const genderRegex = /\b(Male|Female|Other)\b/i;
    const aadhaarNumberRegex = /(\d{4}\s\d{4}\s\d{4})/;
    const addressRegex = /Address:\s*([\s\S]*?)(?:\d{6})/;
    console.log('Front Text Raw:', frontText);
    console.log('Back Text Raw:', backText);
    const name = ((_b = (_a = frontText.match(nameRegex)) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.trim()) ||
        ((_d = (_c = backText.match(nameRegex)) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.trim()) ||
        '';
    const dob = ((_f = (_e = frontText.match(dobRegex)) === null || _e === void 0 ? void 0 : _e[1]) === null || _f === void 0 ? void 0 : _f.trim()) ||
        ((_h = (_g = backText.match(dobRegex)) === null || _g === void 0 ? void 0 : _g[1]) === null || _h === void 0 ? void 0 : _h.trim()) ||
        '';
    const gender = ((_k = (_j = frontText.match(genderRegex)) === null || _j === void 0 ? void 0 : _j[0]) === null || _k === void 0 ? void 0 : _k.trim()) ||
        ((_m = (_l = backText.match(genderRegex)) === null || _l === void 0 ? void 0 : _l[0]) === null || _m === void 0 ? void 0 : _m.trim()) ||
        '';
    const aadhaarNumber = ((_p = (_o = frontText.match(aadhaarNumberRegex)) === null || _o === void 0 ? void 0 : _o[1]) === null || _p === void 0 ? void 0 : _p.trim()) ||
        ((_r = (_q = backText.match(aadhaarNumberRegex)) === null || _q === void 0 ? void 0 : _q[1]) === null || _r === void 0 ? void 0 : _r.trim()) ||
        '';
    const addressMatch = backText.match(addressRegex);
    const address = ((_s = addressMatch === null || addressMatch === void 0 ? void 0 : addressMatch[1]) === null || _s === void 0 ? void 0 : _s.trim()) || '';
    const pincode = ((_t = backText.match(/\b(\d{6})\b/)) === null || _t === void 0 ? void 0 : _t[1]) || '';
    console.log('Parsed Results:', {
        name,
        dob,
        gender,
        aadhaarNumber,
        address,
        pincode
    });
    return {
        name,
        dob,
        gender,
        aadhaarNumber,
        address,
        pincode,
    };
};
exports.parseAadhaarData = parseAadhaarData;
