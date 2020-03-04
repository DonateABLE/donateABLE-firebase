import Button from 'components/button'
import { Modal, ModalBody, ModalHeader, openModal } from 'components/modal'
import { createElement, FunctionComponent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ReactCrop, { Crop, PercentCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

async function getFile(): Promise<File | undefined> {
    return new Promise((resolve, reject) => {
        const input = document.createElement('input')
        input.type = 'file'

        input.addEventListener('change', e => {
            const file = (e.currentTarget as HTMLInputElement).files?.[0]
            resolve(file)
        })

        input.click()
    })
}

const ImageEditor: FunctionComponent<{ file: File, onChange: (crop: Crop) => void }> = props => {
    const [crop, setCrop] = useState<Crop>({ aspect: 1, height: 100, unit: '%' })
    const src = useMemo(() => URL.createObjectURL(props.file), [props.file])
    const onChange = useCallback((c: Crop, percentCrop: PercentCrop) => {
        setCrop(c)
        props.onChange(percentCrop)

    }, [setCrop, props.onChange])
    return <ReactCrop src={src} crop={crop} onChange={onChange} />
}

export async function imageSelect(): Promise<File | undefined> {
    const f = await getFile()
    if (f === undefined) {
        return undefined
    }

    switch (f.type) {
        case 'image/png':
            break
        default:
            throw new Error(`unsupported file type ${f.type}`)
    }

    let crop: Crop = {}
    const cropChange = (c: Crop) => crop = c

    await openModal(ctl => <Modal onCloseClick={ctl.close}>
        <ModalHeader>
            Edit Image
        </ModalHeader>
        <ModalBody>
            <ImageEditor file={f} onChange={cropChange} />
            <Button onClick={ctl.close}>Save</Button>
        </ModalBody>
    </Modal>)

    const size = 300
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!
    const img = await image(URL.createObjectURL(f))

    const { x = 0, y = 0, height = img.width, width = img.width } = crop

    const yScale = size / (img.height * (height / 100))
    const xScale = size / (img.width * (width / 100))

    const newWidth = img.width * xScale
    const newHeight = img.height * yScale

    ctx.drawImage(
        img,
        -(x / 100) * newWidth,
        -(y / 100) * newHeight,
        newWidth,
        newHeight,
    )

    return dataURLtoFile(canvas.toDataURL('image/jpeg'), f.name)
}

function image(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => {
            resolve(img)
        }
        img.src = src
    })
}

function dataURLtoFile(dataurl: string, filename: string): File {
    const arr = dataurl.split(',')
    const mime = arr[0].match(/:(.*?);/)![1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
}
