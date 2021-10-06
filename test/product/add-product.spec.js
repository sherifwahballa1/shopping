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
  let id = faker.random.uuid();
  let quentity = faker.datatype.number({ min: 1 });
  let price = faker.datatype.number({ min: 1, max: 1000 });
  let productID;
  before(() => {
    server = require("../../server");
  });

  after((done) => {
    console.log("Add Product Done Successfully");

    // remove created product after Testing
    describe("Remove product after testing", () => {
      it("Remove product", () => {
        return request
          .delete(`/api/v0/products/${productID}`)
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

  describe("Testing Add Product POST api/v0/product", () => {
    describe("Product Validation Schema", () => {
      describe("Product name Validation", () => {
        let productWithoutName,
          productWithEmptyName,
          productDataWithInvalidName;

        before(() => {
          productWithoutName = {
            id,
            price,
            quentity,
          };

          productWithEmptyName = {
            name: "",
            id,
            price,
            quentity,
          };

          productDataWithInvalidName = {
            name: faker.name.title() + "&&",
            id,
            price,
            quentity,
          };
        });

        it("Product name Required", () => {
          return request
            .post("/api/v0/products")
            .send(productWithoutName)
            .then((response) => {
              expect(response.status).to.equal(400);
              expect(response.body)
                .be.a("object")
                .to.have.property("message")
                .to.equal("product name is required");
            });
        });

        it("Product name is empty filed", () => {
          return request
            .post("/api/v0/products")
            .send(productWithEmptyName)
            .then((response) => {
              expect(response.status).to.equal(400);
              expect(response.body)
                .to.have.property("message")
                .to.equal("product name cannot be an empty field");
            });
        });

        it("Product name Invalid", () => {
          return request
            .post("/api/v0/products")
            .send(productDataWithInvalidName)
            .then((response) => {
              expect(response.status).to.equal(400);
              expect(response.body)
                .to.have.property("message")
                .to.equal("product name must be consists of letters only");
            });
        });
      });

      describe("Product Price Validation", () => {
        let productWithoutPrice, productEmptyPrice, productWithInvalidPrice;
        before(() => {
          // team email

          productWithoutPrice = {
            name,
            id,
            quentity,
          };

          productEmptyPrice = {
            name,
            id,
            quentity,
            price: "",
          };

          productWithInvalidPrice = {
            name,
            id,
            quentity,
            price: "$%$",
          };

          productWitMinPrice = {
            name,
            id,
            quentity,
            price: -1,
          };
        });

        it("Product Price Required", () => {
          return request
            .post("/api/v0/products")
            .send(productWithoutPrice)
            .then((response) => {
              expect(response.status).to.equal(400);
              expect(response.body)
                .to.have.property("message")
                .to.equal("price is required");
            });
        });

        it("Product Price is empty filed", () => {
          return request
            .post("/api/v0/products")
            .send(productEmptyPrice)
            .then((response) => {
              expect(response.status).to.equal(400);
              expect(response.body)
                .to.have.property("message")
                .to.equal("price must be a number");
            });
        });

        it("Product Price invalid value less than ZERO", () => {
          return request
            .post("/api/v0/products")
            .send(productWitMinPrice)
            .then((response) => {
              expect(response.status).to.equal(400);
              expect(response.body)
                .to.have.property("message")
                .to.equal("price must be greater than or equal to 1");
            });
        });

        it("Product Price Invalid", () => {
          return request
            .post("/api/v0/products")
            .send(productWithInvalidPrice)
            .then((response) => {
              expect(response.status).to.equal(400);
              expect(response.body)
                .to.have.property("message")
                .to.equal("price must be a number");
            });
        });
      });

      describe("Product Quentity Validation", () => {
        let productWithoutQuentity,
          productEmptyQuentity,
          productWithInvalidQuentity;
        before(() => {
          // team email

          productWithoutQuentity = {
            name,
            id,
            price,
          };

          productEmptyQuentity = {
            name,
            id,
            quentity: "",
            price,
          };

          productWitMinQuentity = {
            name,
            id,
            quentity: -1,
            price,
          };

          productWithInvalidQuentity = {
            name,
            id,
            quentity: "$#$",
            price,
          };
        });

        it("Product Quentity Required", () => {
          return request
            .post("/api/v0/products")
            .send(productWithoutQuentity)
            .then((response) => {
              expect(response.status).to.equal(400);
              expect(response.body)
                .to.have.property("message")
                .to.equal("quentity is required");
            });
        });

        it("Product Quentity is empty filed", () => {
          return request
            .post("/api/v0/products")
            .send(productEmptyQuentity)
            .then((response) => {
              expect(response.status).to.equal(400);
              expect(response.body)
                .to.have.property("message")
                .to.equal("quentity must be a number");
            });
        });

        it("Product Quentity invalid value less than ZERO", () => {
          return request
            .post("/api/v0/products")
            .send(productWitMinQuentity)
            .then((response) => {
              expect(response.status).to.equal(400);
              expect(response.body)
                .to.have.property("message")
                .to.equal("quentity must be greater than or equal to 1");
            });
        });

        it("Product Quentity Invalid", () => {
          return request
            .post("/api/v0/products")
            .send(productWithInvalidQuentity)
            .then((response) => {
              expect(response.status).to.equal(400);
              expect(response.body)
                .to.have.property("message")
                .to.equal("quentity must be a number");
            });
        });
      });
    });

    describe("Product Schema Valid", () => {
      before(() => {});

      describe("Create Product", () => {
        let prodInfo = { name, price, quentity };

        it("Create Product Successfully", () => {
          return request
            .post("/api/v0/products")
            .send(prodInfo)
            .then((response) => {
              productID = response.body.id;
              expect(response.status).to.equal(200);
              expect(response.body).to.haveOwnProperty("price").equal(price);
              expect(response.body).to.haveOwnProperty("name").equal(name);
            });
        });
      });
    });
  });
});
