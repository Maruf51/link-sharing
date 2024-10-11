'use client'

import { IKUpload, ImageKitProvider } from "imagekitio-next";
import { useState } from "react";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

const publicKey = 'public_oMtSciIGjj/z2sxDOGfO2y4i6zw=';
const url_endpoint = 'https://ik.imagekit.io/znex04bydzr';
const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

const authenticator = async () => {
    try {
        const response = await fetch(`${base_url}/api/auth`);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error: any) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};

interface Props {
    setImage: any,
    setImageUploading: any,
    email: String,
    image: string | null
}

const ImageUpload = ({ setImage, setImageUploading, email, image }: Props) => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [imageName, setImageName]: any = useState(null);

    const onError = (err: any) => {
        setUploading(false)
        setImageUploading(false)
        console.log("Error", err);
        toast.error("Error", err);
    };

    const onSuccess = (res: any) => {
        setUploading(false)
        setImageUploading(false)
        setImage(res.url)
    };

    const progress = (e: any) => {
        const uploaded = (e.loaded / e.total) * 100;
        setUploadProgress(uploaded);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if ((file)) {
            setUploadProgress(0)
            setImageName(file.name);
        }
    };

    return (
        <>
            <ImageKitProvider publicKey={publicKey} urlEndpoint={url_endpoint} authenticator={authenticator}>
                <label
                    className={twMerge(`relative w-full px-3 py-2 mt-1 bg-green-400 dark:bg-green-400 rounded-sm cursor-pointer text-white dark:text-black truncate`)}
                    htmlFor="image"
                >
                    <span
                        className={`absolute h-1 bg-green-600 dark:bg-green-600 bottom-0 left-0`}
                        style={{ width: `${uploadProgress}%`, transition: 'width 0.2s ease' }} // Dynamic width
                    />
                    {
                        uploading ? 'Uploading Image...' : (image && imageName ? imageName : 'Select an image')
                    }
                </label>
                <IKUpload
                    id="image"
                    fileName={`${email}_link-sharing_`}
                    onError={onError}
                    onSuccess={onSuccess}
                    onUploadProgress={progress}
                    onUploadStart={() => {
                        setUploading(true)
                        setImageUploading(true)
                    }}
                    className="hidden"
                    folder="link-sharing"
                    onChange={handleFileChange}
                />
            </ImageKitProvider>
        </>
    );
}

export default ImageUpload;
