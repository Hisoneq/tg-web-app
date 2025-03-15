import React from "react";
import Button from "../button/Button";
import useTelegram from "../hooks/useTelegram";

export default function Header(){
    const {user, onClose} = useTelegram();

    return(
        <div className={'header'}>
            <Button onClick={onClose}>Закрыть</Button>
            <span className={'username'}>
                {user?.username}
            </span>
        </div>
    )
}