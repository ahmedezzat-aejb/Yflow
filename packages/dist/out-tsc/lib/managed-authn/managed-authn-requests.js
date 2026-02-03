"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagedAuthnRequestBody = void 0;
var typebox_1 = require("@sinclair/typebox");
exports.ManagedAuthnRequestBody = typebox_1.Type.Object({
    //if you change this you need to update the embed-sdk I can't import it there because it can't have dependencies 
    externalAccessToken: typebox_1.Type.String(),
});
