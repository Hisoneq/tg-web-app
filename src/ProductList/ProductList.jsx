import React, { useState } from "react";
import './ProductList.css'
import ProductItem from "../components/ProductItem/ProductItem";
import useTelegram from "../components/hooks/useTelegram";
import { useCallback, useEffect } from "react";


const products = [
    {id: 1, title: 'Куртка', price: 500, description: 'Зеленого цвета, теплая'},
    {id: 2, title: 'Джинсы', price: 150, description: 'Синего цвета, дырявые'},
    {id: 3, title: 'Трусы', price: 20, description: 'Черного цвета, обосранные'},
    {id: 4, title: 'Перчатки', price: 5000, description: 'Как в ксго'},
    {id: 5, title: 'Гандоны', price: 10, description: 'Вторяк'},
    {id: 6, title: 'Шапка', price: 50, description: 'Обычная'},
    {id: 7, title: 'Шарфик', price: 100, description: 'Белый, палинин'},
    {id: 8, title: 'Дырка', price: 0, description: 'На жопе'}
]

const getTotalPrice = (items) => {
    return items.reduce((acc, item) => {
        return acc += item.price;
    }, 0)
}

export default function ProductList(){

    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

     const onSendData = useCallback(()=>{
            const data = {
                products: addedItems,
                totalPrice: getTotalPrice(addedItems),
                queryId,
            }
            fetch('http://localhost:8000', {
                method: 'POST',
                headers: {
                    'Content-type' : 'application/json'
                },
                bosy: JSON.stringify(data)
            })
        }, [])
    
        useEffect(()=>{
            tg.onEvent('mainButtonClicked', onSendData);
            return() => {
                tg.offEvent('mainButtonClicked', onSendData);
            }
        }, [onSendData])


    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded){
            newItems = addedItems.filter(item => item.id !== product.id);
        }else{
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems);

        if(newItems.length === 0){
            tg.MainButton.hide();
        }else{
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }
    return(
        <div className={'list'}>
            {products.map(item => (
                <ProductItem 
                    product = {item}
                    onAdd = {onAdd}
                    className = {'item'}
                />
            ))}
        </div>
    )
}