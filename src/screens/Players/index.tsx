import { FlatList} from "react-native"
import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Filter } from "@components/Filter"
import { Input } from "@components/Input";
import { ButtonIcon } from "@components/ButtonIcon";
import { Highlight } from "@components/Highlight";

import { Container,Form, HeaderList, NumberOfPlayers } from "./styles";
import { useState } from "react";
import { PlayerCard } from "@components/Players";
import { ListEmpty } from "@components/ListEmpty";

export function Players() {
    const [team, setTeam] = useState('Time A');
    const [players, setPlayers] = useState ([]);


    return (
        <Container>
            <Header showBackButton/>
                <Highlight
                    title="Nome da turma "
                    subtitle="adiciona a a galera e separe os times"           
                />

            <Form>
                <Input
                 placeholder="Nome do participant"
                 autoCorrect={false}
                />
            <ButtonIcon 
            icon= "add"
            />
           </Form>

        <HeaderList>
           <FlatList
            data={['Time A','Time B']}
            keyExtractor={item => item}
            renderItem= {({ item }) => (
                <Filter
                title={item}
                isActive={item === team}
                onPress={()=>setTeam(item)}
            />
        )}
        horizontal
   />
       <NumberOfPlayers>
            {players.length}
       </NumberOfPlayers>
        </HeaderList>

        <FlatList
            data={players}
            keyExtractor={item => item}
            renderItem={({ item })=>(
                <PlayerCard 
                name ={item}
                onRemove={() => {}}
                />
            )}

            ListEmptyComponent={() => (
                <ListEmpty
                    message="Não há pessoas nesse time"
                />
            )}
        
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
                {paddingBottom: 100},
                players.length === 0 && {flex: 1}
            ]}
           />
           <Button
           title="Remover turama"
           type="SECONDARY"

           
           />
        </Container>
            
    );
}