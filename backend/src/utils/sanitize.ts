import sanitizeHtml from 'sanitize-html'

const basic_settings = {
    allowedTags: ['b', 'i', 'strong', 'br', 'p'],
    allowedAttributes: {},
    disallowedTagsMode: 'discard' as const,
}

const strict_settings = {
    allowedTags: [],
    allowedAttributes: {},
    disallowedTagsMode: 'discard' as const,
}

type mode = 'basic' | 'strict'

// Санитизация строки в зависимости от настроек
export function sanitize(input: string, mode: mode = 'basic'): string {
    if (typeof input !== 'string') return ''

    if (mode === 'basic') {
        return sanitizeHtml(input, basic_settings).trim()
    } else {
        return sanitizeHtml(input, strict_settings).trim()
    }
}
