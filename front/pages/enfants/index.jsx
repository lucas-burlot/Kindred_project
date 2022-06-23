import React, { useEffect, useState} from "react";
import DashboardLayout from "../../src/layouts/DashboardLayout/DashboardLayout";

import {Avatar, Link, Table, TableContainer, Tbody, Td, Tr} from '@chakra-ui/react';

import {getFromServer, postOnServer} from "../../src/utils/server";
import NextLink from "next/link";
import styles from "./index.module.scss";
import {useRouter} from "next/router";

const Index = ({Component, pageProps}) => {

    const [contractsList, setContractsList] = useState([]);

    const router = useRouter();
    const handleAddChild = () => {
        router.push(`/enfants/addChild`);
    };


    useEffect(() => {
        getFromServer('contracts').then((contractsList) => {
            setContractsList(contractsList.data);
        })
            .catch(error => {
                console.log(error);
            })
    }, [])

    useEffect(() => {
        console.log(contractsList);

    }, [contractsList])

    return (
        <div className={styles.contractContainer}>
            <TableContainer>
                <Table variant='simple' className={styles.contractTable}>
                    <Tbody>
                        {
                            contractsList.map((contract) => (
                                    <Tr key={contract.id} className={styles.childContainer}>
                                        <Td><Avatar size='sm' bg='teal.500'/></Td>
                                        <Td>{contract.child.firstname}</Td>
                                        <Td>{contract.weeklyPoint} POINT</Td>
                                        <Td>
                                            <NextLink href={"../contract/evaluate/" + contract.child.id} passHref>
                                                <Link>Évaluer</Link>
                                            </NextLink>
                                        </Td>
                                        <Td>
                                            <NextLink href={"../contract/" + contract.id} passHref>
                                                <Link>Contrat</Link>
                                            </NextLink>
                                        </Td>
                                    </Tr>
                                )
                            )
                        }
                    </Tbody>
                </Table>
            </TableContainer>
            <div className={styles.addChildContainer} onClick={handleAddChild}>
                Ajouter enfant
            </div>
        </div>
    );
};

Index.getLayout = function getLayout(Index) {
    return <DashboardLayout>{Index}</DashboardLayout>;
};

export default Index;