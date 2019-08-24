import React from 'react';
import PropTypes from 'prop-types';

// Um componente é um conjunto de código que faz sentido sozinho,
// que vai ser usado em mais de uma tela
// um componente é um conjunto de código de visualização, scripts e css

// stateless declaration
const Button = props => (
  <button type="button" onClick={props.onClick}>
    {props.children}
  </button>
);

Button.defaultProps = {
  children: 'Salve',
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string,
};

export default Button;

// o nome da class deve ser igual ao nome do arquivo
// stateful declaration
// export default class Button extends Component {
//   // propriedades estáticas
//   static defaultProps = {
//     children: "Salve"
//   };

//   static propTypes = {
//     onClick: PropTypes.func.isRequired,
//     children: PropTypes.string
//   };

//   render() {
//     // return <a href="" title={this.props.title}></a>
//     return <button onClick={this.props.onClick}>{this.props.children}</button>;
//   }
// }
