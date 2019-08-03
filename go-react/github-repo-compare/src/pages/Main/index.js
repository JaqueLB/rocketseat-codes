import React, { Component } from "react";
import logo from "../../assets/logo.png";
import { Container, Form } from "./styles";
import CompareList from "../../components/CompareList";
import api from "../../services/api";
import moment from "moment";

export default class Main extends Component {
  // informações vão refletir no render ao alterar
  state = {
    repositoryError: false,
    repositoryInput: "",
    repositories: []
  };

  handleAddRepository = async e => {
    e.preventDefault();
    try {
      const { data: repository } = await api.get(
        `/repos/${this.state.repositoryInput}`
      );

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositoryError: false,
        repositoryInput: "",
        repositories: [...this.state.repositories, repository] // ... this.state.repositories está copiando o que já existe na variavel
      });
    } catch (error) {
      this.setState({ repositoryError: true });
      console.log(error);
    }
  };

  render() {
    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form
          withError={this.state.repositoryError}
          onSubmit={this.handleAddRepository}
        >
          <input
            type="text"
            placeholder="usuário/repositório"
            value={this.state.repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">Ok</button>
        </Form>
        <CompareList repositories={this.state.repositories} />
      </Container>
    );
  }
}
