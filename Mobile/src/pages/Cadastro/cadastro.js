import React, { useState } from 'react';
import { Alert, View, SegmentedControlIOS, Text, TouchableOpacity } from 'react-native';
import Botao from '../../componentes/Botao';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import estilos from './estilos';
import { cadastrar } from '../../servicos/requisicoesFirebase';
import { Alerta } from '../../componentes/Alerta';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import db from '../../config/firebase';
import getLastDocument from '../../servicos/GetLastDocument';
import { LinearGradient } from 'expo-linear-gradient';

export default function Cadastro() {  
  const [nome, setNome] = useState("");
  const [ra, setRA] = useState("");
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [statusError, setStatusError] = useState('');
  const [mensagemError, setMensagemError] = useState('');

  async function realizarCadastro(){
    if(email == ''){
      setMensagemError('Preencha com seu email');
      setStatusError('email');
    } else if(senha == ''){
      setMensagemError('Digite sua senha');
      setStatusError('senha');
    } else if(confirmaSenha == ''){
      setMensagemError('Confirme sua senha');
      setStatusError('confirmaSenha');
    } else if(confirmaSenha != senha){
      setMensagemError('As senhas não conferem!');
      setStatusError('confirmaSenha');
    } else {
      const resultado = await cadastrar(email, senha);
      setStatusError('firebase')
      CadastroAluno()
      if(resultado == 'sucesso') {
        setMensagemError('Usuário criado com sucesso!')
        setEmail('')
        setSenha('')
        setConfirmaSenha('')
        setNome('')
        setRA('')
      }
      else {
        setMensagemError(resultado)
      }
    }
  }

  const CadastroAluno = async () =>{
    let ultimo = await getLastDocument('Aluno')
    setDoc(doc(db, 'Aluno', String(parseInt(ra))),{
      nome: nome,
      ra: parseInt(ra),
      email:email
    });
  }

  return (
    <View style={estilos.container}>
       <LinearGradient colors={['white','#1D8989']}
      style={estilos.background}/>
      <EntradaTexto 
        label="Nome"
        value={nome}
        onChangeText={texto => setNome(texto)}
        error={statusError == 'nome'}
        messageError={mensagemError}
      />

      <EntradaTexto 
        label="RA"
        value={ra}
        onChangeText={texto => setRA(texto)}
        error={statusError == 'ra'}
        messageError={mensagemError}
      />

      <EntradaTexto 
        label="E-mail"
        value={email}
        onChangeText={texto => setEmail(texto)}
        error={statusError == 'email'}
        messageError={mensagemError}
      />
      <EntradaTexto
        label="Senha"
        value={senha}
        onChangeText={texto => setSenha(texto)}
        secureTextEntry
        error={statusError == 'senha'}
        messageError={mensagemError}
      />

      <EntradaTexto
        label="Confirmar Senha"
        value={confirmaSenha}
        onChangeText={texto => setConfirmaSenha(texto)}
        secureTextEntry
        error={statusError == 'confirmaSenha'}
        messageError={mensagemError}
      />

      <Alerta 
        mensagem={mensagemError}
        error={statusError == 'firebase'}
        setError={setStatusError}
      />
      
      <TouchableOpacity 
      style={estilos.botao}
      onPress={() => realizarCadastro()}><Text style={estilos.textoBotao}>CADASTRAR</Text></TouchableOpacity>
    </View>
  );
}
