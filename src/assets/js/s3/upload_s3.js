import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload() {
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
                    'Content-Type': 'multipart/form-data'
                }
            });

            setImageUrl(response.data); // Salva o link da imagem na variável imageUrl
            setImageKey(response.headers['image-key']); // Salva a chave da imagem na variável imageKey
            console.log('Imagem enviada com sucesso para o Amazon S3:', response.data);
        } catch (error) {
            console.error('Erro ao enviar imagem para o Amazon S3:', error);
        }
    };

    return (
        <div>
            <h2>Upload de Imagem para Amazon S3</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleImageUpload} disabled={!selectedFile}>Enviar Imagem</button>
            {imageUrl && <img src={imageUrl} alt="Imagem Enviada" />} {/* Exibe a imagem se houver um link */}
            <p>Chave da Imagem: {imageKey}</p> {/* Exibe a chave da imagem */}
        </div>
    );
}

export default ImageUpload;