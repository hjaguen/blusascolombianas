import React, { Component } from 'react';
import * as conf from './config.jsx';
import sanitizeHtml from 'sanitize-html-react';
// import Counter from './Counter';

export default class MainContentProducte extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            selectedProduct: {},
            selectedImgSrc: "",
            selectedProduct: {},
            estado: "ADD TO CART", 
            cart:this.props.cartItems,
            imagen:"",
            cantidad:"",
            cartBounce: false,
            nombre:"",
            marca:"",
            talla:"",
            color:"",
            ref:"",
        };

    //    this.canviaImatge = this.canviaImatge.bind(this);
    }

    // canviaImatge({props}) {
    //     this.setState({
    //         selectedImgSrc: `http://images.colombiaespassion.net/${props.v.imagen_min}`
    //     })
    // }

    // resetQuantity(){

    // }

    // updateInputValue(evt) {
    //     this.setState({
    //       cantidad: evt.target.value
    //     });
    // }


    addToCart(imagen, nombre, ref, marca, color, talla, cantidad){
        this.setState({
            selectedProduct: {
                imagen: imagen,
                nombre: nombre,   //Descripcion
                ref: ref,       //Referencia
                marca:marca,    //nom_marca
                color: color,   // num_color, label_color
                talla: talla,   // label_talla
                cantidad: cantidad  //quantity
            }
        }, function(){
            this.props.addToCart(this.state.selectedProduct);
        })
        this.setState({
            estado: "✔ ADDED"
        }, function(){
            setTimeout(() => {
                this.setState({ 
                    estado: "ADD TO CART",
                    selectedProduct: {} 
                });
            }, 5000);
        });
    }


    render() {
        console.dir(this.props.data);
        //console.dir(this.props.cartItems);

        let imagen = this.state.imagen;
        let nombre = this.state.nombre; //this.refs.nombre;   //Descripcion
        let ref = this.state.ref;       //Referencia
        let marca = this.state.marca;    //nom_marca
        let color = this.state.color;   // num_color, label_color
        let talla = this.state.talla;   // label_talla
        let cantidad = this.state.cantidad;  //quantity
        
        return (
            [
                <div
                    key='columna'
                    style={{
                        gridArea: conf.filtres_posicio,
                        gridArea: `min`
                    }}
                >
                    <div
                        style={{
                            /*display: `flex`,
                            flexWrap: `wrap`,*/
                            position: `-webkit-sticky`,
                            position: `sticky`,
                            top: `20px`,
                            margin: `20px`
                        }}
                    >
                        {   this.props.data.producteDETALLS
                                ? this.props.data.producteDETALLS[0].gallery.map(
                                        (v,i,a) => {

                                            return (
                                                <img
                                                    key={this.props.i}
                                                    src={`http://images.colombiaespassion.net/${v.imagen_min}`}
                                                    style={{
                                                        maxWidth: `110px`,
                                                        flexGrow: `1`,
                                                        flexShrink: `1`,
                                                        margin: `.5em`,
                                                        borderRadius: `3px`
                                                    }}
                                                    onMouseOver={() => {
                                                        //console.dir(v);
                                                        this.setState({
                                                            selectedImgSrc: `http://images.colombiaespassion.net/${v.imagen_min}`
                                                        });
                                                    }}
                                                 />
                                            );
                                        }
                                    )
                                : "Cargando..."
                        }
                    </div>
                </div>
            ,
                <div
                    key='central'
                    style={{
                        gridArea: `fot`
                    }}
                >
                    {this.props.data.producteDETALLS
                        ? <img
                            src={this.state.selectedImgSrc ? this.state.selectedImgSrc : `http://images.colombiaespassion.net/${this.props.data.producteDETALLS[0].gallery[0].imagen_min}`}
                            style={{
                                width: `100%`,
                                borderRadius: `1.5vw`,
                                marginBottom: `20px`
                            }}
                            onLoad={() => {
                                this.setState({
                                    imagen: `http://images.colombiaespassion.net/${this.props.data.producteDETALLS[0].imagen_principal}`,
                                    nombre: `${this.props.data.producteDETALLS[0].descripcion}`,
                                    marca: `${this.props.data.producteDETALLS[0].nom_marca}`,
                                    ref: `${this.props.data.producteDETALLS[0].referencia}`,
                                });
                            }}
                          />
                        : "Cargando..."
                    }
                </div>
            ,
                <div
                    key='detall'
                    style={{
                        gridArea: `tex`
                    }}
                >
                    {this.props.data.producteDETALLS
                        ? <div
                            style={{
                                padding: `20px`,
                                background: `rgba(255,255,255,.3)`,
                                margin: `1em`,
                                borderRadius: `2em`
                            }}
                          >
                            <h2
                                style={{
                                    //textAlign: `center`,
                                    //margin: `-20px`
                                    marginTop: `0`,
                                    fontVariant: `small-caps`,
                                    //text-align: center;
                                    textTransform: `capitalize`,
                                    fontFamily: `'Comfortaa', sans-serif`,
                                    fontSize: `2.5em`
                                }}
                            >{this.props.data.producteDETALLS[0].descripcion}
                            </h2>
                            <span
                                style={{
                                    fontStyle: `italic`,
                                    fontVariant: `small-caps`,
                                    position: `relative`,
                                    bottom: `1em`,
                                    textAlign: `right`,
                                    display: `block`,
                                    fontWeight: `bolder`,
                                    fontSize: `1.5em`
                                }}
                            >{this.props.data.producteDETALLS[0].nom_marca}
                            </span>
                            {
                                (this.props.data.producteDETALLS[0].descripcion_long_es && (this.props.data.producteDETALLS[0].descripcion_long_es !== "null"))
                                ?   <div
                                        style={{
                                            background: `rgba(255,255,255,.25)`,
                                            padding: `1em`,
                                            borderRadius: `1em`,
                                            fontFamily: `'Comfortaa', sans-serif`
                                        }}
                                        dangerouslySetInnerHTML={{
                                        __html: sanitizeHtml(this.props.data.producteDETALLS[0].descripcion_long_es)
                                    }}/>
                                : null
                            }
                            
                            <p style={{
                                    fontFamily: `'Pacifico', cursive`
                                }}>
                                Para Agregar el el producto al pedido, por favor 
                                haga click sobre la talla y color que desea agregar 
                                y después escoja la cantidad
                            </p>

                            {this.props.data.producteDETALLS[0].tallas.map(
                                   (v,i,a) => {
                                       let
                                        colorHex = v.num_color.slice(1),
                                        colorDec = parseInt(colorHex, 16),
                                        invertDec = 16777215 - colorDec,
                                        invertHex = invertDec.toString(16)
                                    ;


                                       return (
                                           <button
                                               key={i}
                                               style={{
                                                   background: `${v.num_color}`,
                                                   padding: `.2em`,
                                                   minWidth: `28px`,
                                                   minheight: `20px`,
                                                   border: `1px solid black`,
                                                   display: `inline-block`,
                                                   borderRadius: `1em`,
                                                   margin: `.2em`,
                                                   textAlign: `center`,
                                                   fontWeight: `bold`,
                                                   color: `#${invertHex}`
                                               }}
                                               title="Agregar a Pedido" //{v.labelColor}
                                               data-toggle="modal"
                                               data-target="#count"
                                               onClick={() => {
                                                this.setState({
                                                    color: `${v.labelColor}`,
                                                    talla: `${v.label_talla}`,
                                                });
                                            }}                                            
                                            >{v.label_talla}
                                            </button>
                                       );
                                   }
                               )
                           }

                          </div>
                        : null
                    }
                </div>
            ,
                <div className="modal fade" id="count" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 className="modal-title" id="myModalLabel">¿Cuantos productos desea añadir al pedido?</h4>
                      </div>
                      <div className="modal-body">
                        {/*<Counter cantidad={cantidad} updateQuantity={this.updateQuantity} resetQuantity={this.resetQuantity}/>*/}
                        <div><input defaultValue="1" id="cantidad" ref="cant"  
                        onChange={() => {
                            this.setState({
                                cantidad: this.refs.cant.value,
                            });
                        }}       /></div>
                      </div>
                      <div className="modal-footer">
                        {/*<button type="button" className="btn btn-success" onClick={this.addToCart.bind(this.state.selectedImgSrc)} data-dismiss="modal">Agregar</button>*/}
                        <button type="button" className="btn btn-success" onClick={this.addToCart.bind(this, imagen, nombre, ref, marca, color, talla, cantidad)} data-dismiss="modal">Agregar</button>
                      </div>
                    </div>
                  </div>
                </div>
            ]
        );
    }
}

// gridColumnStart: `2`,
// gridColumnEnd: `span 2`,
// gridRowStart: `2`,
// gridRowEnd: `span 1`
