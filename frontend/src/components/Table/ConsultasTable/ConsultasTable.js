import React, { useEffect, useState } from "react";
import "./ConsultasTable.css";
import { findAllConsultas, findConsultasByPacienteCpf } from "../../../services/Consulta/ConsultaService";

const ConsultasTable = ({ searchInput, currentPage, refreshConsultaTable, setPageData, openModalView }) => {
    const [consultas, setConsultas] = useState([{}]);

    useEffect(() => {
        const getConsultas = async () => {
            const response = await findAllConsultas(currentPage);
            if (response.content) {
                console.log(response);
                setConsultas(response.content);
            } else {
                console.log("teste");
                setConsultas([{}]);
            }
            setPageData(response);
        };

        const getConsultasByPacienteCpf = async () => {
            const response = await findConsultasByPacienteCpf(searchInput);
            setConsultas(response);
            setPageData(response);
        };

        if (searchInput == "") {
            getConsultas();
        } else {
            getConsultasByPacienteCpf();
        }
    }, [currentPage, searchInput, refreshConsultaTable]);

    return (
        <>
            <table className="table table-striped table-hover mt-3 paciente-table">
                <thead>
                    <tr>
                        <th scope="col" className="id center">
                            Identificador
                        </th>
                        <th scope="col" className="paciente">
                            Paciente
                        </th>
                        <th scope="col" className="exam">
                            Exame
                        </th>
                        <th scope="col" className="date">
                            Data
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {consultas.map((consulta, index) => (
                        <tr onClick={() => openModalView(consulta)} key={index}>
                            <td className="center">{consulta.id} </td>
                            <td className="paciente">{consulta.paciente?consulta.paciente.name:consulta.paciente}</td>
                            <td>{consulta.examType}</td>
                            <td>{consulta.dateTime}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="col" className="center">Identificador</th>
                        <th scope="col" className="paciente">Paciente</th>
                        <th scope="col">Exame</th>
                        <th scope="col">Data</th>
                    </tr>
                </tfoot>
            </table>
        </>
    );
};

export default ConsultasTable;
