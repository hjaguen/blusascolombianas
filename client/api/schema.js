const {
    GraphQLSchema,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString
} = require('graphql');

const fetch = require('isomorphic-fetch');


//fetchTenda({}): `${URL_API}/jpages/data/general/?pageId=${tendaId}`

let
    apiUrl = `http://api.colombiaespassion.net`,
    pageId = `1`,
    categoryId = `2`
;




const
    CategoriaType = new GraphQLObjectType({
        name: `Categoria`,
        description: `Categoria de ropa`,
        fields: () => ({
            categoriaId: {
                type: GraphQLString
            },
            nom_categoria: {
                type: GraphQLString
            }
        })
    }),

    SubcategoriaType = new GraphQLObjectType({
        name: `Subcategoria`,
        description: `Categoria de ropa`,
        fields: () => ({
            categoriaId: {
                type: GraphQLString
            },
            nom_categoria: {
                type: GraphQLString
            }
        })
    }),

    MarcaType = new GraphQLObjectType({
        name: `Marca`,
        description: `Marca de ropa`,
        fields: () => ({
            marcaId: {
                type: GraphQLString
            },
            nom_marca: {
                type: GraphQLString
            }
        })
    }),

    TallaType = new GraphQLObjectType({
        name: `Talla`,
        description: `Talla de ropa`,
        fields: () => ({
            tallaId: {
                type: GraphQLString
            },
            nom_talla: {
                type: GraphQLString
            },
            label_talla: {
                type: GraphQLString
            },
            orden_talla: {
                type: GraphQLString
            },
            publicar_talla: {
                type: GraphQLString
            }
        })
    }),

    ColorType = new GraphQLObjectType({
        name: `Color`,
        description: `Color de la ropa`,
        fields: () => ({
            colorId: {
                type: GraphQLString
            },
            nom_color: {
                type: GraphQLString
            },
            label_color: {
                type: GraphQLString
            }
        })
    }),

    ImageType = new GraphQLObjectType({
        name: `Imagen`,
        description: `Image for the gallery to display`,
        fields: () => ({
            id: {
                type: GraphQLString
            },
            producto: {
                type: GraphQLString
            },
            imagen: {
                type: GraphQLString
            },
            imagen_min: {
                type: GraphQLString
            },
            type: {
                type: GraphQLString
            },
            ppal: {
                type: GraphQLString
            }
        })
    }),

    galleryColorType = new GraphQLObjectType({
        name: `Colors`,
        description: `Color for the gallery to display`,
        fields: () => ({
            id: {
                type: GraphQLString
            },
            fotoId: {
                type: GraphQLString
            },
            colorId: {
                type: GraphQLString
            },
            num_color: {
                type: GraphQLString
            },
            label_color: {
                type: GraphQLString
            },
            imagen_min: {
                type: GraphQLString
            }
        })
    }),

    ProductType = new GraphQLObjectType({
        name: `Producto`,
        description: `Producto de ropa`,
        fields: () => ({
            id: {
                type: GraphQLString
            },
            referencia: {
                type: GraphQLString
            },
            descripcion: {
                type: GraphQLString
            },
            categoria: {
                type: GraphQLString
            },
            marca: {
                type: GraphQLString
            },
            precioBase: {
                type: GraphQLString
            },
            precio2: {
                type: GraphQLString
            },
            precio3: {
                type: GraphQLString
            },
            precio4: {
                type: GraphQLString
            },
            precioMiscelaneo: {
                type: GraphQLString
            },
            proveedor: {
                type: GraphQLString
            },
            descripcion_long_es: {
                type: GraphQLString
            },
            nom_marca: {
                type: GraphQLString
            },
            logo_marca: {
                type: GraphQLString
            },
            nom_categoria: {
                type: GraphQLString
            },
            imagen_principal: {
                type: GraphQLString
            },
            gallery: {
                type: new GraphQLList(ImageType)
            },
            galleryColors: {
                type: new GraphQLList(galleryColorType)
            }
        })
    })
;

//apiUrl, pageId, categoryId, subcategoryId, brandId, sizeId, colorId

