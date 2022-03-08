// const chai = require("chai");
import { testBaseUrl } from "../api/configs/api";
import chai from "chai";
import chaiHttp from "chai-http";

const expect = chai.expect;
chai.use(chaiHttp);

describe("Gateway API Main server  Test Cases", function () {

  let baseUrl: string;
  let requestTimeOut: number;

  /** set up for each test */
  before(function () {

    /** the base url for the remote `API` */
    baseUrl = testBaseUrl;

    requestTimeOut = 50000;
  })

  /**
   * Establish `API V1` is working 
   */
  it("Api Server is working", function (done) {
    chai.request(baseUrl)
      .get('/')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.text).to.equal("API Working");
        done();
      })
  });

  it("Invalid route must return an not found", function (done) {
    chai.request(baseUrl)
      .get('/invalid')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.text).to.equal("NOT FOUND");
        done();
      })
  });
})