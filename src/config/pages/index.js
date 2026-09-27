export async function resolvePageConfig(buzzNo) {
    const normalizedBuzzNo = String(buzzNo ?? '').replace(/^Buzz/, '')
    if (!/^\d{10}$/.test(normalizedBuzzNo)) {
        return null
    }

    const response = await fetch(
        `${import.meta.env.BASE_URL}mock/buzz/Buzz${normalizedBuzzNo}.json`,
        {headers: {Accept: 'application/json'}},
    )
    if (response.status === 404) {
        return null
    }
    if (!response.ok) {
        throw new Error(`加载 Buzz${normalizedBuzzNo} 失败: HTTP ${response.status}`)
    }

    return response.json()
}
