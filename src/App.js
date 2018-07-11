import React, { Component } from 'react';
import './index.css';

class App extends Component {
  render() {
    return (
      <section>
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#pokeData">
            Launch demo modal
          </button>

          <div className="modal fade" id="pokeData" tabindex="-1" role="dialog" aria-labelledby="pokeData" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <p className="modalTitle h1 text-center">Salemance</p>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>


                <div className="modal-body">
                  <div className="container-fluid">

                    <div className="row">

                      <div className="col col-md-6">
                        <div className="rounded mb-4">
                          <img src="demo.png" alt="salemance" className="img-fluid rounded"></img>
                        </div>
                        
                        <div className="stats p-2 rounded mb-4">
                          <table cellpadding='10'>
                            <tr className="p-2">
                              <th>HP</th>
                              <td className="stat-rank">20</td>
                              <td className="stat-bar p-0">
                                <div className="bg-success border border-dark rounded">
                                  .
                                </div>
                              </td>
                            </tr>
                            <tr className="p-2">
                              <th>Attack</th>
                              <td className="stat-rank">30</td>
                              <td className="stat-bar p-0">
                                <div className="bg-success border border-dark rounded">
                                  .
                                </div>
                              </td>
                            </tr>
                            <tr className="p-2">
                              <th>Defense</th>
                              <td className="stat-rank">40</td>
                              <td className="stat-bar p-0">
                                <div className="bg-success border border-dark rounded">
                                  .
                                </div>
                              </td>
                            </tr >
                            <tr className="p-2">
                              <th>Sp. Atk</th>
                              <td className="stat-rank">50</td>
                              <td className="stat-bar p-0">
                                <div className="bg-success border border-dark rounded">
                                  .
                                </div>
                              </td>
                            </tr>
                            <tr className="p-2"> 
                              <th>Sp. Def</th>
                              <td className="stat-rank">50</td>
                              <td className="stat-bar p-0">
                                <div className="bg-success border border-dark rounded">
                                  .
                                </div>
                              </td>
                            </tr>
                            <tr className="p-2">
                              <th>Speed</th>
                              <td className="stat-rank">50</td>
                              <td className="stat-bar p-0">
                                <div className="bg-success border border-dark rounded">
                                  .
                                </div>
                              </td>
                            </tr>

                          </table>
                        </div>
                      </div>

                      <div className="w-100 d-sm-none d-lg-none d-xl-none"></div>

                      <div className="col col-md-6">

                        <div className="mb-4 mt-3"> 
                          <p className='pokeSummary p-6'>
                            Info about pokemans jjjjjjjjjjjjjjjjjjjjjjjj ajdfapdskjfapjdfpasokkd asdijaspdkvo aspodic jaspoicalkdfkalkdjf;alkdjsf;alskjdf;alksdnca;cnacja  daf af  f
                          </p>
                        </div>

                        <div className="row bg-info p-3 rounded mb-4"> 
                          <div className="col-6">
                            <ul className="characteristics p-0">
                              <li>
                                <p className="h4">Height</p>
                                <p>2' 00"</p>
                              </li>
                              <li>
                                <p className="h4">Weight</p>
                                <p>71.6 lbs</p>
                              </li>
                              <li>
                                <p className="h4">Gender</p>
                                <p>Unknown</p>
                              </li>
                            </ul>
                          </div>
                          <div className="col-6">
                            <ul className="characteristics p-0">
                              <li>
                                <p className="h4">Category</p>
                                <p>Virtual</p>
                              </li>
                              <li>
                                <p className="h4">Abilities</p>
                                <ul className="characteristics p-0">
                                  <li>Trace</li>
                                  <li>Download</li>
                                </ul>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="mb-4"> 
                          <p className="h4">Types</p>
                          <div className="row mt-2">
                            <div className="border border-dark text-center mr-2 mb-2 rounded col-3">Type 1</div>
                            <div className="border border-dark text-center mr-2 mb-2 rounded col-3">Type 2</div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="h4">Weaknesses</p>
                          <div className="row mt-2">
                            <div className="border border-dark text-center mr-2 mb-2 rounded col-3">Type 1</div>
                            <div className="border border-dark text-center mr-2 mb-2 rounded col-3">Type 2</div>
                            <div className="border border-dark text-center mr-2 mb-2 rounded col-3">Type 3</div>
                            <div className="border border-dark text-center mr-2 mb-2 rounded col-3">Type 4</div>
                            <div className="border border-dark text-center mr-2 mb-2 rounded col-3">Type 5</div>
                          </div>
                        </div>

                      </div>
                    </div>

                    <div className="mb-4"> 
                      <p className="h4">Evolutions</p>
                      <div className="row">
                        <div className="card col">
                          <img className="card-img-top mt-3" src="./demo.png" alt="Salamance" />
                          <div className="card-body">
                            <p className="card-title h4">Salamance</p>
                            <p className="card-text">Dragon</p>
                          </div>
                        </div>

                        <div className="w-100 d-sm-none d-lg-none d-xl-none"></div>

                        <div className="col">
                          <i className="fa fa-long-arrow-right fa-5x"></i>
                        </div>

                        <div className="w-100 d-sm-none d-lg-none d-xl-none"></div>

                        <div className="card col">
                          <img className="card-img-top mt-3" src="./demo.png" alt="Salamance" />
                          <div className="card-body">
                            <p className="card-title h4">Salamance</p>
                            <p className="card-text">Dragon</p>
                          </div>
                        </div>

                        <div className="w-100 d-sm-none d-lg-none d-xl-none"></div>

                        <div className="col">
                          <i className="fa fa-long-arrow-right fa-5x"></i>
                        </div>

                        <div className="w-100 d-sm-none d-lg-none d-xl-none"></div>

                        <div className="card col">
                          <img className="card-img-top mt-3" src="./demo.png" alt="Salamance" />
                          <div className="card-body">
                            <p className="card-title h4">Salamance</p>
                            <p className="card-text">Dragon</p>
                          </div>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>

                <div className="mb-4 pl-5">
                  <div className=" row justify-content-between">
                    <div className="col-4">
                      <button type="button" className="btn btn-secondary">Previous Pokemon</button>
                    </div>
                    <div className="col-4">
                      <button type="button" className="btn btn-secondary">Next Pokemon</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          

        </section>
    );
  }
}

export default App;
