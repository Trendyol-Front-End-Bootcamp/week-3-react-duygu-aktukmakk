import React from "react";
import '../styles/details.css';

export default function Character(props) {

    return (
        <article class="card">
            <div class="text">
                <p>{props.name}</p>
            </div>
            <img src={props.image} alt="rick-morty-img" />
            <div class="detail-labels">
                <p>{props.gender}</p>
                <p>{props.status}</p>
                <p>{props.location.name}</p>
            </div>

        </article>
    );
}


