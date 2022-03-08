// const chai = require("chai");
import { testBaseUrl } from "../../../api/configs/api";
import chai from "chai";
import chaiHttp from "chai-http";

const expect = chai.expect;
chai.use(chaiHttp);

describe("People API Unit Test Cases", function () {

  let baseUrl: string;
  let requestTimeOut: number;

  /** set up for each test */
  before(function () {

    /** the base url for the remote `API` */
    baseUrl =  `${testBaseUrl}/devices`;
    requestTimeOut = 50000;
  })

  /**
   * Establish `API V1` is working 
   */
  // it("Api Server is working", function (done) {
  //   chai.request(baseUrl)
  //     .get('/')
  //     .end(function (err, res) {
  //       expect(res).to.have.status(200);
  //       expect(res.text).to.equal("API Working");
  //       done();
  //     })
  // });

  // it("Gateway API endpoint functional", function (done) {
  //   console.log("base url to use", baseUrl);
  //   // chai.request(baseUrl)
  //   //   .get('/')
  //   //   .end(function (err, res) {
  //   //     console.log("body", res);
  //   //     expect(res).to.have.status(200);
  //   //     expect(res.body).to.have.property("error");
  //   //     expect(res.body).to.have.property("errorCode");
  //   //     expect(res.body).to.have.property("message");
  //   //     expect(res.body).to.have.property("statusCode");
  //   //     expect(res.body).to.have.property("data");
  //   //     expect(res.body.data).to.be.an("array");
  //   //     expect(res.body.data.length).greaterThanOrEqual(0);
  //   //     done();
  //   //   })
  // });

})