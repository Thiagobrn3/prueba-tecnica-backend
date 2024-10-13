function organizeGifts() {
    let gifts = document.getElementById('input').value;
    let result = '';
    let i = 0;

    while (i < gifts.length) {
        let num = '';
        while (i < gifts.length && !isNaN(gifts[i])) {
            num += gifts[i];
            i++;
        }

        const count = parseInt(num);
        const gift = gifts[i];
        i++;

        const numBoxes = Math.floor(count / 10);
        const remainingGifts = count % 10;

        const numPallets = Math.floor(numBoxes / 5);
        const looseBoxes = numBoxes % 5;

        result += `[${gift}]`.repeat(numPallets);
        result += `{${gift}}`.repeat(looseBoxes);

        if (remainingGifts > 0) {
            result += `(${gift.repeat(remainingGifts)})`;
        }
    }

    console.log(result);
}
