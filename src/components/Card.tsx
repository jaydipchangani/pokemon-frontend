import React, { useEffect, useState } from "react";
import './Card.css'
import axios from "axios";

export default function Card() {

    const [pokemon, setPokemon] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5000/v3/pokemon")
            .then(res => {
                setPokemon(res.data.data);
                console.log(res.data.data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <>
        <ul>
           {
            pokemon.map((p,id)=>(<div className="mainCard" key={id}>{p.name.english}</div>))
           }
        </ul>
        </>
    )
}