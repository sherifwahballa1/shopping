const chai = require("chai");
const e = require("express");
const faker = require("faker");
const flush = require("flush-cache");
const { before } = require("mocha");
const app = require("../../app");
require("mocha");
// to clear cash memory

const { expect, should } = chai;
const request = require("supertest").agent(app);
const { productsData } = require("./../../components/products");
let server;

describe("Add to List Products POST api/v0/cart/:productId", () => {
  let name = faker.commerce.color();
  let quentity = 1;
  let price = faker.datatype.number({ min: 1, max: 1000 });
  let id;
  let userToken = "57c44f58";
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
          .then((response) => {});
      });
    });

    // close server and clear cache
    flush();
    server.close();
    delete require.cache[require.resolve("./../../server.js")];
    done();
  });

  describe("Testing Add to List Products POST api/v0/products", () => {
    describe("First Create a Product", () => {
      describe("Create Product", () => {
        let prodInfo = { name, price, quentity };

        it("Product created Successfully", () => {
          return request
            .post("/api/v0/products")
            .send(prodInfo)
            .then((response) => {
              id = response.body.id;
              expect(response.status).to.equal(200);
              expect(response.body).to.haveOwnProperty("price").equal(price);
              expect(response.body).to.haveOwnProperty("name").equal(name);
            });
        });
      });
    });

    describe("Add product to list and user Not Authorized", () => {
      it("without headers", () => {
        return request
          .post(`/api/v0/cart/${id}`)
          .set({})
          .send()
          .then((response) => {
            expect(response.status).to.equal(401);
            expect(response.body)
              .be.a("object")
              .to.have.property("message")
              .to.equal("Not Authorized User not allowed to access");
          });
      });

      it("With unauthorized user", () => {
        return request
          .post(`/api/v0/cart/${id}`)
          .send({ authorization: "123" })
          .then((response) => {
            expect(response.status).to.equal(401);
            expect(response.body)
              .be.a("object")
              .to.have.property("message")
              .to.equal("Not Authorized User not allowed to access");
          });
      });
    });

    describe("Add product to list and product not exists", () => {
      it("Product not found", () => {
        return request
          .post(`/api/v0/cart/not-found-product`)
          .set({ authorization: userToken })
          .send()
          .then((response) => {
            expect(response.status).to.equal(404);
            expect(response.body)
              .be.a("object")
              .to.have.property("message")
              .to.equal("Product not found");
          });
      });
    });

    describe("Add product to list Successfully", () => {
      it("Product not found", () => {
        return request
          .post(`/api/v0/cart/${id}`)
          .set({ authorization: userToken })
          .send()
          .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body)
              .be.a("object")
              .to.have.property("message")
              .to.equal("Product added successfully into your cart");
          });
      });
    });

    describe("Add product to list and Product out of stock", () => {
      it("Product not found", () => {
        return request
          .post(`/api/v0/cart/${id}`)
          .set({ authorization: userToken })
          .send()
          .then((response) => {
            expect(response.status).to.equal(404);
            expect(response.body)
              .be.a("object")
              .to.have.property("message")
              .to.equal("Product out of stock");
          });
      });
    });
  });
});
