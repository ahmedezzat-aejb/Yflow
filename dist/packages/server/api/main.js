/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("reflect-metadata");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(5);
const project_module_1 = __webpack_require__(6);
const project_entity_1 = __webpack_require__(7);
const flow_module_1 = __webpack_require__(12);
const flow_entity_1 = __webpack_require__(9);
const explore_module_1 = __webpack_require__(16);
const websocket_module_1 = __webpack_require__(14);
const auth_module_1 = __webpack_require__(20);
const auth_entity_1 = __webpack_require__(19);
const webhook_module_1 = __webpack_require__(26);
const webhook_entity_1 = __webpack_require__(25);
const dbConfig = process.env.DB_TYPE === 'postgres' ? {
    type: 'postgres',
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'yflow',
} : {
    type: 'sqlite',
    database: 'data/yflow.db',
    synchronize: true,
};
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                ...dbConfig,
                entities: [project_entity_1.ProjectEntity, flow_entity_1.FlowEntity, auth_entity_1.UserEntity, webhook_entity_1.WebhookEntity, webhook_entity_1.WebhookEventEntity],
                autoLoadEntities: true,
                synchronize: true,
                retryAttempts: 10,
                retryDelay: 3000,
                extra: dbConfig.type === 'postgres' ? {
                    poolSize: 10,
                } : undefined,
            }),
            project_module_1.ProjectModule,
            flow_module_1.FlowModule,
            explore_module_1.ExploreModule,
            websocket_module_1.WebsocketModule,
            auth_module_1.AuthModule,
            webhook_module_1.WebhookModule,
        ],
    })
], AppModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectModule = void 0;
const common_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(5);
const project_entity_1 = __webpack_require__(7);
const project_service_1 = __webpack_require__(10);
const project_controller_1 = __webpack_require__(11);
let ProjectModule = class ProjectModule {
};
exports.ProjectModule = ProjectModule;
exports.ProjectModule = ProjectModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([project_entity_1.ProjectEntity])],
        controllers: [project_controller_1.ProjectController],
        providers: [project_service_1.ProjectService],
        exports: [project_service_1.ProjectService],
    })
], ProjectModule);


/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectEntity = void 0;
__webpack_require__(1);
const typeorm_1 = __webpack_require__(8);
const flow_entity_1 = __webpack_require__(9);
let ProjectEntity = class ProjectEntity {
};
exports.ProjectEntity = ProjectEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProjectEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], ProjectEntity.prototype, "displayName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'jsonb',
        nullable: true,
        default: { type: "free", expiresAt: null, subscriptionId: null }
    }),
    __metadata("design:type", Object)
], ProjectEntity.prototype, "plan", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => flow_entity_1.FlowEntity, flow => flow.project),
    __metadata("design:type", Array)
], ProjectEntity.prototype, "flows", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ProjectEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], ProjectEntity.prototype, "updatedAt", void 0);
exports.ProjectEntity = ProjectEntity = __decorate([
    (0, typeorm_1.Entity)('project')
], ProjectEntity);


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FlowEntity = void 0;
__webpack_require__(1);
const typeorm_1 = __webpack_require__(8);
const project_entity_1 = __webpack_require__(7);
const auth_entity_1 = __webpack_require__(19);
let FlowEntity = class FlowEntity {
};
exports.FlowEntity = FlowEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FlowEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], FlowEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], FlowEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        default: 'draft'
    }),
    __metadata("design:type", String)
], FlowEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", typeof (_a = typeof Record !== "undefined" && Record) === "function" ? _a : Object)
], FlowEntity.prototype, "configuration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], FlowEntity.prototype, "steps", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], FlowEntity.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], FlowEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.ProjectEntity, project => project.flows, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'projectId' }),
    __metadata("design:type", typeof (_b = typeof project_entity_1.ProjectEntity !== "undefined" && project_entity_1.ProjectEntity) === "function" ? _b : Object)
], FlowEntity.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => auth_entity_1.UserEntity, user => user.flows, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", typeof (_c = typeof auth_entity_1.UserEntity !== "undefined" && auth_entity_1.UserEntity) === "function" ? _c : Object)
], FlowEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], FlowEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], FlowEntity.prototype, "updatedAt", void 0);
exports.FlowEntity = FlowEntity = __decorate([
    (0, typeorm_1.Entity)('flow')
], FlowEntity);


