function attempt(available, allowed, preferred) {

    let tempArr = [];
    let resultArr = [];

    allowed.forEach(allowedElement => {
        if (available.includes(allowedElement)){
            tempArr.push(allowedElement);
        }
    });

    preferred.forEach(preferredElement => {
        if (allowed.includes('any') && available.includes(preferredElement)){
            resultArr.push(...preferred.splice(preferred.indexOf(preferredElement)));
        }
    })

    allowed.forEach(allowedElement => {
        if(available.includes(allowedElement) && preferred.includes('any')) {
            resultArr.push(...tempArr.splice(tempArr.indexOf(allowedElement), 1));
        }
    })

    preferred.forEach(preferredElement => {
        if(tempArr.includes(preferredElement)) {
            resultArr.push(...tempArr.splice(tempArr.indexOf(preferredElement), 1));
        } else {
            let check = false;

            for (let tempArrElement of tempArr) {
                if (tempArrElement > preferredElement) {
                    resultArr.push(...tempArr.splice(tempArr.indexOf(tempArrElement), 1));
                    check = true
                    break;
                }
            }
            if (!check) {
                resultArr.push(...tempArr.splice(0,1))
            }
        }
    })
    return resultArr;
}

let attemptResult = attempt( [240, 360, 720], [360, 720], [1080])

console.log(attemptResult);