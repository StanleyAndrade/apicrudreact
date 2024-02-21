import React, { useState } from 'react';
import axios from 'axios';

function ImageDelete() {
    const [imageKey, setImageKey] = useState(''); // Estado para armazenar a chave da imagem a ser deletada
    const [message, setMessage] = useState(''); // Estado para exibir mensagens de sucesso ou erro

    // Função para lidar com a mudança do input de texto
    const handleKeyChange = (event) => {
        setImageKey(event.target.value);
    };

    // Função para lidar com o clique no botão de deletar imagem
    const handleImageDelete = async () => {
        try {
            // Substitua 'URL_DO_SEU_BACKEND_PARA_DELETAR' pela URL do seu backend que lida com a deleção de imagens no Amazon S3
            const response = await axios.delete(`http://localhost:8080/delete/${imageKey}`);

            setMessage('Imagem deletada com sucesso');
        } catch (error) {
            console.error('Erro ao deletar imagem:', error);
            setMessage('Erro ao deletar imagem');
        }
    };

    return (
        <div>
            <h2>Deletar Imagem do Amazon S3</h2>
            <input type="text" value={imageKey} onChange={handleKeyChange} placeholder="Chave da Imagem" />
            <button onClick={handleImageDelete}>Deletar Imagem</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ImageDelete;
