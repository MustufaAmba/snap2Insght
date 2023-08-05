import { uploadFile } from '@/utils/api';
import React, { ChangeEvent, FormEvent, useState } from 'react'
interface IImageData {
    image: {
        url: string;
        file: null | File
    },
    analytics: {
        file: null | File
    }
}
const ImageForm = () => {
    const [imageData, setImageDate] = useState<IImageData>({
        image: {
            url: '',
            file: null
        },
        analytics: {
            file: null
        }
    })

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, files } = event.target
        if (files) {
            if (files && name === 'image') {
                const fileUrl = URL.createObjectURL(files[0])
                return setImageDate((prev) => ({ ...prev, [name]: { url: fileUrl, file: files[0] } }))
            }
            setImageDate((prev) => ({ ...prev, [name]: { file: files[0] } }))
        }
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const { file: imageFile } = imageData.image
        const { file: analyticsFile } = imageData.analytics
        if (imageFile && analyticsFile) {
            const body = new FormData();
            body.append("imageFile", imageFile);
            body.append("analyticsFile", analyticsFile)
            const response = await uploadFile(body)
            setImageDate({
                image: {
                    url: '',
                    file: null
                },
                analytics: {
                    file: null
                }
            })
        }
    }

    return (
        <div className='pl-14'>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col items-start gap-5 w-full'>
                    <div className='flex gap-4 items-center'>
                        <label htmlFor='image' className='border border-neutral-950 rounded-lg px-5 py-2 w-80'>
                            Upload Image
                        </label>
                        <input id='image' name='image' type='file' className='hidden' onChange={handleFileChange} />
                        {
                            imageData.image.file && <span>{imageData.image.file?.name}</span>
                        }
                    </div>
                    <div className='flex gap-4 items-center'>
                        <label htmlFor='analytics' className='border border-neutral-950 rounded-lg px-5 py-2 w-80 '>
                            Upload Analytics
                        </label>
                        <input id='analytics' name='analytics' type='file' className='hidden' onChange={handleFileChange} />
                        {
                            imageData.analytics.file && <span>{imageData.analytics.file?.name}</span>
                        }
                    </div>
                    <button type='submit' className='border-2 border-blue-400 px-6 py-2 rounded-md' >Submit</button>
                </div>

            </form>


            {/* {
                imageData.image.url?<img src={imageData.image.url} className='border border-neutral-950 object-contain w-full h-full rounded-lg'/>: <div className=''>
                <label htmlFor='image' className='border border-neutral-950 rounded-lg w-[50vw] h-[50vh] flex justify-center items-center'>
                    Upload Image
                </label>
                <input id='image' name='image' type='file' className='hidden' onChange={handleFileChange}/>
                </div>
            }
            <div className='border border-neutral-950 rounded-lg w-full h-full flex justify-center items-center'>
            <label htmlFor='image' className=''>
                Upload Analytics
            </label>
            <input id='image' name='analytics' type='file' className='hidden'  onChange={handleFileChange}/>
            </div>
            <button onClick={()=>handleSubmit()}>
                Submit
            </button> */}
        </div>
    )
}

export default ImageForm