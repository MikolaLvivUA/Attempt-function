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

/*Tests*/

let available = [240,360,720];
let allowed = [360,720];
let preferred = [1080];
let res = attempt(available,allowed,preferred);
console.log(`${res} : 360`)

available = [240,720];
allowed = [360,720];
preferred = [1080];
res = attempt(available,allowed,preferred);
console.log(`${res} : 720`);

available = [240];
allowed = [360,720];
preferred = [1080];
res = attempt(available,allowed,preferred);
console.log(`${res} : `);

available = [240,360,720];
allowed = [240,360,720,1080];
preferred = [240,360];
res = attempt(available,allowed,preferred);
console.log(`${res} : 240, 360}`);

available = [240,720];
allowed = [240,360,720,1080];
preferred = [240,360];
res = attempt(available,allowed,preferred);
console.log(`${res} : 240, 720`);

available = [720];
allowed = [240,360,1080];
preferred = [240,360];
res = attempt(available,allowed,preferred);
console.log(`${res} :`);

available = [240,360];
allowed = [240,360];
preferred = [720,1080];
res = attempt(available,allowed,preferred);
console.log(`${res} : 360`);

available = [240,360,720];
allowed = [360,'any'];
preferred = [360,720];
res = attempt(available,allowed,preferred);
console.log(`${res} : 360, 720`);

available = [240,360,720];
allowed = [240,360,720];
preferred = ['any',720];
res = attempt(available,allowed,preferred);
console.log(`${res} : 240, 360, 720`);

available = [240,360,720];
allowed = [360, 1080];
preferred = ['any',720];
res = attempt(available,allowed,preferred);
console.log(`${res} : 360`);

available = [240,360,720];
allowed = [1080];
preferred = ['any',720];
res = attempt(available,allowed,preferred);
console.log(`${res} : `);