import React, { useState } from "react";
import { socket } from "../socket";

export function MyForm() {
    const [msg, setMsg] = useState('');

    function onSubmit(event) {
        event.preventDefault();
        if(msg) {
            socket.emit('chat message', msg);
        }
        setMsg('');
    }

    return (
        <form onSubmit={ onSubmit }>
            <input id="input" value={ msg } onChange={ e => setMsg(e.target.value) } />
            <button type="submit">Submit</button>
        </form>
    );
}