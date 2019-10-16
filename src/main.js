function findArgument(argName) {
    let i = findFlag(argName);
    let arg = process.argv[i + 1];
    return arg;
}

function findFlag(argName) {
    let i = process.argv.findIndex((v, i, o) => v === argName);

    if (i < 0)
        return undefined;

    return i;
}