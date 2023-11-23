import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import Header from '../component/Header/Header';
import Footer from '../component/Footer/Footer';
// import { Button } from '../component/BasketPage/style';
import { Button, Main } from '../component/BasketPage/style';


const fetchCartItems = async () => {
console.log('Fetching cart items...');
try {
    const response = await fetch('http://tonadus.shop:3000/api/orders', {
    method: 'GET',
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIs ...',
        'Content-Type': 'application/json',
    },
    });

    if (response.ok) {
    const cartData = await response.json();
    console.log('Fetched cart items:', cartData);
    return cartData;
    } else {
    console.error('Failed to fetch cart data');
    throw new Error('Failed to fetch cart data');
    }
} catch (error) {
    console.error('Error fetching cart data:', error);
    throw error;
} finally {
    console.log('Fetch complete.');
}
};

const removeFromCart = async (itemId) => {
    console.log('Removing item from cart:', itemId);

    try {
    const response = await fetch(`http://15.164.102.17:3000/api/orders/${itemId}`, {
        method: 'DELETE',
        headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIs ...',
        'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        console.error(`Failed to remove item ${itemId} from cart`);
        throw new Error(`Failed to remove item ${itemId} from cart`);
    }

    console.log(`Item ${itemId} removed successfully.`);
    return itemId;
    } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
    }
};

const ShoppingCart = () => {
const [isFetchButtonClicked, setFetchButtonClicked] = useState(false);
const [isPurchaseComplete, setPurchaseComplete] = useState(false);
const { data: cartItems, isLoading, refetch } = useQuery('cartItems', fetchCartItems);
const removeFromCartMutation = useMutation(removeFromCart, {
    onSuccess: () => {
    console.log('Item removed successfully. Refetching cart data.');
    refetch();
    },
    onError: (error) => {
    console.error('Error removing item from cart:', error);
    },
});

const handleFetchCart = async () => {
    try {
    setFetchButtonClicked(true);
    await refetch();
    } catch (error) {
    console.error('Error fetching cart data:', error);
    }
};

const handleRemoveFromCart = async (itemId) => {
    try {
    if (itemId !== undefined) {
        await removeFromCartMutation.mutateAsync(itemId);
    } else {
        console.error('Item ID is undefined. Cannot remove item from cart.');
    }
    } catch (error) {
    console.error('Error removing item from cart:', error);
    }
};

const handlePurchase = () => {
    setPurchaseComplete(true);
    window.alert('구매가 완료되었습니다.');
};

return (
    <div>
    <Header />
    <Main>
    <div>
    <h2>Shopping Cart</h2>
    {!isFetchButtonClicked && <Button onClick={handleFetchCart}>조회</Button>}
    {isFetchButtonClicked && isLoading && <p>Loading cart...</p>}
    {isFetchButtonClicked && !isLoading && (
        <ul>
        {Array.isArray(cartItems?.data) && cartItems.data.length > 0 ? (
            cartItems.data.map((item) => (
            <li
                key={item.id}
                style={{
                border: '1px solid #ccc',
                margin: '10px',
                padding: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                }}
            >
                <div>
                <div>장바구니 품목</div>
                {item.Good && (
                    <div>
                    <div>{`이름: ${item.Good.goodsName}`}</div>
                    <div>{`가격: ${item.Good.price}`}</div>
                    <img
                        src={item.Good.imageUrl}
                        alt={`Product: ${item.Good.goodsName}`}
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                    </div>
                )}
                </div>
                <div>
                <Button onClick={() => handleRemoveFromCart(item.id)}>삭제</Button>
                {isPurchaseComplete && <p>구매가 완료되었습니다.</p>}
                <Button onClick={() => handlePurchase()}>구매하기</Button>
                </div>
            </li>
            ))
        ) : (
            <p>No items in the cart.</p>
        )}
        </ul>
    )}
    </div>
    </Main>
    <Footer />
</div>
);
};


export default ShoppingCart;
