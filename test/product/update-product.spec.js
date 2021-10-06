const chai = require("chai");
const faker = require("faker");
const app = require("../../app");
require("mocha");
// to clear cash memory
const flush = require("flush-cache");
const { expect, should } = chai;

const request = require("supertest").agent(app);
const { productsData } = require("./../../components/products");
const { describe, it } = require("mocha");
let server;


describe("Update Product POST api/v0/product", () => {
    let name = faker.commerce.color();
    let quentity = faker.datatype.number({ 'min': 1 });
    let price = faker.datatype.number({ 'min': 1, 'max': 1000 });
    let id;
    before(() => {
        server = require("../../server");
    });

    after((done) => {
        console.log("Product Updated Successfully");

        // remove created product after Testing

        describe("Remove product after testing", () => {
            it("Remove product", () => {
                return request
                    .delete(`/api/v0/products/${id}`)
                    .send()
                    .then((response) => { });
            });
    
        });


        // close server and clear cache
        flush();
        server.close();
        delete require.cache[require.resolve("./../../server.js")];
        done();
    });


    describe("Testing Update Product PATCH api/v0/product/:productId", () => {

        describe("First Crate a Product", () => {

            describe("Create Product", () => {
                let prodInfo = { name, price, quentity };

                it("Product created Successfully", () => {
                    return request
                        .post("/api/v0/products")
                        .send(prodInfo)
                        .then((response) => {
                            id = response.body.id;
                            expect(response.status).to.equal(200);
                            expect(response.body).to.haveOwnProperty('price').equal(price);
                            expect(response.body).to.haveOwnProperty('name').equal(name);
                        });
                });
            });

        });


        describe("Product Validation Schema", () => {

            describe("Without Product fields", () => {
                it("Without inputs", () => {
                    return request
                        .patch(`/api/v0/products/${id}`)
                        .send({})
                        .then((response) => {
                            expect(response.status).to.equal(400);
                            expect(response.body)
                                .be.a("object")
                                .to.have.property("message")
                                .to.equal("Enter valid fields");
                        });
                });

            })

            describe("With Exists invalid fields", () => {

                describe("Product Name", () => {
                    it("Product name Invalid", () => {
                        return request
                            .patch(`/api/v0/products/${id}`)
                            .send({
                                name: faker.name.title() + "&&",
                            })
                            .then((response) => {
                                expect(response.status).to.equal(400);
                                expect(response.body)
                                    .be.a("object")
                                    .to.have.property("message")
                                    .to.equal("product name must be consists of letters only");
                            });
                    });
                })

                describe("Product Price", () => {
                    it("Product price Invalid field", () => {
                        return request
                            .patch(`/api/v0/products/${id}`)
                            .send({
                                price: faker.name.title(),
                            })
                            .then((response) => {
                                expect(response.status).to.equal(400);
                                expect(response.body)
                                    .be.a("object")
                                    .to.have.property("message")
                                    .to.equal("price must be a number");
                            });
                    });

                    it('Product price less than 1', () => {
                        return request
                            .patch(`/api/v0/products/${id}`)
                            .send({
                                price: -1
                            })
                            .then((response) => {
                                expect(response.status).to.equal(400);
                                expect(response.body)
                                    .be.a("object")
                                    .to.have.property("message")
                                    .to.equal("price must be greater than or equal to 1");
                            });

                    });
                })

                describe("Product Quentity", () => {
                    it("Product quentity Invalid field", () => {
                        return request
                            .patch(`/api/v0/products/${id}`)
                            .send({
                                quentity: faker.name.title(),
                            })
                            .then((response) => {
                                expect(response.status).to.equal(400);
                                expect(response.body)
                                    .be.a("object")
                                    .to.have.property("message")
                                    .to.equal("quentity must be a number");
                            });
                    });

                    it('Product quentity less than 1', () => {
                        return request
                            .patch(`/api/v0/products/${id}`)
                            .send({
                                quentity: -1
                            })
                            .then((response) => {
                                expect(response.status).to.equal(400);
                                expect(response.body)
                                    .be.a("object")
                                    .to.have.property("message")
                                    .to.equal("quentity must be greater than or equal to 1");
                            });

                    });
                })

            });

        });


        describe("Valid product schema for update", () => {
            it('product not found', () => {
                return request
                    .patch(`/api/v0/products/${id + 3}`)
                    .send({
                        price: 50
                    })
                    .then((response) => {
                        expect(response.status).to.equal(404);
                        expect(response.body)
                            .be.a("object")
                            .to.have.property("message")
                            .to.equal("Product not found");
                    });

            });

            it('update product successfully', () => {
                return request
                    .patch(`/api/v0/products/${id}`)
                    .send({
                        price: 50
                    })
                    .then((response) => {
                        expect(response.status).to.equal(200);
                        expect(response.body)
                            .be.a("object");
                    });

            });
        })

    });

});