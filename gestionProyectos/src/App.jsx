import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from './firebaseConfig';
import ProjectForm from './ProjectForm';
import ProjectList from './ProyectList'; // Asegúrate de importar la lista

const DELETE_FUNCTION_URL = 'https://deleteproject-3ozsom5vsq-uc.a.run.app';

function App() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapShot) => {
      const projectsData = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projectsData);
    });

    return () => unsubscribe();
  }, []);

  const handleDeleteProject = async (id) => {
    try {
      await axios.delete(`${DELETE_FUNCTION_URL}?id=${id}`);
      console.log(`Proyecto ${id} eliminado vía Cloud Function`);
      
      setProjects((prevProjects) => prevProjects.filter((proj) => proj.id !== id));
    } catch (error) {
      console.error('Error al invocar la Cloud Function para eliminar:', error);
    }
  };

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      padding: '20px', 
      fontFamily: 'sans-serif' }}>
      <h1>Gestión de Proyectos</h1>

      <button
        onClick={() => setShowForm(!showForm)}
        style={{ 
          marginBottom: '20px', 
          padding: '10px 15px', 
          backgroundColor: '#007bff', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '8px', 
          cursor: 'pointer' }}
      >
        {showForm ? 'Ocultar Formulario' : 'Agregar Proyecto'}
      </button>

      {showForm && <ProjectForm onProjectAdded={() => setShowForm(false)} />}

      {/* Renderizado de la lista de proyectos */}
      <ProjectList projects={projects} onDelete={handleDeleteProject} />
    </div>
  );
}

App.displayName = 'App';
export default App;