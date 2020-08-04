import Button from "components/button";
import { Modal, ModalBody, ModalHeader, openModal } from "components/modal";
import {
    createElement,
    FunctionComponent,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import ReactCrop, { Crop, PercentCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { bindArgs } from "utils";

async function getFile(): Promise<File | undefined> {
    return new Promise((resolve, reject) => {
        const input = document.createElement("input");
        input.type = "file";

        input.addEventListener("change", (e) => {
            const file = (e.currentTarget as HTMLInputElement).files?.[0];
            resolve(file);
        });

        input.click();
    });
}

const ImageEditor: FunctionComponent<{
    file: File;
    onChange: (crop: Crop) => void;
}> = (props) => {
    const [crop, setCrop] = useState<Crop>({
        aspect: 1,
        height: 100,
        unit: "%",
    });
    const src = useMemo(() => URL.createObjectURL(props.file), [props.file]);
    const onChange = useCallback(
        (c: Crop, percentCrop: PercentCrop) => {
            setCrop(c);
            props.onChange(percentCrop);
        },
        [setCrop, props.onChange]
    );
    return <ReactCrop src={src} crop={crop} onChange={onChange} />;
};

/**
 * imageSelect opens a file dialog and prompts the user to crop the image
 */
export async function imageSelect(): Promise<File | undefined> {
    // open the file dialog
    const f = await getFile();
    if (f === undefined) {
        return undefined;
    }

    // make sure the file has an image mime type
    if (!f.type.match(/^image\/(png|jpe?g|gif|webp)/)) {
        throw new Error(`unsupported file type ${f.type}`);
    }

    let crop: Crop = {};
    const cropChange = (c: Crop) => (crop = c);

    // Open a modal with the image cropper in it
    const saved = await openModal(
        (ctl) => (
            <Modal onCloseClick={ctl.close}>
                <ModalHeader>Edit Image</ModalHeader>
                <ModalBody>
                    <ImageEditor file={f} onChange={cropChange} />
                    <Button onClick={bindArgs(true, ctl.resolve)}>Save</Button>
                </ModalBody>
            </Modal>
        ),
        false
    );
    // if the user didn't press save to close the model return undefined
    if (!saved) {
        return undefined;
    }

    // resize the image and generate a new file based on the crop information

    // I create a canvas at the size specified
    const size = 300;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    const img = await image(URL.createObjectURL(f));

    const { x = 0, y = 0, height = img.height, width = img.width } = crop;

    // calculate the scale and size of the new image
    const yScale = size / (img.height * (height / 100));
    const xScale = size / (img.width * (width / 100));

    const newWidth = img.width * xScale;
    const newHeight = img.height * yScale;

    // draw the image to the canvas scaled and offset according to the crop
    ctx.drawImage(
        img,
        -(x / 100) * newWidth,
        -(y / 100) * newHeight,
        newWidth,
        newHeight
    );

    return dataURLtoFile(canvas.toDataURL("image/jpeg"), f.name);
}

function image(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            resolve(img);
        };
        img.src = src;
    });
}

function dataURLtoFile(dataurl: string, filename: string): File {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}
