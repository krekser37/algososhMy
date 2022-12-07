import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../button";

const buttonText = "Click me!";

describe("test Button component", () => {
it("render button with text", () => {
    const tree = renderer.create(<Button text={buttonText} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("render disabled", () => {
    const tree = renderer
      .create(<Button text={buttonText} disabled />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("render button without text", () => {
    const tree = renderer.create(<Button />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("render isLoader", () => {
    const tree = renderer.create(<Button isLoader />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Нажатие на кнопку вызывает корректный корректностный вызов колбека", () => {
    window.alert = jest.fn();

    // Рендерим компонент
    render(
      <Button
        text={buttonText}
        onClick={() => {
          alert("Корректный вызов колбека при клике на кнопку");
        }}
      />
    );

    // Находим элемент ссылки
    const button = screen.getByText(buttonText);

    // Имитируем нажатие на ссылку
    fireEvent.click(button);

    // Проверяем, что alert сработал с правильным текстом предупреждения
    expect(window.alert).toHaveBeenCalledWith(
      "Корректный вызов колбека при клике на кнопку"
    );
  })
});
