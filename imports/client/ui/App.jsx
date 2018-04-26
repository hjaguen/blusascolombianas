import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import { graphql } from 'react-apollo';

import {
    Button,
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem,
    Grid,
    Row,
    Col
} from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import {
    Card, CardTitle, CardText, CardActions, Button as ButtonCard,
    Footer, FooterSection, FooterDropDownSection, FooterLinkList
} from  'react-mdl';

import sanitizeHtml from 'sanitize-html-react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import * as conf from './config.jsx';
import NavbarAdaptat from './NavBarExp.jsx';
import {
    MostrariSubcategoriaPRODUCTES
} from './Mostraris.jsx';
import * as Qs from './Queries.jsx';
import FootrAdaptat from './Footer.jsx';
//import FreeContent from './FreeContent.jsx';
import MainContentProducte from './DetallProducte.jsx';
import * as Stylo from './StyledComponents.jsx';

import {
    MarquesSUBCAT,
    TallesSUBCAT,
    ColorsSUBCAT,
    BuscadorColumnaSUBCAT
} from './Filtros.jsx';

import Cookies from './cookies'


let variables = {
    apiUrl: "http://api.colombiaespassion.net",
    pageId: "1",
    categoryId: conf.categoryId,
    subcategoryId: "31",
    sizeId: "21",
    brandId: "4",
    colorId: "17",
    productId: ""
};

const cartItems = {};

