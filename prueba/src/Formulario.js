import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const schema = yup.object().shape({
    nombre: yup.string().required('el nombre es requerido'),
    tipoIden: yup.string().required('por favor, seleccione tipo id'),
    numeroIden: yup.number().integer().required('por favor ingrese su identificacion'),
    correo: yup.string().email().required('por favor ingrese su correo'),
    fecha: yup.date().max('2002-01-01', 'la fecha debe ser superior a 2002-01-01').required('por favor ingrese su fecha de nacimiento'),
    direccion: yup.string().notRequired(),
    edad: yup.number().notRequired()
});

const Formulario = () => {
    const initValue = {
        id: 0,
        nombre: '',
        tipoIden: '',
        numeroIden: '',
        correo: '',
        fecha: '',
        direccion: '',
        edad: ''
    };
    const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [formUsuario, setFormUsuario] = useState(initValue);

    const getUsuarios = () => {
        axios.get("http://localhost:4000")
            .then(result => {
                setUsuarios(result.data);
            });
    };

    const deleteById = (id) => {
        axios.delete(`http://localhost:4000/${id}`)
            .then(() => {
                getUsuarios();
            });
    };

    const setDataForm = (usuario) => {
        setFormUsuario(usuario);
    }

    useEffect(() => getUsuarios());
    return (
        <div className='d-flex justify-content-between align-align-items-center'>
            <div className='text-center'>
                <Formik
                    initialValues={formUsuario}
                    validationSchema={schema}
                    enableReinitialize
                    onSubmit={(valores, { resetForm }) => {
                        const requets = axios[valores.id !== 0 ? "put" : "post"]("http://localhost:4000", valores)
                        requets.then(() => {
                            resetForm();
                            getUsuarios();
                            setDataForm(initValue);
                        })
                        cambiarFormularioEnviado(true);
                        setTimeout(() => cambiarFormularioEnviado(false), 5000);
                    }}
                >
                    {({ errors }) => (
                        <Form className="formulario">
                            <h3>Registrarme</h3>
                            <div>
                                <label htmlFor="nombre">Nombre:</label>
                                <Field
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    placeholder="nombre completo"
                                />
                                <ErrorMessage name="nombre" component={() => (<div className="error">{errors.nombre}</div>)} />
                            </div>
                            <div>
                                <label htmlFor='tipoIden'>Tipo id:</label>
                                <Field name="tipoIden" as="select">
                                    <option value="">Seleccione una opcion</option>
                                    <option value="c.c">Cedula Ciudadania</option>
                                    <option value="nit">NIT</option>
                                    <option value="c.extranjeria">Cedula Extranjeria</option>
                                    <option value="pasaporte">Pasaporte</option>
                                </Field>
                                <ErrorMessage name="tipoIden" component={() => (<div className="error">{errors.tipoIden}</div>)} />
                            </div>
                            <div>
                                <label htmlFor='numeroIden'>Identificacion:</label>
                                <Field
                                    type="text"
                                    id="numeroIden"
                                    name="numeroIden"
                                    placeholder="identificacion"
                                />
                                <ErrorMessage name="numeroIden" component={() => (<div className="error">{errors.numeroIden}</div>)} />
                            </div>
                            <div>
                                <label htmlFor="correo">Email:</label>
                                <Field
                                    type="text"
                                    id="correo"
                                    name="correo"
                                    placeholder="tucorreo@dominio.com"
                                />
                                <ErrorMessage name="correo" component={() => (<div className="error">{errors.correo}</div>)} />
                            </div>
                            <div>
                                <label htmlFor="fecha">Fecha de nacimiento:</label>
                                <Field
                                    type="date"
                                    id="fecha"
                                    name="fecha"
                                />
                                <ErrorMessage name="fecha" component={() => (<div className="error">{errors.fecha}</div>)} />
                            </div>
                            <div>
                                <label htmlFor='direccion' >Dirección:</label>
                                <Field
                                    type="text"
                                    id="direccion"
                                    name="direccion"
                                    placeholder="direccion"
                                />
                            </div>
                            <div>
                                <label htmlFor='edad'>Edad:</label>
                                <Field
                                    type="numeros"
                                    id="edad"
                                    name="edad"
                                    placeholder="edad"
                                />
                            </div>
                            <button type="submit">Registrar</button>
                            {formularioEnviado && <p className="exito">Formulario enviado con exito!</p>}
                        </Form>
                    )}

                </Formik>
            </div>
            <div className='text-center'>
                <div>
                    <h3>Lista de usuarios</h3>
                </div>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Indentificacion</th>
                            <th>Correo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usuarios.map(usuario => {
                                return (
                                    <tr key={usuario.id}>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.numeroIden}</td>
                                        <td>{usuario.correo}</td>
                                        <td>
                                            <i onClick={() => setDataForm(usuario)} className='bx bxs-edit-alt text-primary mr-2'></i>
                                            <i onClick={() => deleteById(usuario.id)}
                                                className='bx bxs-trash-alt text-danger'></i>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Formulario;