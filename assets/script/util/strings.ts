
/**
 * 设置字符串长度: 不足则空格不全, 溢出尾部截断
 * @param str 原始字符串
 * @param length 字符串限制长度
 * @param prefix 是否从头部开始限制or截断
 * @param ele 补充用的元素
 */
export function lengthFormatString(str: string, length: number, prefix?: boolean, ele?: string): string {
    ele = ele || " "
    if (length <= 0) {
        return ""
    } else {
        var diff = length - str.length
        if (diff < 0) {
            if (prefix == true) {
                return str.substring(length)
            } else {
                return str.substring(0, length)
            }
        } else if (diff > 0) {
            if (prefix == true) {
                return ele.repeat(diff) + str
            } else {
                return str + ele.repeat(diff)
            }
        } else {
            return str
        }
    }
}