const NavbarAdaptatAmbSubcategories = graphql(Qs.SubcategoriesQuery, {
    options: {
        variables
    }
})(NavbarAdaptat);

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            variables,
            filtreMarca: null,
            filtreTalla: null,
            filtreColor: null,
        };

        this.variables = variables;

        this.subcategoryIdAlState = this.subcategoryIdAlState.bind(this);
        this.marcaIdAVariables = this.marcaIdAVariables.bind(this);
        this.tallaIdAVariables = this.tallaIdAVariables.bind(this);
        this.colorIdAVariables = this.colorIdAVariables.bind(this);
    }

    // marcaTallaUpdate(m, t) {
    //     this.props.history.push(`../marca-talla/${this.props.filtreMarca.label.trim().replace(/ /g, ".").toLowerCase()}-${this.props.filtreTalla.label.trim().replace(/ /g, ".").toLowerCase()}.${this.props.filtreMarca.value}.${this.props.filtreTalla.value}`);
    // }

    subcategoryIdAlState(ev) {
        console.dir(ev.target.dataset);
        let
            variables = Object.assign({}, this.state.variables, {subcategoryId: ev.target.dataset.subcategoryId})
        ;

        this.setState({
            variables
        });
    }

    marcaIdAVariables(marcaId) {
        let
            variables = Object.assign({}, this.state.variables, {brandId: marcaId})
        ;

        this.setState({
            variables
        });
    }

    tallaIdAVariables(tallaId) {
        let
            variables = Object.assign({}, this.state.variables, {sizeId: tallaId})
        ;

        this.setState({
            variables
        });
    }

    colorIdAVariables(color) {
        let
            variables = Object.assign({}, this.state.variables, {color})
        ;
        this.setState({
            filtreColor: color,
            variables
        });
    }

    filtrantMarca(marca) {
        marca ? this.marcaIdAVariables(marca.value) : null;
        this.setState({
            filtreMarca: marca
        });
    }

    filtrantTalla(talla) {
        talla ? this.tallaIdAVariables(talla.value) : null;
        this.setState({
            filtreTalla: talla
        });
    }

    filtrantColor(ev) {
        ev && ev.target.dataset['colorid']
            ?  (()=>{
                    this.colorIdAVariables(ev.target.dataset['colorid']);
                    this.setState({
                        filtreColor: {
                            colorId: ev.target.dataset['colorid'],
                            nom_color: ev.target.dataset['nomcolor'],
                            label_color: ev.target.dataset['labelcolor']
                        }
                    });
                })()
            : this.setState({
                filtreColor: null
            });
    }

    desactivaFiltres() {
        this.setState({
            filtreColor: null,
            filtreTalla: null,
            filtreMarca: null
        });
    }

    // handleAddToCart(selectedProducts){
    //     let cartItem = this.state.cart;
    //     let productID = selectedProducts.id;
    //     let productQty = selectedProducts.cantidad;
    //     if(this.checkProduct(productID)){
    //         console.log('hi');
    //         let index = cartItem.findIndex((x => x.id == productID));
    //         cartItem[index].cantidad = Number(cartItem[index].cantidad) + Number(productQty);
    //         this.setState({
    //             cart: cartItem
    //         })
    //     } else {
    //         cartItem.push(selectedProducts);
    //     }
    //     this.setState({
    //         cart : cartItem,
    //         cartBounce: true,
    //     });
    //     setTimeout(function(){
    //         this.setState({
    //             cartBounce:false,
    //             cantidad: 1
    //         });
    //         console.log(this.state.cantidad);
    //         console.log(this.state.cart);
    // }.bind(this),1000);  
    //     this.sumTotalItems(this.state.cart);
    // }
    // handleRemoveProduct(id, e){
    //     let cart = this.state.cart;
    //     let index = cart.findIndex((x => x.id == id));
    //     cart.splice(index, 1);
    //     this.setState({
    //         cart: cart
    //     })
    //     this.sumTotalItems(this.state.cart);
    //     e.preventDefault();
    // }
    // checkProduct(productID){
    //     let cart = this.state.cart;
    //     return cart.some(function(item) {
    //         return item.id === productID;
    //     }); 
    // }
    // sumTotalItems(){
    //     let total = 0;
    //     let cart = this.state.cart;
    //     total = cart.length;
    //     this.setState({
    //         totalItems: total
    //     })
    // }

    render() {
        let
            MarquesSubCategoria = graphql(Qs.SubCategoriaMARQUESQuery, {
                options: () => {
                    return ({
                        variables: this.variables
                    });
                }
            })(MarquesSUBCAT),

            TallesSubCategoriaTOTS = graphql(Qs.SubCategoriaTALLESQuery, {
                options: () => {
                    let
                        variables = Object.assign(this.variables, {queryVariant: "subcategoriaTALLES"});
                    return ({
                        variables: this.variables
                    });
                }
            })(TallesSUBCAT),

            TallesSubCategoriaMARCA = graphql(Qs.MarcaSubCategoriaTALLESQuery, {
                options: () => {
                    let
                        variables = Object.assign(this.variables, {queryVariant: "marcaSubcategoriaTALLES"});
                    return ({
                        variables: this.variables
                    });
                }
            })(TallesSUBCAT)

            ColorsSubCategoriaTOTS = graphql(Qs.SubCategoriaCOLORSQuery, {
                options: () => {
                    let
                        variables = Object.assign(this.variables, {queryVariant: "subcategoriaCOLORS"});
                    return ({
                        variables: this.variables
                    });
                }
            })(ColorsSUBCAT),

            ColorsSubCategoriaMARCA = graphql(Qs.MarcaSubcategoriaCOLORSQuery, {
                options: () => {
                    let
                        variables = Object.assign(this.variables, {queryVariant: "marcaSubcategoriaCOLORS"});
                    return ({
                        variables: this.variables
                    });
                }
            })(ColorsSUBCAT),

            MostrariAmbProductes = graphql(Qs.SubCategoriaPRODUCTESQuery, {
                options: () => {
                    return ({
                        variables: this.variables
                    });
                }
            })(MostrariSubcategoriaPRODUCTES),

            FootrAdaptatAmbSubcategories = graphql(Qs.SubcategoriesQuery, {
                options: {
                    variables
                }
            })(FootrAdaptat)
        ;

        class BuscadorColumnaSUBCAT extends Component {
            constructor(props) {
                super(props);

                this.state = {
                    ocultaMostra: "Muestra"
                };

                this.desactivaFiltres = this.desactivaFiltres.bind(this);
            }

            desactivaFiltres() {
                this.props.history.push(`..`);
                this.props.history.replace(location.pathname.substring(0,location.pathname.length-1));
                this.props.desactivaFiltres();
            }

            render() {
                return (
                    <Stylo.Filtro>
                    {
                        (this.props.filtreTalla || this.props.filtreMarca || this.props.filtreColor)
                            ?   <span
                                    style={{
                                        top: `.5em`,
                                        right: `0`,
                                        position: ``,
                                        border: `1px white solid`,
                                        borderRadius: `1em`,
                                        width: `20px`,
                                        height: `20px`,
                                        background: `fuchsia`,
                                        color: `white`,
                                        margin: `.2em`,
                                        textAlign: `center`,
                                        display: `grid`,
                                        alignItems: `center`,
                                        fontFamily: `v`,
                                        cursor: `pointer`,
                                        float: `right`,
                                        marginTop: `-.8em`,
                                        marginRight: `-.7em`,
                                        marginBottom: `.4em`,
                                        transform: `scale(1.2)`
                                    }}
                                    title="Desactivar todos los filtros"
                                    onClick={this.desactivaFiltres}
                                >&times;
                                </span>
                            : null
                    }
                        <MarquesSubCategoria {...this.props} />
                        {   // AUTOFILTRES
                            (this.props.filtreMarca)
                                ?   <TallesSubCategoriaMARCA {...this.props} />
                                :   <TallesSubCategoriaTOTS {...this.props} />
                        }
                        {   (this.props.filtreMarca)
                                ?   <ColorsSubCategoriaMARCA {...this.props} />
                                :   <ColorsSubCategoriaTOTS {...this.props} />
                        }
                        <button
                            className="mobile toggle-filtres oculta-mostra"
                            onClick={() => {
                                [...document.querySelectorAll(".filtro > *")].map(
                                    (v,i,a) => {
                                        v.classList.toggle("amaga");
                                        v.classList.toggle("mostra");
                                        if (document.querySelector(".filtreC").classList.contains("amaga")) {
                                            this.setState({
                                                ocultaMostra: "Muestra"
                                            })
                                        } else {
                                            this.setState({
                                                ocultaMostra: "Oculta"
                                            })
                                        }
                                        // v.style.opacity = 1;
                                        // v.style.height = "2em";
                                        // v.style.width = "80%";
                                        // v.style.padding = ".5em";                                       v.style.visibility = "visible";
                                    }
                                );
                            }}
                        >{`${this.state.ocultaMostra} los filtros`}</button>

                    </Stylo.Filtro>
                );
            }
        }

        class MainContentSubCat extends Component {
            constructor(props, context) {
                super(props, context);
            }

            render() {
                return ([
                    <Stylo.PosicionFiltro
                        key="columna"
                    >
                        <BuscadorColumnaSUBCAT {...this.props} />
                    </Stylo.PosicionFiltro>
                    ,
                    <Stylo.PosicionProductos
                        key="mostrari"
                    >
                        <MostrariAmbProductes {...this.props} />
                    </Stylo.PosicionProductos>
                ]);
            }
        }

//////////// index ////////////

        return (
            <Router>
                <Stylo.LO>
                    <Route path="/" render={() => (
                            <NavbarAdaptatAmbSubcategories
                                subcategoryIdAlState={this.subcategoryIdAlState}
                                fluid
                                inverse

                                filtrantMarca={this.filtrantMarca}
                                filtreMarca={this.state.filtreMarca}

                                filtrantTalla={this.filtrantTalla}
                                filtreTalla={this.state.filtreTalla}

                                filtrantColor={this.filtrantColor}
                                filtreColor={this.state.filtreColor}
                            />
                    )}/>

                    <Route exact path="/" render={() => ([
                        <Stylo.MainSlider
                            key="slider"
                        >
                            {conf.slider}
                        </Stylo.MainSlider>
                        ,
                        <Stylo.MainContent
                            key="content"
                        >
    		              <h1>{conf.subtituloPagina}</h1>
    		              <h2>{conf.titulo_contenido}</h2>
    		              {conf.bloque_contenido}
    		              {conf.bloque_info}

    		            </Stylo.MainContent>
                    ])}/>

                    <Route exact path="/categoria/:subcategoryId" render={({ match, history, location }) => {
                        let
                            variables = Object.assign({}, this.state.variables, {
                                subcategoryId: match.params.subcategoryId.match(/\d+$/)[0]
                            }),

                            MainContentSUBCAT = graphql(Qs.SubCategoriaPRODUCTESQuery, {
                                ...this.props,
                                options: {
                                    variables
                                }
                            })(MainContentSubCat)
                        ;

                        this.variables = variables;

                        return (
                            <MainContentSUBCAT
                                marcaIdAVariables={this.marcaIdAVariables}
                                tallaIdAVariables={this.tallaIdAVariables}
                                colorIdAVariables={this.colorIdAVariables}

                                filtrantMarca={this.filtrantMarca}
                                filtreMarca={this.state.filtreMarca}

                                filtrantTalla={this.filtrantTalla}
                                filtreTalla={this.state.filtreTalla}

                                filtrantColor={this.filtrantColor}
                                filtreColor={this.state.filtreColor}

                                match={match}
                                history={history}
                                location={location}

                                desactivaFiltres={this.desactivaFiltres}
                            />
                        );
                    }}/>

                    <Route exact path="/categoria/:catname.:catid/marca/:mn.:mid" render={({ match, history, location }) => {
                        let
                            variables = Object.assign({}, this.state.variables, {
                                subcategoryId: match.params.catid,
                                marcaId: match.params.mid
                            }),


                            MainContentSUBCAT = graphql(Qs.SubCategoriaPRODUCTESQuery, {
                                ...this.props,
                                options: {
                                    variables
                                }
                            })(MainContentSubCat)
                        ;

                        this.variables = variables;

                        return (
                            <MainContentSUBCAT
                                marcaIdAVariables={this.marcaIdAVariables}
                                tallaIdAVariables={this.tallaIdAVariables}
                                colorIdAVariables={this.colorIdAVariables}

                                filtrantMarca={this.filtrantMarca}
                                filtreMarca={{
                                    label: match.params.mn.replace(/\./g, " ").replace(/\b\w/g, l => l.toUpperCase()),
                                    value: match.params.mid
                                }}

                                filtrantTalla={this.filtrantTalla}
                                filtreTalla={this.state.filtreTalla}

                                filtrantColor={this.filtrantColor}
                                filtreColor={this.state.filtreColor}

                                match={match}
                                history={history}
                                location={location}

                                desactivaFiltres={this.desactivaFiltres}
                            />
                        );
                    }}/>

                    <Route exact path="/categoria/:catname.:catid/talla/:tn.:tid" render={({ match, history, location }) => {
                        let
                            variables = Object.assign({}, this.state.variables, {
                                subcategoryId: match.params.catid
                            }),

                            MainContentSUBCAT = graphql(Qs.SubCategoriaPRODUCTESQuery, {
                                ...this.props,
                                options: {
                                    variables
                                }
                            })(MainContentSubCat)
                        ;

                        this.variables = variables;

                        return (
                            <MainContentSUBCAT
                                marcaIdAVariables={this.marcaIdAVariables}
                                tallaIdAVariables={this.tallaIdAVariables}
                                colorIdAVariables={this.colorIdAVariables}

                                filtrantMarca={this.filtrantMarca}
                                filtreMarca={this.state.filtreMarca}

                                filtrantTalla={this.filtrantTalla}
                                filtreTalla={{
                                    label: match.params.tn.replace(/\./g, " ").replace(/\b\w/g, l => l.toUpperCase()),
                                    value: match.params.tid
                                }}

                                filtrantColor={this.filtrantColor}
                                filtreColor={this.state.filtreColor}

                                match={match}
                                history={history}
                                location={location}

                                desactivaFiltres={this.desactivaFiltres}
                            />
                        );
                    }}/>

                    <Route exact path="/categoria/:catname.:catid/color/:cn.:cid" render={({ match, history, location }) => {
                        let
                            variables = Object.assign({}, this.state.variables, {
                                subcategoryId: match.params.catid
                            }),

                            MainContentSUBCAT = graphql(Qs.SubCategoriaPRODUCTESQuery, {
                                ...this.props,
                                options: {
                                    variables
                                }
                            })(MainContentSubCat)
                        ;

                        this.variables = variables;

                        return (
                            <MainContentSUBCAT
                                marcaIdAVariables={this.marcaIdAVariables}
                                tallaIdAVariables={this.tallaIdAVariables}
                                colorIdAVariables={this.colorIdAVariables}

                                filtrantMarca={this.filtrantMarca}
                                filtreMarca={this.state.filtreMarca}

                                filtrantTalla={this.filtrantTalla}
                                filtreTalla={this.state.filtreTalla}

                                filtrantColor={this.filtrantColor}
                                filtreColor={{
                                    colorId: match.params.cid,
                                    nom_color: match.params.cn.replace(/\./g, " ").replace(/\b\w/g, l => l.toUpperCase()),
                                    label_color: match.params.cn.replace(/\./g, " ").replace(/\b\w/g, l => l.toUpperCase())
                                }}

                                match={match}
                                history={history}
                                location={location}

                                desactivaFiltres={this.desactivaFiltres}
                            />
                        );
                    }}/>

                    <Route exact path="/categoria/:catn.:catid/marca-talla/:mn-:tn.:mid.:tid" render={({ match, history, location }) => {
                        let
                            variables = Object.assign({}, this.state.variables, {
                                subcategoryId: match.params.catid,
                                marcaId: match.params.mid
                            }),


                            MainContentSUBCAT = graphql(Qs.SubCategoriaPRODUCTESQuery, {
                                ...this.props,
                                options: {
                                    variables
                                }
                            })(MainContentSubCat)
                        ;

                        this.variables = variables;

                        return (
                            <MainContentSUBCAT
                                marcaIdAVariables={this.marcaIdAVariables}
                                tallaIdAVariables={this.tallaIdAVariables}
                                colorIdAVariables={this.colorIdAVariables}

                                filtrantMarca={this.filtrantMarca}
                                filtreMarca={{
                                    label: match.params.mn.replace(/\./g, " ").replace(/\b\w/g, l => l.toUpperCase()),
                                    value: match.params.mid
                                }}

                                filtrantTalla={this.filtrantTalla}
                                filtreTalla={{
                                    label: match.params.tn.replace(/\./g, " ").replace(/\b\w/g, l => l.toUpperCase()),
                                    value: match.params.tid
                                }}

                                filtrantColor={this.filtrantColor}
                                filtreColor={this.state.filtreColor}

                                match={match}
                                history={history}
                                location={location}

                                desactivaFiltres={this.desactivaFiltres}
                            />
                        );
                    }}/>

                    <Route exact path="/categoria/:catn.:catid/marca-color/:mn-:cn.:mid.:cid" render={({ match, history, location }) => {
                        let
                            variables = Object.assign({}, this.state.variables, {
                                subcategoryId: match.params.catid
                            }),


                            MainContentSUBCAT = graphql(Qs.SubCategoriaPRODUCTESQuery, {
                                ...this.props,
                                options: {
                                    variables
                                }
                            })(MainContentSubCat)
                        ;

                        this.variables = variables;

                        return (
                            <MainContentSUBCAT
                                marcaIdAVariables={this.marcaIdAVariables}
                                tallaIdAVariables={this.tallaIdAVariables}
                                colorIdAVariables={this.colorIdAVariables}

                                filtrantMarca={this.filtrantMarca}
                                filtreMarca={{
                                    label: match.params.mn.replace(/\./g, " ").replace(/\b\w/g, l => l.toUpperCase()),
                                    value: match.params.mid
                                }}

                                filtrantTalla={this.filtrantTalla}
                                filtreTalla={this.state.filtreTalla}

                                filtrantColor={this.filtrantColor}
                                filtreColor={{
                                    colorId: match.params.cid,
                                    nom_color: match.params.cn.replace(/\./g, " ").replace(/\b\w/g, l => l.toUpperCase()),
                                    label_color: match.params.cn.replace(/\./g, " ").replace(/\b\w/g, l => l.toUpperCase())
                                }}

                                match={match}
                                history={history}
                                location={location}

                                desactivaFiltres={this.desactivaFiltres}
                            />
                        );
                    }}/>

                    <Route exact path="/categoria/:catn.:catid/talla-color/:tn-:cn.:tid.:cid" render={({ match, history, location }) => {
                        let
                            variables = Object.assign({}, this.state.variables, {
                                subcategoryId: match.params.catid
                            }),


                            MainContentSUBCAT = graphql(Qs.SubCategoriaPRODUCTESQuery, {
                                ...this.props,
                                options: {
                                    variables
                                }
                            })(MainContentSubCat)
                        ;

                        this.variables = variables;

                        return (
                            <MainContentSUBCAT
                                marcaIdAVariables={this.marcaIdAVariables}
                                tallaIdAVariables={this.tallaIdAVariables}
                                colorIdAVariables={this.colorIdAVariables}

                                filtrantMarca={this.filtrantMarca}
                                filtreMarca={this.state.filtreMarca}

                                filtrantTalla={this.filtrantTalla}
                                filtreTalla={{
                                    label: match.params.tn.replace(/\./g, " ").replace(/\b\w/g, l => l.toUpperCase()),
                                    value: match.params.tid
                                }}

                                filtrantColor={this.filtrantColor}
                                filtreColor={{
                                    colorId: match.params.cid,
                                    nom_color: match.params.cn.replace(/\./g, " ").replace(/\b\w/g, l => l.toUpperCase()),
                                    label_color: match.params.cn.replace(/\./g, " ").replace(/\b\w/g, l => l.toUpperCase())
                                }}

                                match={match}
                                history={history}
                                location={location}

                                desactivaFiltres={this.desactivaFiltres}
                            />
                        );
                    }}/>

                    <Route exact path="/categoria/:catname.:catid/marca-talla-color/:mn-:tn-:cn.:mid.:tid.:cid" render={({ match, history, location }) => {
                        let
                            variables = Object.assign({}, this.state.variables, {
                                subcategoryId: match.params.catid
                            }),


                            MainContentSUBCAT = graphql(Qs.SubCategoriaPRODUCTESQuery, {
                                ...this.props,
                                options: {
                                    variables
                                }
                            })(MainContentSubCat)
                        ;

                        this.variables = variables;

                        return (
                            <MainContentSUBCAT
                                marcaIdAVariables={this.marcaIdAVariables}
                                tallaIdAVariables={this.tallaIdAVariables}
                                colorIdAVariables={this.colorIdAVariables}

                                filtrantMarca={this.filtrantMarca}
                                filtreMarca={{
                                    label: match.params.mn.replace(/\./g, " ").replace(/\b\w/g, l => l.toUpperCase()),
                                    value: match.params.mid
                                }}

                                filtrantTalla={this.filtrantTalla}
                                filtreTalla={{
                                    label: match.params.tn.replace(/\./g, " ").replace(/\b\w/g, l => l.toUpperCase()),
                                    value: match.params.tid
                                }}

                                filtrantColor={this.filtrantColor}
                                filtreColor={{
                                    colorId: match.params.cid,
                                    nom_color: match.params.cn.replace(/\./g, " ").replace(/\b\w/g, l => l.toUpperCase()),
                                    label_color: match.params.cn.replace(/\./g, " ").replace(/\b\w/g, l => l.toUpperCase())
                                }}

                                match={match}
                                history={history}
                                location={location}

                                desactivaFiltres={this.desactivaFiltres}
                            />
                        );
                    }}/>

                    <Route exact path="/producto/:productId" render={({ match }) => {
                        let
                            variables = Object.assign({}, this.state.variables, {
                                productId: match.params.productId.match(/\d+$/)[0]
                            }),

                            MainProducteDETALLS = graphql(Qs.ProducteDETALLSQuery, {
                                options: {
                                    variables
                                }
                            })(MainContentProducte)
                        ;

                        return (
                            <MainProducteDETALLS
                                productId={match.params.productId}
                                productIdAlState={this.productIdAlState}
                            />
                        );
                    }}/>

                    {/*Página de Pedido    */}
                    {/*<Route exact path="/pedido" render={({ match, history, location }) => {
                        let
                            variables = Object.assign({}, this.state.variables, {
                                subcategoryId: match.params.subcategoryId.match(/\d+$/)[0]
                            }),

                            MainContentSUBCAT = graphql(Qs.SubCategoriaPRODUCTESQuery, {
                                ...this.props,
                                options: {
                                    variables
                                }
                            })(MainContentSubCat)
                        ;

                        this.variables = variables;

                        return (
                            <MainContentSUBCAT
                                marcaIdAVariables={this.marcaIdAVariables}
                                tallaIdAVariables={this.tallaIdAVariables}
                                colorIdAVariables={this.colorIdAVariables}

                                filtrantMarca={this.filtrantMarca}
                                filtreMarca={this.state.filtreMarca}

                                filtrantTalla={this.filtrantTalla}
                                filtreTalla={this.state.filtreTalla}

                                filtrantColor={this.filtrantColor}
                                filtreColor={this.state.filtreColor}

                                match={match}
                                history={history}
                                location={location}

                                desactivaFiltres={this.desactivaFiltres}
                            />
                        );
                    }}/>*/}


                    <Route path="/" render={() => (
                        <div>
                            <Cookies />
                        </div>
                    )}/>

                    <Route path="/" render={() => (
                        <div
                            style={{
                                gridArea: `ft`
                            }}
                        >
                            <FootrAdaptatAmbSubcategories
                                subcategoryIdAlState={this.subcategoryIdAlState}
                            />
                        </div>
                    )}/>
                </Stylo.LO>
            </Router>
        );
    }
};
