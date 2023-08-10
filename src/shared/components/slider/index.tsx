import React from "react";
import { Button } from "antd";

interface SliderProps {
  steps: string[];
}

const Slider = ({ steps }: SliderProps) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep((prevState) => prevState + 1);
  };

  const handleBack = () => {
    setActiveStep((prevState) => prevState - 1);
  };
  return (
    <div>
      {steps.map((step, index) => {
        if (activeStep === index) {
          return step;
        }
      })}
      {activeStep !== steps.length ? (
        <div>
          <Button
            type={"primary"}
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Назад
          </Button>
          <Button type={"primary"} onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Finish" : "Вперед"}
          </Button>
        </div>
      ) : (
        <div>All steps completed - you&apos;re finished</div>
      )}
    </div>
  );
};

export default Slider;
