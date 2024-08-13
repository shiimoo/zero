import { UtilTime } from './time';
import { UtilStrings } from './strings';
import { UtilSandBox } from './sandBox';

export namespace util {
    export const strings = UtilStrings // 字符串工具链
    export const time = UtilTime // 时间工具链
    export const sandBox = UtilSandBox // 安全沙盒
}