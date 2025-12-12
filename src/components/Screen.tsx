import React, { useEffect, useState } from "react";
import Card from "./Card";
import './Screen.css'
import axios from "axios";

export default function Screen() {
    const [pokemon, setPokemon] = useState([])
    const [query, setQuery] = useState("")
    const[sortOrder,setSortOrder] = useState("")
    const [type,setType]=useState("")
    const[sort,setSort]=useState("")
    const[page,setPage]=useState(1)

    function passQuery(para: any) {
        console.log(para)
        setQuery(para)
    }

    function passSortOrder(para:any){
        console.log(para)
        setSortOrder(para)
    }

    function passType(para:any){
        console.log(para)
        setType(para)
    }

    function passSort(para:any){
        console.log(para)
        setSort(para)
    }
    function passPage(){
        let a =page+1
        setPage(a)
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/v3/pokemon?q=${query}&type=${type}&order=${sortOrder}&sort=${sort}&page=${page}`)
            .then(res => {
                setPokemon(res.data.data);
                console.log(res.data.data)
                console.log(query)
            })
            .catch(err => console.log(err))
    }, [query,type,sortOrder,sort,page])

    return (
        <>
        <div className="mainHead">
            Pokemon
            <textarea onChange={(e) => passQuery(e.target.value)} className="textBox" placeholder="Search " />

        </div>

        <div className="filterFields">

            <select onChange={(e)=>passType(e.target.value)} className="dropdown">
                <option value="bug">Bug</option>
                <option value="dark">Dark</option>
                <option value="dragon">Dragon</option>
                <option value="water">Water</option>
                <option value="fire">Fire</option>
                <option value="flying">Flying</option>
                <option value="ice">Ice</option>
                <option value="normal">Normal</option>
                <option value="ghost">Ghost</option>
                <option value="grass">Grass</option>
                <option value="ground">Ground</option>
                <option value="rock">Rock</option>
                <option value="steel">Steel</option>
                <option value="psychic">Psychic</option>
                
            </select>

            <select onChange={(e)=>passSort(e.target.value)} className="dropdown">
                <option value="id">Id</option>
                <option value="name">Name</option>
                <option value="speed">Speed</option>
                <option value="total">Total</option>
                 <option value="hp">HP</option>
                <option value="attck">Attck</option>
                <option value="spattack">Special Attack</option>
                <option value="spdefence">Special Defence</option>
            </select>

            <select onChange={(e)=>passSortOrder(e.target.value)} className="dropdown">
                <option value="asc">Ascending</option>
                <option value="desc">Decending</option>
            </select>
</div>
        
            <div className="mainScreen">
                <ul className="ulList">
                    {
                        pokemon.map((p, id) => (<div className="mainCard" key={id}>#{p.id}<img src={p.image.thumbnail} className="pokemonImage" />{p.name.english}<div className="ability"> {p.profile.ability[0]}</div> </div>))
                    }
                </ul>
            </div>
            <div className="buttonSection">

            <button onClick={(e)=>passPage()} className="loadButton">Load More</button>
            </div>
        </>
    )
}