/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectService = void 0;
const common_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(8);
const project_entity_1 = __webpack_require__(7);
let ProjectService = class ProjectService {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    async create(data) {
        const project = this.projectRepository.create({
            ...data,
            plan: { type: 'free', expiresAt: null }
        });
        return this.projectRepository.save(project);
    }
    async findAll() {
        return this.projectRepository.find({
            relations: ['flows']
        });
    }
    async findOne(id) {
        return this.projectRepository.findOne({
            where: { id },
            relations: ['flows']
        });
    }
    async update(id, request) {
        await this.projectRepository.update(id, request);
        return this.projectRepository.findOneBy({ id });
    }
    async remove(id) {
        return this.projectRepository.delete(id);
    }
    async canUseFeature(projectId, featureName) {
        const project = await this.projectRepository.findOneBy({ id: projectId });
        if (!project || !project.plan || project.plan.type === 'free') {
            return false;
        }
        if (project.plan.expiresAt) {
            const now = new Date();
            const expiresAt = new Date(project.plan.expiresAt);
            if (expiresAt < now) {
                console.log(`⚠️ Yflow System: Subscription for project ${projectId} has expired.`);
                return false;
            }
        }
        return true;
    }
    async generateSberbankLink(projectId, months = 1) {
        const url = process.env.SBER_API_URL || 'https://sandbox.payment.sberbank.ru/payment/rest/register.do';
        const BASE_PRICE_RUB = 500;
        let totalAmount = months * BASE_PRICE_RUB;
        if (months >= 12)
            totalAmount *= 0.8;
        const finalSberAmount = Math.round(totalAmount * 100);
        const params = new URLSearchParams({
            userName: process.env.SBER_USERNAME || 'T7714222111-api',
            password: process.env.SBER_PASSWORD || 'password_test',
            orderNumber: `YFLOW-${projectId}-${months}-${Date.now()}`,
            amount: finalSberAmount.toString(),
            returnUrl: process.env.SBER_RETURN_URL || 'http://localhost:3333/projects/sber-callback',
            currency: "643",
            description: `Upgrade Yflow project to Golden - ${months} months`
        });
        try {
            const response = await fetch(`${url}?${params.toString()}`);
            const result = await response.json();
            if (result.errorCode)
                throw new Error(result.errorMessage);
            return { paymentUrl: result.formUrl };
        }
        catch (error) {
            throw new Error("Yflow Payment Error: فشل الاتصال بالبنك");
        }
    }
    async finalizeUpgrade(projectId, months) {
        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + months);
        const updatedPlan = {
            type: 'golden',
            expiresAt: expiryDate,
            activatedAt: new Date()
        };
        console.log(`🚀 [Yflow System] Project ${projectId} is now GOLDEN until ${expiryDate.toDateString()}`);
        return await this.projectRepository.update(projectId, { plan: updatedPlan });
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.ProjectEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], ProjectService);


/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProjectController = void 0;
const common_1 = __webpack_require__(4);
const project_service_1 = __webpack_require__(10);
let ProjectController = class ProjectController {
    constructor(projectService) {
        this.projectService = projectService;
    }
    async create(data) {
        return this.projectService.create(data);
    }
    async findAll() {
        return this.projectService.findAll();
    }
    async findOne(id) {
        return this.projectService.findOne(+id);
    }
    async update(id, request) {
        return this.projectService.update(+id, request);
    }
    async remove(id) {
        return this.projectService.remove(+id);
    }
    async upgradeProject(projectId, months) {
        const monthsCount = parseInt(months) || 1;
        console.log(`🚀 طلب ترقية للمشروع: ${projectId} لمدة ${monthsCount} شهر`);
        const payment = await this.projectService.generateSberbankLink(+projectId, monthsCount);
        return {
            status: 'redirect',
            url: payment.paymentUrl
        };
    }
    async handleSberbank(orderId, res) {
        console.log(`✅ تم الرجوع من البنك للطلب: ${orderId}`);
        const parts = orderId.split('-');
        const projectId = parts[1];
        await this.projectService.finalizeUpgrade(+projectId, 1);
        return res.redirect('http://localhost:4200/dashboard?status=success');
    }
};
exports.ProjectController = ProjectController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/upgrade-to-golden'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('months')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "upgradeProject", null);
__decorate([
    (0, common_1.Get)('sber-callback'),
    __param(0, (0, common_1.Query)('orderId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "handleSberbank", null);
exports.ProjectController = ProjectController = __decorate([
    (0, common_1.Controller)('projects'),
    __metadata("design:paramtypes", [typeof (_a = typeof project_service_1.ProjectService !== "undefined" && project_service_1.ProjectService) === "function" ? _a : Object])
], ProjectController);


/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FlowModule = void 0;
const common_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(5);
const flow_service_1 = __webpack_require__(13);
const flow_controller_1 = __webpack_require__(15);
const flow_entity_1 = __webpack_require__(9);
const project_entity_1 = __webpack_require__(7);
let FlowModule = class FlowModule {
};
exports.FlowModule = FlowModule;
exports.FlowModule = FlowModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([flow_entity_1.FlowEntity, project_entity_1.ProjectEntity])],
        controllers: [flow_controller_1.FlowController],
        providers: [flow_service_1.FlowService],
        exports: [flow_service_1.FlowService],
    })
], FlowModule);


