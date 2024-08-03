
/**
 * 安全沙盒
 * @param handler 装填的方法
 * @param params 方法所需的方法
 * @returns SandBoxResult 运行结果
 */
export function SandBox(
    handler: (...param: any[]) => any,
    ...params: any[]
): SandBoxResult {

    var res = new SandBoxResult();
    try {
        res.results = handler(...params)
    } catch (err) {
        res.err = err
    }
    return res
}

class SandBoxResult {
    err: Error | null = null; // 运行结果错误信息,
    results: any = null; // 处理方法返回数据
    isSucc(): boolean {
        return this.err == null
    }
}