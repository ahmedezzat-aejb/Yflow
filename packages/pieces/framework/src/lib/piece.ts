export class Piece {
    constructor(
        public readonly name: string,
        public readonly displayName: string,
        public readonly logoUrl: string,
        public readonly actions: Record<string, any>,
        public readonly triggers: Record<string, any>
    ) {}
}
