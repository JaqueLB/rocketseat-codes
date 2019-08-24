// um componente por arquivo!
// React será importado em todo arquivo que usar o react,
// mesmo que a variavel em si não seja utilizada
import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import Button from './Button';
import './style.scss';

class App extends Component {
  state = {
    counter: 0,
  };

  // Metodos de ciclo de vida

  // ciclo de vida: inicialização do componente
  // perfeito para api e default values e event listeners
  // componentDidMount() {}

  // vetar a atualização(render) do componente que vai sofrer alterações nas propriedades ou estado
  // para controle de performance
  // shouldComponentUpdate(nextProps, nextState) {}

  // depois do componente sofrer a atualização(render)
  // componentDidUpdate(prevProps, prevState) {}

  // ciclo de vida: antes de deixar de existir o componente
  // perfeito para limpar os listeners configurados no did mount
  // componentWillUnmount() {}

  // funções comuns: o this se referencia ao conteto da função
  // arrow functions: não sobrescrevem o escopo do this. o this se referencia ao
  // contexto global (da classe)
  handleClick = () => {
    // formas de manipular o resultado assíncrono de setState:
    // 1) passar um callback para ser executado em seguida
    // this.setState({ counter: this.state.counter + 1 }, () => {
    //   console.log(this.state.counter);
    // });
    // 2) o setState recebe a var state com o estado da fila,
    // é outro state e não o global
    // this.setState(state => ({ counter: state.counter + 1 }));
    // this.setState(state => ({ counter: state.counter + 1 }));
    this.setState({ counter: this.state.counter + 1 });
  };

  // não usar class, é className!

  render() {
    return (
      <Fragment>
        <h1>Hello Jaque!</h1>
        <h2 style={{ color: 'white' }}>{this.state.counter}</h2>
        {/* <Button
          onClick={() => {
            alert("button 1");
          }}
        /> */}
        {/* <Button onClick={this.handleClick} title="Titulo do Botão" /> */}
        <Button onClick={this.handleClick}>Somar</Button>
      </Fragment>
    );
  }
}

render(<App />, document.getElementById('app'));
