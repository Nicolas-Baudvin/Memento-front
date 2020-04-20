/* eslint-disable import/no-extraneous-dependencies */
// import Adapter from 'enzyme-adapter-react-16';
// import chai from 'chai';
// import { configure as configureEnzyme } from 'enzyme';
// import createChaiEnzyme from 'chai-enzyme';
// import createChaiJestDiff from 'chai-jest-diff';
// import dirtyChai from 'dirty-chai';

const Adapter = require("enzyme-adapter-react-16");
const chai = require("chai");
const configureEnzyme = require("enzyme").configure;
const createChaiEnzyme = require("chai-enzyme");
const chaiJestDiff = require("chai-jest-diff");
const dirtyChai = require("dirty-chai");
const sinonChai = require('sinon-chai');

chai
  .use(chaiJestDiff.default())
  .use(dirtyChai)
  .use(createChaiEnzyme())
  .use(sinonChai);

configureEnzyme({ adapter: new Adapter() });
