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
let server;

describe("Remove produce from Cart list DELETE api/v0/cart/:id", () => {
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

  describe("Testing Remove Cart list Products DELETE api/v0/cart/:id", () => {
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

    describe("Delete product from cart list and user Not Authorized", () => {
      it("without headers", () => {
        return request
          .delete(`/api/v0/cart/${id}`)
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
          .delete(`/api/v0/cart/${id}`)
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

    describe("Delete product from cart list and cart list empty", () => {
      it("no product found in cart", () => {
        return request
          .delete(`/api/v0/cart/${id}`)
          .set({ authorization: userToken })
          .send()
          .then((response) => {
            expect(response.status).to.equal(404);
            expect(response.body)
              .be.a("object")
              .to.have.property("message")
              .to.equal("Product not found in cart list");
          });
      });
    });

    describe("Add product to list Successfully", () => {
      it("Product", () => {
        return request
          .post(`/api/v0/cart/${id}`)
          .set({ authorization: userToken })
          .send()
          .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body)
              .be.a("object")
              .to.have.property("message")
              .to.equal("Product added successfully");
          });
      });
    });

    describe("Remove product from cart list Successfully", () => {
      it("Remove the product", () => {
        return request
          .delete(`/api/v0/cart/${id}`)
          .set({ authorization: userToken })
          .send()
          .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body)
              .be.a("object")
              .to.have.property("message")
              .to.equal("product deleted successfully from cart list");
          });
      });
    });
  });
});
