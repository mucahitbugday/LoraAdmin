"use client";
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface DropzoneComponentProps {
    initialImage?: string | null;
    onImageChange?: (image: string) => void;
}

export default function DropzoneComponent({ initialImage, onImageChange }: DropzoneComponentProps) {
    const [image, setImage] = useState<string | null>(initialImage || null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                setImage(result);
                onImageChange?.(result);
            };
            reader.readAsDataURL(file);
        }
    }, [onImageChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png']
        },
        maxFiles: 1
    });

    return (
        <div {...getRootProps()} className="dropzone" style={{
            border: '2px dashed #ccc',
            borderRadius: '4px',
            padding: '10px',
            textAlign: 'center',
            cursor: 'pointer',
            width: '100%',
            height: '195px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDragActive ? '#f8f9fa' : 'white',
            transition: 'background-color 0.3s ease'
        }}>
            <input {...getInputProps()} />
            {image ? (
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                }}>
                    <img
                        src={image}
                        alt="Preview"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '160px',
                            objectFit: 'contain',
                            borderRadius: '4px'
                        }}
                    />
                </div>
            ) : (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%'
                }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        backgroundColor: '#e9ecef',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '0.5rem'
                    }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >     <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />     <polyline points="17 8 12 3 7 8" />     <line x1="12" y1="3" x2="12" y2="15" /> </svg>
                    </div>
                    {isDragActive ? (
                        <p className="mb-0" style={{ fontSize: '0.95rem' }}>Resmi buraya bırakın...</p>
                    ) : (
                        <p className="mb-0" style={{ fontSize: '0.95rem' }}>Resmi sürükleyip bırakın veya tıklayarak seçin</p>
                    )}
                </div>
            )}
        </div>
    );
}