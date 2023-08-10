import React, { useEffect, useState } from "react";
import Slider from "shared/components/slider";
import InputText from "shared/components/input/input-text";

const CreateBusinessForm = () => {
  const [owner, setOwner] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [contacts, setContacts] = useState("");
  const [preview, setPreview] = useState("");

  const steps = [];

  const InputTitle = (
    <div>
      <h2>Введите название бизнеса:</h2>
      <InputText
        initialState={title}
        placeholder={"Название"}
        callback={setTitle}
      />
    </div>
  );

  const Description = (
    <div>
      <h2>Введите описание бизнеса:</h2>
      <InputText
        initialState={description}
        placeholder={"Описание"}
        callback={setDescription}
      />
    </div>
  );

  useEffect(() => {}, [title, description]);

  return (
    <div>
      <Slider
        steps={[InputTitle, Description]}
        finishButtonText={"Сохранить"}
      />
    </div>
  );
};

export default CreateBusinessForm;
