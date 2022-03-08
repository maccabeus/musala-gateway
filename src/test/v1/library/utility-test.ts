// const chai = require("chai");
import chai from "chai";
import { testBaseUrl } from "../../../api/configs/api";
import { isValidIpAddress, isValidClientData, getNextRecordId } from "../../../api/library/library.utilities";

const expect = chai.expect;

describe("Utility functions Test cases", function () {

  let testIpValid: string;
  let testIpInvalid: string;
  let testIpClientData: any
  let testIpClientDataInvalid: any

  /** set up for each test */
  before(function () {
    testIpInvalid = "123.908.87.0";
    testIpValid = "125.42.150.37";
    testIpClientData = { vendor: "IBM", gatewayId: 4 };
    testIpClientDataInvalid = { vendor: "IBM"};
  })

  it("Invalid IP must return error", function (done) {
    expect(isValidIpAddress(testIpInvalid)).to.equal(false);
    done();
  })

  it("Must correctly identifies a valid IP address", function (done) {
    expect(isValidIpAddress(testIpValid)).to.equal(true);
    done();
  })

  it("Must correctly validate correct client request data", function (done) {
    const clientData = isValidClientData(testIpClientData, ["vendor", "gatewayId"]);
    expect(clientData).to.have.keys(["valid", "message", "data"]);
    expect(clientData.valid).to.equal(true);
    done();
  })

  it("Must correctly validate a wrong client request data", function (done) {
    const clientData = isValidClientData(testIpClientDataInvalid, ["vendor", "gatewayId"]);
    expect(clientData.valid).to.equal(false);
    done();
  })

});