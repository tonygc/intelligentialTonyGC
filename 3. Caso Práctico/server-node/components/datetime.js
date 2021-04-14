
const dateYYYYMMDDHHMMSS=()=>{
    return new Date().toISOString().
    replace(/T/, ' ').      // replace T with a space
    replace(/\..+/, '');
}

module.exports={
    getToday:dateYYYYMMDDHHMMSS
}