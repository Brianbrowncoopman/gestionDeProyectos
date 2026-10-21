import React, { useState } from 'react';
import axios from 'axios';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const ProjectForm = ({ onProjectAdded }) => {
    const [name, setName] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [loading, setLoading] = useState(false);
    
    // Estados para los mensajes de error
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!name.trim()) {
            newErrors.name = 'Este campo es obligatorio.';
        }
        if (!descripcion.trim()) {
            newErrors.descripcion = 'Este campo es obligatorio.';
        } else if (descripcion.length < 10) {
            newErrors.descripcion = 'La descripción debe tener al menos 10 caracteres.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            setLoading(true);
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
                const extraInfo = `API Data: ${response.data.title}`;

                await addDoc(collection(db, 'projects'), {
                    name,
                    descripcion,
                    extraInfo,
                    createdAt: new Date()
                });

                setName('');
                setDescripcion('');
                setErrors({});

                if (onProjectAdded) onProjectAdded();
            } catch (error) {
                console.error('Error al guardar el proyecto:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <form 
            onSubmit={handleSubmit}
            style={{ marginBottom: '20px', 
                padding: '15px',
                 border: '1px solid #ddd', 
                 borderRadius: '5px' }}
        >
            <h3>Nuevo Proyecto</h3>

            <div style={{ marginBottom: '10px' }}>
                <label>Nombre del Proyecto</label><br />
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
                {errors.name && <span style={{ color: 'red', fontSize: '12px' }}>{errors.name}</span>}
            </div>

            <div style={{ marginBottom: '10px' }}>
                <label>Descripción (Mínimo 10 caracteres)</label><br />
                <textarea 
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                />
                {errors.descripcion && 
                <span style={{ color: 'red', fontSize: '12px' }}>{errors.descripcion}</span>}
            </div>

            <button
                type="submit" 
                disabled={loading} 
                style={{ padding: '8px 15px', cursor: 'pointer' }}
            >
                {loading ? 'Guardando...' : 'Guardar Proyecto'}
            </button>
        </form>
    );
};

ProjectForm.displayName = 'ProjectForm';

export default ProjectForm;