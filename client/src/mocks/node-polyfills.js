const shim = {
    readFileSync: () => "{}",
    join: (...args) => args.join('/'),
    resolve: (...args) => args.join('/'),
    dirname: () => '/'
};

export const readFileSync = shim.readFileSync;
export const join = shim.join;
export const resolve = shim.resolve;
export const dirname = shim.dirname;
export default shim;
