// Clean Execution State - No Dependencies
export class ExecutionState {
    constructor(public steps: Record<string, any> = {}) {}

    updateLastStep(output: any, stepName: string) {
        this.steps[stepName] = output;
    }

    getStep(stepName: string) {
        return this.steps[stepName];
    }

    getAllSteps() {
        return this.steps;
    }

    clearSteps() {
        this.steps = {};
    }
}
