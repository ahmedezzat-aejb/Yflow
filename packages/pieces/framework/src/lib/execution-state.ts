export class ExecutionState {
    constructor(public steps: Record<string, any> = {}) {}

    updateLastStep(output: any, stepName: string) {
        this.steps[stepName] = output;
    }
}
