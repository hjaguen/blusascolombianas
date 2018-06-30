import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Card, CardTitle, CardText, CardActions, Button as ButtonCard,
    Footer, FooterSection, FooterDropDownSection, FooterLinkList
} from  'react-mdl';
// Sharing Attempts
import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';
import * as conf from './config.jsx';
import * as info from './addInfo.jsx';
import * as Stylo from './StyledComponents.jsx';

const {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
} = ShareButtons;

const {
  FacebookShareCount,
  GooglePlusShareCount,
  RedditShareCount,
} = ShareCounts;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const TelegramIcon = generateShareIcon('telegram');
const WhatsappIcon = generateShareIcon('whatsapp');
const RedditIcon = generateShareIcon('reddit');
const EmailIcon = generateShareIcon('email');

let dat = new Date();

export default class FootrAdaptat extends Component {
    constructor(props) {
        super(props);

    }

    static: propTypes = {
        data: PropTypes.shape({
            loading: PropTypes.bool,
            error: PropTypes.object,
            subcategories: PropTypes.array
        }).isRequired
    }

    render() {
        if (this.props.data.loading) {
            return (<div>Cargando...</div>);
        }

        if (this.props.data.error) {
            //console.log(this.props.data.error)
            return (<div>Ocurrió un error inesperado.</div>);
        }

        return (
            <div>
                <Stylo.footer size="mega">
                    <FooterSection type="middle">
                        <FooterDropDownSection title="Información">
                            <FooterLinkList>
                                <a href=""
                                  data-toggle="modal"
                                  data-target="#about">
                                  Quiénes Somos
                                </a>
                                <a href=""
                                  data-toggle="modal"
                                  data-target="#terms">
                                  Términos y Condiciones
                                </a>
                                <a href=""
                                  data-toggle="modal"
                                  data-target="#privaci">
                                  Políticas de Privacidad y Protección de Datos
                                </a>
                                <a href=""
                                  data-toggle="modal"
                                  data-target="#cookies">
                                  Políticas de Cookies
                                </a>
                                <a href=""
                                  data-toggle="modal"
                                  data-target="#faq">
                                  FAQ
                                </a>
                            </FooterLinkList>
                        </FooterDropDownSection>
                        <FooterDropDownSection title="Contáctanos">
                            <FooterLinkList>
                                <a href="#">{conf.telContacto}</a>
                                <a href="#">{conf.emailContacto}</a>
                                <a href={`https://api.whatsapp.com/send?phone=${conf.whatsappMsg}&text=Hola%2C%20necesito%20información`}>Click para WhatsApp</a>
                            </FooterLinkList>
                        </FooterDropDownSection>

                        <FooterDropDownSection title="Nuestras Tiendas">
                            <FooterLinkList>
                                <a href="http://fajascolombianas.es" target="_blank">Fajas Colombianas</a>
                                <a href="http://jeanscolombianos.es" target="_blank">Jeans Colombianos</a>
                                <a href="http://vestidosdefiestacolombianos.es" target="_blank">Vestidos de Fiesta</a>
                                <a href="http://ropacolombianaenrebajas.com" target="_blank">Outlet</a>
                            </FooterLinkList>
                        </FooterDropDownSection>

                        <FooterDropDownSection title="Escríbenos">
                            <form >
                              <div className="form-group">
                                <label htmlFor="emailCliente">Dirección de Email:</label>
                                <input type="email" className="form-control" id="emailCliente" placeholder="Introduzca su Email" ref={input => this.from = input} />
                              </div>
                              <div className="form-group">
                                <label htmlFor="mensajeCliente">Mensaje:</label>
                                <textarea className="form-control" id="mensajeCliente" placeholder="Escriba su Mensaje" ref={ta => this.text = ta }/>
                              </div>
                              <button
                                className="btn btn-default"
                                onClick={(ev)=>{
                                    ev.preventDefault();
                                    ev.stopPropagation();
                                    Meteor.call('enviaCorreu', this.from.value, this.text.value );
                                    alert("Mensaje enviado. ¡Gracias por contactar con nosotros!");
                                }}
                              >Enviar</button>
                            </form>
                        </FooterDropDownSection>
                    </FooterSection>


                    <FooterSection type="bottom" logo={conf.tituloPagina}>
                      <p>{`Copyright © ${dat.getFullYear()} - Ropa Colombiana en España.`}</p>
                    </FooterSection>





                    <div className="modal fade about-modal-lg" id="about" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                      <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="myModalLabel">{info.titleAbout}</h4>
                          </div>
                          <div className="modal-body">
                            {info.contAbout}
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Cerrar</button>
                          </div>
                        </div>
                      </div>
                    </div>



                    <div className="modal fade about-modal-lg" id="terms" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                      <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="myModalLabel">{info.titleTerms}</h4>
                          </div>
                          <div className="modal-body">
                            {info.contTerms}
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Cerrar</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="modal fade about-modal-lg" id="privaci" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                      <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="myModalLabel">{info.titlePrivaci}</h4>
                          </div>
                          <div className="modal-body">
                            {info.contPrivaci}
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Cerrar</button>
                          </div>
                        </div>
                      </div>
                    </div>


                    <div className="modal fade about-modal-lg" id="cookies" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                      <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="myModalLabel">{info.titleCookies}</h4>
                          </div>
                          <div className="modal-body">
                            {info.contCookies}
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Cerrar</button>
                          </div>
                        </div>
                      </div>
                    </div>



                    <div className="modal fade" id="faq" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="myModalLabel">{info.titleFAQ}</h4>
                          </div>
                          <div className="modal-body">
                            {info.contFAQ}
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Cerrar</button>
                          </div>
                        </div>
                      </div>
                    </div>





                    <FacebookShareButton url="http://www.facebook.com/latinmoda" />
                    <TwitterShareButton url="http://twitter.com/latinmoda"/>
                </Stylo.footer>
            </div>
        );
    }
}
