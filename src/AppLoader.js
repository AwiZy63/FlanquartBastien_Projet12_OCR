import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import App from './App'

export default function AppLoader() {
    let { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        /* Checking if the id is not a number or is not defined. If it is not, it will prompt the user
        to enter a valid id. */
        if (!id || isNaN(id)) {
            let newId;
            while (isNaN(newId)) {
                newId = prompt("Veuillez renseigner un id utilisateur valide.");
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
            id = newId;
            navigate(`/${newId}`);
        }
    }, [])

    /* Dashboard page will not showed up while user hasn't enter a valid id. */
    if (id && !isNaN(id)) {
        return <App id={parseInt(id)} />
    } else {
        return <pre>ID Utilisateur non défini ou introuvable.</pre>;
    }
}
