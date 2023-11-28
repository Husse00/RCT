import { time } from 'console';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from "moment";
import 'moment/locale/sv';


// definerar en type for datan med en interface.
interface Animal {
    id: string;
    name: string;
    shortDescription: string;
    imageUrl: string;
  }

const Animal: React.FC = () =>
{
    let { id } = useParams();

    const [animal, setAnimal] = useState<Animal | null>(null);

    const [matstatus, setMatstatus] = useState('');
    const [matTid, setMatTid] = useState('');
    const [matKnappDisabled, setMatKnappDisabled] = useState(false);

    useEffect(() => {
        fetch('https://animals.azurewebsites.net/api/animals/' + id)
        .then(response => response.json())
        .then((animal: Animal) => setAnimal(animal))
        .catch(error => console.error('Error:', error));
    }, []);

    if (animal === null) {
        return <div>Laddar...</div>;
    }

    const handleClick = () => {
        setMatstatus('Matad - ');
        setMatTid(moment().locale('sv').format('H:mm'));
        setMatKnappDisabled(true);
    };

    return (
        <div className='OneAnimal'>

        <a className='Abutton' href='/'>Tillbaka</a>
            
        <h1>Djuret {animal.name}</h1>

        <br/>

        <>
        {
            animal.imageUrl ? <img src={animal.imageUrl} width={150}></img> : <p>Det finns ingen bild</p>
        }
        </>

        <br/>

        <div>
            <p>{matstatus}{matTid}</p>
        </div>

        <button className='' type='button' onClick={handleClick} disabled={matKnappDisabled}>Mata djur</button>
        
        </div>
    );
}


export default Animal