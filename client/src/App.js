import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [id, setId] = useState(0);
  const [nome, setName] = useState("");
  const [cpf, setCPF] = useState(0);
  const [email, setEmail] = useState("");
  const [senha, setPassword] = useState("");
  const [telefone_celular, setCel] = useState(0);
  const [telefone_fixo, setPhone] = useState(0);
  const [id_localizacao_no_condominio, setLocal] = useState(0);

  const [ocorrencia_condominio_id, set_ocorrencia_condominio_id] = useState(0);
  const [ocorrencia_morador_id, set_ocorrencia_morador_id] = useState(0);
  const [categoria, set_categoria] = useState("");
  const [ocorrencia, set_ocorrencia] = useState("");

  const [perdido_condominio_id, set_perdido_condominio_id] = useState(0);
  const [perdido_funcionario_id, set_perdido_funcionario_id] = useState(0);
  const [perdido, set_perdido] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [moradoresList, setmoradoresList] = useState([]);
  const [ocorrenciasList, setocorrenciasList] = useState([]);
  const [perdidosList, setperdidosList] = useState([]);

  const addMorador = () => {
    Axios.post("http://localhost:3001/create", {
      id: id,
      nome: nome,
      cpf: cpf,
      email: email,
      senha: senha,
      telefone_celular: telefone_celular,
      telefone_fixo: telefone_fixo,
      id_localizacao_no_condominio: id_localizacao_no_condominio,
    }).then(() => {
      setmoradoresList([
        ...moradoresList,
        {
          id: id,
          nome: nome,
          cpf: cpf,
          email: email,
          senha: senha,
          telefone_celular: telefone_celular,
          telefone_fixo: telefone_fixo,
          id_localizacao_no_condominio: id_localizacao_no_condominio,
        },
      ]);
    });
  };

  const addPerdido = () => {
    Axios.post("http://localhost:3001/createperdido", {
      perdido_condominio_id: perdido_condominio_id,
      perdido_funcionario_id: perdido_funcionario_id,
      perdido: perdido
    }).then(() => {
      setperdidosList([
        ...perdidosList,
        {
          perdido_condominio_id: perdido_condominio_id,
          perdido_funcionario_id: perdido_funcionario_id,
          perdido: perdido
        },
      ]);
    });
  };

  const addOcorrencia = () => {
    Axios.post("http://localhost:3001/createocorrencia", {
      ocorrencia_condominio_id: ocorrencia_condominio_id,
      ocorrencia_morador_id: ocorrencia_morador_id,
      categoria: categoria,
      ocorrencia: ocorrencia
    }).then(() => {
      setocorrenciasList([
        ...ocorrenciasList,
        {
          ocorrencia_condominio_id: ocorrencia_condominio_id,
          ocorrencia_morador_id: ocorrencia_morador_id,
          categoria: categoria,
          ocorrencia: ocorrencia
        },
      ]);
    });
  };

  const getMoradores = () => {
    Axios.get("http://localhost:3001/moradores").then((response) => {
      setmoradoresList(response.data);
    });
  };

  const getPerdidos = () => {
    Axios.get("http://localhost:3001/perdidos").then((response) => {
      setperdidosList(response.data);
    });
  };

  const getOcorrencias = () => {
    Axios.get("http://localhost:3001/ocorrencias").then((response) => {
      setocorrenciasList(response.data);
    });
  };

  const updateMoradorSenha = (id) => {
    Axios.put("http://localhost:3001/update", { senha: newPassword, id: id }).then(
      (response) => {
        setmoradoresList(
          moradoresList.map((val) => {
            return val.id === id
              ? {
                  id: val.id,
                  nome: val.nome,
                  cpf: val.cpf,
                  email: val.email,
                  senha: newPassword,
                  telefone_celular: val.telefone_celular,
                  telefone_fixo: val.telefone_fixo,
                  id_localizacao_no_condominio: val.id_localizacao_no_condominio
                }
              : val;
          })
        );
      }
    );
  };

  const deletePerdido = (perdido) => {
    Axios.delete(`http://localhost:3001/deleteperdido/${perdido}`).then((response) => {
      setperdidosList(
        perdidosList.filter((val) => {
          return val.perdido !== perdido;
        })
      );
    });
  };

  const deleteMorador = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setmoradoresList(
        moradoresList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  const deleteOcorrencia = (ocorrencia) => {
    Axios.delete(`http://localhost:3001/deleteocorrencia/${ocorrencia}`).then((response) => {
      setocorrenciasList(
        ocorrenciasList.filter((val) => {
          return val.ocorrencia !== ocorrencia;
        })
      );
    });
  };

  return (
    <div className="App">
      <h1>Cadastrar Morador</h1>
      <div className="information">
        <label>ID:</label>
        <input
          type="number"
          onChange={(event) => {
            setId(event.target.value);
          }}
        />
        <label>Nome:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>CPF:</label>
        <input
          type="number"
          onChange={(event) => {
            setCPF(event.target.value);
          }}
        />
        <label>E-mail:</label>
        <input
          type="text"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <label>Senha:</label>
        <input
          type="text"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <label>Telefone Celular:</label>
        <input
          type="number"
          onChange={(event) => {
            setCel(event.target.value);
          }}
        />
        <label>Telefone Fixo:</label>
        <input
          type="number"
          onChange={(event) => {
            setPhone(event.target.value);
          }}
        />
        <label>ID do seu apartamento no condomínio:</label>
        <input
          type="number"
          onChange={(event) => {
            setLocal(event.target.value);
          }}
        />
        <button onClick={addMorador}>Adicionar Morador</button>
      </div>
      <div className="moradores">
        <button onClick={getMoradores}>Mostrar Moradores</button>

        {moradoresList.map((val, key) => {
          return (
            <div className="morador">
              <div>
                <h3>ID: {val.id}</h3>
                <h3>Nome: {val.name}</h3>
                <h3>CPF: {val.cpf}</h3>
                <h3>E-mail: {val.email}</h3>
                <h3>Senha: {val.senha}</h3>
                <h3>Telefone Celular: {val.telefone_celular}</h3>
                <h3>Telefone Fixo: {val.telefone_fixo}</h3>
                <h3>ID do seu apartamento no condomínio: {val.id_localizacao_no_condominio}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Digite nova senha do morador..."
                  onChange={(event) => {
                    setNewPassword(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateMoradorSenha(val.id);
                  }}
                >
                  {" "}
                  Update Senha
                </button>

                <button
                  onClick={() => {
                    deleteMorador(val.id);
                  }}
                >
                  Delete Morador
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <h1>Cadastrar Ocorrência</h1>
      <div className="information">
        <label>ID Condomínio:</label>
          <input
            type="number"
            onChange={(event) => {
              set_ocorrencia_condominio_id(event.target.value);
            }}
          />
          <label>ID Morador:</label>
          <input
            type="number"
            onChange={(event) => {
              set_ocorrencia_morador_id(event.target.value);
            }}
          />
          <label>Categoria:</label>
          <input
            type="texto"
            onChange={(event) => {
              set_categoria(event.target.value);
            }}
          />
          <label>Descrição:</label>
          <input
            type="texto"
            onChange={(event) => {
              set_ocorrencia(event.target.value);
            }}
          />
          <button onClick={addOcorrencia}>Adicionar Ocorrência</button>
          </div>
          <div className="ocorrencias">
            <button onClick={getOcorrencias}>Mostrar Ocorrências</button>
          </div>
          {ocorrenciasList.map((val, key) => {
          return (
            <div className="ocorrencia">
              <div>
                <h3>ID Morador: {val.ocorrencia_morador_id}</h3>
                <h3>ID Condomínio: {val.ocorrencia_condominio_id}</h3>
                <h3>Categoria: {val.categoria}</h3>
                <h3>Descrição: {val.ocorrencia}</h3>
              </div>
              <div>
                <button
                  onClick={() => {
                    deleteOcorrencia(val.ocorrencia);
                  }}
                >
                  Delete Ocorrência
                </button>
              </div>
            </div>
          );
        })}

        <h1>Cadastrar Objeto Perdido em "Achados e Perdidos"</h1>
      <div className="information">
        <label>ID Condomínio:</label>
          <input
            type="number"
            onChange={(event) => {
              set_perdido_condominio_id(event.target.value);
            }}
          />
          <label>ID Funcionário:</label>
          <input
            type="number"
            onChange={(event) => {
              set_perdido_funcionario_id(event.target.value);
            }}
          />
          <label>Objeto Perdido:</label>
          <input
            type="texto"
            onChange={(event) => {
              set_perdido(event.target.value);
            }}
          />
          <button onClick={addPerdido}>Adicionar Objeto Perdido</button>
          </div>
          <div className="perdidos">
            <button onClick={getPerdidos}>Mostrar Objetos Perdidos</button>
          </div>
          {perdidosList.map((val, key) => {
          return (
            <div className="perdido">
              <div>
                <h3>ID Funcionário: {val.perdido_funcionario_id}</h3>
                <h3>ID Condomínio: {val.perdido_condominio_id}</h3>
                <h3>Objeto Perdido: {val.perdido}</h3>
              </div>
              <div>
                <button
                  onClick={() => {
                    deletePerdido(val.perdido);
                  }}
                >
                  Delete "Objeto Perdido"
                </button>
              </div>
            </div>
          );
        })}
    </div>
    
  );
}

export default App;
