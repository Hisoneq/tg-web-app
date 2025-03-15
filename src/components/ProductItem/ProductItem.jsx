import React from "react";
import Button from "../button/Button";
import './ProductItem.css'

export default function ProductItem({product, className, onAdd}){

    const onAddHandler = () => {
        onAdd(product);
    }

    return(
        <div className={'product' + className}>
            <div className={'img'} />
            <div className={'title'}>{product.title}</div>
            <div className={'description'}>{product.description}</div> 
            <div className={'price'}>
                <span>Стоимость: <b>{product.proce}</b></span>
            </div>
            <Button className={'add-btn'} onClick={onAddHandler}>
                Добавить в корзину
            </Button>
        </div>
    )
}