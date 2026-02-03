"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListProjectRequestForPlatformQueryParams = exports.CreatePlatformProjectRequest = exports.UpdateProjectPlatformRequest = void 0;
var shared_1 = require("@Yflow/shared");
var typebox_1 = require("@sinclair/typebox");
exports.UpdateProjectPlatformRequest = typebox_1.Type.Object({
    releasesEnabled: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
    displayName: typebox_1.Type.Optional(typebox_1.Type.String({
        pattern: shared_1.SAFE_STRING_PATTERN,
    })),
    externalId: typebox_1.Type.Optional(typebox_1.Type.String()),
    metadata: typebox_1.Type.Optional(shared_1.Metadata),
    icon: typebox_1.Type.Optional(shared_1.ProjectIcon),
    plan: typebox_1.Type.Optional(typebox_1.Type.Object({
        pieces: typebox_1.Type.Optional(typebox_1.Type.Array(typebox_1.Type.String({}))),
        piecesFilterType: typebox_1.Type.Optional(typebox_1.Type.Enum(shared_1.PiecesFilterType)),
    })),
});
exports.CreatePlatformProjectRequest = typebox_1.Type.Object({
    displayName: typebox_1.Type.String({
        pattern: shared_1.SAFE_STRING_PATTERN,
    }),
    externalId: (0, shared_1.Nullable)(typebox_1.Type.String()),
    metadata: (0, shared_1.Nullable)(shared_1.Metadata),
    maxConcurrentJobs: (0, shared_1.Nullable)(typebox_1.Type.Number()),
});
exports.ListProjectRequestForPlatformQueryParams = typebox_1.Type.Object({
    externalId: typebox_1.Type.Optional(typebox_1.Type.String()),
    limit: typebox_1.Type.Optional(typebox_1.Type.Number({})),
    cursor: typebox_1.Type.Optional(typebox_1.Type.String({})),
    displayName: typebox_1.Type.Optional(typebox_1.Type.String()),
    types: typebox_1.Type.Optional(typebox_1.Type.Array(typebox_1.Type.Enum(shared_1.ProjectType))),
});
