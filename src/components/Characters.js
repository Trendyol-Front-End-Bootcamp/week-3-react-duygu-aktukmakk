import React, { useEffect, useState } from "react";
import Character from "./Character";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Characters() {

    const [characters, setCharacters] = useState([]);
    const [filter, setFilter] = useState({
        gender: null,
        alive: null,
    });

    const filterCharacters = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
        setCharacters([]);
    };

    useEffect(() => {
        const query = `?${filter.alive ? "&status=" + filter.alive : ""
            }${filter.gender ? "&gender=" + filter.gender : ""}`;

        axios.get(`https://rickandmortyapi.com/api/character${query}`)
            .then(response => {
                setCharacters(response.data.results);
            }).catch(err => {
                console.log(err);
            });
    }, [filter]);

    return (
        <div>
            <h1>The Rick And Morty Api</h1>
            <div class="custom-select" style={{ width: "200px;" }}>
                <p class="filterLabel">Gender:</p>
                <select
                    name="gender"
                    onChange={filterCharacters}
                >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                </select>
            </div>

            <div class="custom-select" style={{ width: "200px;" }}>
                <p class="filterLabel">Alive Status:</p>
                <select
                    name="alive"
                    onChange={filterCharacters}
                >
                    <option value="alive">Alive</option>
                    <option value="dead">Dead</option>
                </select>
            </div>

            <section className="cards">
                {characters.map((chars) => {
                    return (<Link key={chars.id} to={`/character/${chars.id}`}>
                        <Character {...chars} />
                    </Link>);
                })}
            </section>
        </div>

    );
}