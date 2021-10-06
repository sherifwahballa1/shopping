const chai = require("chai");
const faker = require("faker");
const app = require("../../app");
require("mocha");
// to clear cash memory
const flush = require("flush-cache");
const { expect, should } = chai;

const request = require("supertest").agent(app);
const { productsData } = require("./../../components/products");
const { describe } = require("mocha");
let server;

describe("Create NEW Product POST api/v0/product", () => {
  let name = faker.commerce.color();
  let quentity = faker.datatype.number({ min: 1 });
  let price = faker.datatype.number({ min: 1, max: 1000 });
  let id;
  before(() => {
    server = require("../../server");
  });

  after((done) => {
    console.log("Add Product Done Successfully");
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
              expect(response.body).to.haveOwnProperty("price").equal(price);
              expect(response.body).to.haveOwnProperty("name").equal(name);
            });
        });
      });
    });
  });
});
