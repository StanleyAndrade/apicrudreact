import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ImageUpload({ onImageUrlChange, onImageKeyChange }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [imageKey, setImageKey] = useState('');
    const [message, setMessage] = useState(''); 

    const handleImageUpload = async (event) => {
        try {
            event.preventDefault()
            const formData = new FormData();
            formData.append('file', selectedFile);

            const response = await axios.post('http://15.228.166.75:8080/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            const getimageUrl = response.data.imageUrl;
            const getimageKey = response.data.imageKey;

            // Atualiza os estados
            setImageUrl(getimageUrl);
            setImageKey(getimageKey)
            

            /// Chama a função de callback para passar a chave da imagem para o componente pai
            if (onImageUrlChange) {
                onImageUrlChange(getimageUrl);
            }
            // Chama a função de callback para passar a chave da imagem para o componente pai
            if (onImageKeyChange) {
                onImageKeyChange(getimageKey);
            }

            console.log('Imagem enviada com sucesso para o Amazon S3: ', getimageUrl);
            console.log('Chave da imagem:', getimageKey);
        } catch (error) {
            console.error('Erro ao enviar imagem para o Amazon S3:', error);
        }
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const deleteImage = async () => {
        try {
            const response = await axios.delete(`http://15.228.166.75:8080/delete/${imageKey}`);
            console.log('Imagem deletada com sucesso')
            setMessage('Imagem deletada com sucesso');
            setImageUrl('')
        } catch (error) {
            console.error('Erro ao deletar imagem:', error);
            setMessage('Erro ao deletar imagem');
        }
    }
    

    return (
        <div className='father-upload_s3'>
            <label htmlFor="fileUpload">Escolher imagem do produto</label>
            <input type="file" onChange={handleFileChange} accept="image/*" className='fileUpload-upload_s3'/>
            {imageUrl && <img src={imageUrl} alt="Imagem Enviada" className='img-upload_s3' />} {/* Exibe a imagem se houver um link */}
            <div>
                <button onClick={handleImageUpload} disabled={!selectedFile}>Confirmar imagem</button>
                <button onClick={deleteImage}>Deletar Imagem</button>
            </div>
        </div>
    );
}
export default ImageUpload;
