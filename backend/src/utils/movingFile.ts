import { existsSync, rename } from 'fs'
import { basename, join, resolve } from 'path'

function movingFile(imagePath: string, from: string, to: string) {
    const fileName = basename(imagePath)

    const safeFrom = resolve(from)
    const safeTo = resolve(to)

    const imagePathTemp = join(safeFrom, fileName)
    const imagePathPermanent = join(safeTo, fileName)

    if (!imagePathTemp.startsWith(safeFrom)) {
        throw new Error('Ошибка при сохранении файла')
    }

    if (!existsSync(imagePathTemp)) {
        throw new Error('Ошибка при сохранении файла')
    }

    rename(imagePathTemp, imagePathPermanent, (err) => {
        if (err) {
            throw new Error('Ошибка при сохранении файла')
        }
    })
}

export default movingFile
