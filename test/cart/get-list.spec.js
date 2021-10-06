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

describe("Get Cart list GET api/v0/cart", () => {
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

  describe("Testing Get Cart list Products GET api/v0/cart", () => {
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

    describe("Get cart list and user Not Authorized", () => {
      it("without headers", () => {
        return request
          .get(`/api/v0/cart`)
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

    describe("Get cart list and cart list empty", () => {
      it("no products found in cart", () => {
        return request
          .get(`/api/v0/cart`)
          .set({ authorization: userToken })
          .send()
          .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body)
              .be.a("object");
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

    describe("Get cart list Successfully", () => {
      it("cart list", () => {
        return request
          .get(`/api/v0/cart`)
          .set({ authorization: userToken })
          .send()
          .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).be.a("object").to.have.property("list");
          });
      });
    });
  });
});
