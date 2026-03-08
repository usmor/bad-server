export default function escapeRegExp(string: string) {
    if (typeof string !== 'string') {
        return ''
    }
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
