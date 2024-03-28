export const isValidIsraeliId = (id) => {
    if (!id || id.length !== 9) {
        return false;
    }

    let checksum = 0;
    for (let i = 0; i < 9; i++) {
        let digit = parseInt(id[i], 10);
        if (i % 2 !== 0) digit *= 2;
        checksum += Math.floor(digit / 10) + (digit % 10);
    }

    return checksum % 10 === 0;
};