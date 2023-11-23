import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import Header from "../component/Header/Header";
import Footer from "../component/Footer/Footer";
import { Button } from "../component/BasketPage/style";

//
const fetchCartItems = async () => {
  console.log("Fetching cart items...");
  try {
    const response = await fetch("http://localhost:4000/orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const cartData = await response.json();
      console.log("Fetched cart items:", cartData);
      return cartData;
    } else {
      console.error("Failed to fetch cart data");
      throw new Error("Failed to fetch cart data");
    }
  } catch (error) {
    console.error("Error fetching cart data:", error);
    throw error;
  } finally {
    console.log("Fetch complete.");
  }
};

const addToCart = async ({
  goodsName,
  price,
  imageUrl,
  totalPrice,
  quantity,
}) => {
  const requestData = {
    goodsName,
    price,
    imageUrl,
    totalPrice,
    quantity,
  };

  const response = await fetch("http://localhost:4000/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    console.error("Failed to add item to cart");
    throw new Error("Failed to add item to cart");
  }

  return response.json();
};

const removeFromCart = async (itemId) => {
  const response = await fetch(`http://localhost:4000/orders/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.error(`Failed to remove item ${itemId} from cart`);
    throw new Error(`Failed to remove item ${itemId} from cart`);
  }

  return itemId;
};

const ShoppingCart = () => {
  const {
    data: cartItems,
    isLoading,
    refetch,
  } = useQuery("cartItems", fetchCartItems);
  const [localCartItems, setLocalCartItems] = useState([]);
  const addToCartMutation = useMutation(addToCart, {
    onSuccess: () => {
      refetch();
    },
  });
  const removeFromCartMutation = useMutation(removeFromCart, {
    onSuccess: () => {
      refetch();
    },
  });
  const [quantityToAdd, setQuantityToAdd] = useState("");

  const handleAddToCart = async (itemId) => {
    console.log(`Item ${itemId} clicked. Adding to cart...`);
    try {
      const quantity = parseInt(quantityToAdd, 10);

      if (isNaN(quantity)) {
        throw new Error("Quantity must be a valid number");
      }

      await addToCartMutation.mutateAsync({
        goodsName: "Product",
        price: 10,
        imageUrl: "example.jpg",
        totalPrice: 10 * quantity,
        quantity: quantity,
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const handleIncrementQuantity = (itemId) => {
    setLocalCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: item.quantity + 1,
              totalPrice: item.totalPrice + 10,
            }
          : item
      )
    );
  };

  const handleDecrementQuantity = (itemId) => {
    setLocalCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === itemId && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
              totalPrice: item.totalPrice - 10,
            }
          : item
      )
    );
  };

  const handleRemoveFromCart = async (itemId) => {
    try {
      await removeFromCartMutation.mutateAsync(itemId);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleFetchCart = async () => {};

  console.log("Rendering component...");

  React.useEffect(() => {
    if (!isLoading && cartItems) {
      setLocalCartItems(cartItems);
    }
  }, [isLoading, cartItems]);

  return (
    <div>
      <Header />
      <ul></ul>
      <div>
        <h2>Shopping Cart</h2>
        {isLoading ? (
          <p>Loading cart...</p>
        ) : (
          <ul>
            {localCartItems &&
              localCartItems.map((item) => (
                <li
                  key={item.id}
                  style={{
                    border: "1px solid #ccc",
                    margin: "10px",
                    padding: "10px",
                  }}
                >
                  <div>장바구니 품목</div>
                  {item.Good && (
                    <div>
                      <div>{`이름: ${item.Good.goodsName}`}</div>
                      <div>{`가격: ${item.Good.price}`}</div>
                      <div>{`Image: ${item.Good.imageUrl}`}</div>
                      <label>
                        수량 변경:
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            setQuantityToAdd(parseInt(e.target.value, 10))
                          }
                        />
                      </label>
                      <Button onClick={() => handleIncrementQuantity(item.id)}>
                        증가
                      </Button>
                      <Button onClick={() => handleDecrementQuantity(item.id)}>
                        감소
                      </Button>
                      <Button onClick={() => handleAddToCart(item.id)}>
                        추가
                      </Button>
                      <div>{`수량: ${item.quantity}`}</div>
                      <div>{`총 가격: ${item.totalPrice}`}</div>
                    </div>
                  )}
                  <Button onClick={handleFetchCart}>조회</Button>
                  <Button onClick={() => handleRemoveFromCart(item.id)}>
                    삭제
                  </Button>
                </li>
              ))}
          </ul>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ShoppingCart;
