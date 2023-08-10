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
  useEffect(() => {
    console.log(title);
  }, [title]);
  return (
    <div>
      <div>
        <Slider steps={[InputTitle]} finishButtonText={"Сохранить"} />
      </div>
    </div>
  );
};

export default CreateBusinessForm;
