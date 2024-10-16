'use client'

import { IKUpload, ImageKitProvider } from "imagekitio-next";
import { useState } from "react";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

const publicKey = 'public_oMtSciIGjj/z2sxDOGfO2y4i6zw=';
const url_endpoint = 'https://ik.imagekit.io/znex04bydzr';

const authenticator = async () => {
    try {
        const response = await fetch(`/api/auth`);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};

interface Props {
    setImage: (e: string) => void,
    setImageUploading: (e: boolean) => void,
    email: string,
    image: string | null
}

const ImageUpload = ({ setImage, setImageUploading, email, image }: Props) => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [imageName, setImageName] = useState(null);

    const onError = (err) => {
        setUploading(false)
        setImageUploading(false)
        console.log("Error", err);
        toast.error(err.message);
    };

    const onSuccess = (res) => {
        setUploading(false)
        setImageUploading(false)
        setImage(res.url)
    };

    const progress = (e) => {
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
                    className={twMerge(`relative w-full px-3 py-2 mt-1 bg-[#633affad] rounded-md cursor-pointer text-white truncate`)}
                    htmlFor="image"
                >
                    <span
                        className={`absolute h-1 bg-[#633aff] bottom-0 left-0`}
                        style={{ width: `${uploadProgress}%`, transition: 'width 0.2s ease' }} // Dynamic width
                    />
                    {
                        uploading ? 'Uploading Image...' : (image && imageName ? imageName : 'Change image')
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