/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FlowService = void 0;
const common_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(8);
const flow_entity_1 = __webpack_require__(9);
const project_entity_1 = __webpack_require__(7);
let FlowService = class FlowService {
    constructor(flowRepository, projectRepository) {
        this.flowRepository = flowRepository;
        this.projectRepository = projectRepository;
    }
    async create(data) {
        const flow = this.flowRepository.create(data);
        return this.flowRepository.save(flow);
    }
    async findAll(projectId) {
        const queryBuilder = this.flowRepository
            .createQueryBuilder('flow')
            .leftJoinAndSelect('flow.project', 'project');
        if (projectId) {
            queryBuilder.where('project.id = :projectId', { projectId });
        }
        return queryBuilder.getMany();
    }
    async findOne(id) {
        return this.flowRepository.findOne({
            where: { id },
            relations: ['project']
        });
    }
    async update(id, data) {
        await this.flowRepository.update(id, data);
        return this.findOne(id);
    }
    async remove(id) {
        return this.flowRepository.delete(id);
    }
    async findByProject(projectId) {
        return this.flowRepository.find({
            where: { project: { id: projectId } },
            relations: ['project']
        });
    }
    async updateStatus(id, status) {
        await this.flowRepository.update(id, { status });
        return this.findOne(id);
    }
    async executeFlow(flowId) {
        try {
            const flow = await this.findOne(flowId);
            if (!flow) {
                throw new Error(`Flow with ID ${flowId} not found`);
            }
            const steps = flow.steps || [];
            console.log(`🚀 Flow ${flow.name} ready for execution`);
            console.log(`📋 Steps:`, steps);
            return {
                success: true,
                message: 'Flow execution simulated successfully',
                flowName: flow.name,
                steps: steps
            };
        }
        catch (error) {
            console.error('❌ Error executing flow:', error);
            throw new Error(`Failed to execute flow: ${error.message}`);
        }
    }
};
exports.FlowService = FlowService;
exports.FlowService = FlowService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(flow_entity_1.FlowEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(project_entity_1.ProjectEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], FlowService);


