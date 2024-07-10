/**
 * Array로 받은 범위를 원 단위로 변환하여 return 합니다.
 * @param {number[]} value - 최솟값, 최댓값을 담은 Array
 * @param {number[]} limit - 각 값들의 한계값
 * @return {string} 변환된 범위
 */
const formatToWon = (value: number[], limit: number[]) => {
    const min: string =
        value[0] === 0 ? `0원` : `${value[0].toLocaleString("ko-kr")}원`;
    const max: string = `${value[1].toLocaleString("ko-kr")}원`;
    if (value[0] === limit[0] && value[1] === limit[1]) return `전체`;
    return `${value[0] === 0 ? `` : min}~${max}`;
};

export { formatToWon };
