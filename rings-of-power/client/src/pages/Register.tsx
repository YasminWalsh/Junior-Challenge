import styled from "styled-components";
import { Ring, useRing } from "../Providers/Ring";
import { Background } from "../components/backgroundPage";
import { SubmitHandler, useForm } from "react-hook-form";
import ringImg from "../assets/ring.webp";
import api from "../services/api";
const FormContainer = styled.div`
  display: flex;
  width: 75%;
  height: 100%;
  flex-direction: column;
  gap: 1em;
  align-items: center;
  justify-content: center;
  @media (max-width: 600px) {
    width: 90%;
  }
  > h2 {
    color: var(--light);
  }
  > form {
    display: flex;
    flex-direction: column;
    min-width: 60%;
    height: auto;
    gap: 1em;
    max-width: 75%;
    @media (max-width: 600px) {
      max-width: 100%;
      width: 90%;
    }

    > input {
      border-radius: 1em;
      border: 0.1em solid;
      border-color: var(--black);
      height: 2.5em;
      padding: 1em;

      background: var(--light);
      font-weight: 300;
      font-size: 1em;
      line-height: 1em;

      @media (max-width: 500px) {
        font-size: 1.2em;
      }
      @media (min-width: 1200px) {
        font-size: 1.5em;
      }
      @media (min-width: 1800px) {
        font-size: 2em;
      }

      @media (min-width: 3000px) {
        font-size: 3em;
      }
    }

    > select {
      border-radius: 1em;
      border: 0.1em solid;
      height: 2.5em;
      padding: 0 1em;

      background: var(--light);
      font-weight: 300;
      font-size: 1em;
      line-height: 1em;
      @media (max-width: 500px) {
        font-size: 1.2em;
      }
      @media (min-width: 1200px) {
        font-size: 1.5em;
      }
      @media (min-width: 1800px) {
        font-size: 2em;
      }

      @media (min-width: 3000px) {
        font-size: 3em;
      }
    }

    .submit-button {
      cursor: pointer;
      color: var(--light);
      background: transparent;
      border: 1px solid var(--light);
      border-radius: 0.5em;
      font-size: 1.2em;
      width: 8em;
      height: 2em;
      align-self: center;
      transition: all 0.4s ease-in-out;

      &:hover {
        background: var(--light);
        color: var(--black);
      }
    }
  }
`;

const ImgBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5em;
  width: 100%;
  color: var(--green-dark);

  > img {
    width: 20em;
    height: 10em;
    object-fit: cover;
    border-radius: 0.5em;
  }
`;

export const Register = () => {
  const { loadRings, rings } = useRing();
  const defaultUrlImage =
    "https://ovicio.com.br/wp-content/uploads/2022/01/20220119-ovicio-lord-of-the-ring-rise-to-war.jpg";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Ring>();
  const onSubmit: SubmitHandler<Ring> = (data) => {
    const formattedData = {
      nome: data.nome,
      poder: data.poder,
      imagem: data.imagem,
      forjadoPorId: Number(data.forjadoPor),
      portador: { nome: data.portador },
    };

    console.log(data, formattedData);
    api
      .post("/ring", formattedData)
      .then((response) => console.log(response.data))
      .catch((error) => console.error({ error }));
  };

  const imageUrl = watch("imagem") || defaultUrlImage;

  return (
    <Background page="register" redirect="/">
      <FormContainer>
        <h2>Criar um anel</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input placeholder="Nome do anel" {...register("nome")} />

          <input placeholder="Portador" {...register("portador")} />
          {errors.portador && <span>This field is required</span>}

          <input placeholder="Poder do anel" {...register("poder")} />
          {errors.poder && <span>This field is required</span>}
          <input
            defaultValue={defaultUrlImage}
            placeholder="Url da imagem"
            {...register("imagem")}
          />
          {errors.imagem && <span>This field is required</span>}
          <ImgBox>
            <img src={imageUrl} alt="Visualização do anel" />
            <p>Pré-visualização da imagem</p>
          </ImgBox>

          <select {...register("forjadoPor")}>
            <option value="" disabled selected hidden>
              Escolha um forjador
            </option>
            <option value={1}>Elfos</option>
            <option value={2}>Anões</option>
            <option value={3}>Homens</option>
            <option value={4}>Sauron</option>
          </select>
          {errors.forjadoPor && <span>This field is required</span>}
          <button className="submit-button" type="submit">
            Enviar
          </button>
        </form>
      </FormContainer>
    </Background>
  );
};
