import React from 'react';
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem, Grid, Row, Col } from 'react-bootstrap';

export let

    categoryId = `2`
    ,
    tituloPagina = 'Blusas Colombianas'
    ,
    telContacto = `(+34) 777-7777`
    ,
    emailContacto = `ejemplo@duckduckgo.com`
    ,

// Imagen de fondo y sus opciones
    fonsPrincipal = `background_blue_v0011.jpg`,
    backgroundSize =  `cover`,
    backgroundRepeat = `no-repeat`,
    backgroundAttachment = `fixed`
    ,

// Tamaño de columna y estilo para las fotos de producto
    amplaria_fitxetes_subcategoria = `220px`
    ,
    estil_fitxetes = {
        width: amplaria_fitxetes_subcategoria,
        height: `auto`,
        display: `inline-block`,
        border: `1px rgba(0,0,0,.5) solid`,
        borderRadius: `.3em`,
        margin: `.4em`,
        background: `rgba(255, 255, 255, 0.25)`
    }

    ,

// Estilo para modulo de filtro
    filtres_posicio = `columna` // `columna` | `bloque`
    ,
                                    layoutTemplateArea =
                                        filtres_posicio === `columna`
                                            ? `"columna content content content content content"`
                                            : filtres_posicio === `bloque`
                                                ? `"bloque bloque bloque bloque bloque bloque"
                                                    "content content content content content content"`
                                                : "",
                                    possibleMaxWidth =
                                        filtres_posicio === `columna`
                                            ? `400px`
                                            : "none"
    ,
    estil_filtres = {
        background: `rgba(255, 255, 255, 0.25)`,
        width: `90%`,
        maxWidth: `${possibleMaxWidth}`,
        margin: `1em 3em`,
        padding: `2em`,
        borderRadius: `1em`
        // ,
        // position: `fixed`
    }
    ,

    // Estilo del Layout principal

/*    layoutStyle = {
        
    }
    ,*/

// 1er Contenido libre em "Home"
    primer_contingut =
        <div style={{
            margin: `50px`
        }}>
            <h2>Ropa Colombiana de Venta en Europa</h2>
            <div
                className="divFreeContent"
                style={{
                    background: `blue`
                }}
            >
                Un contingut
                <div
                    className="divFreeContentInside"
                    style={{
                        background: `gold`
                    }}
                >
                    I un altre
                </div>
            </div>
        </div>
    ,

// 2do Contendido libre en "Home"
    segon_lliure =
        <Grid
            style={{
                background: `fuchsia`,
                margin: `50px`
            }}
            fluid
        >
            <Row
                className="show-grid"
                style={{
                    position: `relative`
                }}
            >
                <Col
                    xs={6}
                    md={3}
                    style={{
                        background: `gold`
                    }}
                ><code>&lt;{'Col xs={6} md={3}'} /&gt;</code></Col>
                <Col
                    xs={6}
                    md={6}
                    style={{
                        background: `grey`
                    }}
                >
                </Col>
                <Col
                    xsHidden
                    md={3}
                    style={{
                        background: `gold`,
                        height: `100%`
                    }}
                ><code>&lt;{'Col xsHidden md={3}'} /&gt;</code></Col>
            </Row>
        </Grid>

    ,


// Contenido libre de Video en "Home"
        video_latinmoda =
    <div className="container">
    <div className="row" >
        <div className="embed-responsive embed-responsive-16by9"
                  //style={{
                  //margin: `auto`,
                  //position: `relative`,
                  //paddingBottom: `56.25%`,
                  //height: `0`,
                  //overflow: `hidden`,
                  //}}
            >
                <iframe
                        //style={{
                        //position: `absolute`,
                        //top: `0`,
                        //left: `0`,
                        //width: `100%`,
                        //height: `100%`
                        //}}
                        className="embed-responsive-item"
                        //width="800"
                        //height="450"
                        src="https://player.vimeo.com/video/240463716"
                        //frameBorder="0"
                        //allowFullScreen
                ></iframe>
            </div>
        </div>
</div>
        ,

        vimeoEx =
            <div>
                <iframe src="https://player.vimeo.com/video/240463716?color=ff0179&title=0&byline=0&portrait=0" width="640" height="360" frameBorder="0" webkitAllowFullScreen mozAllowFullScreen allowFullScreen></iframe>
<p><a href="https://vimeo.com/240463716">BACKSTAGE 1 Cheviotto Noviembre 2017</a> from <a href="https://vimeo.com/latinmoda">Latinmoda.net</a> on <a href="https://vimeo.com">Vimeo</a>.</p>
            </div>




;
