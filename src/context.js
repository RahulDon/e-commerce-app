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
       var subTotal = 0;
       var total = 0;
       this.setState({cartTax:10});
       let tempProduct = [...this.state.products];
       const index = tempProduct.indexOf(this.getItem(id));
       const product = tempProduct[index];
       product.inCart = true;
       product.count = 1;
       const price = product.price;
       product.total = price;
       
       tempProduct.map((item) => {
           subTotal += item.total
       });
       total = subTotal + this.state.cartTax;
       this.setState(() => {
           return {
               products: tempProduct, 
               cart: [...this.state.cart, product],
               cartSubTotal: subTotal,
               cartTotal : total};
       });
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
        this.setState({cartSubTotal:0,cartTax:10});
        var subTotal = 0;
        var total = 0;
        let tempCart = [...this.state.cart];
        const index = tempCart.indexOf(this.getItem(id));
        const product = tempCart[index];
        product.count = product.count + 1;
        product.total = product.price * product.count;
        this.state.cart[index] = product;
        tempCart.map((item) => {
            subTotal += item.total
        });
        total = subTotal + this.state.cartTax;
        this.setState(() => {
            return {
                cart: this.state.cart,
                cartSubTotal: subTotal,
                cartTotal : total
            }
        })
    }

    decrement = (id) => {
        let tempCart = [...this.state.cart];
        const index = tempCart.indexOf(this.getItem(id));
        const product = tempCart[index];

        if(product.count === 0){
            return;
        }
        this.setState({cartSubTotal:0,cartTax:10});
        var subTotal = 0;
        var total = 0;
        
        if(product.count > 0){
            product.count = product.count - 1;
        }
        product.total = product.price * product.count;
        this.state.cart[index] = product;
        tempCart.map((item) => {
            subTotal += item.total
        });

        if(subTotal === 0){
            this.state.cartTax = 0;
        }

        total = subTotal + this.state.cartTax;
        this.setState(() => {
            return {
                cart: this.state.cart,
                cartSubTotal: subTotal,
                cartTotal : total
            }
        })
    }

    removeItem = (id) => {

        let tempCart = [...this.state.cart];
        const index = tempCart.indexOf(this.getItem(id));
        tempCart.splice(index, 1);

        this.setState({cartSubTotal:0});
        var subTotal = 0;
        var total = 0;


        tempCart.map((item) => {
            subTotal += item.total
        });

        total = subTotal + this.state.cartTax;
        this.setState(() => {
            return {
                cart: tempCart,
                cartSubTotal: subTotal,
                cartTotal : total
            }
        })
        
        if(tempCart.length === 0)
            this.setProducts();
    }

    clearCart = () => {
        this.setState(() => {
            return {
                cart: [],
                cartSubTotal: 0,
                cartTotal : 0,
                cartTax: 0
            }
        })

        this.setProducts();
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
