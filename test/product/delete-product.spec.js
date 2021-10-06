const chai = require("chai");
const faker = require("faker");
const flush = require("flush-cache");
require("mocha");
// to clear cash memory

const app = require("../../app");
const { expect, should } = chai;
const request = require("supertest").agent(app);
let server;

describe(`Delete Product DELTE api/v0/products/:id`, () => {
  let name = faker.commerce.color();
  let quentity = faker.datatype.number({ min: 1 });
  let price = faker.datatype.number({ min: 1, max: 1000 });
  let id;
  before(() => {
    server = require("../../server");
  });

  after((done) => {
    console.log("Product Deleted Successfully");

    // close server and clear cache
    flush();
    server.close();
    delete require.cache[require.resolve("./../../server.js")];
    done();
  });

  describe("Testing Delete Product DELETE api/v0/products/:id", () => {
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
              expect(response.body).to.haveOwnProperty("price").equal(price);
              expect(response.body).to.haveOwnProperty("name").equal(name);
            });
        });
      });
    });

    describe("Delete Product", () => {
      it("invalid product id not found", () => {
        return request
          .delete(`/api/v0/products/abcdefgh122`)
          .send()
          .then((response) => {
            expect(response.status).to.equal(404);
            expect(response.body)
              .be.a("object")
              .to.have.property("message")
              .to.equal("Product not found");
          });
      });

      it("valid product id exists", () => {
        return request
          .delete(`/api/v0/products/${id}`)
          .send()
          .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body)
              .be.a("object")
              .to.have.property("message")
              .to.equal("product deleted successfully");
          });
      });
    });
  });
});
