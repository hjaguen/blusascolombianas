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
//import StackGrid from "react-stack-grid";

import Select from 'react-select';
import 'react-select/dist/react-select.css';
import * as conf from './config.jsx';
import NavbarAdaptat from './NavBar.jsx';
import {
    //MostrariTOTS,
    MostrariSubcategoriaPRODUCTES
} from './Mostraris.jsx';
import {
    SubCategoriaMARQUESQuery,
    SubCategoriaTALLESQuery,
    SubCategoriaCOLORSQuery,
    SubCategoriaPRODUCTESQuery,
    CategoriaMARQUESQuery,
    CategoriaTALLESQuery,
    CategoriaCOLORSQuery,
    CategoriaPRODUCTESQuery,
    TallesQuery,
    ColorsQuery,
    MarquesQuery,
    ProductesQuery,
    SubcategoriesQuery
} from './Queries.jsx';
import FootrAdaptat from './Footer.jsx';
import FreeContent from './FreeContent.jsx';
import Radium, { StyleRoot } from 'radium';

FreeContent = Radium(FreeContent);


let variables = {
    apiUrl: "http://api.colombiaespassion.net",
    pageId: "1",
    categoryId: conf.categoryId,
    subcategoryId: "31",
    sizeId: "21",
    brandId: "4",
    colorId: "17"
};



const NavbarAdaptatAmbSubcategories = graphql(SubcategoriesQuery, {
    options: {
        variables
    }
})(NavbarAdaptat);



class MarquesSUBCAT extends Component {
    constructor(props) {
        super(props);
    }

    static: propTypes = {
        data: PropTypes.shape({
            loading: PropTypes.bool,
            error: PropTypes.object,
            subcategoriaMARQUES: PropTypes.array
        }).isRequired
    }

    render() {
        if (this.props.data.loading) {
            return (<div>Cargando...</div>);
        }

        if (this.props.data.error) {
           /* console.log(this.props.data.error)*/
            return (<div>Ocurrió un error inesperado.</div>);
        }

        let arrOpts = [];

        this.props.data.subcategoriaMARQUES.map(
            (v,i,a) => {
                arrOpts.push({
                    value: v.marcaId,
                    label: v.nom_marca
                })
            }
        )

        return (
            <div
                style={{
                    margin: `1em auto`
                }}
            >
                <Select
                    options={arrOpts}
                    onChange={(val) => this.props.marcaIdAVariables(val.value)}
                    placeholder="Filtrar por marca..."
                />
            </div>
        );
    }
}

class TallesSUBCAT extends Component {
    constructor(props) {
        super(props);
    }

    static: propTypes = {
        data: PropTypes.shape({
            loading: PropTypes.bool,
            error: PropTypes.object,
            subcategoriaTALLES: PropTypes.array
        }).isRequired
    }

    render() {
        if (this.props.data.loading) {
            return (<div>Cargando...</div>);
        }

        if (this.props.data.error) {
           /* console.log(this.props.data.error)*/
            return (<div>Ocurrió un error inesperado.</div>);
        }

        let arrOpts = [];

        this.props.data.subcategoriaTALLES.map(
            (v,i,a) => {
                arrOpts.push({
                    value: v.tallaId,
                    label: v.nom_talla
                })
            }
        )

        return (
            <div
                style={{
                    margin: `3em auto`
                }}
            >
                <Select
                    options={arrOpts}
                    onChange={(val) => this.props.tallaIdAVariables(val.value)}
                    placeholder="Filtrar por talla..."
                />
            </div>
        );
    }
}

class ColorsSUBCAT extends Component {
    constructor(props) {
        super(props);
    }

    static: propTypes = {
        data: PropTypes.shape({
            loading: PropTypes.bool,
            error: PropTypes.object,
            subcategoriaCOLORS: PropTypes.array
        }).isRequired
    }