/***/ }),
/* 14 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebsocketModule = void 0;
const common_1 = __webpack_require__(4);
const clean_gateway_1 = __webpack_require__(22);
let WebsocketModule = class WebsocketModule {
};
exports.WebsocketModule = WebsocketModule;
exports.WebsocketModule = WebsocketModule = __decorate([
    (0, common_1.Module)({
        providers: [clean_gateway_1.FlowExecutionGateway],
        exports: [clean_gateway_1.FlowExecutionGateway],
    })
], WebsocketModule);


/***/ }),
/* 15 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FlowController = void 0;
const common_1 = __webpack_require__(4);
const flow_service_1 = __webpack_require__(13);
let FlowController = class FlowController {
    constructor(flowService) {
        this.flowService = flowService;
    }
    create(createFlowDto) {
        return this.flowService.create(createFlowDto);
    }
    findAll(projectId) {
        return this.flowService.findAll(projectId);
    }
    findOne(id) {
        return this.flowService.findOne(+id);
    }
    update(id, updateFlowDto) {
        return this.flowService.update(+id, updateFlowDto);
    }
    updateStatus(id, status) {
        return this.flowService.updateStatus(+id, status);
    }
    remove(id) {
        return this.flowService.remove(+id);
    }
    findByProject(projectId) {
        return this.flowService.findByProject(+projectId);
    }
    async executeFlow(id) {
        return this.flowService.executeFlow(+id);
    }
};
exports.FlowController = FlowController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof Partial !== "undefined" && Partial) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], FlowController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FlowController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FlowController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof Partial !== "undefined" && Partial) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], FlowController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], FlowController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FlowController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('project/:projectId'),
    __param(0, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FlowController.prototype, "findByProject", null);
__decorate([
    (0, common_1.Post)(':id/execute'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FlowController.prototype, "executeFlow", null);
exports.FlowController = FlowController = __decorate([
    (0, common_1.Controller)('flows'),
    __metadata("design:paramtypes", [typeof (_a = typeof flow_service_1.FlowService !== "undefined" && flow_service_1.FlowService) === "function" ? _a : Object])
], FlowController);


/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExploreModule = void 0;
const common_1 = __webpack_require__(4);
const explore_controller_1 = __webpack_require__(17);
let ExploreModule = class ExploreModule {
};
exports.ExploreModule = ExploreModule;
exports.ExploreModule = ExploreModule = __decorate([
    (0, common_1.Module)({
        controllers: [explore_controller_1.ExploreController, explore_controller_1.AppsController, explore_controller_1.UtilityController],
    })
], ExploreModule);


/***/ }),
/* 17 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UtilityController = exports.AppsController = exports.ExploreController = void 0;
const common_1 = __webpack_require__(4);
let ExploreController = class ExploreController {
    constructor() {
        this.exploreItems = [
            {
                id: '1',
                name: 'Email Automation Suite',
                description: 'Complete email marketing automation with personalization',
                category: 'Popular',
                icon: '📧',
                popularity: 98,
                isNew: false,
                isPremium: false,
                tags: ['Email', 'Marketing', 'Automation']
            },
            {
                id: '2',
                name: 'Social Media Manager',
                description: 'Schedule and manage posts across all social platforms',
                category: 'Popular',
                icon: '📱',
                popularity: 95,
                isNew: true,
                isPremium: false,
                tags: ['Social Media', 'Scheduling', 'Marketing']
            },
            {
                id: '3',
                name: 'E-commerce Integration',
                description: 'Connect your online store with multiple sales channels',
                category: 'Popular',
                icon: '🛒',
                popularity: 92,
                isNew: false,
                isPremium: true,
                tags: ['E-commerce', 'Sales', 'Integration']
            }
        ];
        this.apps = [
            {
                id: 'slack',
                name: 'Slack',
                description: 'Team communication and collaboration platform',
                category: 'Communication',
                icon: '💬',
                color: 'bg-purple-500',
                isInstalled: false,
                isPremium: false,
                popularity: 98,
                features: ['Send Messages', 'Create Channels', 'File Sharing', 'Webhooks'],
                connections: 1250000
            },
            {
                id: 'gmail',
                name: 'Gmail',
                description: 'Google\'s email service with powerful automation',
                category: 'Communication',
                icon: '📧',
                color: 'bg-red-500',
                isInstalled: true,
                isPremium: false,
                popularity: 99,
                features: ['Send Emails', 'Read Emails', 'Label Management', 'Filters'],
                connections: 2100000
            }
        ];
        this.utilities = [
            {
                id: 'data-transformer',
                name: 'Data Transformer',
                description: 'Transform and manipulate data between different formats',
                category: 'Data Processing',
                icon: '🔄',
                color: 'bg-blue-500',
                isAvailable: true,
                isPremium: false,
                lastUsed: '2 hours ago',
                usage: 156,
                action: 'Transform'
            },
            {
                id: 'json-validator',
                name: 'JSON Validator',
                description: 'Validate and format JSON data',
                category: 'Data Processing',
                icon: '✅',
                color: 'bg-purple-500',
                isAvailable: true,
                isPremium: false,
                lastUsed: '30 minutes ago',
                usage: 234,
                action: 'Validate'
            }
        ];
    }
    getExploreItems(category, search) {
        let filteredItems = this.exploreItems;
        if (category && category !== 'All') {
            filteredItems = filteredItems.filter(item => item.category === category);
        }
        if (search) {
            filteredItems = filteredItems.filter(item => item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.description.toLowerCase().includes(search.toLowerCase()) ||
                item.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())));
        }
        return {
            data: filteredItems,
            total: filteredItems.length,
            categories: ['All', 'Popular', 'Business', 'Data', 'Communication', 'Productivity']
        };
    }
    getExploreItem(id) {
        const item = this.exploreItems.find(item => item.id === id);
        if (!item) {
            throw new Error('Explore item not found');
        }
        return { data: item };
    }
};
exports.ExploreController = ExploreController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('category')),
    __param(1, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ExploreController.prototype, "getExploreItems", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExploreController.prototype, "getExploreItem", null);
exports.ExploreController = ExploreController = __decorate([
    (0, common_1.Controller)('explore')
], ExploreController);
let AppsController = class AppsController {
    constructor() {
        this.apps = [
            {
                id: 'slack',
                name: 'Slack',
                description: 'Team communication and collaboration platform',
                category: 'Communication',
                icon: '💬',
                color: 'bg-purple-500',
                isInstalled: false,
                isPremium: false,
                popularity: 98,
                features: ['Send Messages', 'Create Channels', 'File Sharing', 'Webhooks'],
                connections: 1250000
            },
            {
                id: 'gmail',
                name: 'Gmail',
                description: 'Google\'s email service with powerful automation',
                category: 'Communication',
                icon: '📧',
                color: 'bg-red-500',
                isInstalled: true,
                isPremium: false,
                popularity: 99,
                features: ['Send Emails', 'Read Emails', 'Label Management', 'Filters'],
                connections: 2100000
            },
            {
                id: 'shopify',
                name: 'Shopify',
                description: 'E-commerce platform for online stores',
                category: 'E-commerce',
                icon: '🛒',
                color: 'bg-green-600',
                isInstalled: false,
                isPremium: true,
                popularity: 96,
                features: ['Product Management', 'Order Processing', 'Inventory', 'Customer Data'],
                connections: 890000
            }
        ];
    }
    getApps(category, search, installedOnly) {
        let filteredApps = this.apps;
        if (category && category !== 'All') {
            filteredApps = filteredApps.filter(app => app.category === category);
        }
        if (search) {
            filteredApps = filteredApps.filter(app => app.name.toLowerCase().includes(search.toLowerCase()) ||
                app.description.toLowerCase().includes(search.toLowerCase()) ||
                app.features.some(feature => feature.toLowerCase().includes(search.toLowerCase())));
        }
        if (installedOnly === 'true') {
            filteredApps = filteredApps.filter(app => app.isInstalled);
        }
        return {
            data: filteredApps,
            total: filteredApps.length,
            installed: this.apps.filter(app => app.isInstalled).length,
            categories: ['All', 'Communication', 'Productivity', 'E-commerce', 'Marketing', 'Data', 'Storage']
        };
    }
    getApp(id) {
        const app = this.apps.find(app => app.id === id);
        if (!app) {
            throw new Error('App not found');
        }
        return { data: app };
    }
    connectApp(id) {
        const app = this.apps.find(app => app.id === id);
        if (!app) {
            throw new Error('App not found');
        }
        app.isInstalled = true;
        return {
            message: 'App connected successfully',
            data: app
        };
    }
    disconnectApp(id) {
        const app = this.apps.find(app => app.id === id);
        if (!app) {
            throw new Error('App not found');
        }
        app.isInstalled = false;
        return {
            message: 'App disconnected successfully',
            data: app
        };
    }
};
exports.AppsController = AppsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('category')),
    __param(1, (0, common_1.Query)('search')),
    __param(2, (0, common_1.Query)('installedOnly')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], AppsController.prototype, "getApps", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppsController.prototype, "getApp", null);
__decorate([
    Post(':id/connect'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppsController.prototype, "connectApp", null);
__decorate([
    Post(':id/disconnect'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppsController.prototype, "disconnectApp", null);
exports.AppsController = AppsController = __decorate([
    (0, common_1.Controller)('apps')
], AppsController);
let UtilityController = class UtilityController {
    constructor() {
        this.utilities = [
            {
                id: 'data-transformer',
                name: 'Data Transformer',
                description: 'Transform and manipulate data between different formats',
                category: 'Data Processing',
                icon: '🔄',
                color: 'bg-blue-500',
                isAvailable: true,
                isPremium: false,
                lastUsed: '2 hours ago',
                usage: 156,
                action: 'Transform'
            },
            {
                id: 'json-validator',
                name: 'JSON Validator',
                description: 'Validate and format JSON data',
                category: 'Data Processing',
                icon: '✅',
                color: 'bg-purple-500',
                isAvailable: true,
                isPremium: false,
                lastUsed: '30 minutes ago',
                usage: 234,
                action: 'Validate'
            },
            {
                id: 'webhook-tester',
                name: 'Webhook Tester',
                description: 'Test and debug webhook endpoints',
                category: 'Testing & Debugging',
                icon: '🎣',
                color: 'bg-blue-500',
                isAvailable: true,
                isPremium: false,
                lastUsed: '1 hour ago',
                usage: 267,
                action: 'Test'
            }
        ];
    }
    getUtilities(category, search, availableOnly) {
        let filteredUtilities = this.utilities;
        if (category && category !== 'All') {
            filteredUtilities = filteredUtilities.filter(utility => utility.category === category);
        }
        if (search) {
            filteredUtilities = filteredUtilities.filter(utility => utility.name.toLowerCase().includes(search.toLowerCase()) ||
                utility.description.toLowerCase().includes(search.toLowerCase()));
        }
        if (availableOnly === 'true') {
            filteredUtilities = filteredUtilities.filter(utility => utility.isAvailable);
        }
        return {
            data: filteredUtilities,
            total: filteredUtilities.length,
            available: this.utilities.filter(utility => utility.isAvailable).length,
            categories: ['All', 'Data Processing', 'Text Processing', 'File Operations', 'Testing & Debugging', 'System Tools', 'Security Tools']
        };
    }
    getUtility(id) {
        const utility = this.utilities.find(utility => utility.id === id);
        if (!utility) {
            throw new Error('Utility not found');
        }
        return { data: utility };
    }
    executeUtility(id, body) {
        const utility = this.utilities.find(utility => utility.id === id);
        if (!utility) {
            throw new Error('Utility not found');
        }
        if (!utility.isAvailable) {
            throw new Error('Utility is not available');
        }
        utility.usage++;
        utility.lastUsed = new Date().toISOString();
        return {
            message: `${utility.name} executed successfully`,
            data: {
                utility: utility,
                input: body,
                output: `Processed by ${utility.name}`,
                timestamp: new Date().toISOString()
            }
        };
    }
};
exports.UtilityController = UtilityController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('category')),
    __param(1, (0, common_1.Query)('search')),
    __param(2, (0, common_1.Query)('availableOnly')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], UtilityController.prototype, "getUtilities", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UtilityController.prototype, "getUtility", null);
__decorate([
    Post(':id/execute'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UtilityController.prototype, "executeUtility", null);
exports.UtilityController = UtilityController = __decorate([
    (0, common_1.Controller)('utility')
], UtilityController);


/***/ }),
/* 18 */,
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserEntity = void 0;
const typeorm_1 = __webpack_require__(8);
const flow_entity_1 = __webpack_require__(9);
let UserEntity = class UserEntity {
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'user' }),
    __metadata("design:type", String)
], UserEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], UserEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], UserEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => flow_entity_1.FlowEntity, flow => flow.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "flows", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)('users')
], UserEntity);


