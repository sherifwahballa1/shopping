const chai = require("chai");
const faker = require("faker");
// to clear cash memory
const flush = require("flush-cache");
require("mocha");

const app = require("../../app");
const { expect, should } = chai;
const request = require("supertest").agent(app);
const { productsData } = require("./../../components/products");
let server;


describe("GET Products GET api/v0/products", () => {
    let name = faker.commerce.color();
    let quentity = faker.datatype.number({ 'min': 1 });
    let price = faker.datatype.number({ 'min': 1, 'max': 1000 });
    let id;
    before(() => {
        server = require("../../server");
    });

    after((done) => {
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


    describe("Testing GET Products GET api/v0/products", () => {

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


        describe("GET Products without pagination", () => {
            it('Products without pagination', () => {
                return request
                    .get(`/api/v0/products`)
                    .send()
                    .then((response) => {
                        expect(response.status).to.equal(200);
                        expect(response.body)
                            .be.a("object")
                            .to.have.property("products")
                    });

            });
        });

        describe("GET Products with pagination", () => {
            it('Products with pagination', () => {
                return request
                    .get(`/api/v0/products?pageNo=${0}&limitNo=${20}`)
                    .send()
                    .then((response) => {
                        expect(response.status).to.equal(200);
                        expect(response.body)
                            .be.a("object")
                            .to.have.property("products")
                    });

            });
        });

        describe("GET Products and there's no products", () => {
            before(() => {
                Object.keys(productsData).forEach(function (key) { delete productsData[key]; });

            })
            it('No products', () => {
                return request
                    .get(`/api/v0/products?pageNo=${0}&limitNo=${20}`)
                    .send()
                    .then((response) => {
                        expect(response.status).to.equal(404);
                        expect(response.body)
                            .be.a("object")
                            .to.have.property("message")
                            .to.equal("There are no products available")
                    });

            });
        })

    });

});