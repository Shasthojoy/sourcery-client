import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import Header from './Header/Header';
import Mapp from './Mapp/Mapp';
import ProductSearch from './ProductSearch/ProductSearch';
import { paths, productAddress, addresses } from './utils/static-data.js';

describe('<App />', () => {
  it('renders without crashing', () => {
    const app = shallow(<App />);
    expect(app).toBeTruthy();
  });

  it('renders a header and main section', () => {
    const app = shallow(<App />);
    expect(app.contains(<Header />)).toBeTruthy();
    expect(app.find(Header).length).toEqual(1);
    expect(app.find('main').length).toEqual(1);
    expect(app.find(ProductSearch).length).toEqual(1);
    expect(app.find(Mapp).length).toEqual(1);
  });

  it('renders a single header', () => {
    const app = shallow(<App />);
    expect(app.find(Header).length).toEqual(1);
  });

  it('renders a single map', () => {
    const app = shallow(<App />);
    expect(app.find(Mapp).length).toEqual(1);
  });

  it('renders a single search section', () => {
    const app = shallow(<App />);
    expect(app.find(ProductSearch).length).toEqual(1);
  });

  it('calls findProductPaths when the submit is clicked', async () => {
    const restore = App.prototype.findProductPaths;
    const mock = App.prototype.findProductPaths = jest.fn();
    const app = mount(<App />);
    app.find('.product-search input[type="submit"]').simulate('click');
    await expect(mock).toHaveBeenCalled();
    App.prototype.findProductPaths = restore;
  });

  it('calls updateQuery when an input change occurs', () => {
    const restore = App.prototype.updateQuery;
    const mock = App.prototype.updateQuery = jest.fn();
    const app = mount(<App />);
    app.find('.product-search input[type="text"]').simulate('change');
    expect(mock).toBeCalled();
    App.prototype.updateQuery = restore;
  });

  it('calls updateCheckpoint when an input change occurs', () => {
    const restore = App.prototype.updateCheckpoint;
    const mock = App.prototype.updateCheckpoint = jest.fn();
    const app = mount(<App />);
    app.find('.create-checkpoint input[placeholder="creator"]').simulate('change');
    expect(mock).toHaveBeenCalledTimes(1);
    app.find('.create-checkpoint input[placeholder="lat"]').simulate('change');
    expect(mock).toHaveBeenCalledTimes(2);
    App.prototype.updateCheckpoint = restore;
  });

  it('calls updateLot when an input change occurs', () => {
    const restore = App.prototype.updateLot;
    const mock = App.prototype.updateLot = jest.fn();
    const app = mount(<App />);
    app.find('.create-lot input[type="text"]').simulate('change');
    expect(mock).toHaveBeenCalled();
    App.prototype.updateLot = restore;
  });

  it('calls viewAllPaths when button is clicked', () => {
    const restore = App.prototype.viewAllPaths;
    const mock = App.prototype.viewAllPaths = jest.fn()
    const app = mount(<App />);
    app.instance().setState({ paths: paths[productAddress] });
    app.find('.product-search > button').simulate('click');
    expect(mock).toBeCalled();
    App.prototype.viewAllPaths = restore;
  });

  it('calls handlePathViewClick when view button is clicked', () => {
    const restore = App.prototype.handlePathViewClick;
    const mock = App.prototype.handlePathViewClick = jest.fn();
    const app = mount(<App />);
    app.instance().setState({ paths: paths[productAddress] });
    app.find('.product-search li#0 button').simulate('click');
    expect(mock).toBeCalled();
    App.prototype.handlepathViewClick = restore;
  });

  it('calls createLot when create button is clicked', () => {
    const restore = App.prototype.createLot;
    const mock = App.prototype.createLot = jest.fn();
    const app = mount(<App />);
    app.instance().setState({ paths: paths[productAddress] })
    app.find('.create-lot input[type="submit"]').simulate('click');
    expect(mock).toBeCalled();
    App.prototype.createLot = restore;
  });

  it('calls createCheckpoint when create button is clicked', () => {
    const restore = App.prototype.createCheckpoint;
    const mock = App.prototype.createCheckpoint = jest.fn();
    const app = mount(<App />);
    app.instance().setState({ paths: paths[productAddress] })
    app.find('.create-checkpoint input[type="submit"]').simulate('click');
    expect(mock).toBeCalled();
    App.prototype.createCheckpoint = restore;
  });

  it('has an APIService', () => {
    expect(App.prototype.APIService).toBeTruthy();
  });

  it('has an ethereumClient', () => {
    expect(App.prototype.ethereumClient).toBeTruthy();
  });

  it('has a pathsController', () => {
    expect(App.prototype.pathsController).toBeTruthy();
  });
});
