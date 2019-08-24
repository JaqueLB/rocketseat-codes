import React from 'react';
import * as Yup from 'yup';
import { Form , Input, Scope } from '@rocketseat/unform';

const initialData = {
  name: "Teste 1",
  address: {
    street: "Rua teste",
    number: 123
  }
}

const schema = Yup.object().shape({
  name: Yup.string().required(),
  address: Yup.object().shape({
    number: Yup.string().min(3).required("Isso é obrigatório!!")
  })
})

function App() {
  function handleSubmit(data) {
    console.log(data);
  }
    return (
      <Form schema={schema} initialData={initialData} onSubmit={handleSubmit}>
        <Input name="name" label="Nome: "/><br/>

        <Scope path="address">
          <Input name="street" label="Street: " /><br/>
          <Input name="number" label="Number: " /><br/>
        </Scope>

        <button type="submit">Enviar</button>
      </Form>
    );
}

export default App;
