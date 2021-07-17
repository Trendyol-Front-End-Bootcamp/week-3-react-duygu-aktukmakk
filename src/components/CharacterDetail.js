import React from "react";
import '../styles/details.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export default function CharacterDetail(props) {

    const [detail, setDetails] = useState({
        name: null,
        image: null,
        alive: null,
    });
    const [lastEpisodes, setLastEpisodes] = useState([]);
    const [location, setLocation] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://rickandmortyapi.com/api/character/${id}`)
            .then(({ data }) => {
                setDetails(data);
                setLocation(data.location.name);
                let episodeLength = data.episode.length;
                let lastEpisodeLinks = episodeLength >= 5 ? data.episode.slice(-5) : data.episode.slice(-episodeLength);
                for (let i = 0; i < 5; i++) {
                    console.log(lastEpisodeLinks[i]);
                    axios.get(lastEpisodeLinks[i])
                        .then(episode => {
                            setLastEpisodes(lastEpisodes => [...lastEpisodes, episode.data.name])
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);

    return (
        <div>

            <h3>{detail.name}</h3>
            <img
                src={detail.image}
                alt={detail.name}
            />
            <p>{detail.status}</p>
            <p>{location}</p>
            <div>
                <h3>Last 5 Episodes:</h3>
                {lastEpisodes.map((episode, index) => (
                    <p key={index}>
                        {index + 1}: {episode}
                    </p>
                ))}
            </div>
            <Link to="/">
                <span class="previous round">&#8249; Back to Characters</span>
            </Link>
        </div>
    );
}


