export function isSafeValue(value: unknown): boolean {
    if (
        value === null ||
        value === undefined ||
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        value instanceof Date
    ) {
        return true
    }

    if (Array.isArray(value)) {
        return value.every(isSafeValue)
    }

    if (value && typeof value === 'object') {
        return Object.keys(value).every(
            (key) => !key.startsWith('$') && isSafeValue((value as any)[key])
        )
    }

    return false
}

export function sanitizeValue<T = any>(value: unknown): T | undefined {
    return isSafeValue(value) ? (value as T) : undefined
}

export function sanitizeNumber(
    value: unknown,
    minAllowed?: number,
    maxAllowed?: number
): number | undefined {
    const num = typeof value === 'number' ? value : Number(value)
    if (Number.isNaN(num)) return undefined
    if (minAllowed !== undefined && num < minAllowed) return undefined
    if (maxAllowed !== undefined && num > maxAllowed) return undefined
    return num
}

export function sanitizeDate(
    value: unknown,
    minAllowed?: Date,
    maxAllowed?: Date
): Date | undefined {
    const date =
        value instanceof Date ? value : new Date(value as string | number)
    if (isNaN(date.getTime())) return undefined
    if (minAllowed && date < minAllowed) return undefined
    if (maxAllowed && date > maxAllowed) return undefined
    return date
}

export function sanitizeNumberRange(
    from: unknown,
    to: unknown,
    minAllowed?: number,
    maxAllowed?: number
): { $gte?: number; $lte?: number } | undefined {
    const sanitizedFrom = sanitizeNumber(from, minAllowed, maxAllowed)
    const sanitizedTo = sanitizeNumber(to, minAllowed, maxAllowed)

    if (sanitizedFrom === undefined && sanitizedTo === undefined)
        return undefined

    const range: { $gte?: number; $lte?: number } = {}
    if (sanitizedFrom !== undefined) range.$gte = sanitizedFrom
    if (sanitizedTo !== undefined) range.$lte = sanitizedTo

    return range
}

export function sanitizeDateRange(
    from: unknown,
    to: unknown,
    minAllowed?: Date,
    maxAllowed?: Date
): { $gte?: Date; $lte?: Date } | undefined {
    const sanitizedFrom = sanitizeDate(from, minAllowed, maxAllowed)
    let sanitizedTo = sanitizeDate(to, minAllowed, maxAllowed)

    if (sanitizedFrom === undefined && sanitizedTo === undefined)
        return undefined

    if (sanitizedTo !== undefined) {
        sanitizedTo = new Date(sanitizedTo)
        sanitizedTo.setHours(23, 59, 59, 999)
    }

    const range: { $gte?: Date; $lte?: Date } = {}
    if (sanitizedFrom) range.$gte = sanitizedFrom
    if (sanitizedTo) range.$lte = sanitizedTo

    return range
}
