import React, { useState } from "react";
import DashboardLayout from "../../../src/layouts/DashboardLayout/DashboardLayout";
import styles from "./index.module.scss";
import { Button, Heading, Input, useToast } from "@chakra-ui/react";

const AddChild = ({ Component, pageProps }) => {

    const [newChildName, setNewChildName] = useState('');
    const [newChildEmail, setNewChildEmail] = useState('');
    const [newChildPhone, setNewChildPhone] = useState('');

    const toast = useToast();

    const sendEmail = (e) => {
        console.log(e)
        let data = {
            newChildName,
            newChildEmail,
            newChildPhone
        }
        fetch('/api/sendEmail', {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then((res) => {
            console.log('Response received')
            if (res.status === 200) {
              console.log('Response succeeded!')
              setNewChildPhone('')
              setNewChildName('')
              setNewChildEmail('')
            }
          })
    }

    return (
        <>
            <div className={styles.addChildContainer}>
                <Heading as='h3' size='lg'>Inviter un nouvel enfant</Heading>
                <div className={styles.addChildBoxContent}>
                    <div>Nom de l'enfant</div>
                    <Input
                        type="text"
                        backgroundColor="white"
                        placeholder='Juliette'
                        onChange={(event) => { setNewChildName(event.target.value) }}
                    />
                </div>

                <div className={styles.addChildBoxContent}>
                    <div>Adresse e-mail</div>
                    <Input
                        type="text"
                        backgroundColor="white"
                        placeholder='adresse@exemple.fr'
                        onChange={(event) => { setNewChildEmail(event.target.value) }}
                    />
                    <Button colorScheme='teal' size='md' onClick={() => {
                        sendEmail()
                        toast({
                            title: `Email envoyé à ${newChildName}`,
                            description: `Un email d'inscription à été envoyé à ${newChildEmail}`,
                            status: 'success',
                            duration: 3000,
                            isClosable: true,
                        })
                    }}>
                        Envoyer par e-mail
                    </Button>
                </div>

                <div className={styles.addChildBoxContent}>
                    <div>Numéro de téléphone</div>
                    <Input
                        type="text"
                        backgroundColor="white"
                        placeholder='06 06 06 06 06'
                        onChange={(event) => { setNewChildPhone(event.target.value) }}
                    />
                    <Button colorScheme='teal' size='md' onClick={() => {
                        toast({
                            title: `Sms envoyé à ${newChildName}`,
                            description: `Un SMS d'inscription à été envoyé à ${newChildPhone}`,
                            status: 'success',
                            duration: 3000,
                            isClosable: true,
                        })
                    }}>
                        Envoyer par SMS
                    </Button>
                </div>
            </div>
        </>
    );
};

AddChild.getLayout = function getLayout(EmptyPage) {
    return <DashboardLayout>{EmptyPage}</DashboardLayout>;
};

export default AddChild;