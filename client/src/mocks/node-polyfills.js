const shim = {
    readFileSync: () => "{}",
    existsSync: () => false, // Always return false in browser (files loaded via imports)
    join: (...args) => args.join('/'),
    resolve: (...args) => args.join('/'),
    dirname: () => ''
};

export const readFileSync = shim.readFileSync;
export const existsSync = shim.existsSync;
export const join = shim.join;
export const resolve = shim.resolve;
export const dirname = shim.dirname;
export default shim;
