
import { useState } from "react";
import { FlatList, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ListEmpty } from "@components/ListEmpty";
import { ButtonIcon } from "@components/ButtonIcon";
import {  PlayerCard } from "@components/PlayerCard";

import { Container, Form, HeaderList, NumbersOfPlayers} from "./styles";
import { AppError } from "@utils/AppError";
import { playerGetByGroup } from "@storage/player/playersGetByGroup";
import { PlayerAddByGroup } from "@storage/player/playerAddByGroup";

type RouteParms ={
    group:string;
}

export function Players() {
    const [newPlayerName, setNewplayerName] = useState('');
    const [team, setTeam] =useState('Time A');
    const[players, setPlayers] = useState ([]);

    const route =useRoute();
    const {group} = route.params as RouteParms

    async function handleAddPlayer(){
        if (newPlayerName.trim().length === 0){
            return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar.')
        }

        const newPlayer = {
            name: newPlayerName,
            team,        
        }
         try{
            await PlayerAddByGroup(newPlayer, group);
            const players = await playerGetByGroup(group);
            console.log(players)
            
         }catch(error){
                if(error instanceof AppError){
                Alert.alert('Nova pessoa', error.message);
            }else{
                console.log(error);
                Alert.alert('Nova pessoa', 'Erro ao adicionar adicionar');
            }
   
    }
 return (
    <Container>
        <Header showBackButton/>
        <Highlight
            title={group}
            subtitle="adiciona a  galera e separe os times"           
        />

    <Form>
        <Input
        onChangeText={setNewplayerName}
            placeholder="Nome da Pessoa"
            autoCorrect = {false}
        />

            <ButtonIcon icon="add" 
            onPress={handleAddPlayer}
            />
    </Form>
    <HeaderList>
        <FlatList
            data={['Time A', 'Time B']}
            keyExtractor={item=>item}
            renderItem={({ item })=>(
                <Filter
                title={item}
                isActive ={item === team}
                onPress={() =>setTeam(item)}
                />

            )}
            horizontal
        />

    <NumbersOfPlayers>
        {players.length}
    </NumbersOfPlayers>
        </HeaderList>
        <FlatList
        data={players}
        keyExtractor={item => item}
        renderItem={({ item })=> (
        <PlayerCard 
        name={item}
        onRemove={() => {}}
        />
      )}
        ListEmptyComponent={() =>(
            <ListEmpty
                message="Não há pessoas nesse time"
            />
        
        )}
        showsVerticalScrollIndicator= {false}
        contentContainerStyle ={[
            {paddingBottom: 100},
            players.length === 0 && {flex: 1}
        ]}
        />
        <Button
        title="Remover turma"
        type="SECONDARY"
        />
    </Container>
  );
 }
}
