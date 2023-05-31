import React, { useState } from 'react'
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { Participant } from '../../components/Participant';
export function Home() {
  const [participants, setParticipants] = useState<string[]>([])
  const [participantName, setParticipantName] = useState('')

  function handlerParticipantAdd() {
    if(participantName.length === 0) {
      return Alert.alert('Campo vazio', 'Preencha o nome do participante.')
    }
    if(participants.includes(participantName)) {
      return Alert.alert('Participante existente', 'Já existe um participante com esse nome na lista.')
    }

    setParticipants(prevState => [... prevState, participantName])
    setParticipantName('') 
  }

  function handlerParticipantRemove(name: string) {
    Alert.alert('Remover', `Deseja realmente remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
      },
      {
        text: "Não",
        style: 'cancel'
      }
    ] )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do evento</Text>
      <Text style={styles.eventDate}>Sexta feira, 26 de maio 2023</Text>
      <View style={styles.form}>
        <TextInput 
          style={styles.input} 
          placeholder='Nome do participante' 
          placeholderTextColor='#6B6B6B' 
          onChangeText={setParticipantName}
          value={participantName}/>
        <TouchableOpacity style={styles.button} onPress={handlerParticipantAdd}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList 
        data={participants} 
        renderItem={({ item }) => (
          <Participant 
            key={item} 
            name={item} 
            onRemove={() => handlerParticipantRemove(item)} />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Não há participantes no momento
          </Text>
        )}/>
        
    </View>
  )
}
