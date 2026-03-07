import sanitizeHtml from 'sanitize-html'

const basicSettings = {
    allowedTags: ['b', 'i', 'strong', 'br', 'p'],
    allowedAttributes: {},
    disallowedTagsMode: 'discard' as const,
}

const strictSettings = {
    allowedTags: [],
    allowedAttributes: {},
    disallowedTagsMode: 'discard' as const,
}

type mode = 'basic' | 'strict'

// Санитизация строки в зависимости от настроек
export function sanitize(input: string, mode: mode = 'basic'): string {
    if (typeof input !== 'string') return ''

    if (mode === 'basic') {
        return sanitizeHtml(input, basicSettings).trim()
    } 
    
    return sanitizeHtml(input, strictSettings).trim()
}