    render() {
        if (this.props.data.loading) {
            return (<div>Cargando...</div>);
        }

        if (this.props.data.error) {
           /* console.log(this.props.data.error)*/
            return (<div>Ocurrió un error inesperado.</div>);
        }
        return (
            <div
                style={{
                    marginTop: `3em`
                }}
            >
                {
                    this.props.data.subcategoriaCOLORS.map(
                        (v,i,a) => {
                            return (
                                <span
                                    key={i}
                                    style={{
                                        display: `inline-block`,
                                        border: `1px black solid`,
                                        width: `20px`,
                                        height: `20px`,
                                        background: `${v.nom_color}`,
                                        margin: `.2em`
                                    }}
                                    title={v.label_color}
                                />
                            );
                        }
                    )
                }

            </div>
        );
    }
}


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            variables
        };

        this.subcategoryIdAlState = this.subcategoryIdAlState.bind(this);
        this.marcaIdAVariables = this.marcaIdAVariables.bind(this);
        this.tallaIdAVariables = this.tallaIdAVariables.bind(this);
        this.colorIdAVariables = this.colorIdAVariables.bind(this);
    }

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

    colorIdAVariables(colorId) {
        let
            variables = Object.assign({}, this.state.variables, {colorId})
        ;

        this.setState({
            variables
        });
    }

    render() {

        let
            // MostrariAmbTOTSElsProductes = graphql(CategoriaPRODUCTESQuery, {
            //     options: {
            //         variables: this.state.variables
            //     }
            // })(MostrariTOTS),

            MarquesSubCategoria = graphql(SubCategoriaMARQUESQuery, {
                options: {
                    variables: this.state.variables
                }
            })(MarquesSUBCAT),

            TallesSubCategoria = graphql(SubCategoriaTALLESQuery, {
                options: {
                    variables: this.state.variables
                }
            })(TallesSUBCAT),

            ColorsSubCategoria = graphql(SubCategoriaCOLORSQuery, {
                options: {
                    variables: this.state.variables
                }
            })(ColorsSUBCAT),

            MostrariAmbProductes = graphql(ProductesQuery, {
                options: {
                    variables: this.state.variables
                }
            })(MostrariSubcategoriaPRODUCTES),

// Falta definir les consultes correctes DE FILTRAT, de moment
// prenem ProductesQuery com a base:
  ProductesMARCAQuery = ProductesTALLAQuery = ProductesQuery,

            MostrariAmbProductesMARCA = graphql(ProductesMARCAQuery, {
                options: {
                    variables: this.state.variables
                }
            })(MostrariSubcategoriaPRODUCTES),

            MostrariAmbProductesTALLA = graphql(ProductesTALLAQuery, {
                options: {
                    variables: this.state.variables
                }
            })(MostrariSubcategoriaPRODUCTES),

//>>>>>>>>>>>>>>>>>>>>>>><< FOOTR - Un per a cada tipus de consulta
            FootrAdaptatAmbSubcategories = graphql(SubcategoriesQuery, {
                options: {
                    variables
                }
            })(FootrAdaptat)
        ;

        class BuscadorColumnaSUBCAT extends Component {
            constructor(props) {
                super(props);


            }

            render() {
                return (
                    <div
                        style={conf.estil_filtres}
                    >

                        <MarquesSubCategoria
                            marcaIdAVariables={this.props.marcaIdAVariables}
                        />
                        <TallesSubCategoria
                            tallaIdAVariables={this.props.tallaIdAVariables}
                        />
                        <ColorsSubCategoria
                            colorIdAVariables={this.props.colorIdAVariables}
                        />
                    </div>
                );
            }
        }

        class MainContentSubCat extends Component {
            constructor(props, context) {
                super(props, context);

                this.state = {

                }
            }

            render() {
                return (
                    [
                        <div
                            key="columna"
                            style={{
                                position: `relative`,
                                gridArea: conf.filtres_posicio
                            }}
                        >
                            <div
                                style={{
                                    position: `-webkit-sticky`,
                                    position: `sticky`,
                                    top: `20px`
                                }}
                            >
                                <BuscadorColumnaSUBCAT
                                    marcaIdAVariables={this.props.marcaIdAVariables}
                                    tallaIdAVariables={this.props.tallaIdAVariables}
                                    colorIdAVariables={this.props.colorIdAVariables}
                                />
                            </div>
                        </div>
                    ,
                        <div
                            key="content"
                            style={{
                                gridArea: `content`
                            }}
                        >
                            <MostrariAmbProductes />
                        </div>
                    ]
                );
            }
        }

        let
            FCMedia = () =>
                <FreeContent>
                    <div
                        style={{
                            marginLeft: `50px`,

                            '@media (min-width: 320px)': {
                                color: 'fuchsia'
                              }
                        }}
                    >
                            <h1>Blusas Colombianas</h1>
                    </div>
                </FreeContent>
        ;
        return (
            <Router>
                <div
                    style={{
                        height: `100%`,
                        display: `grid`,
                        gridTemplateColumns: `1fr 1fr 1fr 1fr`,
                        gridTemplateAreas: `
                            "navbar navbar navbar navbar"
                            ${conf.layoutTemplateArea}
                            "present present present present"
                            "footer footer footer footer"
                        `,
                        backgroundImage: `url(${conf.fonsPrincipal})`,
                        backgroundSize: conf.backgroundSize,
                        backgroundRepeat: conf.backgroundRepeat,
                        backgroundAttachment: conf.backgroundAttachment
                    }}
                >
                    <Route
                        path="/"
                        render={() => (
                            <div
                                style={{
                                    gridArea: `navbar`
                                }}
                            >
                                <NavbarAdaptatAmbSubcategories
                                    subcategoryIdAlState={this.subcategoryIdAlState}
                                    fluid
                                    inverse
                                />
                            </div>
                        )}
                    />

                    <Route exact path="/" render={() => (
                        <div
                            style={{
                                gridArea: `present`
                            }}
                        >

                            {/*Titulo de la Pagina*/}
                            <StyleRoot>
                                <FCMedia />
                            </StyleRoot>

                            <FreeContent children={conf.video_latinmoda} /> {/*Asi se comenta en JSX, entre llaves.*/}

                            <FreeContent>
                                {conf.primer_contingut}
                            </FreeContent>

                            <FreeContent>
                                <div
                                    style={{
                                        margin: `50px`
                                    }}
                                >
                                    Ací voldria un paràgraf... que posaré ara:
                                    <p> Ja veus... podria passar-me el dia escrivint en HTML pla... tal volta deguera fer-ho.
                                    </p>
                                </div>
                            </FreeContent>

                            <FreeContent>
                                {conf.segon_lliure}
                            </FreeContent>

                            <FreeContent>
                                {conf.vimeoEx}
                            </FreeContent>

                        </div>
                    )}/>

                    <Route exact path="/:categoryId" render={() => (
                        <MainContentSubCat
                            marcaIdAVariables={this.marcaIdAVariables}
                            tallaIdAVariables={this.tallaIdAVariables}
                            colorIdAVariables={this.colorIdAVariables}
                        />
                    )}/>

                    <Route path="/" render={() => (
                        <div
                            style={{
                                gridArea: `footer`
                            }}
                        >
                            <FootrAdaptatAmbSubcategories
                                subcategoryIdAlState={this.subcategoryIdAlState}
                            />
                        </div>
                    )}/>
                </div>
            </Router>
        );
    }
};
