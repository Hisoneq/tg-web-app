import React, { useState } from "react";
import './ProductList.css'
import ProductItem from "../components/ProductItem/ProductItem";
import useTelegram from "../components/hooks/useTelegram";
import { useCallback, useEffect } from "react";


const products = [
    {id: 1, title: 'Куртка', price: 500, description: 'Зеленого цвета, теплая', image: 'http://ecx.images-amazon.com/images/I/61mMrkwBFSL._UL1001_.jpg'},
    {id: 2, title: 'Джинсы', price: 150, description: 'Синего цвета, дырявые', image: 'https://img.joomcdn.net/be004f390a937de33a621a9c8370b58616b583cb_original.jpeg'},
    {id: 3, title: 'Трусы', price: 20, description: 'Белого цвета, обосранные', image: 'https://60.img.avito.st/image/1/1.FiVRTra4usxn53jJcSIff2fsuMrv7zjEJ-q4zuHnssbn.j9B7q__vTy935ogCKYLx4B2i8RnaR9cFEHTQM08dOf8'},
    {id: 4, title: 'Перчатки', price: 5000, description: 'Как в ксго', image: 'https://dgvdyislmj77y.cloudfront.net/eyJidWNrZXQiOiJ0cmFkZWl0LXdpa2kiLCJrZXkiOiJpbWFnZXMvaXRlbXMvaGFuZC13cmFwcy1jYXV0aW9uLS1mYWN0b3J5LW5ldy5wbmciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjEyMDAsImhlaWdodCI6OTAwLCJmaXQiOiJjb250YWluIiwiYmFja2dyb3VuZCI6IiMyNzI3M2YifSwiZmxhdHRlbiI6eyJiYWNrZ3JvdW5kIjoiIzI3MjczZiJ9LCJvdmVybGF5V2l0aCI6eyJidWNrZXQiOiJ0cmFkZWl0LXdpa2kiLCJrZXkiOiJ3YXRlcm1hcmstbG9nby5wbmciLCJvcHRpb25zIjp7ImdyYXZpdHkiOiJzb3V0aHdlc3QifX19fQ=='},
    {id: 5, title: 'Гандоны', price: 10, description: 'Вторяк', image: 'https://avatars.mds.yandex.net/i?id=74809b360ad1646d22f8b6163dc43bbec164b18a-3702239-images-thumbs&n=13'},
    {id: 6, title: 'Шапка', price: 50, description: 'Обычная', image: 'https://smart-lab.ru/uploads/2022/images/02/78/63/2022/01/25/9dbb9e.jpg'},
    {id: 7, title: 'Шарфик', price: 100, description: 'Белый, стрышный', image: 'https://images-eu.ssl-images-amazon.com/images/I/41KOB5Nm1uL.jpg'},
    {id: 8, title: 'Дырка', price: 0, description: 'На жопе', image: 'https://i0.wp.com/motherlesspics.com/uploads/posts/2023-12/1702666946_motherlesspics-com-p-erotika-bolshie-dirki-24.jpg?ssl=1'},
    {id: 9, title: 'Носки поношенные', price: 100, description: 'С маленькой дыркой', image: 'https://filapp1.imgsmail.ru/pic?url=https%3A%2F%2Fpic2.zhimg.com%2Fv2-1337b576067c03a4b7263e26ee2fd250_r.jpg&sig=21d7cec7ab162cd86bdf919baadc91af'}
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
                body: JSON.stringify(data)
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