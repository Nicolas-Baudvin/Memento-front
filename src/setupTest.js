/* eslint-disable import/no-extraneous-dependencies */

const Adapter = require("enzyme-adapter-react-16");
const chai = require("chai");
const configureEnzyme = require("enzyme").configure;
const createChaiEnzyme = require("chai-enzyme");
const chaiJestDiff = require("chai-jest-diff");
const dirtyChai = require("dirty-chai");
const sinonChai = require('sinon-chai');
const chaiJestSnapshot = require('chai-jest-snapshot');
const enzymeToJSON = require('enzyme-to-json/serializer');

chai
  .use(chaiJestDiff.default())
  .use(dirtyChai)
  .use(createChaiEnzyme())
  .use(chaiJestSnapshot)
  .use(sinonChai);

expect.addSnapshotSerializer(enzymeToJSON);

configureEnzyme({ adapter: new Adapter() });
