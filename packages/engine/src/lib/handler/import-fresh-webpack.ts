// packages/engine/src/lib/handler/import-fresh-webpack.ts
export const importFresh = (moduleName: string) => {
    try {
        // بننظف الكاش عشان الـ Engine يقرأ التعديلات الجديدة في الـ Code Pieces
        delete require.cache[require.resolve(moduleName)];
        return require(moduleName);
    } catch (e) {
        return require(moduleName);
    }
};
