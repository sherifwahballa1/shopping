# Shopping List
> #### System manages the users to check available products and add these products to their shopping cart.

<img src="https://www.paywithspare.com/assets/images/logo.svg" width="100" height="100">
 
___
## Build/Run With NodeJs and NPM

##### Requirements

- Node.js
- NPM

##### Commands

```bash

# First, Install the dependencies
$ npm install

# Then start Node Server */
$ npm start

# To run the tests */
$ npm run test


```

___
## Build/Run With Docker
##### Requirements

- docker.io

##### Commands

```bash

# Build the image
$ docker build -t shopping .

# Run the image into container */
$ docker run -it -p 9000:9000 shopping

```
  
>The server should run on <span style="color:orange; font-weight: bold;">http://locahost:9000</span>

___

## Specifications

- [RESTful APIs](./app.js), a Node.js/Express.js server which handles the products and users' shopping list carts basic CRUD operations.
  
- RESTful APIs  
  - [RESTful Product APIs](./components/products/routes/product.API.js) Product (create, get, update, delete).


  - [RESTful Cart APIs](./components/cart/routes/cart.API.js) Shopping Cart (create, get, delete).

- Security Module:
  - To Authorize and Authenticate the users
  

___
## Shopping List Endpoints

>Product

  - `POST /api/v0/products` (creating new product...) 
    
    **payload**
      ```json
      {
          "name": "product name",
          "price": "product price",
          "quentity": "product quentity"
      }
      ```

   
  ___

- `Update /api/v0/products/${id}` (update product)
  
    **payload**  
    ```json
    {
        "name": "product name",
        "price": "product price",
        "quentity": "product quentity"
    }
    ```
___

- `GET /api/v0/products` (get all products) 
   
    **Query params**

     * <span style="font-weight: 500; color: orange;">`pageNo` : </span> Used for pagination (default 0 if user not provid in request)
     * <span style="font-weight: 500; color: orange;">`limitNo` : </span> (optional with default 50 per request if user not set)
___

- `Delete /api/v0/products/${id}` (delete product)

___

>Cart

  - `POST /api/v0/cart/${productId}` (Add product to the shopping list...) 
    
___

 - `GET /api/v0/cart` (get products from shopping list...) 
___

- `DELETE //api/v0/cart/${id}` (delete product from shopping list) 
   
    **Query params**

     * <span style="font-weight: 500; color: orange;">`pageNo` : </span> Used for pagination (default 0 if user not provid in request)
     * <span style="font-weight: 500; color: orange;">`limitNo` : </span> (optional with default 50 per request if user not set)
___

## Technologies

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