function CATEGORIA(relativeUrl) {
    return fetch(`${apiUrl}/jcategories/data/${relativeUrl}`)
        .then(res => res.json());
}
function SUBCATEGORIA(relativeUrl) {
    return fetch(`${apiUrl}/jsubcategories/data/${relativeUrl}`)
        .then(res => res.json());
}
function TALLA(relativeUrl) {
    return fetch(`${apiUrl}/jsizes/data/${relativeUrl}`)
        .then(res => res.json());
}
function MARCA(relativeUrl) {
    return fetch(`${apiUrl}/jbrands/data/${relativeUrl}`)
        .then(res => res.json());
}
function COLOR(relativeUrl) {
    return fetch(`${apiUrl}/jcolors/data/${relativeUrl}`)
        .then(res => res.json());
}

const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: `The root of all... queries.`,
    fields: () => ({

        subcategories: {
            type: new GraphQLList(CategoriaType),
            args: {
                apiUrl: { type: GraphQLString },
                pageId: { type: GraphQLString },
                categoryId: { type: GraphQLString }
            },
            resolve:
                (root, args) =>
                    CATEGORIA(`subcategories/?pageId=${args.pageId}&categoryId=${args.categoryId}`)
        },

        subcategoriaTALLES: {
            type: new GraphQLList(TallaType),
            args: {
                apiUrl: { type: GraphQLString },
                pageId: { type: GraphQLString },
                categoryId: { type: GraphQLString },
                subcategoryId: { type: GraphQLString }
            },
            resolve:
                (root, args) =>
                    SUBCATEGORIA(`sizes/?pageId=${args.pageId}&categoryId=${args.categoryId}&subcategoryId=${args.subcategoryId}`)
        },
        subcategoriaMARQUES: {
            type: new GraphQLList(MarcaType),
            args: {
                apiUrl: { type: GraphQLString },
                pageId: { type: GraphQLString },
                categoryId: { type: GraphQLString },
                subcategoryId: { type: GraphQLString }
            },
            resolve:
                (root, args) =>
                    SUBCATEGORIA(`brands/?pageId=${args.pageId}&categoryId=${args.categoryId}&subcategoryId=${args.subcategoryId}`)
        },
        subcategoriaCOLORS: {
            type: new GraphQLList(ColorType),
            args: {
                apiUrl: { type: GraphQLString },
                pageId: { type: GraphQLString },
                categoryId: { type: GraphQLString },
                subcategoryId: { type: GraphQLString }
            },
            resolve:
                (root, args) =>
                    SUBCATEGORIA(`colors/?pageId=${args.pageId}&categoryId=${args.categoryId}&subcategoryId=${args.subcategoryId}`)
        },
        subcategoriaPRODUCTES: {
            type: new GraphQLList(ProductType),
            args: {
                apiUrl: { type: GraphQLString },
                pageId: { type: GraphQLString },
                categoryId: { type: GraphQLString },
                subcategoryId: { type: GraphQLString }
            },
            resolve:
                (root, args) =>
                    SUBCATEGORIA(`products/?pageId=${args.pageId}&categoryId=${args.categoryId}&subcategoryId=${args.subcategoryId}`)
        },

        tallaSubcategoriaMARQUES: {
            type: new GraphQLList(MarcaType),
            args: {
                apiUrl: { type: GraphQLString },
                pageId: { type: GraphQLString },
                categoryId: { type: GraphQLString },
                subcategoryId: { type: GraphQLString },
                sizeId: { type: GraphQLString }
            },
            resolve:
                (root, args) =>
                    TALLA(`brands/2d.php?pageId=${args.pageId}&categoryId=${args.categoryId}&subcategoryId=${args.subcategoryId}&sizeId=${args.sizeId}`)
        },
        tallaSubcategoriaCOLORS: {
            type: new GraphQLList(ColorType),
            args: {
                apiUrl: { type: GraphQLString },
                pageId: { type: GraphQLString },
                categoryId: { type: GraphQLString },
                subcategoryId: { type: GraphQLString },
                sizeId: { type: GraphQLString }
            },
            resolve:
                (root, args) =>
                    TALLA(`colors-subcategories/?pageId=${args.pageId}&categoryId=${args.categoryId}&subcategoryId=${args.subcategoryId}&sizeId=${args.sizeId}`)
        },
        tallaSubcategoriaMarcaCOLORS: {
            type: new GraphQLList(ColorType),
            args: {
                apiUrl: { type: GraphQLString },
                pageId: { type: GraphQLString },
                categoryId: { type: GraphQLString },
                subcategoryId: { type: GraphQLString },
                sizeId: { type: GraphQLString },
                brandId: { type: GraphQLString }
            },
            resolve:
                (root, args) =>
                    TALLA(`colors/3d.php?pageId=${args.pageId}&categoryId=${args.categoryId}&subcategoryId=${args.subcategoryId}&sizeId=${args.sizeId}&brandId=${args.brandId}`)
        },

        marcaSubcategoriaTALLES: {
            type: new GraphQLList(TallaType),
            args: {
                apiUrl: { type: GraphQLString },
                pageId: { type: GraphQLString },
                categoryId: { type: GraphQLString },
                subcategoryId: { type: GraphQLString },
                brandId: { type: GraphQLString }
            },
            resolve:
                (root, args) =>
                    MARCA(`sizes/2d.php?pageId=${args.pageId}&categoryId=${args.categoryId}&subcategoryId=${args.subcategoryId}&brandId=${args.brandId}`)
        },
        marcaSubcategoriaCOLORS: {
            type: new GraphQLList(ColorType),
            args: {
                apiUrl: { type: GraphQLString },
                pageId: { type: GraphQLString },
                categoryId: { type: GraphQLString },
                subcategoryId: { type: GraphQLString },
                brandId: { type: GraphQLString }
            },
            resolve:
                (root, args) =>
                    MARCA(`colors/2d.php?pageId=${args.pageId}&categoryId=${args.categoryId}&subcategoryId=${args.subcategoryId}&brandId=${args.brandId}`)
        },

        colorSUBCATEGORIES: {
            type: new GraphQLList(SubcategoriaType),
            args: {
                apiUrl: { type: GraphQLString },
                pageId: { type: GraphQLString },
                categoryId: { type: GraphQLString },
                colorId: { type: GraphQLString }
            },
            resolve:
                (root, args) =>
                    COLOR(`subcategories/?pageId=${args.pageId}&categoryId=${args.categoryId}&colorId=${args.colorId}`)
        },
        colorSubcategoriaTALLES: {
            type: new GraphQLList(TallaType),
            args: {
                apiUrl: { type: GraphQLString },
                pageId: { type: GraphQLString },
                categoryId: { type: GraphQLString },
                subcategoryId: { type: GraphQLString },
                colorId: { type: GraphQLString }
            },
            resolve:
                (root, args) =>
                    COLOR(`sizes-subcategories/?pageId=${args.pageId}&categoryId=${args.categoryId}&subcategoryId=${args.subcategoryId}&colorId=${args.colorId}`)
        },  
        colorSubcategoriaMARQUES: {
            type: new GraphQLList(MarcaType),
            args: {
                apiUrl: { type: GraphQLString },
                pageId: { type: GraphQLString },
                categoryId: { type: GraphQLString },
                subcategoryId: { type: GraphQLString },
                colorId: { type: GraphQLString }
            },
            resolve:
                (root, args) =>
                    COLOR(`brands/2d.php?pageId=${args.pageId}&categoryId=${args.categoryId}&subcategoryId=${args.subcategoryId}&colorId=${args.colorId}`)
        },
        colorSubcategoriaMarcaTALLES: {
            type: new GraphQLList(TallaType),
            args: {
                apiUrl: { type: GraphQLString },
                pageId: { type: GraphQLString },
                categoryId: { type: GraphQLString },
                subcategoryId: { type: GraphQLString },
                colorId: { type: GraphQLString },
                brandId: { type: GraphQLString }
            },
            resolve:
                (root, args) =>
                    COLOR(`sizes/3d.php?pageId=${args.pageId}&categoryId=${args.categoryId}&subcategoryId=${args.subcategoryId}&colorId=${args.colorId}&brandId=${args.brandId}`)
        }
    })
});

const schema = new GraphQLSchema({
    query: QueryType
});

module.exports = schema;
