export const CHECK_KEYLOK = false ;
export const bitStreamtoNumber = (s,type) => {
    let bitstream = s.output
    let r;
    if( type == "user") r = bitstream.substring(0,8)
    if(type == "rule") r = bitstream.substring(8,15)
    let result = 0;
    for(let i = r.length - 1, j = 0; i >=0; i--, j++) {
        result += r[i] * Math.pow(2,j);
    }
    return result;
}