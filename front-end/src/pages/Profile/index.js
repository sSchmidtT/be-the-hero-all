import React, {useState, useEffect} from 'react';
import {FiPower, FiTrash2} from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'

import './styles.css';

import logoImg from '../../assets/logo.svg'

export default function Profile(){
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    const [incidents, setIncidents] = useState([]);
    const page = 1;
    const qnt = 20;
    const history = useHistory();

    useEffect(() => {
        if(!ongId){
            alert('Você não está logado em nenhuma ONG, faça login e tente novamente!');
            history.push('/');
        }else{
            api.get(`incidents?page=${page}&qnt=${qnt}`, 
                { headers:{
                    Authorization: ongId,
                }
            }).then(response =>{
                setIncidents(response.data);
            });
        }
    }, [ongId]);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`,
            { headers:{
                Authorization: ongId,
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id));
        }catch (err){

        }
    }
    
    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Heroes" />
                <span>Bem vinda, <b>{ongName}</b></span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size= {18} color="#E02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>
            <ul>

                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button type="button" onClick={ () => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}

                
            </ul>
        </div>
    );
}