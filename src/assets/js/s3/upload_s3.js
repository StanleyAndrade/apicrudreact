import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateProduct from '../product/createProduct';

function ImageUpload({ onImageUrlChange, onImageKeyChange }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [imageKey, setImageKey] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleImageUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const response = await axios.post('http://localhost:8080/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            const getimageUrl = response.data.imageUrl;
            const getimageKey = response.data.imageKey;

            // Atualiza os estados
            setImageUrl(getimageUrl);
            setImageKey(getimageKey);

            // Novas linhas para jogar o valor das variaveis para o outro arquivo js:
            if (onImageUrlChange) {
                onImageUrlChange(getimageUrl);
            }
            if (onImageKeyChange) {
                onImageKeyChange(getimageKey);
            }

            console.log('Imagem enviada com sucesso para o Amazon S3: ', getimageUrl);
            console.log('Chave da imagem:', getimageKey);
        } catch (error) {
            console.error('Erro ao enviar imagem para o Amazon S3:', error);
        }
    };

    return (
        <div>
            <h4>Upload de Imagem para Amazon S3</h4>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleImageUpload} disabled={!selectedFile}>Enviar Imagem</button>
            {imageUrl && <img src={imageUrl} alt="Imagem Enviada" className='img-upload_s3' />} {/* Exibe a imagem se houver um link */}
            <p>Chave da Imagem: {imageKey}</p> {/* Exibe a chave da imagem */}
        </div>
    );
}

export default ImageUpload;
