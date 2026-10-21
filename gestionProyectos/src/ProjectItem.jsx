import React from 'react';

const ProjectItem = ({ project, onDelete }) => {
    return (
        <React.Fragment>
            <li style={{ 
                marginBottom: '15px', 
                padding: '15px', 
                border: '1px solid #ccc', 
                borderRadius: '5px' }}>
                <h3>{project.name}</h3>
                <p><strong>Descripción:</strong> {project.descripcion}</p>
                <p><strong>Información:</strong> {project.extraInfo}</p>
                <button 
                    onClick={() => onDelete(project.id)} 
                    style={{ 
                        backgroundColor: '#ff4d4d', 
                        color: '#fff', 
                        border: 'none', 
                        padding: '5px 10px', 
                        cursor: 'pointer', 
                        borderRadius: '3px' }}>
                    Eliminar Proyecto
                </button>
            </li>
        </React.Fragment>
    );
};

ProjectItem.displayName = 'ProjectItem';

export default ProjectItem;