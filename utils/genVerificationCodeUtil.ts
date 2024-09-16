export function genVerificationCodeUtil (codes: number[] = []):string {
    if(codes.length === 6){
        return codes.join('')
    }
    const randNum = Math.random() * 9
    const flooredRandNum = Math.floor(randNum + 1)
    codes.push(flooredRandNum)
    return genVerificationCodeUtil(codes)
}