/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(5);
const auth_controller_1 = __webpack_require__(21);
const clean_auth_service_1 = __webpack_require__(23);
const auth_entity_1 = __webpack_require__(19);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([auth_entity_1.UserEntity])],
        controllers: [auth_controller_1.AuthController],
        providers: [clean_auth_service_1.AuthService],
        exports: [clean_auth_service_1.AuthService],
    })
], AuthModule);


/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(4);
const clean_auth_service_1 = __webpack_require__(23);
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(registerDto) {
        try {
            return await this.authService.register(registerDto);
        }
        catch (error) {
            if (error.message.includes('already exists')) {
                throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
            }
            throw new common_1.HttpException('Registration failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async login(loginDto) {
        try {
            return await this.authService.login(loginDto);
        }
        catch (error) {
            throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async getProfile() {
        return {
            message: 'Profile endpoint - add authentication middleware in production',
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof clean_auth_service_1.RegisterDto !== "undefined" && clean_auth_service_1.RegisterDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof clean_auth_service_1.LoginDto !== "undefined" && clean_auth_service_1.LoginDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('profile'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof clean_auth_service_1.AuthService !== "undefined" && clean_auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FlowExecutionGateway = void 0;
class FlowExecutionGateway {
    constructor() {
        this.mockServer = null;
        console.log('🔌 WebSocket Gateway initialized (mock mode)');
    }
    handleConnection(client) {
        console.log(`Client connected: ${client?.id || 'mock-client'}`);
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client?.id || 'mock-client'}`);
    }
    handleJoinFlow(client, data) {
        console.log(`Client joined flow: ${data.flowId}`);
        return { flowId: data.flowId, message: 'Joined flow room' };
    }
    handleLeaveFlow(client, data) {
        console.log(`Client left flow: ${data.flowId}`);
        return { flowId: data.flowId, message: 'Left flow room' };
    }
    emitFlowStarted(flowId, projectId, data) {
        console.log(`🚀 Flow Started: ${flowId}`, data);
    }
    emitFlowCompleted(flowId, projectId, data) {
        console.log(`✅ Flow Completed: ${flowId}`, data);
    }
    emitFlowFailed(flowId, projectId, data) {
        console.log(`❌ Flow Failed: ${flowId}`, data);
    }
    emitStepStarted(flowId, projectId, data) {
        console.log(`🔄 Step Started: ${data.stepId}`, data);
    }
    emitStepCompleted(flowId, projectId, data) {
        console.log(`✅ Step Completed: ${data.stepId}`, data);
    }
    emitStepFailed(flowId, projectId, data) {
        console.log(`❌ Step Failed: ${data.stepId}`, data);
    }
    emitFlowProgress(flowId, projectId, data) {
        console.log(`📊 Flow Progress: ${flowId}`, data);
    }
}
exports.FlowExecutionGateway = FlowExecutionGateway;


/***/ }),
/* 23 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(8);
const auth_entity_1 = __webpack_require__(19);
let AuthService = class AuthService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async register(registerDto) {
        const { email, password, firstName, lastName } = registerDto;
        const existingUser = await this.usersRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new common_1.BadRequestException('User with this email already exists');
        }
        const user = this.usersRepository.create({
            email,
            password,
            firstName,
            lastName,
        });
        await this.usersRepository.save(user);
        const token = `token-${user.id}-${Date.now()}`;
        return {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            },
            token,
        };
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (user.password !== password) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (!user.isActive) {
            throw new common_1.UnauthorizedException('User account is deactivated');
        }
        const token = `token-${user.id}-${Date.now()}`;
        return {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            },
            token,
        };
    }
    async validateUser(userId) {
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user || !user.isActive) {
            throw new common_1.UnauthorizedException('User not found or inactive');
        }
        return user;
    }
    async getProfile(userId) {
        const user = await this.validateUser(userId);
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            createdAt: user.createdAt,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(auth_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], AuthService);


/***/ }),
/* 24 */,
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebhookEventEntity = exports.WebhookEntity = void 0;
const typeorm_1 = __webpack_require__(8);
const flow_entity_1 = __webpack_require__(9);
let WebhookEntity = class WebhookEntity {
};
exports.WebhookEntity = WebhookEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WebhookEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WebhookEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], WebhookEntity.prototype, "endpoint", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], WebhookEntity.prototype, "flowId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'active' }),
    __metadata("design:type", String)
], WebhookEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", typeof (_a = typeof Record !== "undefined" && Record) === "function" ? _a : Object)
], WebhookEntity.prototype, "config", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], WebhookEntity.prototype, "callCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], WebhookEntity.prototype, "lastCalled", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], WebhookEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], WebhookEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => flow_entity_1.FlowEntity, flow => flow.id),
    (0, typeorm_1.JoinColumn)({ name: 'flowId' }),
    __metadata("design:type", typeof (_e = typeof flow_entity_1.FlowEntity !== "undefined" && flow_entity_1.FlowEntity) === "function" ? _e : Object)
], WebhookEntity.prototype, "flow", void 0);
exports.WebhookEntity = WebhookEntity = __decorate([
    (0, typeorm_1.Entity)('webhooks')
], WebhookEntity);
let WebhookEventEntity = class WebhookEventEntity {
};
exports.WebhookEventEntity = WebhookEventEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WebhookEventEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], WebhookEventEntity.prototype, "webhookId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WebhookEventEntity.prototype, "eventName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", Object)
], WebhookEventEntity.prototype, "payload", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb' }),
    __metadata("design:type", typeof (_f = typeof Record !== "undefined" && Record) === "function" ? _f : Object)
], WebhookEventEntity.prototype, "headers", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], WebhookEventEntity.prototype, "processed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", typeof (_g = typeof Date !== "undefined" && Date) === "function" ? _g : Object)
], WebhookEventEntity.prototype, "processedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], WebhookEventEntity.prototype, "error", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_h = typeof Date !== "undefined" && Date) === "function" ? _h : Object)
], WebhookEventEntity.prototype, "createdAt", void 0);
exports.WebhookEventEntity = WebhookEventEntity = __decorate([
    (0, typeorm_1.Entity)('webhook_events')
], WebhookEventEntity);


/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebhookModule = void 0;
const common_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(5);
const webhook_service_1 = __webpack_require__(27);
const webhook_controller_1 = __webpack_require__(28);
const webhook_entity_1 = __webpack_require__(25);
let WebhookModule = class WebhookModule {
};
exports.WebhookModule = WebhookModule;
exports.WebhookModule = WebhookModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([webhook_entity_1.WebhookEntity, webhook_entity_1.WebhookEventEntity])],
        controllers: [webhook_controller_1.WebhookController],
        providers: [webhook_service_1.WebhookService],
        exports: [webhook_service_1.WebhookService],
    })
], WebhookModule);


/***/ }),
/* 27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebhookService = void 0;
const common_1 = __webpack_require__(4);
const typeorm_1 = __webpack_require__(5);
const typeorm_2 = __webpack_require__(8);
const webhook_entity_1 = __webpack_require__(25);
const clean_gateway_1 = __webpack_require__(22);
let WebhookService = class WebhookService {
    constructor(webhooksRepository, webhookEventsRepository, websocketGateway) {
        this.webhooksRepository = webhooksRepository;
        this.webhookEventsRepository = webhookEventsRepository;
        this.websocketGateway = websocketGateway;
    }
    async create(createWebhookDto) {
        const webhook = this.webhooksRepository.create(createWebhookDto);
        return await this.webhooksRepository.save(webhook);
    }
    async findAll() {
        return await this.webhooksRepository.find({
            relations: ['flow'],
        });
    }
    async findOne(id) {
        const webhook = await this.webhooksRepository.findOne({
            where: { id },
            relations: ['flow'],
        });
        if (!webhook) {
            throw new common_1.NotFoundException(`Webhook with ID ${id} not found`);
        }
        return webhook;
    }
    async update(id, updateData) {
        await this.webhooksRepository.update(id, updateData);
        return await this.findOne(id);
    }
    async remove(id) {
        const webhook = await this.findOne(id);
        await this.webhooksRepository.remove(webhook);
    }
    async processWebhook(endpoint, payload, headers) {
        const webhook = await this.webhooksRepository.findOne({
            where: { endpoint, status: 'active' },
            relations: ['flow'],
        });
        if (!webhook) {
            throw new common_1.NotFoundException('Webhook not found or inactive');
        }
        const webhookEvent = this.webhookEventsRepository.create({
            webhookId: webhook.id,
            eventName: 'webhook_received',
            payload,
            headers,
        });
        await this.webhookEventsRepository.save(webhookEvent);
        try {
            await this.webhooksRepository.update(webhook.id, {
                callCount: webhook.callCount + 1,
                lastCalled: new Date(),
            });
            if (webhook.flow) {
                await this.triggerFlow(webhook.flow, payload);
            }
            await this.webhookEventsRepository.update(webhookEvent.id, {
                processed: true,
                processedAt: new Date(),
            });
            return {
                success: true,
                eventId: webhookEvent.id,
                message: 'Webhook processed successfully',
            };
        }
        catch (error) {
            await this.webhookEventsRepository.update(webhookEvent.id, {
                error: error.message,
            });
            throw new common_1.BadRequestException(`Failed to process webhook: ${error.message}`);
        }
    }
    async triggerFlow(flow, payload) {
        this.websocketGateway.emitFlowStarted(flow.id.toString(), flow.projectId?.toString() || '', {
            flowId: flow.id,
            flowName: flow.name,
            trigger: 'webhook',
            payload,
            timestamp: new Date().toISOString(),
        });
        console.log(`🎯 Webhook triggered flow: ${flow.name} with payload:`, payload);
    }
    async getWebhookEvents(webhookId) {
        return await this.webhookEventsRepository.find({
            where: { webhookId },
            order: { createdAt: 'DESC' },
        });
    }
    async getWebhookStats(id) {
        const webhook = await this.findOne(id);
        const events = await this.getWebhookEvents(id);
        const successfulEvents = events.filter(e => e.processed && !e.error);
        const failedEvents = events.filter(e => e.error);
        return {
            webhook: {
                id: webhook.id,
                name: webhook.name,
                endpoint: webhook.endpoint,
                status: webhook.status,
                callCount: webhook.callCount,
                lastCalled: webhook.lastCalled,
            },
            stats: {
                totalEvents: events.length,
                successfulEvents: successfulEvents.length,
                failedEvents: failedEvents.length,
                successRate: events.length > 0 ? (successfulEvents.length / events.length) * 100 : 0,
            },
            recentEvents: events.slice(0, 10),
        };
    }
};
exports.WebhookService = WebhookService;
exports.WebhookService = WebhookService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(webhook_entity_1.WebhookEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(webhook_entity_1.WebhookEventEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof clean_gateway_1.FlowExecutionGateway !== "undefined" && clean_gateway_1.FlowExecutionGateway) === "function" ? _c : Object])
], WebhookService);


/***/ }),
/* 28 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebhookController = void 0;
const common_1 = __webpack_require__(4);
const express_1 = __webpack_require__(29);
const webhook_service_1 = __webpack_require__(27);
let WebhookController = class WebhookController {
    constructor(webhookService) {
        this.webhookService = webhookService;
    }
    create(createWebhookDto) {
        return this.webhookService.create(createWebhookDto);
    }
    findAll() {
        return this.webhookService.findAll();
    }
    findOne(id) {
        return this.webhookService.findOne(+id);
    }
    update(id, updateData) {
        return this.webhookService.update(+id, updateData);
    }
    remove(id) {
        return this.webhookService.remove(+id);
    }
    getEvents(id) {
        return this.webhookService.getWebhookEvents(+id);
    }
    getStats(id) {
        return this.webhookService.getWebhookStats(+id);
    }
    async receiveWebhook(endpoint, req, res) {
        try {
            const payload = req.body;
            const headers = req.headers;
            const result = await this.webhookService.processWebhook(endpoint, payload, headers);
            res.status(common_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            res.status(common_1.HttpStatus.BAD_REQUEST).json({
                success: false,
                message: error.message,
            });
        }
    }
};
exports.WebhookController = WebhookController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof webhook_service_1.CreateWebhookDto !== "undefined" && webhook_service_1.CreateWebhookDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], WebhookController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WebhookController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WebhookController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof Partial !== "undefined" && Partial) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], WebhookController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WebhookController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/events'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WebhookController.prototype, "getEvents", null);
__decorate([
    (0, common_1.Get)(':id/stats'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WebhookController.prototype, "getStats", null);
__decorate([
    (0, common_1.Post)('receive/:endpoint'),
    __param(0, (0, common_1.Param)('endpoint')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_d = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _d : Object, typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], WebhookController.prototype, "receiveWebhook", null);
exports.WebhookController = WebhookController = __decorate([
    (0, common_1.Controller)('webhooks'),
    __metadata("design:paramtypes", [typeof (_a = typeof webhook_service_1.WebhookService !== "undefined" && webhook_service_1.WebhookService) === "function" ? _a : Object])
], WebhookController);


/***/ }),
/* 29 */
/***/ ((module) => {

module.exports = require("express");

/***/ })
/******/ 	]);
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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(1);
const core_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
const common_1 = __webpack_require__(4);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = process.env.PORT || 3000;
    app.enableCors();
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var __webpack_i__ in __webpack_exports__) __webpack_export_target__[__webpack_i__] = __webpack_exports__[__webpack_i__];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;