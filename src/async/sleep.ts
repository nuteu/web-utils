/**
 * 等待 ms 毫秒之后再继续执行后续步骤
 * @param ms 等待的毫秒数
 * @returns Promise
 */
export async function sleep(ms: number): Promise<void> {

    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
