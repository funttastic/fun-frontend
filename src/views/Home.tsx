import {useEffect, useState} from 'react';
import CardHeader from './components/CardHeader';
import CardFooter from './components/CardFooter';
import PasswordComponent from './components/PasswordComponent';

import WebSocketLogs from "@/components/all/WebSocketLogs";
import {Card} from '@/components/ui';
import {apiDeleteRemoveWallet, apiPostAddWallet,} from '@/model/service/api/funttastic';
import {useHandleUnauthorized} from '@/utils/hooks/useHandleUnauthorized';

import { v4 as uuidv4 } from 'uuid';


const Home = () => {
  const handleUnAuthorized = useHandleUnauthorized();
  const [wsId, setWsId] = useState('');

  useEffect(() => {
    setWsId(uuidv4());

    const fetchData = async () => {
      try {
        const {configure} = await import('@/model/service/recurrent')
        configure(handleUnAuthorized)
      } catch (errors) {
        console.log(errors)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <div className="flex flex-col flex-auto items-center gap-4 lg:flex-row lg:justify-normal lg:items-stretch">
        <Card
          header="Funttastic Client"
          headerExtra={<CardHeader target="fun-client"/>}
          footer={<CardFooter target="fun-client"/>}
          className="w-96"
        >
          <p></p>
          <div>
            <div>
              <PasswordComponent
                buttonTitle="Add Wallet"
                buttonColor="green"
                onButtonClick={apiPostAddWallet}
                inputPlaceholder="Mnemonic"
                inputType="password"
                toastType="success"
                toastSuccessMessage="Wallet added successfully"
                toastErrorMessage="Error while adding wallet"
              />
            </div>
            <div className="flex gap-2 justify-center items-center mt-3">
              <PasswordComponent
                buttonTitle="Remove Wallet"
                buttonColor="red"
                onButtonClick={apiDeleteRemoveWallet}
                inputPlaceholder="Address"
                inputType="text"
                toastType="success"
                toastSuccessMessage="Wallet removed successfully"
                toastErrorMessage="Error while removing wallet"
              />
            </div>
          </div>
        </Card>
        <Card
          header="Hummingbot Gateway"
          headerExtra={<CardHeader target="hb-gateway"/>}
          footer={<CardFooter target="hb-gateway"/>}
          className="w-96"
        >
          <p></p>
        </Card>
        <Card
          header="Hummingbot Client"
          headerExtra={<CardHeader target="hb-client"/>}
          footer={<CardFooter target="hb-client"/>}
          className="w-96"
        >
          <p></p>
        </Card>
      </div>
      <div className="flex flex-col py-6">
        <Card header={<div className="text-center font-bold" style={{color: '#f3f4f6'}}><h4>Logs</h4></div>}>
          {wsId && <WebSocketLogs id={wsId} />}
        </Card>
      </div>
    </div>

  )
}

export default Home
