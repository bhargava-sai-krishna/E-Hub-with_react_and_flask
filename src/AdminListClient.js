import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminListClient(props) {
    const [AdmId] = useState(props.userId);
    const [ClientData, setClientData] = useState(null);

    useEffect(() => {
        const GetCLientList = () => {
            axios.post('http://127.0.0.1:5000/GetClientList', { AdmId }).then((response) => {
                console.log(response.data);
                setClientData(JSON.parse(response.data));
            }).catch((error) => {
                console.log(error);
            });
        };
        GetCLientList();
    }, [AdmId]);

    return (
        <div>
            {
                ClientData && (
                    <table>
                        <thead>
                            <tr>
                                <th>Client_id</th>
                                <th>Company</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Number of projects ordered</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ClientData.map((row,index) => (
                                    <tr key={index}>
                                        <td>{row.client_id}</td>
                                        <td>{row.company}</td>
                                        <td>{row.name}</td>
                                        <td>{row.email}</td>
                                        <td>{row.number_of_projects}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )
            }
        </div>
    );
}

export default AdminListClient;
