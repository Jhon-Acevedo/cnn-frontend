import styles from '../styles/Home.module.css'
import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import axios from 'axios'
import {log} from "util";

type props = {
    predictedValue: Function
}

type ob = {
    name: string
}

export default function UploadImage({predictedValue}: props) {
    const [isLoading, setIsLoading] = useState(false)
    const [img, setImg] = useState<string>('/img/default_img.svg')
    const [text, setText] = useState('Ingrese una imagen para predecir')

    useEffect(() => {
        if (isLoading) {
            setText('loading...')
            // setImg('https://media.tenor.com/On7kvXhzml4AAAAi/loading-gif.gif')
            setImg('https://media.tenor.com/qzuj7-PoJTcAAAAC/loading.gif')
        }
    }, [isLoading])

    const uploadImage = async (arg: any) => {
        setIsLoading(true)
        const file: string = await toBase64(arg.target.files[0])
        const formData = new FormData();
        formData.append('image_src', arg.target.files[0])
        await axios.post("https://cnn-production.up.railway.app/classify", formData)
            .then(res => {
                predictedValue(res.data)
            })
        await setImg(file);
        await setIsLoading(false)
        setText('')
    }

    const toBase64 = (file: any) => new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });

    return (
        <div className={styles.box}>
            <Image src={img} alt="image" width={text === '' ? 250 : 100} height={text === '' ? 250 : 100}/>
            <p id={"text-img"} className={styles.textWeak}>{text}</p>

            <label htmlFor="file-upload" className={styles.custom_file_upload}>
                Cargar Imágen
            </label>
            <input className={styles.file_upload} id="file-upload" type="file" onChange={uploadImage}/>
        </div>
    )
}