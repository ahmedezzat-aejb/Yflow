// Clean Piece Class - No Dependencies
export class Piece {
    constructor(
        public readonly name: string,
        public readonly displayName: string,
        public readonly logoUrl: string,
        public readonly actions: Record<string, any>,
        public readonly triggers: Record<string, any>
    ) {}

    getAction(actionName: string) {
        return this.actions[actionName];
    }

    getTrigger(triggerName: string) {
        return this.triggers[triggerName];
    }

    hasAction(actionName: string) {
        return actionName in this.actions;
    }

    hasTrigger(triggerName: string) {
        return triggerName in this.triggers;
    }
}
