import React, { Component } from 'react';
import {storeProducts, detailProduct} from './data';

const ProductContext = React.createContext();
//provider
//consumer

class ProductProvider extends Component {
    state={
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modelOpen: false,
        modelProduct: detailProduct,
        cartSubTotal: 0,
        cartTax:0,
        cartTotal:0
    }
    componentDidMount(){
        this.setProducts();
    }
    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = {...item};
            tempProducts = [...tempProducts,singleItem];
        });
        this.setState(()=>{
            return {products: tempProducts}
        })
    };

    getItem = (id) => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    }

    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return {detailProduct: product};
        });
    };

    addToCart = (id) => {
       let tempProduct = [...this.state.products];
       console.log('tempProduct ' + JSON.stringify(tempProduct));
       const index = tempProduct.indexOf(this.getItem(id));
       const product = tempProduct[index];
       product.inCart = true;
       product.count = 1;
       const price = product.price;
       product.total = price;

       this.setState(() => {
           return {products: tempProduct, cart: [...this.state.cart, product]};
       }, ()=> {
           console.log(this.state);
       })
    };

    openModel = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return {modelProduct:product, modelOpen: true};
        })
    };

    closeModel = () => {
        this.setState(() => {
            return {modelOpen:false};
        })
    };

    increment = (id) => {
        console.log('incrementation');
    }

    decrement = (id) => {
        console.log('decrementation');
    }

    removeItem = (id) => {
        console.log('remove item');
    }

    clearCart = () => {
        console.log('cart was cleared');
    }

    render() {
        return (
           <ProductContext.Provider value={{
               ...this.state, 
               handleDetail: this.handleDetail,
               addToCart: this.addToCart,
               openModel: this.openModel,
               closeModel: this.closeModel,
               increment: this.increment,
               decrement: this.decrement,
               removeItem: this.removeItem,
               clearCart: this.clearCart   
           }}>
               {this.props.children}
           </ProductContext.Provider> 
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider,  ProductConsumer };
