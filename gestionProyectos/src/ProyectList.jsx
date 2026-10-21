import React from 'react';
import ProjectItem from './ProjectItem';

const ProyectList = ({ projects, onDelete }) => {
    return (
        <div>
            <h2>Lista de Proyectos</h2>
            {projects.length === 0 ? (
                <p>No hay Proyectos</p>
            ) : (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {projects.map((project) => (
                        <ProjectItem key={project.id} project={project} onDelete={onDelete} />
                    ))}
                </ul>
            )}
        </div>
    );
};

ProyectList.displayName = "ProyectList";

export default ProyectList;