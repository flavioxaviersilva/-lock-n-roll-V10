import { createAppContainer } from 'react-navigation'; 
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from './pages/LoginScreen';
import AtividadesPage from './pages/AtividadesPage';
import AtividadeDetailPage from './pages/AtividadeDetailPage';
import AtividadesFormPage from './pages/AtividadesFormPage';
import MenuPrincipal from './pages/MenuPrincipal';
import PaginaAplicativos from './pages/Aplicativos';
import PaginaControleFoco from './pages/ControleFoco';
import PaginaGestaoDependentes from './pages/GestaoDependentes';
import PaginaCriarUsuario from './pages/CriarUsuario';
import PaginaRecuperarSenha from './pages/RecuperarSenha';

const AppNavigator = createStackNavigator ({
  'Login' : {                                
    screen: LoginScreen,
    navigationOptions: {              
        title: `Lock 'n' Roll`,

    }
  },

  'ResetPassword' : {                                
    screen: PaginaRecuperarSenha,
    navigationOptions: {              
        title: 'Recuperar Senha',
        headerTitleStyle: {
          
        }
    }
  },


  'NewUser' : {                                
    screen: PaginaCriarUsuario,
    navigationOptions: {              
        title: 'Cadastrar Usuário',
        headerTitleStyle: {
          
        }
    }
  },
  
  'LocknRoll': {
    screen: MenuPrincipal,
    navigationOptions: {
        title: 'Let´s Rock',
        headerLeft: ()=> null,
        
        // headerTitleStyle: {
        //   textAlign: 'center'
        // }
    }
  },
     

  
  'Aplicativos' : {                                 
    screen: PaginaAplicativos,
    navigationOptions: {            
        title: 'Gestão de Aplicativos',
        headerTitleStyle: {
          
        }
    }
  },

  'ControleFoco' : {                                 
    screen: PaginaControleFoco,
    navigationOptions: {            
        title: 'Controle de Foco',
        headerTitleStyle: {
          
        }
    }
  },

  'GestaoDependentes' : {                                 
    screen: PaginaGestaoDependentes,
    navigationOptions: {            
        title: 'Gestão de Dependentes',
        headerTitleStyle: {
          
        }
    }
  },
    
  
  'Main': {
      screen: AtividadesPage,
      navigationOptions: {
          title: 'Gerenciar Atividades',
          headerTitleStyle: {

          }
      }
  },
  
  'DetailPage' : {
      screen: AtividadeDetailPage,
      navigationOptions: ({ navigation }) => {
          const {atividade} = navigation.state.params;
          return {
              title: atividade.title,
              headerTitleStyle: {

              }
          }       
      }
  
  },
  
  'atividadeForm': {
    screen: AtividadesFormPage,
    navigationOptions: ({ navigation }) => {
        if (navigation.state.params && navigation.state.params.atividadeToEdit) {
          return {
            title: navigation.state.params.atividadeToEdit.title,
          }
        }
          return {
            title: 'Cadastro de Atividades',
            headerTitleStyle: {}
          };
       }      
    }           //sobrescreve o nome default da tela do defaultNavigatorOptions
  
  
   
}, {                                    //SEGUNDO OBJETO ONDE PASSO AS CONFIGURAÇÕES
  defaultNavigationOptions: {          //Vale para todos os headers das telas criadas 
    title: 'LocknRoll!',   //ficará em todas a telas
    headerTintColor: 'white',
    headerStyle: {                      //se refere ao componente inteiro de header
      backgroundColor: '#6ca2f7',
      borderBottomWidth: 1,
      borderBottomColor: '#C5C5C5',
      //headerTintColor: 'white',


    },
    headerTitleStyle: {           //apenas ao texto
      color: 'white',
      fontSize: 30,
      alignSelf: 'center',
      flexGrow: 1,
      textAlign: 'center',

    }


  }                        


});

const AppContainer = createAppContainer (AppNavigator);

export default AppContainer;